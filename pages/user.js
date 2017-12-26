import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Table, message, Modal, Button, Row, Col, Card, Icon, Breadcrumb} from 'antd';
import {Link} from 'react-router-dom';
import UserTable from '../components/user-table';
import CreateUser from '../components/create-user';
import Search from '../components/user-search';
import { getUserList, getAllUserList } from '../utils/user-api-util';
import config from '../config/config';

class User extends Component {
	constructor(props){
		super(props);
		this.state = {
			visibleCreate: false,
			list:[]
		}
		this.pageSize = 50;
		this.pageNumber = 1;
		this.total = 0;
		this.tenantName = '';
	}
	componentDidMount(){
		this.loadList();
	}
	//加载列表
	loadList(){
		var tenantName = this.search.getData();
		if(tenantName){
			getUserList(
				this.props.dispatch,
				tenantName,
				this.pageNumber,
				this.pageSize
			).done((data) => {
				this.total = data.total || data.list.length;
				this.setState({list:data.list})
			})
		}else{
			getAllUserList(
				this.props.dispatch,
				this.pageNumber,
				this.pageSize
			).done((data) => {
				this.total = data.total;
				this.setState({list:data.list})
			})
		}
	}
	reloadList(){
		this.pageNumber = 1;
		this.loadList();
	}
	handleCreate = () => {
		this.setState({visibleCreate: true});
	}
	handleCreateCancel = () => {
		this.setState({visibleCreate: false});
	}
	handleCreateOk = (data) => {
		this.setState({visibleCreate: false});
		message.success('创建成功');
		this.loadList();
	}
	onSearch = (data) => {
		this.reloadList();
	}
	handleDel = () => {
		this.reloadList();
	}
	onPageChange = (pageNumber,pageSize) => {
		this.pageNumber = pageNumber;
		this.loadList();
	}
	saveSearch = (search) => {
		this.search = search;
	}
	showTotal = (total, range) => {
		return range[0]+'-'+range[1]+'条／共'+ total + '条';
	}
	render(){
		const { dataSource } = this.props;
		return (
			<div>
				<Breadcrumb  separator=">" style={{background:'#fff'}}>
					<Breadcrumb.Item><Icon type="home" />{config.projectName}</Breadcrumb.Item>
				    <Breadcrumb.Item>用户管理</Breadcrumb.Item>
				</Breadcrumb>
				<Card title={<Row className="btns-area">
						<Search ref={this.saveSearch} onSearch={this.onSearch} />
						<Button  onClick={this.handleCreate} type="primary" size="large"><i className={"fa fa-plus"} />添加</Button>
					</Row>} >
					
					<UserTable onDel={this.handleDel} pagination={{total:this.total, showTotal:this.showTotal, onChange: this.onPageChange, current:this.pageNumber, total:this.total, pageSize: this.pageSize }}  dataSource={this.state.list} />
					<CreateUser onOk={this.handleCreateOk} onCancel={this.handleCreateCancel} visible={this.state.visibleCreate} />
				</Card>
			</div>
		)
	}
}

function mapStateToProps(state, props){
	return {}
}
export default connect(mapStateToProps)(User)