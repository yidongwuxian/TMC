import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Form, Input, Icon} from 'antd';
import {Link} from 'react-router-dom';
const FormItem = Form.Item;

class GitLabForm extends Component {
	shouldComponentUpdate(nextProps, nextState){
		return true;
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
	    const disabled = !!this.props.disabled;
		return (
			
			<Form>
				<FormItem
				{...formItemLayout}
				label="仓库地址"
				>
					  {getFieldDecorator('url', {
			            rules: [{ required: true, message: '请填写仓库地址!' }]
			          })(
			            <Input readOnly={disabled} placeholder="请填写仓库地址" />
			          )}
				</FormItem>
				<FormItem
				 {...formItemLayout}
		         label="管理员账号"
		        >
		          {getFieldDecorator('admin_user', {
		            rules: [{ required: true, message: '请填写管理员账号!' }]
		          })(
		            <Input readOnly={disabled} type="text" placeholder="请填写管理员账号" />
		          )}
		        </FormItem>
				<FormItem
				 {...formItemLayout}
		         label="管理员密码"
		        >
		          {getFieldDecorator('admin_password', {
		            rules: [{ required: true, message: '请填写管理员密码!' }]
		          })(
		            <Input  readOnly={disabled} type="password" placeholder="请填写管理员密码" />
		          )}
		        </FormItem>
		        <FormItem
				 {...formItemLayout}
		         label="管理员邮箱"
		        >
		          {getFieldDecorator('admin_email', {
		            rules: [{ required: true, message: '请填写管理员邮箱' },{ type: 'email', message: '邮箱格式不正确' }]
		          })(
		            <Input  readOnly={disabled} type="email" placeholder="请填写管理员邮箱" />
		          )}
		        </FormItem>
		        <FormItem
				 {...formItemLayout}
		         label="Hook地址"
		        >
		          {getFieldDecorator('hook_url', {
		            rules: [{ required: true, message: '请填写Hook地址' }]
		          })(
		            <Input readOnly={disabled} type="text" placeholder="请填写Hook地址" />
		          )}
		        </FormItem>
			</Form>
		)
	}
}

const connectedGitLabForm = Form.create()(GitLabForm);


export default connectedGitLabForm