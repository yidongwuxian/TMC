import React, {Component} from 'react';
import {connect} from 'react-redux';
import SettingRegister from '../components/setting-register';
import SettingTeam from '../components/setting-team';
import { getSaveInfo, openRegist, closeRegist, setTeamNum, openCreateTeam, closeCreateTeam} from '../utils/config-api-util';
import {message} from 'antd';
import { Icon, Breadcrumb } from 'antd';
import config from '../config/config';
import {Link} from 'react-router-dom';


class Save extends Component {
	constructor(props){
		super(props);
		this.state = {
			tenant_num: 1,
			registerable: "0",
			tenant_createable: "0"
		}
	}
	componentDidMount(){
		
	}
	componentWillMount(){
		this.loadInfo();
		
	}
	componentWillUnmount(){

	}
	loadInfo() {
		getSaveInfo(this.props.dispatch).done((data) => {
			this.setState(Object.assign({}, this.state, data.bean));
		})
	}
	onRegisterChange = (checked) => {

		if(checked){
			openRegist(this.props.dispatch).done(() => {
				this.setState({registerable: "1"})
			})
		}else{
			closeRegist(this.props.dispatch).done(() => {
				this.setState({registerable: "0"})
			})
		}
	}
	onCreateTeamChange = (checked) => {
		if(checked) {
			openCreateTeam(this.props.dispatch).done(() => {
				this.setState({tenant_createable: '1'})
			})
		}else {
			closeCreateTeam(this.props.dispatch).done(() => {
				this.setState({tenant_createable: '0'})
			})
		}
	}
	setTeamNum = () => {
		if(!this.props.tenant_num){
			message.warning("请输入创建团队个数")
		}
		setTeamNum(
			this.props.dispatch,
			this.state.tenant_num
		).done(() => {

		})
			
	}
	onTeamNumChange = (value) => {
		this.setState({tenant_num: value})
	}
	render(){
		return (
			<div className="setting-data-source">	
				<Breadcrumb  separator=">" style={{background:'#fff'}}>
					<Breadcrumb.Item><Icon type="home" />{config.projectName}</Breadcrumb.Item>
				    <Breadcrumb.Item>配置管理</Breadcrumb.Item>
				    <Breadcrumb.Item>安全策略</Breadcrumb.Item>
				</Breadcrumb>
				<SettingRegister onChange={this.onRegisterChange} checked={this.state.registerable == '0' ? false : true} />
				<SettingTeam onTeamNumChange={this.onTeamNumChange} setTeamNum={this.setTeamNum} onCreateTeamChange={this.onCreateTeamChange} teamNum={this.state.tenant_num} checked={this.state.tenant_createable == '0' ? false : true} />
			</div>
		)
	}
}

function mapStateToProps(state, props){
	return {
		
	}
}
export default connect(mapStateToProps)(Save)