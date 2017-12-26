import React, { Component } from 'react';
import {Card, Icon, Form, Switch} from 'antd';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {getRegistInfo, openRegist, closeRegist} from '../utils/config-api-util';

const FormItem = Form.Item;

class SettingRegister extends Component {
	render() {
		const { codeList } = this.props || [];
		const formItemLayout = {
	      labelCol: {
	        xs: { span: 24 },
	        sm: { span: 6 }
	      },
	      wrapperCol: {
	        xs: { span: 24 },
	        sm: { span: 14 }
	      }
	    };
		return (
			<Card title={<span><Icon type="setting" /> 注册配置</span>} style={{ width: '100%' }}>
				<Form>
					<FormItem>
						<span style={{display:'inline-block', width:100, marginRight: '40px'}}>是否开放用户注册</span> 
						<Switch checked={this.props.checked} onChange={this.props.onChange}  />
					</FormItem>
				</Form>
			</Card>
		)
	}
}

export default connect((state, props) => {
	return {
		
	}
})(SettingRegister);

