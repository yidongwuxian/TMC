import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Icon, Popconfirm, Tag, Button, Modal} from 'antd';
import { delUser } from '../utils/user-api-util';
const confirm = Modal.confirm;


class UserTable extends Component {
	handleEdit = (data) => {
		const { onEdit } = this.props;
		onEdit && onEdit(data);
	}
	handleDel = (data) => {
		var self = this;
		const { onDel } = this.props;
		confirm({
	    title: '删除确认',
	    content: '确定要删除此用户吗？',
	    onOk() {
	      delUser(
	      	self.props.dispatch,
	      	data.user_id
	      ).done(function(data){
	      	 onDel && onDel(data);
	      })
	      
	    }
	  });
	}
	rowKey(data){
		return data.user_id;
	}
	render() {
		const columns = [{
		  title: '用户名',
		  dataIndex: 'nick_name'
		}, {
		  title: '邮箱',
		  dataIndex: 'email'
		}, {
		  title: '所属团队',
		  dataIndex: 'tenants',
		  width: '50%',
		  render: (text, record, index) => {
		  		return text.map(function(item){
			  		return <Tag style={{cursor:'auto'}} key={item}>{item}</Tag>
			  	})
		  }
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

export default UserTable;