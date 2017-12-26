import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Form, Input, Icon} from 'antd';
import {Link} from 'react-router-dom';
import TeamUserSelect from './team-user-select';

const FormItem = Form.Item;
class TeamUserForm extends Component {
	render(){
		const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, getFieldValue } = this.props.form;
		const formItemLayout = {
	      labelCol: {
	        xs: { span: 24 },
	        sm: { span: 4 }
	      },
	      wrapperCol: {
	        xs: { span: 24 },
	        sm: { span: 18 }
	      }
	    };
		return (
			<Form>
				<FormItem
				{...formItemLayout}
				label="用户名称"
				>
					  {getFieldDecorator('userName', {

			            rules: [{ required: true, message: '请输入用户名称!' }]
			          })(
			            <TeamUserSelect placeholder="请输入用户名称" />
			          )}
				</FormItem>
			</Form>
		)
	}
}

const teamUserForm = Form.create()(TeamUserForm);


export default teamUserForm