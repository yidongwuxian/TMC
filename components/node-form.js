import React, { Component } from 'react';
import { Form, Row, Col, Select, Input, InputNumber, Radio } from 'antd';
import { connect } from 'react-redux';
import ClustersSelect from './clusters-select';
import DataCenterSelect from './dataCenter-select';
import TagSelect from './tag-select';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;


//数据中心节点类型
const nodeType = [{
		value: 'compute',
		text: '计算节点'
	},{
		value: 'manage',
		text: '管理节点'
	}]


class NodeForm extends Component {
	constructor(props) {
		super(props);
	}
	handleDataCenterChange = (value) => {
		this.props.form.setFieldsValue({
			clusterId: {
				clusterId: '',
				dataCenterId: value
			}
		})
	}
	checkPassword = (rule, value, callback) => {
		var visitType = this.props.form.getFieldValue("login_type");
		if (visitType == 'ssh') {
	      callback();
	      return;
	    }

	    if (visitType != 'ssh' && value) {
	      callback();
	      return;
	    }

	    callback('请填写密码!');
	}
	render() {
		const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, getFieldValue,getFieldsValue } = this.props.form;
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
	    const edit = this.props.edit;
	    const visitType = getFieldValue('login_type') || 'ssh';
		return (
			<Form>
				<FormItem
					{...formItemLayout}
					label="所属数据中心"
				>
				    {getFieldDecorator('dataCenterId', {
				    	onChange: this.handleDataCenterChange,
				    	initialValue:'',
		            	rules: [{ required: true, message: '请选择所属数据中心!' }]
		            })(
		            	<DataCenterSelect  disabled={edit? true: false} width='100%' />
		            )}
				</FormItem>
				<FormItem
					{...formItemLayout}
					label="节点类型"
				>
				    {getFieldDecorator('node_type', {
				    	initialValue: "compute",
		            	rules: [{ required: true, message: '请填写类型!' }]
		            })(
		            	<Select multiple>
		            		{
		            			nodeType.map((item) => {
		            				return (
		            					<Option key={item.value} value={item.value}>{item.text}</Option>
		            				)
		            			})
		            		}
		            	</Select>
		            )}
				</FormItem>
				<FormItem
					{...formItemLayout}
					label="IP & SSH端口"
				>
				    {getFieldDecorator('host', {
				    	initialValue:'',
		            	rules: [{ required: true, message: '请输入IP地址和SSH端口!' },{pattern:/^([^0]\d{1,2})\.((\d{1,3})\.){2}\d{1,3}:(\d){1,5}$/, message:'格式不正确'}]
		            })(
		            	<Input disabled={edit? true: false} placeholder="如: 192.168.1.1:22" />
		        )}
		        </FormItem>
		        <FormItem
					{...formItemLayout}
					label="访问方式"
				>
				    {getFieldDecorator('login_type', {
				    	initialValue: "ssh",
		            	rules: [{ required: true, message: '请选择访问方式!' }]
		            })(
		            	<RadioGroup>
			              <Radio value="ssh">SSH免密登录</Radio>
			              <Radio value="root">ROOT密码登录</Radio>
			            </RadioGroup>
		        )}
				</FormItem>
				{
					(
						<FormItem
							style={{display:visitType == 'ssh' ? 'none': ''}}
							{...formItemLayout}
							label="密码"
						>
						    {getFieldDecorator('root_pwd', {
						    	initialValue:'',
				            	rules: [{ validator: this.checkPassword }]
				            })(
				            	<Input type="password" />
				            )}
						</FormItem>
					)
				}
			</Form>
		)
	}
}
const ConnectedNodeForm = Form.create()(NodeForm);
export default ConnectedNodeForm;