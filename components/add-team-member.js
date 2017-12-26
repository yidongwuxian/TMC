import React, {Component} from 'react';
import {connect} from 'react-redux';
import {message, Modal} from 'antd';
import {Link} from 'react-router-dom';
import TeamUserForm from '../components/team-user-form';
import { addTeamMember } from '../utils/team-api-util';

class AddTeamMember extends Component{
	handleOk = () => {
		this.form.validateFields((err, values) => {
			if(!err){
				addTeamMember(
					this.props.dispatch,
					this.props.tenantName,
					values.userName
				).done((data) => {
					message.success('操作成功');
					this.props.onOk && this.props.onOk(data);
				})
			}
		})
	}
	saveForm = (form) => {
		this.form = form;
	}
	render(){

		return <Modal
			title="添加成员"
			visible = {true}
			onOk={this.handleOk}
			onCancel = {this.props.onCancel}
		>
			<TeamUserForm ref={this.saveForm}  />
		</Modal>
	}
}

export default connect()(AddTeamMember)