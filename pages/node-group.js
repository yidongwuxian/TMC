import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Table, message, Modal, Button, Row, Col, Card, Breadcrumb, Icon} from 'antd';
import {Link} from 'react-router-dom';
import NodeGroupTable from '../components/node-group-table';
import { getAllClustersList, getClustersListById, loadDataCenterList } from '../actions/dataCenter-action';
import Search from '../components/node-group-search';
import NodeGroupForm from '../components/node-group-form';
import config from '../config/config';


class NodeGroup extends Component {
	constructor(props){
		super(props);
		this.state = {
			showCreateFrom: false,
			dataCenterId:''
		}
	}
	componentDidMount(){
		
	}
	componentWillMount(){
		var dataCenterId = this.props.match.params.dataCenterId;
		if(dataCenterId){
			this.setState({dataCenterId: dataCenterId});
		}
		this.loadList(dataCenterId);
	}
	componentWillReceiveProps(nextProps){

		var nextId = nextProps.match.params.dataCenterId;
		var id = this.props.match.params.dataCenterId;

		if(id !== nextId){
			this.setState({dataCenterId: nextId});
			this.loadList(nextId);
		}
	}
	loadList(id){
		if(id){
			this.props.dispatch(getClustersListById(id))
		}else{
			this.props.dispatch(getAllClustersList());
		}
	}
	componentWillUnmount(){

	}
	onSearch = (id) => {
		this.setState({dataCenterId: id});
		this.loadList(id);
	}
	saveForm = (form) => {
		this.form = form;
	}
	showCreateForm = () => {
		this.setState({showCreateFrom: true})
	}
	hideCreateForm = () => {
		this.setState({showCreateFrom: false})
	}
	handleCreate = () => {
		this.form.validateFields((err, values) => {
			if(!err){
				onOk && onOk(values)
			}
		})
	}
	afterClose = () => {
		this.form.resetFields();
	}
	render(){
		const { dataSource } = this.props;
		const dataCenterId = this.props.match.params.dataCenterId;
		const name = this.props.match.params.dataCenterName;
		return (
			<div>
			<Breadcrumb  separator=">" style={{background:'#fff'}}>
				<Breadcrumb.Item><Icon type="/" />{config.projectName}</Breadcrumb.Item>
			    <Breadcrumb.Item><Link to="/">资源管理</Link></Breadcrumb.Item>
			    {name ? <Breadcrumb.Item><Link to="/">数据中心管理{name? '('+name+')' : ''}</Link></Breadcrumb.Item> : ''}
			    <Breadcrumb.Item>集群管理</Breadcrumb.Item>
			</Breadcrumb>
			<Card title={<Search dataCenterId={dataCenterId} onSearch={this.onSearch} />}>
				<NodeGroupTable  dataSource={dataSource} />
			</Card>
			</div>
		)
	}
}

function mapStateToProps(state, props){
	return {
		dataSource: state.clusterList
	}
}
export default connect(mapStateToProps)(NodeGroup)