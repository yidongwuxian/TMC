import React, { Component } from 'react';
import { Modal } from 'antd';
import CreateUserForm  from './create-user-form';
import { addUser } from '../utils/user-api-util';

class CreateDataCenter extends Component {
	constructor(props) {
		super(props);
	}
	onOk = (e) => {
		const { onOk, dispatch } = this.props;
		this.form.validateFields((err, values) => {
			if(!err){
				addUser(dispatch,{
					...values,
					'tenant_name': values.tenant.tenant
				}).done(function(){
					onOk && onOk(values)
				})
			}
		})
	}
	reset() {
		this.form.resetFields();
	}
	saveForm = (form) => {
		this.form = form;
	}
	onCancel = () => {
		const { onCancel } = this.props;
		onCancel && onCancel();
	}
	afterClose = () => {
		this.reset();
	}
	render() {
		const { visible, onCancel }  = this.props;
		return (
			<Modal
				visible = {visible}
				title = '添加用户'
				onOk = {this.onOk}
				onCancel = {this.onCancel}
				afterClose = {this.afterClose}
			>
				<CreateUserForm ref={this.saveForm} />
			</Modal>
		)
	}
}

export default CreateDataCenter;