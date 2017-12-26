import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, Row, Col} from 'antd';
import BaiduMap from '../components/baidu-map';
import {loadLicense, setLicense} from '../utils/config-api-util';
import { Form, Icon, Input, Button, message, Breadcrumb } from 'antd';
const FormItem = Form.Item;

import config from '../config/config';
import {Link} from 'react-router-dom';


class Authorize extends Component {
	constructor(props){
		super(props);
		this.state = {
			license:'',
			//功能列表
			module_list:[],
			"end_time": "",
      		"cpu": 0,
      		"data_center": 0,
            "company": "",
            "tenant": 0,
            "memory": 0,
      	    "node": 0,
            "start_time": "",
            "code": ""
		}
	}
	componentDidMount(){
		
	}
	componentWillMount(){
		this.loadInfo()
	}
	componentWillUnmount(){

	}
	loadInfo(){
		loadLicense(this.props.dispatch).done((data) => {
			this.setState(Object.assign({}, this.state, data.bean||{}))
		})
	}
	onChange = (e) => {
		this.setState({license: e.target.value})
	}
	handleSubmit = () => {
		if(!this.state.license){
			message.warning("请输入license");
			return false;
		}

		setLicense(
			this.props.dispatch,
			this.state.license
		).done((data, msg) => {
			message.success(msg || '操作成功');
			this.loadInfo();
		})

		return false;
	}
	render(){
		const { license, module_list } = this.state;
		return (
			<div className="page-authorize">
				<Breadcrumb  separator=">" style={{background:'#fff'}}>
					<Breadcrumb.Item><Icon type="home" />{config.projectName}</Breadcrumb.Item>
				    <Breadcrumb.Item>配置管理</Breadcrumb.Item>
				    <Breadcrumb.Item>云帮授权</Breadcrumb.Item>
				</Breadcrumb>
				<Card title="输入license">
					 <Form layout="inline"  onSubmit={this.handleSubmit}>
				        <FormItem style={{verticalAlign: 'middle'}}>
				            <Input   style={{width: '300px'}} type="textarea" onChange={this.onChange} value={license} placeholder="license" />
				        </FormItem>
				        <FormItem style={{verticalAlign: 'middle'}}>
				          <Button
				            type="primary"
				            htmlType="submit"
				          >
				           提交
				          </Button>
				        </FormItem>
				      </Form>
				</Card>
				<Card title="授权信息">

				    <table className={"license-table"}>
				    	<tr>
				    		<td style={{}}>授权公司名称：</td>
				    		<td>{this.state.company}</td>
				    		<td>授权公司代码：</td>
				    		<td>{this.state.code}</td>
				    	</tr>
				    	<tr>
				    		<td>授权数据中心数量：</td>
				    		<td><strong> {this.state.data_center}</strong></td>
				    		<td>授权单数据中心节点数：</td>
				    		<td><strong> {this.state.node}</strong></td>
				    	</tr>
				    	<tr>
				    		<td>授权单数据中心CPU最大核数：</td>
				    		<td><strong> {this.state.cpu}</strong></td>
				    		<td>授权单数据中心最大内存数：</td>
				    		<td><strong> {this.state.memory}</strong></td>
				    	</tr>
				    	<tr>
				    		<td>授权创建租户数：</td>
				    		<td><strong> {this.state.tenant}</strong></td>
				    		<td>授权开始时间：</td>
				    		<td><strong> {this.state.start_time}</strong></td>
				    	</tr>
				    	<tr>
				    		<td>授权时间结束：</td>
				    		<td><strong> {this.state.end_time}</strong></td>
				    		<td></td>
				    		<td></td>
				    	</tr>

				    </table>
				</Card>
				<Card title="授权功能列表">

						{
							module_list.map(function(item, index){
								return (
									<Row key={index}>{item}</Row>
								)
							})
						}
				</Card>
				<Card title="联系方式">
					<Row>
				      <Col span={10}>
				      	 <Row>电话：010-84762936</Row>
				      	 <Row>邮箱：info@goodrain.com</Row>
				      	 <Row>地址：北京市朝阳区望京街9号 望京国际商业中心F座A308</Row>
				      </Col>
				      <Col span={14}>
				      		<BaiduMap />
				      </Col>
				    </Row>
				</Card>
			</div>
		)
	}
}

function mapStateToProps(state, props){
	return {
		
	}
}
export default connect(mapStateToProps)(Authorize)