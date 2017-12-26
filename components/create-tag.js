import React, { Component } from 'react';
import { Modal, Form, Input, Icon } from 'antd';
import CreateTagForm  from './create-tag-form';
import { addTag } from '../utils/tag-api-util';



class CreateTag extends Component {
	constructor(props) {
		super(props);
	}
	onOk = (e) => {
		const { onOk, dispatch } = this.props;
		this.form.validateFields((err, values) => {
			if(!err){
				addTag(dispatch,values.tag).done(function(){
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
				title = '添加标签'
				onOk = {this.onOk}
				onCancel = {this.onCancel}
				afterClose = {this.afterClose}
			>
				<CreateTagForm  ref={this.saveForm} />
			</Modal>
		)
	}
}

export default CreateTag;