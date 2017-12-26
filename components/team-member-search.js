import React, { Component } from 'react';
import {Form, Input, Select, Button, Icon, message } from 'antd';
import { connect } from 'react-redux';
import TeamUserSelect  from './team-user-select';
import DataCenterSelect from './dataCenter-select';

const Option = Select.Option;
const FormItem = Form.Item;

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user:''
		}
	}
	handleSearch = (e) => {
		const { onSearch } = this.props;
		onSearch && onSearch(this.state.user) 
	}
	onChange = (value) => {
		this.setState({user: value})
	}
	getData = () => {
		return this.state.user
	}
	render() {
		return (
			<Form layout="inline" style={{display:'inline-block'}}>
				<FormItem>
					<TeamUserSelect tenantName={this.props.tenantName}  style={{width:'180px'}} onChange={this.onChange} placeholder="请输入用户名称进行查询" />
				</FormItem>
				<FormItem>
					<Button onClick={this.handleSearch} type="primary"><i className={"fa fa-search"} />搜索</Button>
				</FormItem>
			</Form>
		)
	}
}

export default Search;