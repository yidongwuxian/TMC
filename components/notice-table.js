import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Icon, Popconfirm, Tag, Button, Modal} from 'antd';
import { delNotice, updateNotice } from '../utils/notice-api-util';
const confirm = Modal.confirm;


class NoticeTable extends Component {

	handleEdit = (data) => {
		const { onEdit } = this.props;
		onEdit && onEdit(data);
	}
	handleDel = (data) => {
		var self = this;
		const { onDel } = this.props;
		confirm({
	    title: '删除确认',
	    content: '确定要删除此公告吗？',
	    onOk() {
	      delNotice(
	      	self.props.dispatch,
	      	data.announcement_id
	      ).done(function(data){
	      	 onDel && onDel(data);
	      })
	    }
	  });
	}
	rowKey(data){
		return data.announcement_id;
	}
	render() {
		const columns = [{
		  title: '内容',
		  dataIndex: 'content'
		}, {
		  title: '链接',
		  dataIndex: 'a_tag_url'
		}, {
		  title: '状态',
		  dataIndex: 'active',
		  render: (data, record, index) => {
		  		return(
		  			<span>
		  				{
		  					data ? '已启用' : '已禁用'
		  				}
		  			</span>
		  		)
		  }
		}, {
		  title: '操作',
		  dataIndex: 'action',
		  render: (data, record, index) => {
		  		return(
		  			<div>
		  				<Button onClick={this.handleEdit.bind(this, record)}>修改</Button>
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

export default NoticeTable;