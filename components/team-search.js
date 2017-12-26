import React, { Component } from 'react';
import {Form, Input, Select, Button, Icon } from 'antd';
import TenantSelect from './tenant-select';
import { connect } from 'react-redux';

const Option = Select.Option;
const FormItem = Form.Item;

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			team: ''
		}
	}
	handleSearch = (e) => {
		const { onSearch } = this.props;
		onSearch && onSearch(this.state.team) 
	}
	onChange = (value) => {
		this.setState({team: value})
	}
	render() {
		const { team } = this.state;
		return (
			<Form layout="inline" style={{display:'inline-block'}}>
				<FormItem>
					<TenantSelect style={{width:"180"}}  placeholder="请输入团队名称进行查询" onChange={this.onChange} />
				</FormItem>
				<FormItem>
					<Button type="primary" onClick={this.handleSearch} icon="search">搜索</Button>
				</FormItem>
			</Form>
		)
	}
}

export default connect(function(state, props) {
	return {
		
	}
})(Search);