import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Icon, Popconfirm, Tag, Button, Modal} from 'antd';
import { delTag } from '../utils/tag-api-util';
const confirm = Modal.confirm;


class TagTable extends Component {
	handleEdit = (data) => {
		const { onEdit } = this.props;
		onEdit && onEdit(data);
	}
	handleDel = (data) => {
		var self = this;
		const { onDel } = this.props;
		confirm({
	    title: '删除确认',
	    content: '确定要删除此标签吗？',
	    onOk() {
	      delTag(
	      	self.props.dispatch,
	      	data.label_id
	      ).done(function(data){
	      	 onDel && onDel(data);
	      })
	    }
	  });
	}
	rowKey(data){
		return data.label_id;
	}
	render() {
		const columns = [{
		  title: '标签名称',
		  dataIndex: 'label_alias'
		}, {
		  title: '被节点使用次数',
		  dataIndex: 'node_num'
		}, {
		  title: '被应用使用次数',
		  dataIndex: 'service_num'
		}, {
		  title: '操作',
		  dataIndex: 'action',
		  render: (data, record, index) => {
		  		return(
		  			<div>
						<Button onClick={this.handleDel.bind(this, record)}>删除</Button>
		  			</div>
		  		)
		  }
		}];
		const { dataSource, pagination } = this.props;
		return (
			<Table rowKey={this.rowKey} bordered columns={columns} pagination={pagination} dataSource={dataSource} />
		)
	}
}

export default TagTable;