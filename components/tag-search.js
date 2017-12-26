import React, { Component } from 'react';
import {Form, Input, Select, Button, Icon } from 'antd';
import { connect } from 'react-redux';
const Option = Select.Option;
const FormItem = Form.Item;

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tag: ''
		}
	}
	handleSearch = (e) => {
		const { onSearch } = this.props;
		onSearch && onSearch(this.state.tag) 
	}
	handleClear = (e) => {
		const { onSearch } = this.props;
		this.state.tag = '';
		this.forceUpdate();
		onSearch && onSearch('');

	}
	getData = () => {
		return this.state.tag;
	}
	onChange = (e) => {
		this.setState({tag: e.target.value})
	}

	render() {
		const { tag } = this.state;
		return (
			<Form layout="inline" style={{display:'inline-block'}}>
				<FormItem>
					<Input suffix={<i onClick={this.handleClear} style={{display: tag ? 'inline-block' : 'none'}} className={'fa fa-close'}  />} style={{width:'180px'}}  placeholder="请输入标签名称" value={tag}  onChange={this.onChange} />
				</FormItem>
				<FormItem>
					<Button type="primary" onClick={this.handleSearch}><i className={"fa fa-search"} />搜索</Button>
				</FormItem>
			</Form>
		)
	}
}

export default Search;