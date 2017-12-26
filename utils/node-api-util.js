import http from './http';
import { message } from 'antd';
import config from '../config/config';



/*
	轮询查询节点安装时的初始化信息
*/

export function getNodeInitStatus(dispatch, dataCenterId, ip){
	return http({
		url: config.baseUrl + 'region-center/regions/'+dataCenterId+'/nodes/init-status',
		type:'get',
		data:{
			node_ip: ip
		}
	})
}

/*
	添加节点
*/
export function nodeCheck(dispatch, data) {
	var hostArr = data.host.split(":");
	var port = hostArr[1];
	var host = hostArr[0];
	return http({
		url:config.baseUrl + 'region-center/regions/'+data.dataCenterId+'/nodes/login-check',
		type:'post',
		data:{
			host: host,
			port: port,
			node_type: JSON.stringify(data.node_type),
			login_type: data.login_type,
			root_pwd: data.root_pwd
		}
	}, dispatch).done((data) => {
		
	}).fail(() => {

	})
}

/*
	获取节点安装信息
*/
export function getNodeInstallStatus(dispatch, dataCenterId, ip){
	return http({
		url: config.baseUrl + 'region-center/regions/'+dataCenterId+'/nodes/intall-status',
		type:'get',
		data:{
			node_ip: ip
		}
	}, dispatch)
}


/*
	安装节点
*/
export function installNode(dispatch, dataCenterId, ip){
	return http({
		url: config.baseUrl + 'region-center/regions/'+dataCenterId+'/nodes/intall',
		type:'post',
		data:{
			node_ip: ip
		}
	}, dispatch)
}

/*
	获取节点内存监控数据
*/
export function getNodeMemoryCharData(dispatch, region_id, cluster_id, node_uuid){
	return http({
		url: config.baseUrl + 'region-center/regions/'+region_id+'/clusters/'+cluster_id+'/nodes/'+node_uuid+'/mem',
		type:'get'
	}, dispatch)
}
/*
	获取节点cpu监控数据
*/
export function getNodeCpuCharData(dispatch, region_id, cluster_id, node_uuid){
	return http({
		url: config.baseUrl + 'region-center/regions/'+region_id+'/clusters/'+cluster_id+'/nodes/'+node_uuid+'/cpu',
		type:'get'
	}, dispatch)
}

/*
	获取节点磁盘监控数据
*/
export function getNodeDiskCharData(dispatch, region_id, cluster_id, node_uuid){
	return http({
		url: config.baseUrl + 'region-center/regions/'+region_id+'/clusters/'+cluster_id+'/nodes/'+node_uuid+'/disk',
		type:'get'
	}, dispatch)
}

/*
	获取节点负载监控数据
*/
export function getNodeLoadCharData(dispatch, region_id, cluster_id, node_uuid){
	return http({
		url: config.baseUrl + 'region-center/regions/'+region_id+'/clusters/'+cluster_id+'/nodes/'+node_uuid+'/load',
		type:'get'
	}, dispatch)
}