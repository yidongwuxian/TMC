import React, { Component } from 'react';
import {Form, Input, Select, Button, Icon } from 'antd';
import { connect } from 'react-redux';
const Option = Select.Option;
const FormItem = Form.Item;

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			keyword: '',
			nodeType: ' '
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
		onSearch && onSearch(Object.assign({}, this.state)) 
	}
	nodeTypeChange = (value) => {
		this.setState({nodeType: value})
	}
	keywordChange = (e) => {
		this.setState({keyword: e.target.value})
	}
	render() {
		const { nodeType } = this.props;
		return (
			<Form layout="inline">
				<FormItem>
					<Input onChange={this.keywordChange} value={this.state.keyword} placeholder="请输入主机名" />
				</FormItem>
				<FormItem>
				<Select onChange={this.nodeTypeChange} style={{ width: 150 }} defaultValue=" " value={this.state.nodeType}>
					<Option key=" " value=" ">请选择节点类型</Option>
					{
						nodeType.map((item, index) => {
							return (
								<Option key={index} value={item.value}>{item.text}</Option>
							)
						})
					}
				</Select>
				</FormItem>
				<FormItem>
					<Button onClick={this.props.onSearch} type="primary" icon="search">搜索</Button>
				</FormItem>
			</Form>
		)
	}
}

export default connect(function(state, props) {
	return {
		nodeType: state.nodeType||[]
	}
})(Search);