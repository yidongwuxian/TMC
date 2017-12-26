import React, { Component } from 'react';
import { Table, Icon, Popconfirm, Button} from 'antd';
import { onLineNode, offLineNode } from '../utils/dataCenter-api-util';
import { Link } from 'react-router-dom';

//数据中心节点类型
const nodeTypeMap = {
	compute: '计算节点',
	manage: '管理节点',
	storage: '存储节点'
}


class NodeTable extends Component {
	onEdit = (data) => {
		this.props.onEdit(data)
	}
	onOnline = (data) => {
		var uuid = data['uuid'];
		var dataCenterId = data['region_id'];
		var clusterId  = data['cluster_id'];
		onLineNode(
			this.props.dispatch,
			dataCenterId,
			clusterId,
			uuid
		).done(() => {
			this.props.onReloadList();
		})

	}
	onOffline = (data) => {
		var uuid = data['uuid'];
		var dataCenterId = data['region_id'];
		var clusterId  = data['cluster_id'];
		offLineNode(
			this.props.dispatch,
			dataCenterId,
			clusterId,
			uuid
		).done(() => {
			this.props.onReloadList();
		})
	}
	onEditUnschedul = (data, able) => {
		this.props.onEditUnschedul(data, able);
	}
	onRemove = (data) => {
		this.props.onRemove(data);
	}
	renderHost(text, data){
		if(data.status == 'installing' || data.status == 'failed'){
			return (<Link to={'/resources/'+ data.region_id + '/' + data.internal_ip+ '/node-install'}>{text}</Link>)
		}else{
			return (data.status !== 'offline' && data.uuid)
		  			?
		  			<Link to={'/resources/'+ data.region_id + '/' + data.region_alias+ '/' + data.cluster_id + '/node/'+ data.uuid}>{text}</Link>
		  			:
		  			text
		}
	}
	render() {
		const columns = [{
		  title: '主机名',
		  dataIndex: 'host_name',
		  render: (text, data) => {
		  		return this.renderHost(text, data)
		  }
		},{
		  title: '所属数据中心',
		  dataIndex: 'region_alias'
		}, {
		  title: '内网IP',
		  dataIndex: 'internal_ip'
		}, {
		  title: '外网IP',
		  dataIndex: 'external_ip'
		}, {
		  title: 'cpu',
		  dataIndex: 'available_cpu',
			render:(text,data) => {
				return text + '核'
			}
		}, {
		  title: '类型',
		  dataIndex: 'role',
		  render: (text, data) => {
		  	var text = text || [];
		  	var res = [];
		  	for(var i=0;i<text.length;i++){
		  		var txt = nodeTypeMap[text[i]];
		  		if(txt){
		  			res.push(txt)
		  		}
		  	}
		  	return res.join(',');
		  }	
		},{
			title: '总内存',
			dataIndex: 'available_memory',
			render: (text,data) => {
				return (text/1024/1024/1024).toFixed(2) + 'G'
			}
		},{
			title: '状态',
			dataIndex: 'status_cn'
		},{
			title: '操作',
			dataIndex: 'action',
			render: (text, data) => {
				return (
					<div >
						<Popconfirm onConfirm={this.onRemove.bind(this, data)} title="你确定要删除此节点吗？" okText="确定" cancelText="取消">
						      <Button href="javascript:;">删除 </Button>
						</Popconfirm>
						<span  style={{display: (data.status != 'failed' && data.status != 'installing') ? '' : 'none'}}>
						{
							data.status === 'offline' ?
							<Button  style={{display: data.status == 'installing' ? 'none' : ''}} onClick={this.onOnline.bind(this, data, false)}>上线</Button>
							:
							<Popconfirm onConfirm={this.onOffline.bind(this, data, false)} title="你确定要下线此节点吗？" okText="确定" cancelText="取消">
								<Button>下线</Button>
							</Popconfirm>
						}
						{
							(data.status !== 'offline' && !data.unschedulable) ? 
							<Button style={{display: data.status == 'installing' ? 'none' : ''}} onClick={this.onEditUnschedul.bind(this, data, false)}>设为不可调度</Button>
							: ''
						}
						{
							(data.status !== 'offline' && data.unschedulable) ?
							<Button style={{display: data.status == 'installing' ? 'none' : ''}} onClick={this.onEditUnschedul.bind(this, data, true)}>设为可调度</Button>
							:
							''
						}
						</span>
					</div>
				)
			}
		}];

		const { dataSource } = this.props;
		return (
			<Table pagination={this.props.pagination || {}} columns={columns} dataSource={dataSource} />
		)
	}
}

export default NodeTable;