import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Table, message, Modal, Button, Row, Col, Card, Input, Breadcrumb, Icon, Popconfirm} from 'antd';
import {Link} from 'react-router-dom';
import TenantTable from '../components/tenant-table';
import Search from '../components/team-member-search';
import { getTeamUserList, searchTeamUser, removeTeamMember } from '../utils/team-api-util';
import TeamForm from '../components/team-form';
import TeamUserForm from '../components/team-user-form';
import config from '../config/config';
import AddTeamMember from '../components/add-team-member';

class TeamMember extends Component {
	constructor(props){
		super(props);
		this.state = {
			dataSource: [],

			toRemoveMember : null,
			selectedRows : []
		}
		this.pageNumber = 1;
		this.pageSize = 50;
		this.total = 0;

	}
	componentDidMount(){
		this.loadList();
	}
	loadList(){
		this.setState({selectedRows:[]});
		const userName = this.search.getData();
		const teamName = this.props.match.params.teamName;
		if(!userName){
			
			getTeamUserList(
				this.props.dispatch,
				teamName
			).done((data) => {
				this.total = data.total || data.list.length;
				this.setState({dataSource:data.list})
			})
		}else{
			searchTeamUser(
				this.props.dispatch,
				teamName,
				userName
			).done((data) => {
				this.total = data.total || data.list.length;
				this.setState({dataSource:data.list})
			})
		}
	}
	reloadList(){
		this.pageNumber = 1;
		this.loadList();
	}

	onSearch = (team) => {
		this.loadList(team);
	}
	onPageChange = (pageNumber, pageSize) => {
		this.pageNumber = pageNumber;
		this.loadList();
	}
	saveTeamUserFrom = ( form ) => {
		this.teamUserForm = form;
	}
	handleCancelAddMember = () =>{
		this.setState({toAddMemberTeam: null})
	}
	removeMember = (data) => {
		removeTeamMember(
			this.props.dispatch,
			this.props.match.params.teamName,
			data['user_id']
		).done((data) => {
			message.success('操作成功')
			this.reloadList();
		})

	}
	betchRemoveMember = () => {
		const idsArr = this.state.selectedRows.map((item) => item['user_id']);
		Modal.confirm({
		    title: ' 团队成员删除',
		    content: '确定要删除选中的成员吗？',
		    onOk:() => {
		      	removeTeamMember(
					this.props.dispatch,
					this.props.match.params.teamName,
					idsArr.join(',')
				).done((data) => {
					message.success('操作成功')
					this.reloadList();
				})
		    }
		});
	}
	showAddMember = (data) => {
		this.setState({toAddMemberTeam: true})
	}
	hideAddMember = (data) => {
		this.setState({toAddMemberTeam: false})
	}
	saveSearch = (search) => {
		this.search = search;
	}
	onAddMemberOk = () => {
		this.hideAddMember();
		this.reloadList();
	}
	render(){
		const { dataSource, showAddTeam, toAddMemberTeam } = this.state;
		const { showAdd } = this.state;
		const columns = [
		{
		  title: '用户名称',
		  dataIndex: 'nick_name'
		},
		{
		  title: '邮箱',
		  dataIndex: 'email'
		}, 
		{
			title: '操作',
		    dataIndex: 'action',
		    key: 'action',
		    render:(text, data) => {
		    	return <div>
		    		<Popconfirm onConfirm={this.removeMember.bind(this, data)} title="你确定要删除该成员吗？" okText="确定" cancelText="取消">
						      <Button href="javascript:;">删除 </Button>
						   </Popconfirm>
		    	</div>
		    }
		}
		];
		const rowSelection = {
		  onChange: (selectedRowKeys, selectedRows) => {
		  	this.setState({selectedRows: selectedRows})
		  },
		  onSelect: (record, selected, selectedRows) => {
		    
		  },
		  onSelectAll: (selected, selectedRows, changeRows) => {
		   
		  }
		};
		return (
			<div>
				<Breadcrumb  separator=">" style={{background:'#fff'}}>
					<Breadcrumb.Item><Icon type="home" />{config.projectName}</Breadcrumb.Item>
				    <Breadcrumb.Item><Link to="/team">团队管理({this.props.match.params.teamName})</Link></Breadcrumb.Item>
				    <Breadcrumb.Item>成员管理</Breadcrumb.Item>
				</Breadcrumb>

				<Card title={<div>
					<Search tenantName={this.props.match.params.teamName} ref={this.saveSearch} onSearch={this.onSearch} />
					<Button  onClick={this.showAddMember} type="primary" size="large" icon="plus">添加成员</Button>
					<Button disabled={this.state.selectedRows.length <= 0}  onClick={this.betchRemoveMember} type="primary" size="large" icon="minus">批量删除</Button>
					</div>}>

					<Table rowKey={'user_id'} rowSelection={rowSelection} bordered columns={columns}  pagination={{pageNumber: this.pageNumber, pageSize: this.pageSize, total: this.total, onChange:this.onPageChange}}  dataSource={dataSource} />
				</Card>
				{
					toAddMemberTeam && <AddTeamMember tenantName={this.props.match.params.teamName} onOk={this.onAddMemberOk} onCancel={this.hideAddMember} />
				}
			</div>
		)
	}
}

function mapStateToProps(state, props){
	return {
		
	}
}
export default connect(mapStateToProps)(TeamMember)