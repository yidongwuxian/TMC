import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Card, Breadcrumb, Icon} from 'antd';
import {Link} from 'react-router-dom';
import CreateDataCenter from '../components/CreateDataCenter';
import EditDataCenter from '../components/EditDataCenter';
import DataCenterTable from '../components/DataCenterTable';
import { loadDataCenterList, stopHome, loadHomeList } from '../actions/dataCenter-action';
import config from '../config/config';


class Home extends Component {
	constructor(props){
		super(props);
		this.state = {
			visibleCreate: false,
			editDataId: null
		}
	}
	componentDidMount(){
		
	}
	componentWillMount(){
		this.loadList();
	}
	loadList = () => {
		const { dispatch } = this.props;
		dispatch(loadDataCenterList());
	}
	componentWillUnmount(){

	}
	handleDel = (data) => {

	}
	handleEdit = (data) => {
		this.setState({editDataId: data.region_id})
	}
	handleCreate = () => {
		this.setState({visibleCreate: true});
	}
	handleCreateCancel = () => {
		this.setState({visibleCreate: false});
	}
	handleCreateOk = (data) => {
		this.setState({visibleCreate: false});
		this.loadList();
	}
	handleEditCancel = () => {
		this.setState({editDataId: null})
	}
	handleEditOk = (data) => {
		this.setState({editDataId: null});
		this.loadList();
	}
	render(){
		const { dataSource } = this.props;
		const { editDataId } = this.state;
		return (
			<div>
				<Breadcrumb  separator=">" style={{background:'#fff'}}>
					<Breadcrumb.Item><Icon type="home" />{config.projectName}</Breadcrumb.Item>
				    <Breadcrumb.Item><Link to="/home">数据中心管理</Link></Breadcrumb.Item>
				</Breadcrumb>
				<Card className=" ant-card-main" title={<Button onClick={this.handleCreate} size="large" type="primary"><i className={"fa fa-plus"} />添加</Button>}>
					<DataCenterTable loadList={this.loadList} handleEdit={this.handleEdit}  handleDel={this.handleDel} dataSource={dataSource} />
					<CreateDataCenter onOk={this.handleCreateOk} onCancel={this.handleCreateCancel} visible={this.state.visibleCreate} />
					{editDataId && <EditDataCenter onOk={this.handleEditOk} onCancel={this.handleEditCancel} id={editDataId} />}
				</Card>
			</div>
		)
	}
}

function mapStateToProps(state, props){
	return {
		dataSource : state.dataCenterList
	}
}
export default connect(mapStateToProps)(Home)