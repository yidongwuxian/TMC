import React, {Component} from 'react';
import {connect} from 'react-redux';
import { isInitAdmin } from '../utils/login-api-util';
import Register from '../pages/register';


class CheckInitAdmin extends Component {
	componentWillMount(){
		isInitAdmin().done((data) => {
			this.props.dispatch({
				type: 'SET_ISINIT_ADMIN',
				isInitAdmin: data.bean.is_account_init
			})
		}).done((data) => {
			
		})
	}
	render(){
		const isInit = this.props.isInitAdmin;
		const dispatch = this.props.dispatch;
		console.log(isInit)
		return (
			isInit === true ? 
			(this.props.children)
			:
			<Register />
			
		)
	}
}

function mapStateToProps(state, props){
	return {
		isInitAdmin: state.isInitAdmin
	}
}

export default connect(
	mapStateToProps
)(CheckInitAdmin);