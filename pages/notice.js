import React, {Component} from 'react';
import {connect} from 'react-redux';
import {message, Button, Row, Card, Icon, Breadcrumb} from 'antd';
import {Link} from 'react-router-dom';
import NoticeTable from '../components/notice-table';
import CreateNotice from '../components/create-notice';
import { getAllNoticeList } from '../utils/notice-api-util';
import config from '../config/config';

class Notice extends Component {
	constructor(props){
		super(props);
		this.state = {
			visibleCreate: false,
			editData: false,
			list:[]
		}
		this.pageSize = 50;
		this.pageNumber = 1;
		this.total = 0;
	}
	componentDidMount(){
		this.loadList();
	}
	//加载列表
	loadList(){
		getAllNoticeList(
			this.props.dispatch,
			this.pageNumber,
			this.pageSize
		).done((data) => {
			this.total = data.total;
			this.setState({list:data.list})
		})
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
	handleEditOk = () => {
		this.handleEditCancel();
		message.success('修改成功');
		this.loadList();
	}
	handleDel = () => {
		this.reloadList();
	}
	onEdit = (data) => {
		this.setState({editData : data});
	}
	handleEditCancel = () => {
		this.setState({editData : null});
	}
	onPageChange = (pageNumber,pageSize) => {
		this.pageNumber = pageNumber;
		this.loadList();
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
				    <Breadcrumb.Item>公告管理</Breadcrumb.Item>
				</Breadcrumb>
				<Card className="ant-card-main" title={<Row className="btns-area">
						<Button  onClick={this.handleCreate} type="primary" size="large"><i className={"fa fa-plus"} />添加</Button>
					</Row>} >
					
					<NoticeTable onEdit={this.onEdit} onDel={this.handleDel} pagination={{total:this.total, showTotal:this.showTotal, onChange: this.onPageChange, current:this.pageNumber, total:this.total, pageSize: this.pageSize }}  dataSource={this.state.list} />
					<CreateNotice onOk={this.handleCreateOk} onCancel={this.handleCreateCancel} visible={this.state.visibleCreate} />
					{this.state.editData && <CreateNotice data={this.state.editData} onOk={this.handleEditOk} onCancel={this.handleEditCancel} visible={true} />}
				</Card>
			</div>
		)
	}
}

function mapStateToProps(state, props){
	return {}
}
export default connect(mapStateToProps)(Notice)