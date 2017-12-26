import http from './http';
import { message } from 'antd';
import { setUserList } from '../actions/user-action';
import config from '../config/config';


/*
	全部用户列表接口
*/
export function getAllUserList(dispatch, pageNumber, pageSize) {
	return http({
		url:config.baseUrl + 'backend/v1/users',
		type:'get',
		data:{
			page_num:pageNumber || 1,
			page_size: pageSize || 50
		}
	}, dispatch).done((data) => {
		
	}).fail(() => {

	})
}


/*
	用户列表接口
*/
export function getUserList(dispatch, tenantName) {
	return http({
		url:config.baseUrl + 'backend/v1/tenants/' + tenantName + '/users'
	}, dispatch).done((data) => {
		
	}).fail(() => {

	})
}


/*
	添加用户
*/
export function addUser(dispatch, data={}){
	return http({
		type:'post',
		url:config.baseUrl + 'backend/v1/tenants/' + data.tenant_name + '/users',
		data:{
			user_name:data.user_name,
			phone:data.phone,
			email:data.email,
			password:data.password
		}
	}, dispatch).done((data) => {

	}).fail(() => {

	})
}


/*
	删除用户
	@url test 为临时性添加，  武实际具体意义， 只为了后端请求能通过
*/
export function delUser(dispatch, userId) {
	return http({
		type:'delete',
		url:config.baseUrl + 'backend/v1/tenants/test/users/' + userId
	}, dispatch).done((data) => {
		message.success(data.msg_show || '操作成功')
	}).fail(() => {

	})
}