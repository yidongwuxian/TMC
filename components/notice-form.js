import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Form, Input, Switch} from 'antd';
import {Link} from 'react-router-dom';
import TenantSelect from './tenant-select';
const FormItem = Form.Item;

class NoticeForm extends Component {
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
				style={{display:'none'}}
				{...formItemLayout}
				label="id"
				>
					  {getFieldDecorator('announcement_id', {
			            rules: [{ required: false }]
			          })(
			            <Input  />
			          )}
				</FormItem>
				<FormItem
				{...formItemLayout}
				label="公告内容"
				>
					  {getFieldDecorator('content', {
			            rules: [{ required: true, message: '请填写公告内容!' }]
			          })(
			            <Input type="textarea" placeholder="请填写要发布的公告内容" />
			          )}
				</FormItem>
				<FormItem
				{...formItemLayout}
				label="公告链接"
				>
					  {getFieldDecorator('a_tag_url', {
			            rules: [{ required: false }]
			          })(
			            <Input placeholder="选填" />
			          )}
				</FormItem>
				<FormItem
				{...formItemLayout}
				label="是否启用"
				>
					  {getFieldDecorator('active', {valuePropName: 'checked', initialValue: true})(
			             <Switch />
			          )}
				</FormItem>
			</Form>
		)
	}
}

const noticeForm = Form.create()(NoticeForm);


export default noticeForm