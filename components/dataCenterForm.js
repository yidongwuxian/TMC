import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Form, Input, Icon} from 'antd';
import {Link} from 'react-router-dom';
const FormItem = Form.Item;

class delSomething extends Component {
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
		return (
			<Form>
				<FormItem
				{...formItemLayout}
				label="名称"
				>
					  {getFieldDecorator('region_alias', {
			            rules: [{ required: true, message: '请填写名称!' }]
			          })(
			            <Input placeholder="请填写名称!" />
			          )}
				</FormItem>
				<FormItem
				 {...formItemLayout}
		         label="标识"
		        >
		          {getFieldDecorator('region_name', {
		            rules: [{ required: true, message: '请填写标识!' }, {pattern: '^[a-zA-Z-]+$', message: '只允许输入大小写英文及-'}]
		          })(
		            <Input type="text" placeholder="只允许输入大小写英文及-" />
		          )}
		        </FormItem>
				<FormItem
				 {...formItemLayout}
		         label="URL"
		        >
		          {getFieldDecorator('url', {
		            rules: [{ required: true, message: '请填写url!' }]
		          })(
		            <Input type="text" placeholder="请填写url!" />
		          )}
		        </FormItem>
		        <FormItem
		         {...formItemLayout}
		         label="Token"
		        >
		          {getFieldDecorator('token', {
		            rules: [{ required: false, message: '请填写token!' }]
		          })(
		            <Input placeholder="请填写token!" />

		          )}
		        </FormItem>
			</Form>
		)
	}
}

const editSomeForm = Form.create()(delSomething);


export default editSomeForm