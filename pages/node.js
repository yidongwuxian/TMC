import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Table, message, Modal, Button, Row, Col, Card, Breadcrumb, Icon} from 'antd';
import {Link} from 'react-router-dom';
import NodeTable from '../components/node-table';
import { getNodeFromDatacenter, getNodeOverviewInfo, editNode, getAllNode, removeNode, schedulable, scheduldisable } from '../utils/dataCenter-api-util';
import NodeFormDialog from '../components/node-form-dialog';
import {nodeCheck} from '../utils/node-api-util';
import config from '../config/config';

import Search from '../components/node-search';

class Node extends Component {
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
		console.log(this.props)
		var params = this.props.match.params;
		this.dataCenterId = params.dataCenterId || '';
		this.dataCenterName = params.dataCenterName || '';

	}
	componentDidMount(){
		
	}
	componentWillReceiveProps(nextProps){
		var params = nextProps.match.params;
		this.dataCenterId = params.dataCenterId || '';
		this.dataCenterName = params.dataCenterName || '';
		this.loadList();
	}

	componentWillMount(){
		this.loadList()
	}
	componentWillUnmount(){

	}
	loadList() {
		var dataCenterId = this.dataCenterId;
		if(dataCenterId){
			getNodeFromDatacenter(
				this.props.dispatch,
				dataCenterId
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
	reloadList = () => {
		this.pageNumber = 1;
		this.loadList();
	}
	onSearch = (dataCenterId, clusterId) => {
		this.dataCenterId = dataCenterId;
		this.clusterId = clusterId;
		this.loadList();
		
	}
	addNode = () => {
		this.setState({showAddDialog: true})
	}
	cancelAddNode = () => {
		this.setState({showAddDialog: false})
	}
	handleAddNode =(data) => {
		nodeCheck(
			this.props.dispatch,
			data
		).done((res) => {

			window.location.hash = "/resources/"+data.dataCenterId+"/"+data.host.split(":")[0]+"/node-install";
		})
	}
	editNode = (data) => {
		var uuid = data['uuid'];
		var dataCenterId = data['region_id'];
		var clusterId  = data['cluster_id'];
		if(dataCenterId && clusterId && uuid){
			getNodeOverviewInfo(
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
	handleRemoveNode = (data) => {
		var dataCenterId = data['region_id'];
		var clusterId  = data['cluster_id'];
		var uuid = data['uuid'];
		if(dataCenterId && clusterId && uuid){
			removeNode(
				this.props.dispatch,
				dataCenterId,
				clusterId,
				uuid
			).done(() => {
				this.reloadList();
			})
		}
	}
	handleEditNode =(data) => {
		var dataCenterId = this.state.editData['region_id'];
		var clusterId  = this.state.editData['cluster_id'];
		var hostName = data['host_name'];
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
	onEditUnschedul = (data, able) => {
		var dataCenterId = data['region_id'];
		var clusterId  = data['cluster_id'];
		var uuid = data['uuid'];

		if(able){
			schedulable(
				this.props.dispatch,
				dataCenterId,
				clusterId,
				uuid
			).done(() => {
				this.reloadList();
			})
		}else{
			scheduldisable(
				this.props.dispatch,
				dataCenterId,
				clusterId,
				uuid
			).done(() => {
				this.reloadList();
			})
		}
	}
	render(){
		const { list, showAddDialog, showEditDialog, editData } = this.state;
		var editNode = null;
		if(editData){
			editNode = editData;
			var dataCenterId = editData.region_id;
			var clusterId = {
				dataCenterId: dataCenterId,
				clusterId: editData.cluster_id
			}
			editNode.dataCenterId = dataCenterId;
			editData.clusterId = clusterId;
			
		}
		return (
			<div>
			    {
			    	this.dataCenterName ? 
			    		<Breadcrumb  separator=">" style={{background:'#fff'}}>
							<Breadcrumb.Item><Icon type="home" />{config.projectName}</Breadcrumb.Item>
						    <Breadcrumb.Item><Link to="/">资源管理</Link></Breadcrumb.Item>
						    <Breadcrumb.Item><Link to="/">数据中心管理{this.dataCenterName ? '('+this.dataCenterName+')' : ''}</Link></Breadcrumb.Item>
						    <Breadcrumb.Item>节点管理</Breadcrumb.Item>
						</Breadcrumb>
			    	:
			    	<Breadcrumb  separator=">" style={{background:'#fff'}}>
						<Breadcrumb.Item><Icon type="home" />{config.projectName}</Breadcrumb.Item>
					    <Breadcrumb.Item><Link to="/">资源管理</Link></Breadcrumb.Item>
					    <Breadcrumb.Item>节点管理</Breadcrumb.Item>
					</Breadcrumb>
			    }
				
				<Card title={<Row className="btns-area">
						{<Search dataCenterId={this.dataCenterId} clusterId={this.clusterId} onSearch={this.onSearch} />}
						{<Button  onClick={this.addNode} size="large" type="primary"><i className={"fa fa-plus"} />添加</Button>}
					</Row>} >
					<NodeTable onReloadList={this.reloadList} onRemove={this.handleRemoveNode} onEditUnschedul={this.onEditUnschedul} hideSystem={true} pagination={{onChange: this.onPageChange, current:this.pageNumber, total:this.total, pageSize: this.pageSize }} onEdit={this.editNode}  dataSource={list} />
					{showAddDialog ? <NodeFormDialog data={{dataCenterId: this.dataCenterId}} onOk={this.handleAddNode} onCancel={this.cancelAddNode} title="添加节点" /> : ''}
					{editNode ? <NodeFormDialog edit={true} data={editNode}  onOk={this.handleEditNode} onCancel={this.cancelEditNode} title="编辑节点" /> : ''}
				</Card>
			</div>
		)
	}
}

export default connect()(Node)