import http from './http';
import { message } from 'antd';
import { setUserList } from '../actions/user-action';
import config from '../config/config';


/*
	全部标签列表接口
*/
export function getAllTagList(dispatch, pageNumber, pageSize) {
	return http({
		url:config.baseUrl + 'backend/v1/labels',
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
	标签搜索
*/
export function searchLabel(dispatch, label) {
	return http({
		url:config.baseUrl + 'backend/v1/query/label',
		type:'get',
		data:{
			label_alias: label
		}
	}, dispatch).done((data) => {
		
	}).fail(() => {

	})
}


/*
	添加标签
*/
export function addTag(dispatch, label_alias){
	return http({
		type:'post',
		url:config.baseUrl + 'backend/v1/labels',
		data:{
			label_alias:label_alias
		}
	}, dispatch).done((data) => {

	}).fail(() => {

	})
}


/*
	删除标签
*/
export function delTag(dispatch, tagId) {
	return http({
		type:'delete',
		url:config.baseUrl + 'backend/v1/labels/' + tagId
	}, dispatch).done((data) => {
		message.success(data.msg_show || '操作成功')
	}).fail(() => {

	})
}