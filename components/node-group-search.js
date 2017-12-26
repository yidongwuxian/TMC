import React, { Component } from 'react';
import {Form, Input, Select, Button, Icon } from 'antd';
import { connect } from 'react-redux';
import DataCenterSelect from './dataCenter-select';
const Option = Select.Option;
const FormItem = Form.Item;

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataCenterId: ''
		}
	}
	componentWillMount(){
		var dataCenterId = this.props.dataCenterId;
		if(dataCenterId){
			this.setState({dataCenterId: dataCenterId});
		}
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.dataCenterId != this.state.dataCenterId){
			this.setState({dataCenterId:nextProps.dataCenterId});
		}
	}
	handleSearch = (e) => {
		const { onSearch } = this.props;
		onSearch && onSearch(this.state.dataCenterId) 
	}
	dataCenterChange = (value) => {
		this.setState({dataCenterId: value})
	}
	getData = () => {
		return this.state.dataCenterId
	}
	render() {
		const { dataCenterList } = this.props;
		return (
			<Form layout="inline">
				<FormItem>
					<DataCenterSelect value={this.state.dataCenterId || ''} onChange={this.dataCenterChange} />
				</FormItem>
				<FormItem>
					<Button onClick={this.handleSearch} type="primary"><i className={"fa fa-search"} />搜索</Button>
				</FormItem>
			</Form>
		)
	}
}

export default connect(function(state, props) {
	return {
		dataCenterList: state.dataCenterList||[]
	}
})(Search);