import React, {Component} from 'react';
import {HashRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {Layout} from 'antd';
import SiteHeader from './SiteHeader';
import Siderbar from './Siderbar';


import lazyController from '../utils/lazyController';


import LoadHome from 'bundle-loader?lazy!../pages/Home';
import LoadNode from 'bundle-loader?lazy!../pages/node';
import LoadNodeDetail from 'bundle-loader?lazy!../pages/node-detail';
import LoadTenant from 'bundle-loader?lazy!../pages/tenant';
import LoadTeam from 'bundle-loader?lazy!../pages/team';
import LoadTeamMember from 'bundle-loader?lazy!../pages/team-member';
import LoadSave from 'bundle-loader?lazy!../pages/save';
import LoadUser from 'bundle-loader?lazy!../pages/user';
import LoadNotice from 'bundle-loader?lazy!../pages/notice';
import LoadNodeAddProcess from 'bundle-loader?lazy!../pages/node-add-process';
import LoadNodeGroup from 'bundle-loader?lazy!../pages/node-group';
import LoadSettingShow from 'bundle-loader?lazy!../pages/setting-show';
import LoadAuthorize from 'bundle-loader?lazy!../pages/authorize';
import LoadDataSource from 'bundle-loader?lazy!../pages/setting-data-source';
import LoadTag from 'bundle-loader?lazy!../pages/tag';
import LoadConfigDataCenter from 'bundle-loader?lazy!../pages/config-datacenter';
import LoadRegister from 'bundle-loader?lazy!../pages/register';

const { Header, Content, Sider }  = Layout;

class Routers extends Component {
	render(){
		const dispatch = this.props.dispatch;
		return (

			<Router history={this.props.history}>
				<Layout>
					<SiteHeader  dispatch={dispatch} />
					<Layout style={{top: '64px', position: 'fixed', bottom: 0, left:0, width: '100%'}}>
						<Sider>
							<Route component={Siderbar}></Route>
						</Sider>
						<Layout className="main-layout">
							
							<Content style={{minHeight: 500,padding:'0 16px', position:'relative'}}>
								<Switch>
									<Route exact path="/resources/dataCenterConfig" component={lazyController(LoadConfigDataCenter)}></Route>
									<Route exact path="/resources/dataCenter" component={lazyController(LoadHome)}></Route>
									<Route path="/resources/nodeGroup" component={lazyController(LoadNodeGroup)}></Route>
									<Route path="/resources/:dataCenterId/:dataCenterName/nodeGroup/" component={lazyController(LoadNodeGroup)}></Route>
									<Route exact path="/resources/allNode" component={lazyController(LoadNode)}></Route>
									<Route exact path="/resources/:dataCenterId/:dataCenterName/node" component={lazyController(LoadNode)}></Route>
									<Route exact path="/resources/:dataCenterId/:dataCenterName/:clusterId/node/:nodeId" component={lazyController(LoadNodeDetail)}></Route>
									<Route path="/setting/show" component={lazyController(LoadSettingShow)}></Route>
									<Route path="/setting/dataSource" component={lazyController(LoadDataSource)}></Route>
									<Route path="/setting/save" component={lazyController(LoadSave)}></Route>
									<Route path="/setting/authorize" component={lazyController(LoadAuthorize)}></Route>
									<Route path="/tenant" component={lazyController(LoadTenant)}></Route>
									<Route path="/team" component={lazyController(LoadTeam)}></Route>
									<Route path="/teammember/:teamId/:teamName" component={lazyController(LoadTeamMember)}></Route>
									<Route path="/user" component={lazyController(LoadUser)}></Route>
									<Route path="/tag" component={lazyController(LoadTag)}></Route>
									<Route path="/notice" component={lazyController(LoadNotice)}></Route>
									<Route path="/register" component={lazyController(LoadNotice)}></Route>
									<Route path="/resources/:dataCenterId/:ip/node-install" component={lazyController(LoadNodeAddProcess)}></Route>
									<Redirect from='/' to='/resources/dataCenter'/>
								</Switch>
							</Content>
						</Layout>
					</Layout>
					
				</Layout>
			</Router>
		)
	}
}


function mapStateToProps(state, props){
	return {
		
	}
}

export default connect(
	mapStateToProps
)(Routers);