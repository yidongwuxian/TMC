import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal,Button } from 'antd';
import DataCenterForm  from './dataCenterForm';

class EditFalseDataCenter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id:'',
			showbtn : true
		}

	}
	componentwillreceiveprops(nextProps, nextState) {
		
	}
	componentDidMount() {
	   
	}
	// componentWillMount() {
	// 	var  self = this;
	// 	const { id, dispatch } = this.props;
	// 	if(id){
	// 		getDataCenterById(
	// 			id,
	// 			dispatch
	// 		).done(function(data){
	// 			self.form.setFieldsValue(data.bean)
	// 		})
			
	// 	}
	// }
	// onOk = (e) => {
	// 	const { onOk, dispatch } = this.props;
	// 	this.form.validateFields((err, values) => {

	// 		if(!err){
	// 			values.region_id = this.props.id;
	// 			editDataCenter(
	// 				values,
	// 				dispatch
	// 			).done(function(data){
	// 				onOk && onOk(values)
	// 			})
				
	// 		}
	// 	})
	// }
	// reset = () => {
	// 	this.form.resetFields();
	// }
	// saveForm = (form) => {
	// 	this.form = form;
	// }
	onhide = () => {
		const { id }  = this.props;
		this.setState({showbtn: null});
		console.log(id)
		window.open('https://market.goodrain.com/#/check-console-admin/' + id)
	}
	render() {
		const { id }  = this.props;
		const { showbtn }  = this.state;
		return (
			<Modal
				visible = {true}
				title = '分享'
				onCancel = {this.props.onCancel}
				afterClose = {this.props.onCancel}
				maskClosable = {false}
				footer={[
		            <Button key="back" onClick={this.props.onCancel}>关闭</Button>
		         ]}
			>
			<div>
				<h3 style={{fontSize:18,display:"block",textAlign:"center"}} >您的云帮尚未在好雨官方认证 </h3>
				<p style={{fontSize:14,textAlign:"center",lineHeight:2,paddingBottom:"20px"}}>请点击下面按钮认证,认证完成后可回到本页面继续操作</p>
				{
				 showbtn ?
				 <p style={{textAlign:"center"}}>
					<a style={{fontSize:14,color:'#fff',backgroundColor:'#00d973',height:32,lineHeight:"32px",display:"inline-block",margin:"auto",borderRadius:"4px",paddingLeft:"15px",paddingRight:"15px"}} onClick={this.onhide}>去认证</a>
				 </p>
				 : 
				 <p style={{textAlign:"center"}}>
					<a style={{fontSize:14,color:'#fff',backgroundColor:'#00d973',height:32,lineHeight:"32px",display:"inline-block",margin:"auto",borderRadius:"4px",paddingLeft:"15px",paddingRight:"15px"}} href="javascript:;" onClick={this.props.onCancel}>已完成认证</a>
				 </p>
				}
				
			</div>
			</Modal>
		)
	}
}


export default connect()(EditFalseDataCenter);