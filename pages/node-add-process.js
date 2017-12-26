import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Breadcrumb, Card, Icon, Button} from 'antd';
import {Link} from 'react-router-dom';
import config from '../config/config';
import {getNodeInstallStatus, installNode, getNodeInitStatus} from '../utils/node-api-util';
var $ =  require('../libs/jquery.min');
import SocketUtil from '../utils/socket-util';
require('../../style/node-install.css');

const statusClassMap = {
	'0': 'wait',
	'1': 'success',
	'2': 'fail',
	'3': 'ing'
}

const statusIconMap = {
	'0': 'fa fa-circle-o-notch',
	'1': 'fa fa-check',
	'2': 'fa fa-close',
	'3': 'fa fa-circle-o-notch Rotation'
}


//是否有正在安装中的组件
function getInstallIng(comList){
	for(var i=0;i<comList.length;i++){
		if(comList[i].JobResult === 3){
			return comList[i];
		}
	}
	return null;
}

//判断该节点的组件是否有安装错误
function hasFail(comList){
	for(var i=0;i<comList.length;i++){
		if(comList[i].JobResult === 2){
			return true;
		}
	}
	return false;
}

function isAllComplete(components){
	if(components.length){
		return components[components.length-1].JobResult === 1;
	}else{
		return false;
	}
}


function getJobById(coms, id){
	for(var i=0;i<coms.length;i++){
		if(coms[i].JobId === id){
			return coms[i];
		}
	}
	return null;
}

function getNodeStatus(status){

	if(status == 1){
		return 'success';
	}

	if(status == 2){
		return 'fail';
	}

	if(status == 3){
		return 'installing';
	}

	if(status == 4){
		return 'success-to-update'
	}

	return 'inited';
}



