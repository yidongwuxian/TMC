import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Card, Breadcrumb, Icon, Form} from 'antd';
import {Link} from 'react-router-dom';
import CreateDataCenter from '../components/CreateDataCenter';
import DynamicForm from '../components/dynamic-form';
import { loadDataCenterList, stopHome, loadHomeList } from '../actions/dataCenter-action';
import config from '../config/config';
require("../../style/config-datacenter.css");





class ConfigDataCenter extends Component {
	constructor(props){
		super(props);
		this.state = {
			items:{}
		   
		}
	}
	componentDidMount(){
		
	}
	componentWillMount(){
		this.loadList();
	}
	loadList = () => {
		const { dispatch } = this.props;
		dispatch(loadDataCenterList());
	}
	componentWillUnmount(){

	}
	
	saveForm = (form) => {
		this.form = form;
		if(this.form){
			console.log(this.form)
			this.form.check();
		}
	}
	handleClick = () => {
		this.form.check();
	}
	render(){
		const { dataSource } = this.props;
		const { editDataId } = this.state;
		const keys = Object.keys(this.state.items) || [];
		return (
			<div>
				<Breadcrumb  separator=">" style={{background:'#fff'}}>
					<Breadcrumb.Item><Icon type="home" />{config.projectName}</Breadcrumb.Item>
				    <Breadcrumb.Item><Link to="/home">数据中心管理</Link></Breadcrumb.Item>
				</Breadcrumb>
				<Card title="数据中心配置" className="dynamic-form-wrap ant-card-main">
					<h2></h2>
					<DynamicForm ref={this.saveForm}  />
				</Card>
			</div>
		)
	}
}

function mapStateToProps(state, props){
	return {
		dataSource : state.dataCenterList

	}
}
export default connect(mapStateToProps)(ConfigDataCenter)