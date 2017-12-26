import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Icon, Popconfirm} from 'antd';
import config from '../config/config';


class TenantTable extends Component {
	handleEdit = (data) => {
		const { onEdit } = this.props;
		onEdit && onEdit(data);
	}
	render() {
		const console_url = this.props.console_url || '';
		const columns = [
		{
		  title: '团队名称',
		  dataIndex: 'tenant_name',
		  render: (text, data) => {
		  	  return <a target="_blank" href={console_url+"/apps/"+text+"/?region="+ data['region_name']}>{text}</a>
		  }
		}, 
		{
		  title: '数据中心',
		  dataIndex: 'region_alias'
		},
		{
			title: '分配内存',
		    key: '分配内存',
		    dataIndex:'allocate_memory',
		    render:(text, data) => {
		    	return text+'M'
		    }
		},
		{
			title: '实际使用内存',
		    key: '实际内存',
		    dataIndex:'total_memory',
		    render:(text, data) => {
		    	return text+'M'
		    }
		},
		{
			title: '分配CPU',
		    key: '分配CPU',
		    dataIndex:'allocate_cpu',
		    render:(text, data) => {
		    	return text+'核'
		    }
		},
		{
			title: '实际使用CPU',
		    key: '实际使用CPU',
		    dataIndex:'used_cpu',
		    render:(text, data) => {
		    	return text+'核'
		    }
		}
		];
		const { dataSource } = this.props;
		console.log(this.props.pagination)
		return (
			<Table pagination={this.props.pagination || {}} bordered columns={columns} dataSource={dataSource} />
		)
	}
}

export default TenantTable;