import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Breadcrumb, Card, Icon, Row, Col, Tag, Table, Button, Tabs} from 'antd';
import {Link} from 'react-router-dom';
import config from '../config/config';
import { getNodeInfo, editNodeTags } from '../utils/dataCenter-api-util';
import nodeUtil from '../utils/node-util';
import NodeTag from '../components/node-tag';
import {Tooltip, Legend,BarChart, Bar, XAxis, YAxis, CartesianGrid  } from 'recharts';
import NodeSourceChar from '../components/node-detail-source-char';


const TabPane = Tabs.TabPane;

require("../../style/node-detail.css");

const CustomTooltip  = React.createClass({
  render() {
    const { active } = this.props;

    if (active) {
      const { payload, label } = this.props;
      const data = payload[0].payload;
      return (
        <div className="custom-tooltip" style={{padding:"10px 20px",border:'1px solid #dcdcdc', background: '#fff', textAlign:'center'}}>
          <p>
          	  请求资源: {data['请求资源'] || 0}({data.RequestsR || 0}%)
          </p>
          <p>
          	  限制资源: {data['限制资源'] || 0}({data.LimitsR || 0}%)
          </p>
          <p>
          	  总计: {data['总资源']}
          </p>
        </div>
      );
    }

    return null;
  }
});


const SimpleChart = React.createClass({
	render () {
	const data = this.props.data || [];
  	return (
  		<div style={{display: 'inline-block'}}>

		    <BarChart width={330} height={300} data={data}
		            margin={{top: 5, right: 30, left: 30, bottom: 5}}>
		       <XAxis dataKey="name"/>
		       <YAxis/>
		       <CartesianGrid strokeDasharray="3 3"/>
		       <Tooltip content={<CustomTooltip/>} />
		       <Legend  />
		       <Bar style={{marginLeft:'30px'}} dataKey="请求资源" fill="#0088FE" />
		       <Bar dataKey="限制资源" fill="#00C49F" />
		       <Bar dataKey="总资源" fill="#FFBB28" />
		      </BarChart>
	    </div>
    );
  }
})



