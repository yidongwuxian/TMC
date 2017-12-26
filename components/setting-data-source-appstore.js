import React, { Component } from 'react';
import {Card, Icon, Radio} from 'antd';
import { Link } from 'react-router-dom';
const RadioGroup = Radio.Group;

class AppstoreSetting extends Component {
	constructor(props) {
		super(props);

	}
	render() {
		return (
			<Card title={<span><Icon type="setting" /> 应用市场</span>} style={{ width: '100%' }}>
				<RadioGroup>
					<Radio value="好雨云市">1好雨云市</Radio>
					<Radio value="内部市场">内部市场</Radio>
				</RadioGroup>
			</Card>
		)
	}
}

export default AppstoreSetting;

