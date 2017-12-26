import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Input, Icon, Button} from 'antd';
import GitlabForm from './gitlab-form';
const FormItem = Form.Item;

class GitlabDialog extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		const { data } = this.props;
	}
	onOk = (e) => {
		const { onOk } = this.props;
		this.form.validateFields((err, values) => {
			if(!err){
				onOk && onOk(values)
			}
		})
	}
	reset = () => {
		this.form.resetFields();
	}
	saveForm = (form) => {
		this.form = form;
		var data = this.props.data;
		if(data && this.form) {
			this.form.setFieldsValue(data)
		}
	}
	render() {
	    const { data, disabled } = this.props;
	    const footer = disabled ? [
				            <Button key="back" onClick={this.props.onCancel}>关闭</Button>
				          ] :

				          [
				            <Button key="back" onClick={this.props.onCancel}>取消</Button>,
				            <Button key="submit" type="primary" onClick={this.onOk}>
				              确定
				            </Button>
				          ]

		return (
			<Modal
				width={560}
				visible = {true}
				title = {this.props.title || ''}
				onOk = {this.onOk}
				onCancel = {this.props.onCancel}
				afterClose = {this.reset}
				footer={footer}
			>
				<GitlabForm disabled={disabled} ref={this.saveForm} />
			</Modal>
		)
	}
}



export default connect()(GitlabDialog);