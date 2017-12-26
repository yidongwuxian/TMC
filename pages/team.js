import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Table, message, Modal, Button, Row, Col, Card, Input, Breadcrumb, Icon} from 'antd';
import {Link} from 'react-router-dom';
import Search from '../components/team-search';
import { addTeam, getTeamList, searchTeam } from '../utils/team-api-util';
import TeamForm from '../components/team-form';
import TeamUserForm from '../components/team-user-form';
import config from '../config/config';
import AddTeamMember from '../components/add-team-member';

class Team extends Component {
	constructor(props){
		super(props);
		this.state = {
			dataSource: [],
			showAddTeam: false,
			toAddMemberTeam: null,
			totalTeamNum: 0,
			leftTeamNum:0
		}
		this.pageNumber = 1;
		this.pageSize = 50;
		this.total = 0;

	}
	componentDidMount(){
		
	}
	componentWillMount(){
		this.loadList();
	}
	componentWillUnmount(){

	}
	loadList(){
		getTeamList(
			this.props.dispatch,
			this.pageNumber,
			this.pageSize
		).done((data) => {
			this.total = data.total || data.list.length;
			this.setState({dataSource:data.list, totalTeamNum: data.bean['total_tenant_num'], leftTeamNum:data.bean['total_tenant_num']-data.bean['cur_tenant_num']})
		})
		
	}
	reloadList(){
		this.pageNumber = 1;
		this.loadList();
	}

	onSearch = (team={}) => {
		this.pageNumber = 1;
		if(team.tenant){
			searchTeam(
				this.props.dispatch,
				team.tenant
			).done((data) => {
				this.total = data.total || data.list.length;
				this.setState({dataSource:data.list})
			})
		}else{
			this.reloadList();
		}
		
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
	showCreateTeam = () =>{
		this.setState({showAddTeam: true})
	}
	handleCreateTeam = () => {
		this.teamForm.validateFields((err, values) => {
			if(!err){
				addTeam(
					this.props.dispatch,
					values['tenant_name'],
					values['useable_regions'].join(',')
				).done(() => {
					this.handleCancelCreateTeam();
					this.reloadList();
				})
			}
		})
	}
	handleCancelCreateTeam = () =>{
		this.setState({showAddTeam: false})
	}
	saveTeamFrom = (form) => {
		this.teamForm = form;
	}
	saveTeamUserFrom = ( form ) => {
		this.teamUserForm = form;
	}
	addMember = (data) => {
		this.setState({toAddMemberTeam: data})
	}
	onAddMemberOk = () =>{
		this.handleCancelAddMember();
		this.reloadList();
	}
	handleCancelAddMember = () =>{
		this.setState({toAddMemberTeam: null})
	}
	showTotal = (total, range) => {
		return range[0]+'-'+range[1]+'条／共'+ total + '条';
	}
	render(){
		const { dataSource, showAddTeam, toAddMemberTeam } = this.state;
		const { showAdd } = this.state;
		const columns = [
		{
		  title: '团队名称',
		  dataIndex: 'tenant_name'
		}, 
		{
		  title: '成员数量',
		  dataIndex: 'user_num'
		},
		{
			title: '操作',
		    dataIndex: 'action',
		    key: 'action',
		    render:(text, data) => {
		    	return <div>
		    		<Button><Link to={"/teamMember/"+data.tenant_id+ '/' + data.tenant_name}>成员管理</Link></Button>
		    		<Button onClick={this.addMember.bind(this, data)}>添加成员</Button>
		    	</div>
		    }
		}
		];
		
		return (
			<div>
				<Breadcrumb  separator=">" style={{background:'#fff'}}>
					<Breadcrumb.Item><Icon type="home" />{config.projectName}</Breadcrumb.Item>
				    <Breadcrumb.Item>团队管理</Breadcrumb.Item>
				</Breadcrumb>
				<Card style={{marginBottom: '10px'}}>
					<h3>已被授权可以创建 <span style={{color:'#00d973'}}> {this.state.totalTeamNum}</span> 个团队， 目前您还可以创建 <span style={{color:'#00d973'}}> {this.state.leftTeamNum}</span> 个团队</h3>
				</Card>
				<Card title={<div>
					<Search onSearch={this.onSearch} />
					<Button  onClick={this.showCreateTeam} type="primary" size="large" icon="plus">创建团队</Button>
					</div>}>
					<Table bordered columns={columns}  pagination={{total:this.total, showTotal:this.showTotal, pageNumber: this.pageNumber, pageSize: this.pageSize, total: this.total, onChange:this.onPageChange}}  dataSource={dataSource} />
				</Card>
				{
					showAddTeam && <Modal
						title="创建团队"
						visible = {true}
						onOk={this.handleCreateTeam}
						onCancel = {this.handleCancelCreateTeam}
					>
						<TeamForm ref={this.saveTeamFrom}  />
					</Modal>
				}
				{
					toAddMemberTeam && <AddTeamMember tenantName={toAddMemberTeam.tenant_name} onOk={this.onAddMemberOk} onCancel={this.handleCancelAddMember} />
				}
			</div>
		)
	}
}

function mapStateToProps(state, props){
	return {
		
	}
}
export default connect(mapStateToProps)(Team)