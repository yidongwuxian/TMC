import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import  NodeForm  from './node-form';


class NodeFormDialog extends Component {
	constructor(props){
		super(props);
	}
	componentDidMount(){
		const data = this.props.data;

		if(this.form && data){
			console.log(data)
			this.form.setFieldsValue(data);
		}
	}
	saveForm = (form) => {
		this.form = form;	
	}
	afterClose = () => {
		this.reset();
	}
	reset() {
		this.form.resetFields();
	}
	onOk = () => {
		const { onOk } = this.props;
		this.form.validateFieldsAndScroll({ force: true }, (err, values) => {
			if(!err){

				var labels = values.labels, res={}, arr;
				onOk && onOk(values)
			}
		})
	}
	render(){
		const { onCancel, data, edit } = this.props;
		return (
			<Modal
				style={{top:20}}
				width={650}
				visible = {true}
			    title={this.props.title || 'title'}
				onOk={this.onOk}
				onCancel = {onCancel}

			>
				<NodeForm edit={edit ? true: false} ref={this.saveForm} />
			</Modal>
		)
	}
}

export default connect()(NodeFormDialog);
