import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Form, Input, Icon} from 'antd';
import {Link} from 'react-router-dom';
const FormItem = Form.Item;

class GitHubForm extends Component {
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
				label="客户端ID"
				>
					  {getFieldDecorator('client_id', {
			            rules: [{ required: true, message: '请填写客户端ID!' }]
			          })(
			            <Input readOnly={disabled} placeholder="请填写客户端ID" />
			          )}
				</FormItem>
				<FormItem
				 {...formItemLayout}
		         label="客户端密匙"
		        >
		          {getFieldDecorator('client_secret', {
		            rules: [{ required: true, message: '请填写客户端密匙!' }]
		          })(
		            <Input readOnly={disabled} type="text" placeholder="请填写客户端密匙" />
		          )}
		        </FormItem>
				<FormItem
				 {...formItemLayout}
		         label="重定向地址"
		        >
		          {getFieldDecorator('redirect_uri', {
		            rules: [{ required: true, message: '请填写重定向地址!' }]
		          })(
		            <Input readOnly={disabled} type="text" placeholder="请填写重定向地址" />
		          )}
		        </FormItem>
			</Form>
		)
	}
}

const connectedGitHubForm = Form.create()(GitHubForm);


export default connectedGitHubForm