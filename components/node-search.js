import React, { Component } from 'react';
import {Form, Input, Select, Button, Icon, message } from 'antd';
import { connect } from 'react-redux';
import ClusterSelect from './clusters-select';
import DataCenterSelect from './dataCenter-select';
const Option = Select.Option;
const FormItem = Form.Item;

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataCenterId:this.props.dataCenterId || '',
			clusterId:this.props.clusterId || ''
		}
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.dataCenterId != this.state.dataCenterId){
			this.setState({dataCenterId:nextProps.dataCenterId, clusterId: ''});
		}

		if(nextProps.clusterId != this.state.clusterId){
			this.setState({clusterId:nextProps.clusterId})
		}
	}
	handleSearch = (e) => {
		const onSearch = this.props.onSearch;

		if(!this.state.dataCenterId){
			message.warning('请选择所属数据中心');
			return;
		}

		// if(this.state.dataCenterId && !this.state.clusterId){
		// 	message.warning('请选择所属集群');
		// 	return;
		// }
		onSearch && onSearch(this.state.dataCenterId, this.state.clusterId) 
	}
	onDataCenterChange = (value) => {

		this.setState({dataCenterId: value, clusterId: ''});
	}
	onClusterChange = (value) => {
		this.setState(value)
	}
	getData = () => {
		return {
			dataCenterId:this.state.dataCenterId,
			clusterId:this.state.clusterId
		}
	}
	render() {
		return (
			<Form layout="inline" style={{display:'inline-block'}}>
				<FormItem>
					<DataCenterSelect value={this.state.dataCenterId} style={{width: 180}} onChange={this.onDataCenterChange} />
				</FormItem>
				<FormItem>
					<Button onClick={this.handleSearch} type="primary"><i className={"fa fa-search"} />搜索</Button>
				</FormItem>
			</Form>
		)
	}
}

export default Search;