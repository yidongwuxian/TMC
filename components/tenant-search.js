import React, { Component } from 'react';
import {Form, Input, Select, Button, Icon, message } from 'antd';
import { connect } from 'react-redux';
import TenantSelect  from './tenant-select';
import DataCenterSelect from './dataCenter-select';
const Option = Select.Option;
const FormItem = Form.Item;

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tenant: '',
			dataCenterId:''
		}
	}
	shouldComponentUpdate(nextProps, nextState) {
		return true;
	}
	handleSearch = (e) => {
		const { onSearch } = this.props;
		const { tenant, dataCenterId } = this.state;
		onSearch && onSearch(tenant, dataCenterId) 
	}
	onTenantChange = (value) => {
		this.setState({tenant: value.tenant})
	}
	onDataCenterChange = (dataCenterId) => {
		this.setState({dataCenterId: dataCenterId},() => {
			this.handleSearch();
		})

	}
	getData = () => {
		return {
			tenant: this.state.tenant,
			dataCenterId: this.state.dataCenterId
		}
	}
	render() {
		const { tenant } = this.state;
		return (
			<Form layout="inline">
				<FormItem> 
					<TenantSelect style={{width:'180px'}}  placeholder="请输入团队名称进行查询" regionId={this.state.dataCenterId} value={{tenant: tenant}}  onChange={this.onTenantChange} />
				</FormItem>
				<FormItem>
					<DataCenterSelect emptyable={true} onChange={this.onDataCenterChange} />
				</FormItem>
				<FormItem>
					<Button onClick={this.handleSearch} type="primary"><i className={"fa fa-search"} />搜索</Button>
				</FormItem>
			</Form>
		)
	}
}

export default Search;