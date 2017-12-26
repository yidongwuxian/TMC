import React, {Component} from 'react';
import { Layout, Icon, Row, Col } from 'antd';
import { logout } from '../utils/login-api-util';
import config from '../config/config';
const { Header }  = Layout;

class SiteHeader extends Component {
	constructor(props) {
		super(props);
	}
	handleLogout = () => {
		logout(this.props.dispatch)
	}
	render() {
		return (
			<Header style={{ position: 'fixed', width: '100%' }}>
				<Row>
					<Col span={18}>
						<h1 className={"site-logo"}>
							<img src="/static/images/logo.png" />
						</h1>
					</Col>
					<Col span={6} style={{textAlign: 'right'}}>

						<a title="退出登录" href="javascript:;" onClick={this.handleLogout}>
							<i className={'fa fa-sign-out'} style={{fontSize: 18, fontWeight: 'bold', color: '#fff'}} />
						</a>
					</Col>
				</Row>
				
			</Header>
		)
	}
}

export default SiteHeader;