class NodeDetail extends Component {
	constructor(props){
		super(props);
		this.state = {
			nodeInfo: null,
			podList:[],
			editTag: false
		}
	}
	componentDidMount(){
		
	}
	componentWillReceiveProps(nextProps){
		this.loadInfo();
	}
	componentWillMount(){
		this.loadInfo()
	}
	componentWillUnmount(){

	}
	loadInfo() {
		const { dataCenterId, clusterId, nodeId } = this.props.match.params;
		getNodeInfo(
			this.props.dispatch,
			dataCenterId,
			clusterId,
			nodeId
		).done((data) => {
			
			this.setState({nodeInfo: data.bean, podList: data.list})
		})
	}
	mapToArr(labels = {}){
		var arr = [];
		for(var k in labels){
			arr.push({key:k, value: labels[k]})
		}
		return arr;
	}
	handleTagCancel =() => {
		this.setState({editTag: false});
	}
	handleTagOk =(labels) => {

		const { dataCenterId, clusterId, nodeId } = this.props.match.params;
		const nodeInfo = this.state.nodeInfo;
		const system_labels = nodeInfo.labels.system_labels || {};

		editNodeTags(
				this.props.dispatch,
				dataCenterId,
				clusterId,
				nodeId,
				Object.assign({}, labels, system_labels)
			).done(() => {
				this.handleTagCancel();
				this.loadInfo();
			})
	}	
	handleTagEdit = () => {
		this.setState({editTag: true});
	}
	render(){
		const nodeInfo  = this.state.nodeInfo;

		if(!nodeInfo){
			return null;
		}

		const addresses = nodeInfo.addresses || {};
		const systeminfo = nodeInfo.node_status ? nodeInfo.node_status.nodeInfo : {};
		const labels = nodeInfo.labels || {};
		const capacity = nodeInfo.capacity || {};
		const allocatable = nodeInfo.allocatable || {};
		const allocatedresources = nodeInfo.allocatedresources || {};
		
		const cpuRL = [{name: 'CPU (单位: m)', '请求资源': parseInt(allocatedresources.CPURequests), '限制资源': parseInt(allocatedresources.CPULimits), '总资源': parseInt(allocatable.cpu) * 1000, RequestsR:allocatedresources.CPURequestsR, LimitsR: allocatedresources.CPULimitsR}]
		const memoryRL = [{name: '内存 (单位:MB)', '请求资源':parseInt(allocatedresources.MemoryRequests), '限制资源':parseInt(allocatedresources.MemoryLimits), '总资源':parseInt(allocatable.memory),RequestsR:allocatedresources.MemoryRequestsR, LimitsR: allocatedresources.MemoryLimitsR}]
		const nonterminatedpods = this.state.podList || [];
		const console_url = this.props.console_url || '';

		return (
			<div className="page-node-detail setting-data-source">
		    	<Breadcrumb  separator=">" style={{background:'#fff'}}>
					<Breadcrumb.Item><Icon type="home" />{config.projectName}</Breadcrumb.Item>
				    <Breadcrumb.Item><Link to="/">资源管理</Link></Breadcrumb.Item>
				    <Breadcrumb.Item>节点管理</Breadcrumb.Item>
				</Breadcrumb>
				<Card title={"节点信息"}>
					<div className="page-node-detail-hd">
					        <table>
					        	<tr>
					        		<td style={{width:'30%',textAlign:'center', verticalAlign: 'middle'}}>
					        			<span className="node-name">{nodeInfo.host_name || '节点名称'}</span><br />
					        			<span className="node-status">状态：{nodeInfo.status_cn}</span>
					        		</td>
					        		<td>
					        			<div className="node-property">
					      			<table style={{width: '100%'}}>
					      				<tr>
					      					<td style={{width: '100px', color:'#dcdcdc'}}>基本信息</td>
					      					<td className="td-tit">
					      						<span className="node-property-item">
													<span className="node-property-item-tit">数据中心:</span> {nodeInfo.region_alias}
												</span>
												<span className="node-property-item">
													<span className="node-property-item-tit">节点类型:</span> {nodeUtil.getNodeTypeCN(nodeInfo.role)}
												</span>
												<span className="node-property-item">
													<span className="node-property-item-tit">内部IP:</span> {nodeInfo.internal_ip}
												</span>
												<span className="node-property-item">
													<span className="node-property-item-tit">外部IP:</span> {nodeInfo.external_ip}
												</span>
												<span className="node-property-item">
													<span className="node-property-item-tit">容器运行时版本:</span> {systeminfo.kubeletVersion}
												</span>
					      					</td>
					      				</tr>
					      				<tr>
					      					<td style={{color:'#dcdcdc'}}>节点标签</td>
					      					<td className="td-tit">
					      						<div className="labels-wrap" style={{display: 'inline-block'}}>
					      							<div className="labels-list">
					      								{
					      									this.mapToArr(labels.selfdefine_labels).map((item) => {
					      										return (
																	<span key={item.key} style={{minWidth: 60,display:'inline-block'}}>
																		{item.value}
																	</span>
																)
					      									})
					      								}
					      							</div>
					      						</div>
					      						
												<Button style={{verticalAlign: 'middle'}} onClick={this.handleTagEdit} icon="edit" size="smaill">编辑</Button>
					      					</td>
					      				</tr>
					      				<tr>
					      					<td style={{color:'#dcdcdc'}}>操作系统</td>
					      					<td className="td-tit">
					      						<span className="node-property-item">
													<span className="node-property-item-tit">系统名称</span>: {systeminfo.osImage}
												</span>
												<span className="node-property-item">
													<span className="node-property-item-tit">CPU架构</span>: {systeminfo.architecture}
												</span>
												<span className="node-property-item">
													<span className="node-property-item-tit">内核版本:</span> {systeminfo.kernelVersion}
												</span>
					      					</td>
					      				</tr>
					      			</table>
								</div>
					        		</td>
					        	</tr>
					        </table>
					</div>
				</Card>

				<Card>
					<Tabs type="card">
					    <TabPane tab="节点资源统计" key="1">
					    	<Row>
						      <Col style={{textAlign:'center'}} span={12}>
						      	 <SimpleChart data={cpuRL} />
						      </Col>
						      <Col style={{textAlign:'center'}} span={12}>
						      	<SimpleChart data={memoryRL}  />
						      </Col>
						    </Row>
					    </TabPane>
					    {
					    	nodeInfo.role.indexOf('compute') > -1  ?
					    	 <TabPane tab="运行实例" key="2">
						    	<div>
						    		<Table 
										pagination={false}
										columns={[
											{
												title: '实例名称',
												dataIndex: 'name'
											},
											{
												title: '所属应用',
												dataIndex: 'id',
												render:(text, data) => {
													return (
														<a href={console_url+'/apps/'+ data.tenant_name + '/' +text + '/detail'} target="_blank">{text}</a>
													)
												}
											},
											{
												title: '所属租户',
												dataIndex: 'tenant_name',
												render:(text, data) => {
													return (
														<a href={console_url+'/apps/'+ data.tenant_name} target="_blank">{text}</a>
													)
												}
											},
											{
												title: 'cpu请求资源',
												dataIndex: 'cpu',
												render:(text, item) => {
													return (

														<span>{item.cpurequest}({item.cpurequestr + '%'})</span>
														
													)
												}
											},
											{
												title: 'cpu限制资源',
												dataIndex: 'cpul',
												render:(text, item) => {
													return (
														<span>{item.cpulimits}({item.cpulimitsr + '%'})</span>
													)
												}
											},
											{
												title: '内存请求资源',
												dataIndex: 'memory',
												render:(text, item) => {
													return (
														<span>{item.memoryrequests}({item.memoryrequestsr + '%'})</span>
													)
												}
											},
											{
												title: '内存限制资源',
												dataIndex: 'memoryl',
												render:(text, item) => {
													return (
														<span>{item.memorylimits}({item.memorylimitsr + '%'})</span>
													)
												}
											}

										]} 
										dataSource={nonterminatedpods}
									/>
									
						    	</div>
						    </TabPane>
						    :''
					    }
					   {
					   	 nodeInfo.role.indexOf('manage') > -1  ?
					   	 <TabPane tab="资源监控" key="3">
					    	<NodeSourceChar node={nodeInfo} />
					    </TabPane>
					    :''
					   }
					    
					</Tabs>
				</Card>
				{this.state.editTag && <NodeTag labels={labels} title={"节点标签修改"} onOk={this.handleTagOk} onCancel={this.handleTagCancel} />}
			</div>
		)
	}
}
function mapStateToProps(state, props){
	return {
		console_url: state.console_url
	}
}
export default connect(mapStateToProps)(NodeDetail)