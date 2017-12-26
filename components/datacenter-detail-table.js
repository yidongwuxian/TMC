import React, { Component } from 'react';
import { Table, Icon, Popconfirm} from 'antd';

class DataCenterTable extends Component {
	render() {
		const columns = [{
		  title: '主机名',
		  dataIndex: 'name'
		}, {
		  title: 'IP',
		  dataIndex: 'ip',
		}, {
		  title: 'cpu',
		  dataIndex: 'cpu',
		}, {
		  title: '节点类型',
		  dataIndex: 'type',
		}, {
			title: '操作系统',
			dataIndex: 'caozuo'
		}, {
			title: '总内存',
			dataIndex: 'disk'
		}, {
			title: '剩余内存',
			dataIndex: 'disk2'
		}];
		const { dataSource } = this.props;
		return (
			<Table columns={columns} dataSource={dataSource} />
		)
	}
}

export default DataCenterTable;