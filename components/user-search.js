import React, { Component } from 'react';
import {Form, Input, Select, Button, Icon } from 'antd';
import { connect } from 'react-redux';
import TenantSelect  from './tenant-select';
const Option = Select.Option;
const FormItem = Form.Item;

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tenant: ''
		}
	}
	shouldComponentUpdate(nextProps, nextState) {

		const keyword  = this.state.keyword;
		const stateNodeType = this.state.nodeType;
		const nextKeyword = nextState.keyword;
		const nextStateNodeType = nextState.nodeType;

		const nodeType = this.props.nodeType;
		const nextNodeType = nextProps.nodeType;
		if(nodeType === nextNodeType && keyword === nextKeyword && stateNodeType === nextStateNodeType){
			return false;
		}

		return true;
	}
	handleSearch = (e) => {
		const { onSearch } = this.props;
		onSearch && onSearch(this.state.tenant) 
	}
	getData = () => {
		return this.state.tenant;
	}
	onChange = (value) => {

		this.setState({tenant: value.tenant})
	}
	keywordChange = (e) => {
		this.setState({keyword: e.target.value})
	}
	render() {
		const { tenant } = this.state;
		return (
			<Form layout="inline" style={{display:'inline-block'}}>
				<FormItem>
					<TenantSelect style={{width:'180px'}}  placeholder="请输入团队名称进行查询" value={{tenant: tenant}}  onChange={this.onChange} />
				</FormItem>
				<FormItem>
					<Button type="primary" onClick={this.handleSearch}><i className={"fa fa-search"} />搜索</Button>
				</FormItem>
			</Form>
		)
	}
}

export default Search;