class NodeAddProcess extends Component {
	constructor(props){
		super(props);
		this.socketUrl = '';
		this.timer = null;
		this.state = {
			ip:'',
			//节点安装总状态
			//init-fail inited installing fail success
			status:'uninit',
			eventId:'',
			failMessage:'',
			components:[]
		}
	}
	componentDidMount(){
		
	}
	componentWillReceiveProps(nextProps){

	}
	componentWillMount(){
		this.getInitStatus();
	}
	getInitStatus(){
		const dataCenterId = this.props.match.params.dataCenterId;
		const ip = this.props.match.params.ip;
		getNodeInitStatus(
			this.props.dispatch,
			dataCenterId,
			ip
		).done((data)=> {
			if(data.bean.status == 'success'){
				this.getInstallStatus();
			}else if(data.bean.status == 'fail'){
				this.setState({status:'init-fail', failMessage:data.bean.message});
			}else{
				this.timer = setTimeout(()=> {
					this.getInitStatus();
				}, 2000)
			}
		}).fail(()=>{
			this.timer = setTimeout(()=> {
				this.getInitStatus();
			}, 2000)
		})
	}
	getInstallStatus(){
		const dataCenterId = this.props.match.params.dataCenterId;
		const ip = this.props.match.params.ip;
		getNodeInstallStatus(
			this.props.dispatch,
			dataCenterId,
			ip
		).done((data) => {
			var status = getNodeStatus(data.status);
			console.log(status)
			if(status == 'success-to-update'){
				this.setState({
					status: status
				});
			}else{
				this.socketUrl = data.bean.web_socket_url;
				var installIngCom = getInstallIng(data.list);
				var eventId = data.list[0].JobSEQ;
				this.setState({
					eventId:eventId,
					status: status,
					components: data.list
				}, () => {
					if(installIngCom && eventId){
						$('.installIngCom-name').html(installIngCom.Describe);
						this.createSocket();
					}
				});
			}
			
		})
	}
	componentWillUnmount(){
		if(this.socket){
			this.socket.destroy();
		}

		if(this.timer){
			clearTimeout(this.timer);
		}
	}
	createSocket(){
		var jobId = '';
		this.socket = new SocketUtil({
			url:this.socketUrl,
			eventId:this.state.eventId,
			onMessage:(msg) => {
				
				if(msg){
					
					//安装结束
					if(msg.step =='final'){
						//安装成功结束
						if(msg.status == 'true'){
							this.setState({status: 'success'});
							this.socket.destroy();
							$('.logs').hide();
							$('.logs .detail').html('');
							$('.logs .installIngCom-name').html('');
						//安装失败结束
						}else{
							this.setState({status: 'fail'});
							this.socket.destroy();
						}

					}else{
						$('.logs').show();
						if(jobId != msg.jobId){
							jobId = msg.jobId;
							$('.logs .detail').html('');
						}
						var job = getJobById(this.state.components, msg.jobId);
						$('.installIngCom-name').html(job? job.Describe : '');
						$('.logs .detail').prepend('<p>'+msg.message+'</p>');
						$('[data-job-id='+jobId+']').attr('data-status', statusClassMap[msg.status])
						$('[data-job-id='+jobId+']').find('.node-component-status-icon span').attr('class', statusIconMap[msg.status])
					}
					
				}
			}
		})
	}
	install = () => {
		const dataCenterId = this.props.match.params.dataCenterId;
		const ip = this.props.match.params.ip;
		installNode(
			this.props.dispatch,
			dataCenterId,
			ip
		).done((data) => {
			var eventId = data.list[0].JobSEQ;
			this.setState({status:'installing', eventId: eventId}, () => {
				this.createSocket();
			})
		})
	}
	updateInfo = () => {
		const dataCenterId = this.props.match.params.dataCenterId;
		const ip = this.props.match.params.ip;
		installNode(
			this.props.dispatch,
			dataCenterId,
			ip
		).done((data) => {
			this.setState({status: 'success'})
		})
	}
	startInstall = () => {
		this.install();
	}
	reInstall = () => {
		this.install();
	}
	goback = () =>{
		history.back();
	}
	render(){
		const ip = this.props.match.params.ip;
		const components = this.state.components;
		return (
			<div className="page-node-detail setting-data-source">
		    	<Breadcrumb  separator=">" style={{background:'#fff'}}>
					<Breadcrumb.Item><Icon type="home" />{config.projectName}</Breadcrumb.Item>
				    <Breadcrumb.Item><Link to="/">资源管理</Link></Breadcrumb.Item>
				    <Breadcrumb.Item>安装节点</Breadcrumb.Item>
				</Breadcrumb>
				<Card>
					  <div className="node-install-hd">

	

					  		{
					  			(this.state.status == 'success') ? 
					  			<div>
					  				<h2>
							  		{ip}节点 安装成功
							  		</h2>
					  			</div>
					  			:''
					  		}

					  		{
					  			(this.state.status == 'success-to-update') ? 
					  			<div>
					  				<h2>
							  		{ip}节点安装已成功， 但需要初始化数据
							  		</h2>
					  			</div>
					  			:''
					  		}

					  		{
					  			this.state.status == 'init-fail' ? 
					  			<div>
					  				<h2>
							  		{ip}节点 初始化失败
							  		</h2>
							  		<p className="tips">{this.state.failMessage}</p>

					  			</div>
					  			:''
					  		}

					  		{
					  			this.state.status == 'installing' ? 
					  			<div>
					  				<h2>
							  		{ip}节点 安装中  
							  		</h2>
							  		<p className="tips">因网络等因素，此过程可能比较耗时， 请耐心等待......</p>
					  			</div>
					  			:''
					  		}

					  		{
					  			this.state.status == 'inited' ? 
					  			<div>
					  				<h2>
							  		{ip}节点 开始安装
							  		</h2>
							  		<p className="tips">即将开始执行如下任务，开始执行后无法停止，请确认后开始</p>
					  			</div>
					  			:''
					  		}

					  		{
					  			this.state.status == 'fail' ? 
					  			<div>
					  				<h2>
							  		{ip}节点 安装失败 
							  		</h2>
							  		<p className="tips">请检查后点击重试按钮！</p>
					  			</div>
					  			:''
					  		}

					  </div>
					  <div className="node-install-bd">

					  	    {
					  	    	
					  			this.state.status == 'uninit' ? 
					  			<div className="uninit-tip">
					  				<h2>
							  		{ip}节点初始化中请稍后...
							  		</h2>
					  			</div>
					  			:''
					  		
					  	    }

					  	    {
					  			this.state.status == 'init-fail' ? 
					  			<div style={{textAlign: 'center'}}>
					  				<Button onClick={this.getInitStatus} type="primary" size={"large"}>重新初始化</Button>
					  			</div>
					  			:''
					  		}

					  	    {
					  	    	
					  			this.state.status !== 'uninit' ? 
					  			<div>
					  				<div className="components-wrap">
							  		{
							  			this.state.components.map((item) => {
							  				return (
							  					<div className={'node-component'} data-status={statusClassMap[item.JobResult]} data-job-id={item.JobId}>
											      		<span className="node-component-name">{item.CnName}</span>
											      		<span className="node-component-status">
											      			<span className="node-component-status-icon">
											      				<span className={statusIconMap[item.JobResult]}></span>
											      			</span>
											      		</span>
											    </div>
							  				)
							  			})
							  		}
								    </div>

						    		<div className="logs" style={{display: 'none'}}>
								    	<h4 className="installIngCom-name"></h4>
								    	<div className="detail">
								    		
								    	</div>
								    </div>
					  			</div>
					  			:''
					  	    }
					  </div>
					  <div className="node-install-ft">
					  		 {
					  		 	this.state.status == 'inited' ? 
					  		 	<Button onClick={this.startInstall} type="primary" size={"large"}>开始安装</Button>
					  		 	: ''
					  		 }
					  		 {
					  		 	this.state.status == 'success-to-update' ? 
					  		 	<Button onClick={this.updateInfo} type="primary" size={"large"}>初始化数据</Button>
					  		 	: ''
					  		 }
					  		 {
					  		 	this.state.status == 'fail' ? 
					  		 	<Button onClick={this.reInstall} type="primary" size={"large"}>重试</Button>
					  		 	: ''
					  		 }
					  		 {
					  		 	this.state.status == 'success' ? 
					  		 	<Button onClick={this.goback} type="primary" size={"large"}>返回节点列表</Button>
					  		 	: ''
					  		 } 
					  		 
					  </div>
				      
				</Card>
			</div>
		)
	}
}

export default connect()(NodeAddProcess)