import React, { Component } from 'react';
import {Form, Input, Select, Button, Icon } from 'antd';
import { connect } from 'react-redux';
import { getAllDataCenter } from '../utils/dataCenter-api-util';
const Option = Select.Option;
const FormItem = Form.Item;

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataCenterId: this.props.value || '',
			dataCenterList:[]
		}
	}
	componentWillReceiveProps(nextProps){

		/* 给自定义表单用 */
		if(nextProps.value && nextProps.value !== this.state.dataCenterId){
			this.setState({dataCenterId:nextProps.value||''})
		}
	}
	componentWillMount(){
		this.loadDataCenter();
	}
	loadDataCenter(){
		getAllDataCenter(this.props.dispatch).done((data) => {
			this.setState({dataCenterList: data.list || []}, () => {
				if(this.state.dataCenterList.length){
					this.dataCenterChange(this.state.dataCenterList[0].region_id)
				}
			});
		})
	}
	dataCenterChange = (value) => {
		this.setState({dataCenterId: value});
		this.props.onChange && this.props.onChange(value);
	}
	render() {
		const { dataCenterList } = this.state;
		return (
			<Select disabled={this.props.disabled} onChange={this.dataCenterChange} style={{ width: this.props.width || 180 }} defaultValue={this.state.dataCenterId} value={this.state.dataCenterId}>
				{
					dataCenterList.map((item, index) => {
						return (
							<Option key={index} value={''+item.region_id}>{item.region_alias}</Option>
						)
					})
				}
			</Select>
		)
	}
}

export default connect(function(state, props) {
	return {
		
	}
})(Search);