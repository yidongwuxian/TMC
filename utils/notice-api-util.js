import http from './http';
import { message } from 'antd';
import config from '../config/config';


/*
	全部标签列表接口
*/
export function getAllNoticeList(dispatch, pageNumber, pageSize) {
	return http({
		url:config.baseUrl + 'backend/v1/announcement',
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
	添加标签
*/
export function addNotice(dispatch, data){
	return http({
		type:'post',
		url:config.baseUrl + 'backend/v1/announcement',
		data:{
			content:data.content,
			a_tag_url: data.a_tag_url,
			active: data.active
		}
	}, dispatch).done((data) => {

	}).fail(() => {

	})
}

/*
	修改标签
*/
export function updateNotice(dispatch, data){
	var data = data;
	var id = data.announcement_id;
	delete data.announcement_id;
	return http({
		type:'put',
		url:config.baseUrl + 'backend/v1/announcement/' + id,
		data:{
			body: JSON.stringify(data)
		}
	}, dispatch).done((data) => {

	}).fail(() => {

	})
}


/*
	删除标签
*/
export function delNotice(dispatch, id) {
	return http({
		type:'delete',
		url:config.baseUrl + 'backend/v1/announcement/' + id
	}, dispatch).done((data) => {
		message.success(data.msg_show || '操作成功')
	}).fail(() => {

	})
}