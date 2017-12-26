import React, {Component} from 'react';
import {connect} from 'react-redux';

import Login from '../components/Login';
import cookie from '../utils/cookie-util';
import http from '../utils/http';

class CheckLogin extends Component {
	componentWillMount(){
		//验证登录
		const token = cookie.get('token');
		const user = cookie.get('user');
		if(token && user){
			http.setToken(token);
			this.props.dispatch({
				type: 'LOGIN',
				userInfo:{
					token: token,
					user: user
				}
			})
		}
	}
	render(){
		const userInfo = this.props.userInfo;
		const dispatch = this.props.dispatch;
		return (
			userInfo ? 
			(this.props.children) 
			:
			(<Login dispatch={dispatch} />)
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
)(CheckLogin);