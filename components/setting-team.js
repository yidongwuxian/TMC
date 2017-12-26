import React, { Component } from 'react';
import {Card, Icon, Form, InputNumber, Switch, Button, message} from 'antd';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {openCreateTeam, closeCreateTeam, setTeamNum, getTeamSettingInfo, getRegistInfo} from '../utils/config-api-util';
const FormItem = Form.Item;

class SettingTeam extends Component {
	constructor(props) {
		super(props);
	}
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
			<Card title={<span><Icon type="setting" /> 团队配置</span>} style={{ width: '100%' }}>
				<Form>
					<FormItem>
						<span style={{display:'inline-block', width:100, marginRight: '40px'}}>是否允许创建团队</span> 
						<Switch checked={this.props.checked} onChange={this.props.onCreateTeamChange} />
					</FormItem>
					<FormItem>
						<span style={{display:'inline-block', width:100, marginRight: '40px'}}>创建团队个数</span>
						<InputNumber onChange={this.props.onTeamNumChange} value={this.props.teamNum} min={1} max={10} defaultValue={3} />
						<Button onClick={this.props.setTeamNum} type="primary">确定</Button>
					</FormItem>
				</Form>
			</Card>
		)
	}
}

export default connect((state, props) => {
	return {
		
	}
})(SettingTeam);

