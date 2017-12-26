import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Form, Input, Icon} from 'antd';
import {Link} from 'react-router-dom';
import TenantSelect from './tenant-select';
const FormItem = Form.Item;

class CreateTagForm extends Component {
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
				label="标签名称"
				>
					  {getFieldDecorator('tag', {
			            rules: [{ required: true, message: '请填写标签名称!' }]
			          })(
			            <Input placeholder="请填写标签名称" />
			          )}
				</FormItem>
			</Form>
		)
	}
}

const createTagForm = Form.create()(CreateTagForm);


export default createTagForm