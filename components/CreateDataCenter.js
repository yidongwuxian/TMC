import React, { Component } from 'react';
import { Modal } from 'antd';
import DataCenterForm  from './dataCenterForm';
import { addDataCenter }  from '../utils/dataCenter-api-util';

class CreateDataCenter extends Component {
	constructor(props) {
		super(props);
	}
	onOk = (e) => {
		const { onOk, dispatch } = this.props;
		this.form.validateFields((err, values) => {
			if(!err){
				addDataCenter(
					values,
					dispatch
				).done(function(data){
					onOk && onOk(values);
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
				title = '添加'
				onOk = {this.onOk}
				onCancel = {this.onCancel}
				afterClose = {this.afterClose}
			>
				<DataCenterForm ref={this.saveForm} />
			</Modal>
		)
	}
}

export default CreateDataCenter;