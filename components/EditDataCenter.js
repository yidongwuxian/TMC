import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import DataCenterForm  from './dataCenterForm';
import { getDataCenterById, editDataCenter } from '../utils/dataCenter-api-util';

class EditDataCenter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id:''
		}

	}
	componentwillreceiveprops(nextProps, nextState) {
		
	}
	componentDidMount() {
	   
	}
	componentWillMount() {
		var  self = this;
		const { id, dispatch } = this.props;
		if(id){
			getDataCenterById(
				id,
				dispatch
			).done(function(data){
				self.form.setFieldsValue(data.bean)
			})
			
		}
	}
	onOk = (e) => {
		const { onOk, dispatch } = this.props;
		this.form.validateFields((err, values) => {

			if(!err){
				values.region_id = this.props.id;
				editDataCenter(
					values,
					dispatch
				).done(function(data){
					onOk && onOk(values)
				})
				
			}
		})
	}
	reset = () => {
		this.form.resetFields();
	}
	saveForm = (form) => {
		this.form = form;
	}
	render() {
		const { id }  = this.props;
		return (
			<Modal
				visible = {!!id}
				title = '编辑'
				onOk = {this.onOk}
				onCancel = {this.props.onCancel}
				afterClose = {this.reset}
			>
				<DataCenterForm ref={this.saveForm} />
			</Modal>
		)
	}
}

export default connect()(EditDataCenter);