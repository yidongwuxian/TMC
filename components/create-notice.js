import React, { Component } from 'react';
import { Modal, Form, Input, Icon } from 'antd';
import NoticeForm  from './notice-form';
import { addNotice, updateNotice} from '../utils/notice-api-util';



class CreateTag extends Component {
	constructor(props) {
		super(props);
	}
	onOk = (e) => {
		const { onOk, dispatch, data } = this.props;

		this.form.validateFields((err, values) => {
			if(!err){
				if(data){
					updateNotice(dispatch, values).done(function(){
						onOk && onOk(values)
					})
				}else{
					addNotice(dispatch,values).done(function(){
						onOk && onOk(values)
					})
				}
				
			}
		})
	}
	reset() {
		this.form.resetFields();
	}
	saveForm = (form) => {
		this.form = form;
		if(this.form && this.props.data){
			this.form.setFieldsValue(this.props.data);
		}
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
				title = '添加公告'
				onOk = {this.onOk}
				onCancel = {this.onCancel}
				afterClose = {this.afterClose}
			>
				<NoticeForm  ref={this.saveForm} />
			</Modal>
		)
	}
}

export default CreateTag;