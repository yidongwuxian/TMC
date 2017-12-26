import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Layout} from 'antd';
import {getConsoleUrl} from '../utils/comm-api-util';
import CheckInitAdmin from './check-init-admin';
import CheckLogin from './check-login';
import Routers from './routers';
import Loading from './Loading';

require('../../style/them.css');
require('../../style/font-awesome.min.css')





class App extends Component {
	constructor(props){
		super(props);
	}
	componentWillMount(){
		getConsoleUrl(this.dispatch).done((data) => {
			this.props.dispatch({
				type: 'SET_CONSOLE_URL',
				console_url: data.bean.console_url
			})
		})

	}
	render(){
		return (
			<Layout>
				<CheckInitAdmin>
					<CheckLogin>
						<Routers />
					</CheckLogin>
				</CheckInitAdmin>
				<Loading />
			</Layout>
		)
	}
}

function mapStateToProps(state, props){
	return {
		userInfo: state.userInfo
	}
}

export default connect(
	mapStateToProps
)(App);