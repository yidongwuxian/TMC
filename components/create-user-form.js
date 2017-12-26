import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Form, Input, Icon} from 'antd';
import {Link} from 'react-router-dom';
import TenantSelect from './tenant-select';

const FormItem = Form.Item;

class CreateUserForm extends Component {
	shouldComponentUpdate(nextProps, nextState){
		return true;
	}
	checkTenant = (rule, value, callback) =>{
		if (value && value.tenant.length>0) {
	      callback();
	      return;
	    }
	    callback('请选择团队');
	}
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
				label="用户名"
				>
					  {getFieldDecorator('user_name', {
			            rules: [{ required: true, message: '请填写用户名!' }]
			          })(
			            <Input placeholder="请填写用户名!" />
			          )}
				</FormItem>
				<FormItem
		         {...formItemLayout}
		         label="密码"
		        >
		          {getFieldDecorator('password', {
		            rules: [{ required: true, message: '请填写密码!' }]
		          })(
		            <Input type="password" placeholder="请填写密码!" />

		          )}
		        </FormItem>
		        <FormItem
				 {...formItemLayout}
		         label="所属团队"
		        >
		          {getFieldDecorator('tenant', {
		            rules: [{ required: true, message: '请选择团队!', validator: this.checkTenant }]
		          })(
		            <TenantSelect placeholder="请输入团队名称进行查询" />
		          )}
		        </FormItem>
				<FormItem
				 {...formItemLayout}
		         label="手机号"
		        >
		          {getFieldDecorator('phone', {
		            rules: [
		            	{ required: true, message: '请填写手机号!' }
		            ]
		          })(
		            <Input type="text" placeholder="请填写手机号!" />
		          )}
		        </FormItem>
		        <FormItem
				 {...formItemLayout}
		         label="邮箱"
		        >
		          {getFieldDecorator('email', {
		            rules: [
		            	{ required: true, message: '请填写邮箱!' },
		            	{ type: 'email', message: '邮箱格式不正确!' }
		            ]
		          })(
		            <Input type="text" placeholder="请填写邮箱!" />
		          )}
		        </FormItem>
			</Form>
		)
	}
}

const createUserForm = Form.create()(CreateUserForm);


export default createUserForm