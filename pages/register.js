import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {Table, Icon, message, Card} from 'antd';
import RegisterForm from '../components/register-form';
import {Link} from 'react-router-dom';
import { register } from '../utils/login-api-util';



class Register extends Component {
	constructor(props){
		super(props);
		this.state = {
			success: false
		}
		this.timer = null;
	}
	componentWillMount(){
	
	}
	componentDidMount(){
		
	}
	componentWillUnmount(){
		
	}
	onSubmit = (data) => {
		register(this.props.dispatch, data).done((data) => {
			message.success("注册成功， 3秒后自动跳转到登录页面");
			this.timer = setTimeout(() => {
				location.reload();
			}, 3000)
		})
	}
	render(){
		return (
			<div className="page-register">
		    	<div className="page-login-bd">
		    		<div className="page-login-bd-l">
		    		</div>

			      	<Card  className="page-login-bd-r" title="欢迎注册好雨云帮管理后台">
					    <RegisterForm onSubmit={this.onSubmit} />
				  	</Card>
			  	</div>
			</div>
		)
	}
}

export default connect()(Register)