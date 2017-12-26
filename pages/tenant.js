import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Table, message, Modal, Button, Row, Col, Card, Breadcrumb, Icon} from 'antd';
import {Link} from 'react-router-dom';
import TenantTable from '../components/tenant-table';
import Search from '../components/tenant-search';
import { getAllTenantInfoList, getTenantList } from '../utils/tenant-api-util';
import config from '../config/config';

class Tenant extends Component {
	constructor(props){
		super(props);
		this.state = {
			tenant:'',
			dataSource: []
		}
		this.pageNumber = 1;
		this.pageSize = 50;
		this.total = 0;

	}
	componentDidMount(){
		//this.loadList();
	}
	componentWillMount(){
		
	}
	componentWillUnmount(){

	}
	loadList(){
		var searchData = this.search.getData();
		getTenantList(
			this.props.dispatch,
			searchData.tenant||'',
			searchData.dataCenterId||'',
			this.pageNumber,
			this.pageSize
		).done((data) => {
			this.total = data.total;
			this.pageSize = data.page_size;
			this.setState({dataSource: data.list||[]})
		})
	}
	reloadList(){
		this.pageNumber = 1;
		this.loadList();
	}

	onSearch = () => {
		this.reloadList();
	}
	handleAdd = () => {
		this.setState({showAdd: true})
	}
	handleCancel = () => {
		this.setState({showAdd: false})
	}
	onPageChange = (pageNumber, pageSize) => {
		this.pageNumber = pageNumber;
		this.loadList();
	}
	saveSearch = (search) => {
		this.search = search;
	}
	showTotal = (total, range) => {
		return range[0]+'-'+range[1]+'条／共'+ total + '条';
	}
	render(){
		const { dataSource } = this.state;
		const { showAdd } = this.state;
		console.log(this.pageNumber)
		return (
			<div>
				<Breadcrumb  separator=">" style={{background:'#fff'}}>
					<Breadcrumb.Item><Icon type="home" />{config.projectName}</Breadcrumb.Item>
				    <Breadcrumb.Item>租户管理</Breadcrumb.Item>
				</Breadcrumb>
				<Card className="ant-card-main" title={<Search ref={this.saveSearch} onSearch={this.onSearch} />}>
					<TenantTable console_url={this.props.console_url} pagination={{total:this.total, showTotal:this.showTotal, current:this.pageNumber, pageNumber: this.pageNumber, pageSize: this.pageSize, total: this.total, onChange:this.onPageChange}}  dataSource={dataSource} />
				</Card>
			</div>
		)
	}
}

function mapStateToProps(state, props){
	return {
		console_url: state.console_url
	}
}
export default connect(mapStateToProps)(Tenant)