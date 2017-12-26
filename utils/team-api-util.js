import http from './http';
import config from '../config/config';



/*
	添加团队
*/
export function addTeam(dispatch, tenant, useable_regions){
	return http({
		url:config.baseUrl + 'backend/v1/teams',
		type: 'post',
		data:{
			tenant_name: tenant,
			useable_regions:useable_regions
		}
	}, dispatch)
}


export function getTeamList(dispatch, page_num, page_size){
	return http({
		url:config.baseUrl + 'backend/v1/teams',
		type: 'get',
		data:{
			page_num: page_num,
			page_size:page_size
		}
	}, dispatch)
}

export function searchTeam(dispatch, teamName){
	return http({
		url:config.baseUrl + 'backend/v1/teams/'+teamName,
		type: 'get'
	}, dispatch)
}

export function searchTeamUser(dispatch, teamName, userName){
	return http({
		url:config.baseUrl + 'backend/v1/teams/'+teamName+'/users/'+userName,
		type: 'get'
	})
}

export function getTeamUserList(dispatch, teamName){
	return http({
		url:config.baseUrl + 'backend/v1/tenants/'+teamName+'/users',
		type: 'get'
	}, dispatch)
}

export function addTeamMember(dispatch, teamName, userName) {
	return http({
		url:config.baseUrl + 'backend/v1/teams/'+teamName+'/add-user',
		type: 'post',
		data:{
			user_name: userName
		}
	}, dispatch)
}

/*
	userIds: id1,id2,id3
*/
export function removeTeamMember(dispatch, teamName, userIds){
	return http({
		url:config.baseUrl + 'backend/v1/tenants/'+ teamName +'/users/batch/delete',
		type: 'delete',
		data:{
			user_ids: userIds
		}
	}, dispatch).done((data) => {

	})
}


