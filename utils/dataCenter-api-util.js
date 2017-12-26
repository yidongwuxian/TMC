

/*

数据中心 api
	
*/
import request from './request';
import config from '../config/config';
import http from './http';
import { message } from 'antd';



/*

	节点标签编辑
*/
export function editNodeTags(dispatch, dataCenterId, cluster_id, nodeUUid, labels){
	return http({
		url: config.baseUrl + 'backend/v1/regions/'+dataCenterId+'/clusters/'+cluster_id+'/nodes/'+nodeUUid+'/labels',
		type: 'post',
		data:{
			labels:JSON.stringify(labels)
		}
	}, dispatch)
}


/*
	获取全部数据中心
*/

export function getAllDataCenter(dispatch){
	return http({
		url: config.baseUrl + 'region-center/regions',
		type: 'get'
	}, dispatch)
}

/*
	获取全部数据中心列表接口
*/
export function getDataCenterList(dispatch, pageNumber, sort, filter) {
	return http({
		url:config.baseUrl + 'region-center/regions/resources/manage',
		type:'get'
	}, dispatch)
}

/*
	删除一个数据中心
*/
export function removeDataCenter(dispatch, id) {
	return http({
		url:config.baseUrl + 'region-center/regions/'+id,
		type:'delete'
	}, dispatch)
}


/*
	创建数据中心接口
*/
export function addDataCenter(data, dispatch) {
	return http({
		url: config.baseUrl + 'region-center/regions',
		type: 'post',
		data:{
			region_name: data.region_name,
			region_alias: data.region_alias,
			url: data.url,
			token: data.token
		}
	}, dispatch)
}

/*
	获取某条数据中心信息
*/
export function getDataCenterById(id, dispatch){
	return http({
		url: config.baseUrl + 'region-center/regions/'+id,
		type:'get',
		data:{
			region_id: id
		}
	}, dispatch)
}

/*
	修改数据中心接口
*/
export function editDataCenter(data, dispatch) {

	var id = data.region_id;
	delete data.region_id;
	return http({
		url: config.baseUrl + 'region-center/regions/'+ id,
		type:'put',
		data: data
	}, dispatch).done(function(data, msg){
		message.success(msg)
	})
}


function handleDataCenterOnlineOrOffline(dispatch,id, action){

	return http({
		url: config.baseUrl + 'region-center/regions/'+ id + '/status',
		type:'put',
		data: {
			action: action
		}
	}, dispatch).done(function(data, msg){
		message.success(msg)
	})
}

/* 验证数据中心接口 */
export function handleDataCenterShare(dispatch,id){

	return http({
		url: config.baseUrl + 'backend/enterprise/active-status',
		type:'get'
	}, dispatch).done(function(data){
	})
}


/* 分享数据中心 */
export function shareDataCenter(data, dispatch) {

	var id = data.region_id;
	return http({
		url: config.baseUrl + 'region-center/regions/'+ id + '/share',
		type:'post',
		data: data
	}, dispatch).done(function(data, msg){
		message.success(msg)
	})
}

/*
	上线数据中心
*/
export function onlineDataCenter (dispatch,id){
	return handleDataCenterOnlineOrOffline(
		dispatch,
		id,
		'online'
	)
}

/*
	下线数据中心
*/
export function offlineDataCenter (dispatch, id){
	return handleDataCenterOnlineOrOffline(
		dispatch,
		id,
		'offline'
	)
}

/*
	获取某个数据中心下的集群
*/
export function loadClustersById(region_id, dispatch) {
	return http({
		url: config.baseUrl + 'backend/v1/regions/'+region_id+'/clusters',
		type:'get',
		data:{
			region_id: region_id
		}
	}, dispatch)
}

/*
	获取某个数据中心下的集群列表数据， 用于列表展示
*/

export function loadClustersListById(region_id, dispatch) {
	return http({
		url: config.baseUrl + 'backend/v1/regions/'+region_id+'/clusters/resources',
		type:'get',
		data:{
			region_id: region_id
		}
	}, dispatch)
}

/*
	获取全部集群
*/

export function loadAllClusters(dispatch){
	return http({
		url: config.baseUrl + 'backend/v1/clusters',
		type:'get'
	}, dispatch)
}

