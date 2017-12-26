import http from './http';
import { message } from 'antd';
import config from '../config/config';
import cookie from './cookie-util';



/*
	登录
*/
export function login(dispatch, userName, password) {
	return http({
		url:config.baseUrl + 'backend/account/login',
		type:'post',
		data:{
			username: userName,
			password: password
		}
	}, dispatch).done((data) => {
		http.setToken(data.bean.token);
		cookie.set('token', data.bean.token);
		cookie.set('user', data.bean.user);
		dispatch({
        	type:'LOGIN',
        	userInfo: data.bean
        })
	}).fail(() => {

	})
}


/*
	退出登录
*/
export function logout(dispatch) {
	return http({
		url:config.baseUrl + 'backend/account/logout',
		type:'get'
	}, dispatch).done((data) => {
		http.removeToken();
		cookie.remove('token');
		cookie.remove('user');
		dispatch({
        	type:'LOGOUT'
        })
	}).fail(() => {

	})
}

/*
	注册管理员， 只能注册一个账户
*/
export function register(dispatch, data) {
	return http({
		url:config.baseUrl + 'backend/account/register',
		type:'post',
		data:data
	}, dispatch).done((data) => {
		
	}).fail(() => {

	})
}

/*
	判断是否已经初始化管理员账号
*/

export function isInitAdmin(dispatch){
	return http({
		url:config.baseUrl + 'backend/account/is-init',
		type:'get',
		async: false
	}, dispatch).done((data) => {
		
	}).fail(() => {

	})
}

