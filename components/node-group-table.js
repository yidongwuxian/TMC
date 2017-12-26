
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Icon, Popconfirm} from 'antd';


/*
	集群列表
*/
class NodeGroupTable extends Component {

	handleDelete = (data) => {
		const { handleDel } = this.props;
		handleDel && handleDel(data);
	}
	handleEdit = (data) => {
		const { handleEdit } = this.props;
		handleEdit && handleEdit(data);
	}
	render() {
		const columns = [{
		  title: '集群名称',
		  dataIndex: 'cluster_alias',
		  key: 'cluster_alias',
		  render: (text, data) => {
		  	return (
		  		data.status === 'failure' ? text : <Link to={'/resources/'+ data.region_id + '/' + data.region_alias+ '/node'}>{text}</Link>
		  	)
		  }
		},{
			title: '所属数据中心',
			dataIndex: 'region_alias',
			key:'region_alias'
		}, {
		  title: '节点数量',
		  dataIndex: 'node_num',
		  ley:'node_num'
		}];
		const { dataSource } = this.props;
		return (
			<Table columns={columns} dataSource={dataSource} />
		)
	}
}

export default NodeGroupTable;