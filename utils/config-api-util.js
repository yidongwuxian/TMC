import http from './http';
import { message } from 'antd';
import { setUserList } from '../actions/user-action';
import config from '../config/config';



/*
	获取云帮titlt
*/
export function getConfigTitle(dispatch) {
	return http({
		url:config.baseUrl + 'backend/v1/config/title',
		type:'get'
	}, dispatch)
}

/*
	修改云帮标题
*/
export function editConfigTitle(dispatch, title) {
	return http({
		url:config.baseUrl + 'backend/v1/config/title',
		type:'put',
		data:{
			title: title
		}
	}, dispatch)
}

/*
	获取lession信息
*/
export function loadLicense(dispatch) {
	return http({
		url:config.baseUrl + 'backend/v1/config/license',
		type:'get'
	}, dispatch)
}

/*
	设置lession信息
*/
export function setLicense(dispatch, license) {
	return http({
		url:config.baseUrl + 'backend/v1/config/license',
		type:'put',
		data:{
			license: license
		}
	}, dispatch)
}

/*
	获取注册信息
*/
export function getRegistInfo(dispatch){
	return http({
		url:config.baseUrl + 'backend/v1/config/safety/regist',
		type:'get'
	})
}

/*
	开放或关闭注册
*/

function openOrCloseRegist(dispatch, action) {
	return http({
		url:config.baseUrl + 'backend/v1/config/safety/regist',
		type:'put',
		data:{
			action: action
		}
	},dispatch).done((data, msg) => {
		message.success(msg);
	})
}

/*
	开发注册
*/
export function openRegist(dispatch){
	return openOrCloseRegist(
		dispatch,
		'open'
	)
}

/*
	关闭注册
*/
export function closeRegist(dispatch){
	return openOrCloseRegist(
		dispatch,
		'close'
	)
}

/*
	获取安全策略信息
*/
export function getSaveInfo(dispatch) {
	return http({
		url:apiUrl + 'backend/v1/config/safety',
		type:'get'
	},dispatch)
}


/*
	操作团队设置
	action: open , close ,set-num
*/

function setTeamSetting(dispatch, action, teamNum) {
	return http({
		url:config.baseUrl + 'backend/v1/config/safety/tenants',
		type:'put',
		data:{
			action: action,
			tenant_num: teamNum
		}
	}, dispatch).done((data, msg) => {
		message.success(msg);
	})
}

/*

	开启团队创建
*/

export function openCreateTeam(dispatch){
	return setTeamSetting(
		dispatch,
		'open'
	)
}

/*

	关闭团队创建
*/

export function closeCreateTeam(dispatch){
	return setTeamSetting(
		dispatch,
		'close'
	)
}

/*
	设置创建团队个数
*/
export function setTeamNum(dispatch, teamNum){
	return setTeamSetting(
		dispatch,
		'set-num',
		teamNum
	)
}


/*
	获取logo设置
*/
export function getLogo(dispatch) {
	return http({
		url:config.baseUrl + 'backend/v1/config/logo',
		type:'get'
	},dispatch)
}

/*
	获取github设置
*/
export function getGithub(dispatch) {
	return http({
		url:config.baseUrl + 'backend/v1/config/github',
		type:'get'
	},dispatch)
}

/*
	获取gitlub设置
*/
export function getGitlab(dispatch) {
	return http({
		url:config.baseUrl + 'backend/v1/config/gitlab',
		type:'get'
	},dispatch)
}
/*
	添加github
*/
export function addGithub(dispatch, data) {
	return http({
		url:config.baseUrl + 'backend/v1/config/github',
		type:'post',
		data:data
	},dispatch).done((data, msg) => {
		message.success(msg)
	})
}

/*
	修改github
*/
export function editGithub(dispatch, data) {
	return http({
		url:config.baseUrl + 'backend/v1/config/github',
		type:'put',
		data:data
	},dispatch).done((data, msg) => {
		message.success(msg)
	})
}

/*
	添加gitlab
*/
export function addGitlab(dispatch, data) {
	return http({
		url:config.baseUrl + 'backend/v1/config/gitlab',
		type:'post',
		data:data
	},dispatch).done((data, msg) => {
		message.success(msg)
	})
}

/*
	修改gitlab
*/
export function editGitlab(dispatch, data) {
	return http({
		url:config.baseUrl + 'backend/v1/config/gitlab',
		type:'put',
		data:data
	},dispatch).done((data, msg) => {
		message.success(msg)
	})
}


/*
	
	打开或关闭 github/gitlab	

*/

function codeLink(dispatch, type, action){
	return http({
		url:config.baseUrl + 'backend/v1/config/code/link',
		type:'post',
		data:{
			type: type,
			action: action
		}
	},dispatch).done((data, msg) => {
		message.success(msg)
	})
}

/*
	打开github
*/

export function openGithub(dispatch) {
	return codeLink(dispatch, 'github', 'open')
}

/*
	关闭github
*/

export function closeGithub(dispatch) {
	return codeLink(dispatch, 'github', 'close')
}

/*
	打开gitlab
*/

export function openGitlab(dispatch) {
	return codeLink(dispatch, 'gitlab', 'open')
}

/*
	关闭gitlab
*/

export function closeGitlab(dispatch) {
	return codeLink(dispatch, 'gitlab', 'close')
}

