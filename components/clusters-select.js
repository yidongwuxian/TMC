import React, { Component } from 'react';
import {Form, Input, Select, Button, Icon } from 'antd';
import { connect } from 'react-redux';
import { loadAllClusters, loadClustersById } from '../utils/dataCenter-api-util';
const Option = Select.Option;
const FormItem = Form.Item;

class ClusterSelect extends Component {
	constructor(props) {
		super(props);
		var value = this.props.value || {};
		this.state = {
			clusterId: value.clusterId||'',
			dataCenterId: value.dataCenterId || '',
			list:[]
		}
	}
	componentWillReceiveProps(nextProps){
		var value = nextProps.value || {};
		
		if(value.dataCenterId !== this.state.dataCenterId) {
			this.loadList(value.dataCenterId);
		}

		if(value.dataCenterId !== this.state.dataCenterId || value.clusterId !== this.state.clusterId) {
			this.setState({clusterId:value.clusterId||'', dataCenterId: value.dataCenterId || ''});
		}

	}
	componentWillMount(){
		var id = this.state.dataCenterId;
		this.loadList(id);
	}

	loadList(id){
		if(id){
			loadClustersById(id, this.props.dispatch).done((data) => {
				this.setState({list: data.list || []});
			})
		}else{
			loadAllClusters(this.props.dispatch).done((data) => {
				this.setState({list: data.list || []});
			})
		}
	}
	onChange = (value) => {
		const changedValue = {clusterId: value, dataCenterId: this.state.dataCenterId};
		this.setState(changedValue);
		this.props.onChange && this.props.onChange(changedValue);
	}
	render() {
		const { list } = this.state;
		return (
			<Select disabled={this.props.disabled} onChange={this.onChange} style={{ width: this.props.width || 180 }} defaultValue={this.state.clusterId} value={this.state.clusterId}>
				<Option key=" " value="">请选择集群</Option>
				{
					list.map((item, index) => {
						return (
							<Option key={index} value={''+item.cluster_id}>{item.cluster_alias}</Option>
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
})(ClusterSelect);