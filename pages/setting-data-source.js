import React, {Component} from 'react';
import {connect} from 'react-redux';
import AppstoreSetting from '../components/setting-data-source-appstore';
import CodeSetting from '../components/setting-data-source-code';
import { Icon, Breadcrumb } from 'antd';
import config from '../config/config';
import {Link} from 'react-router-dom';



class DataSource extends Component {
	constructor(props){
		super(props);
	}
	componentDidMount(){
		
	}
	componentWillMount(){
		
		
	}
	componentWillUnmount(){

	}
	onSearch = (data) => {
	
	}

	render(){
		return (
			<div className="setting-data-source">	
				<Breadcrumb  separator=">" style={{background:'#fff'}}>
					<Breadcrumb.Item><Icon type="home" />{config.projectName}</Breadcrumb.Item>
				    <Breadcrumb.Item>配置管理</Breadcrumb.Item>
				    <Breadcrumb.Item>环境对接</Breadcrumb.Item>
				</Breadcrumb>
				{0 ? <AppstoreSetting /> : ''}
				<CodeSetting />
			</div>
		)
	}
}

function mapStateToProps(state, props){
	return {
		
	}
}
export default connect(mapStateToProps)(DataSource)