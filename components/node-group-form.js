import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Form, Input, Icon, Switch} from 'antd';
import {Link} from 'react-router-dom';
const FormItem = Form.Item;

class NodeGroupFrom extends Component {
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
					  {getFieldDecorator('name', {
			            rules: [{ required: true, message: '请填写名称!' }]
			          })(
			            <Input placeholder="请填写名称!" />
			          )}
				</FormItem>
				<FormItem
				 {...formItemLayout}
		         label="别名"
		        >
		          {getFieldDecorator('alias', {
		            rules: [{ required: true, message: '请填写表明!' }]
		          })(
		            <Input type="text" placeholder="请填写别名" />
		          )}
		        </FormItem>
		        <FormItem
		         {...formItemLayout}
		         label="是否开启"
		        >
		          {getFieldDecorator('start', {
		            rules: []
		          })(
		            <Switch defaultChecked={false} />,

		          )}
		        </FormItem>
			</Form>
		)
	}
}

const editSomeForm = Form.create()(NodeGroupFrom);


export default editSomeForm