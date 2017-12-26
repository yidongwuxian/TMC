/*
	标签选择组建
*/

import React, { Component } from 'react';
import { Tag } from 'antd';
import { getAllTagList } from '../utils/tag-api-util';


class TagSelect extends Component {
	constructor(props){
		super(props);
		this.state = {
			list:[],
			value:this.props.value || {}
		}
	}
	componentWillMount(){
		getAllTagList().done((data) => {
			this.setState({list: data.list})
		})
	}
	componentWillReceiveProps(nextProps) {
	    if ('value' in nextProps) {
	      const value = nextProps.value;
	      this.setState({value: value});
	    }
	}
	isSelected(item){
		var value = this.state.value || {};
		var isSelected = false;
		for(var k in value){
			if(item.label_name == k){
				return true;
			}
		}
		return isSelected;
	}
	select(item){
		var selected = Object.assign({}, this.state.value);
		selected[item.label_name] = 'selfdefine';
		this.props.onChange && this.props.onChange(selected);
	}
	unSelect(item){
		var selected = Object.assign({}, this.state.value);
		delete selected[item.label_name];
		this.props.onChange && this.props.onChange(selected);
	}
	handleClick(item){
		if(this.isSelected(item)){
			this.unSelect(item);
		}else{
			this.select(item);
		}
	}
	render(){
		const {list} = this.state;
		return (
			<div className={"tag-select"}>
				{list.length 
					? list.map((item) => {
					return <Tag
							onClick = {this.handleClick.bind(this, item)}
							color={this.isSelected(item) ? 'green' : ''}
							>
								{item.label_alias}
							</Tag>
					})
					:
					"暂无标签，请先创建"
				}
			</div>
		)
	}
}

export default TagSelect;