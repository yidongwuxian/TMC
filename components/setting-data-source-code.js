import React, { Component } from 'react';
import {Card, Icon, Form, Switch, Table, Button} from 'antd';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import GithubDialog from './github-dialog';
import GitlabDialog from './gitlab-dialog';
import { 
	getGithub, 
	getGitlab, 
	addGithub, 
	editGithub, 
	addGitlab, 
	editGitlab,
	openGithub,
	openGitlab,
	closeGithub,
	closeGitlab
 } from '../utils/config-api-util';
const FormItem = Form.Item;

class codeSetting extends Component {
	constructor(props) {
		super(props);
		this.state = {
			viewGithub:false,
			editGithub:false,
			addGithub:false,
			viewGitlab:false,
			editGitlab:false,
			addGitlab:false,
			github:[{
				client_id:'',
				redirect_uri:'',
				client_secret:''
			}],
			gitlab:[{
				url:'',
				admin_user:'',
				admin_password:'',
				hook_url:'',
				admin_email:''
			}]
		}
	}
	componentWillMount(){
		this.loadInfo();
	}
	loadInfo(){
		getGithub(this.props.dispatch).done((data) => {
			this.setState({github:[data.bean]})

		})
		// getGitlab(this.props.dispatch).done((data) => {
		// 	this.setState({gitlab:[data.bean]})
		// })
	}
	viewGithub = () => {
		this.setState({viewGithub: true})
	}
	cancelViewGithub = () => {
		this.setState({viewGithub: false})
	}
	editGithub = () => {
		this.setState({editGithub: true})
	}
	cancelEditGithub = () => {
		this.setState({editGithub: false})
	}
	addGithub = () => {
		this.setState({addGithub: true})
	}
	cancelAddGithub = () => {
		this.setState({addGithub: false})
	}
	handleAddGithub = (data) => {
		addGithub(
		   this.props.dispatch,
		   data
		).done(() => {
			this.cancelAddGithub();
			this.loadInfo();
		})
	}
	handleEditGithub = (data) => {
		editGithub(
		   this.props.dispatch,
		   data
		).done(() => {
			this.cancelEditGithub();
			this.loadInfo();
		})
	}
	openGithub = () => {
		openGithub(this.props.dispatch).done(() => {
			this.loadInfo();
		})
	}
	closeGithub = () => {
		closeGithub(this.props.dispatch).done(() => {
			this.loadInfo();
		})
	}
	viewGitlab = () => {
		this.setState({viewGitlab: true})
	}
	cancelViewGitlab = () => {
		this.setState({viewGitlab: false})
	}
	editGitlab = () => {
		this.setState({editGitlab: true})
	}
	cancelEditGitlab = () => {
		this.setState({editGitlab: false})
	}
	addGitlab = () => {
		this.setState({addGitlab: true});
	}
	cancelAddGitlab = () => {
		this.setState({addGitlab: false});
	}
	openGitlab = () => {
		openGitlab(this.props.dispatch).done(() => {
			this.loadInfo();
		})
	}
	closeGitlab = () => {
		closeGitlab(this.props.dispatch).done(() => {
			this.loadInfo();
		})
	}
	handleAddGitlab = (data) => {
		addGitlab(
		   this.props.dispatch,
		   data
		).done(() => {
			this.cancelAddGitlab();
			this.loadInfo();
		})
	}
	handleEditGitlab = (data) => {
		editGitlab(
		   this.props.dispatch,
		   data
		).done(() => {
			this.cancelEditGitlab();
			this.loadInfo();
		})
	}
	render() {
	    const { connectData, github, gitlab, showGithubForm, showGitLabForm } = this.state;
	    const gitHubColumns = [{
		  title: '客户端ID',
		  dataIndex: 'client_id',
		  key:'client_id'
		}, {
		  title: '重定向地址',
		  dataIndex: 'redirect_uri',
		  key:'redirect_uri'
		},{
			title: '客户端密匙',
			dataIndex:'client_secret',
			key:'client_secret'
		}, {
		  title: '操作',
		  dataIndex: 'action',
		  key:'action',
		  render:(text, data) => {
		  	const isSet = !!data.client_id
		  	const enable = data.enable;
		  	 return (
		  	 	<div>
		  	 		{ isSet ? <Button onClick={this.viewGithub}>查看</Button> :''}
		  	 		{ isSet ? <Button onClick={this.editGithub}>修改</Button> : <Button onClick={this.addGithub}>设置</Button>}
		  	 		{ isSet && !enable ? <Button onClick={this.openGithub}>连接</Button> :''}
		  	 		{ isSet && enable ? <Button onClick={this.closeGithub}>取消连接</Button> :''}
		  	 	</div>
		  	 )
		  }
		}];

		const gitLabColumns = [{
		  title: '仓库地址',
		  dataIndex: 'url',
		  key:'url'
		}, {
		  title: '管理员邮箱',
		  dataIndex: 'admin_email',
		  key:'admin_email'
		}, {
			title: 'Hook地址',
			dataIndex: 'hook_url',
			key:'hook_url'
		},{
		  title: '操作',
		  dataIndex: 'action',
		  key:'action',
		  render:(text, data) => {
		  	 const isSet = !!data.url;
		  	 const enable = data.enable;
		  	 return (
		  	 	<div>
		  	 		{ isSet ? <Button onClick={this.viewGitlab}>查看</Button> :''}
		  	 		{ isSet ? <Button onClick={this.editGitlab}>修改</Button> : <Button onClick={this.addGitlab}>设置</Button>}
		  	 		{ !enable ? <Button onClick={this.openGitlab}>连接</Button> :''}
		  	 		{ enable ? <Button onClick={this.closeGitlab}>取消连接</Button> :''}
		  	 	</div>
		  	 )
		  }
		}];

		return (
			<div>
				<Card title={<span><Icon type="setting" />GitHub 代码库</span>} style={{ width: '100%' }}>
					<Table rowKey="client_id" pagination={false} columns={gitHubColumns} dataSource={github} />
					{this.state.viewGithub && <GithubDialog data={this.state.github[0] || {}} title="Github详情" onCancel={this.cancelViewGithub} disabled={true} />}
					{this.state.editGithub && <GithubDialog  onOk={this.handleEditGithub}  data={this.state.github[0] || {}}  title="Github修改" onCancel={this.cancelEditGithub} />}
					{this.state.addGithub && <GithubDialog   onOk={this.handleAddGithub}  title="Github设置" onCancel={this.cancelAddGithub} />}
				</Card>

				{ '' && <Card title={<span><Icon type="setting" />GitLab 代码库</span>} style={{ width: '100%' }}>
					<Table rowKey="url" pagination={false} columns={gitLabColumns}  dataSource={gitlab} />
					{this.state.viewGitlab && <GitlabDialog onCancel={this.cancelViewGitlab} data={this.state.gitlab[0] || {}}  title="Gitlab详情" disabled={true} />}
					{this.state.editGitlab && <GitlabDialog onOk={this.handleEditGitlab} onCancel={this.cancelEditGitlab} data={this.state.gitlab[0] || {}}  title="Gitlab修改" />}
					{this.state.addGitlab && <GitlabDialog onOk={this.handleAddGitlab} onCancel={this.cancelAddGitlab}   title="Gitlab设置" />}
				</Card>}
			</div>
		)
	}
}

export default connect((state, props) => {
	return {
		
	}
})(codeSetting);