/*
	获取某个数据中心下的节点
*/

export function getNodeFromDatacenter(dispatch, dataCenterId) {
	return http({
		url: config.baseUrl + 'region-center/regions/'+ dataCenterId +'/nodes',
		type:'get'
	}, dispatch)
}

/*
	获取某个数据中心 某个集群下的节点
*/

export function getNodeFromDatacenterAndCluster(dispatch, dataCenterId, clusterId) {
	return http({
		url: config.baseUrl + 'region-center/regions/'+ dataCenterId +'/clusters/'+ clusterId +'/nodes',
		type:'get'
	}, dispatch)
}

/*
	 添加节点
*/

export function addNode(dispatch, dataCenterId, data) {

	

	if(typeof data.labels == 'object'){
		try{
			data.labels = JSON.stringify(data.labels)
		}catch(e){
			console.log(e)
		}
	}

	return http({
		url:config.baseUrl + 'region-center/regions/'+ dataCenterId +'/nodes',
		type:'post',
		data: data
	}, dispatch).done((data, msg) => {
		message.success(msg)
	})
}

/*
	获取节点概览详情
*/
export function getNodeOverviewInfo(dispatch, dataCenterId, clusterId, uuid){
	return http({
		url:config.baseUrl + 'region-center/regions/'+ dataCenterId +'/clusters/'+ clusterId +'/nodes/'+uuid+'/brief',
		type:'get'
	}, dispatch)
}

/*
	获取节点详情
*/
export function getNodeInfo(dispatch, dataCenterId, clusterId, uuid){
	return http({
		url:config.baseUrl + 'region-center/regions/'+ dataCenterId +'/clusters/'+ clusterId +'/nodes/'+uuid+'/details',
		type:'get'
	}, dispatch)
}


/*
	修改节点
*/
export function editNode(dispatch, dataCenterId, clusterId, uuid, data){

	if(typeof data.labels == 'object'){
		try{
			data.labels = JSON.stringify(data.labels)
		}catch(e){
			console.log(e)
		}
	}

	return http({
		url:config.baseUrl + 'backend/v1/regions/'+ dataCenterId +'/clusters/'+ clusterId +'/nodes/'+uuid,
		type:'put',
		data: data
	}, dispatch).done((data, msg) => {
		message.success(msg);
	})
}

/*
	节点操作相关
*/
export function operateNode(dispatch, dataCenterId, clusterId, nodeUUid, action){
	return http({
		url: config.baseUrl + 'region-center/regions/'+dataCenterId+'/clusters/'+clusterId+'/nodes/'+nodeUUid+'/operate',
		type: 'post',
		data:{
			action: action
		}
	})
}

/*
	节点上线
*/
export function onLineNode(dispatch, dataCenterId, clusterId, nodeUUid){
	return operateNode(dispatch, dataCenterId, clusterId, nodeUUid, 'online')
}

/*
	节点下线
*/
export function offLineNode(dispatch, dataCenterId, clusterId, nodeUUid){
	return operateNode(dispatch, dataCenterId, clusterId, nodeUUid, 'offline')
}

/*
	节点设为可调度
*/

export function schedulable(dispatch, dataCenterId, clusterId, nodeUUid){
	return operateNode(dispatch, dataCenterId, clusterId, nodeUUid, 'reschedulable')
}

/*
	节点设为不可调度
*/

export function scheduldisable(dispatch, dataCenterId, clusterId, nodeUUid){
	return operateNode(dispatch, dataCenterId, clusterId, nodeUUid, 'unschedulable')
}

/*
	删除节点
*/
export function removeNode(dispatch, dataCenterId, clusterId, nodeUUid){

	return http({
		url:config.baseUrl + 'backend/v1/regions/'+ dataCenterId +'/clusters/'+ clusterId +'/nodes/'+nodeUUid,
		type:'delete'
	}, dispatch).done((data, msg) => {
		message.success(msg);
	})
}

/*
	获取全部节点
*/
export function getAllNode(dispatch, pageNumber, pageSize) {
	return http({
		url: config.baseUrl + 'region-center/nodes',
		type:'get',
		data:{
			page_num: pageNumber,
			page_size: pageSize
		}
	}, dispatch)
}