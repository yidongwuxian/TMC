import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Table, message, Modal, Button, Row, Col, Card, Breadcrumb, Icon} from 'antd';
import {Link} from 'react-router-dom';
import NodeTable from '../components/node-table';
import { getNodeFromDatacenterAndCluster, addNode, getNodeInfo, editNode, getAllNode } from '../utils/dataCenter-api-util';
import NodeFormDialog from '../components/node-form-dialog';
import config from '../config/config';

import Search from '../components/node-search';

class AllNode extends Component {
	constructor(props){
		super(props);
		this.state = {
			showAddDialog: false,
			editData: null,
			list: []
		}
		this.pageSize = 50;
		this.pageNumber = 1;
		this.total = 0;

		this.dataCenterId = '';
		this.clusterId = '';

	}
	componentDidMount(){
		this.loadList()
	}
	componentWillMount(){
		
		
	}
	componentWillUnmount(){

	}
	loadList() {

		var dataCenterId = this.search.getData().dataCenterId;
		var clusterId = this.search.getData().clusterId; 


		if(dataCenterId && clusterId){
			getNodeFromDatacenterAndCluster(
				this.props.dispatch,
				dataCenterId,
				clusterId
			).done((data) => {
				this.setState({list: data.list || []})
			})
		} else {
			getAllNode(
				this.props.dispatch,
				this.pageNumber,
				this.pageSize
			).done((data) => {
				this.total = data.total;
				this.setState({list: data.list || []})

			})
		}
	}
	reloadList(){
		this.pageNumber = 1;
		this.loadList();
	}
	onSearch = (dataCenterId, clusterId) => {
		this.loadList();
		
	}
	addNode = () => {
		const {dataCenterId, clusterId}  = this.props.match.params;
		if(!dataCenterId || !clusterId) return;
		this.setState({showAddDialog: true})
	}
	cancelAddNode = () => {
		this.setState({showAddDialog: false})
	}
	handleAddNode =(data) => {
		const {dataCenterId, clusterId}  = this.props.match.params;
		console.log(data)
		addNode(
			this.props.dispatch,
			dataCenterId,
			clusterId,
			data
		).done((data) => {
			this.loadList(dataCenterId, clusterId);
			this.cancelAddNode();
		})
	}
	editNode = (data) => {
		var uuid = data['uuid'];
		var dataCenterId = data['region_id'];
		var clusterId  = data['cluster_id'];
		
		if(dataCenterId && clusterId && uuid){
			getNodeInfo(
				this.props.dispatch,
				dataCenterId,
				clusterId,
				uuid
			).done((data) => {
				this.setState({editData: data.bean || {}});
			})
		}
	}
	cancelEditNode = () => {
		this.setState({editData: null})
	}
	handleEditNode =(data) => {
		
		var hostName = data['host_name'];
		var dataCenterId = this.state.editData['region_id'];
		var clusterId  = this.state.editData['cluster_id'];

		if(dataCenterId && clusterId && hostName){
			editNode(
				this.props.dispatch,
				dataCenterId,
				clusterId,
				hostName,
				data
			).done(() => {
				this.cancelEditNode();
				this.reloadList();
			})
		}
		
	}
	onPageChange = (pageNumber,pageSize) => {
		this.pageNumber = pageNumber;
		this.loadList();
	}
	saveSearch = (search) => {
		this.search = search;
	}
	render(){
		const { list, showAddDialog, showEditDialog, editData } = this.state;
		return (
			<div>
				<Breadcrumb  separator=">" style={{background:'#fff'}}>
					<Breadcrumb.Item><Icon type="home" />{config.projectName}</Breadcrumb.Item>
				    <Breadcrumb.Item><Link to="/home">数据中心管理</Link></Breadcrumb.Item>
				    <Breadcrumb.Item>节点管理</Breadcrumb.Item>
				</Breadcrumb>
				<Card className="ant-card-main" title={<Row className="btns-area">
						{<Search ref={this.saveSearch} onSearch={this.onSearch} />}
					</Row>} >
					<NodeTable pagination={{onChange: this.onPageChange, current:this.pageNumber, total:this.total, pageSize: this.pageSize }} onEdit={this.editNode}  dataSource={list} />
					{showAddDialog ? <NodeFormDialog onOk={this.handleAddNode} onCancel={this.cancelAddNode} title="添加节点" /> : ''}
					{editData ? <NodeFormDialog data={editData}  onOk={this.handleEditNode} onCancel={this.cancelEditNode} title="编辑节点" /> : ''}
				</Card>
			</div>
		)
	}
}

export default connect()(AllNode)