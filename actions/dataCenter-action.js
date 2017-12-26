import request from '../utils/request';
import { loadClustersListById, loadAllClusters, getDataCenterList,  stopHomeApi, loadHomeListApi } from '../utils/dataCenter-api-util';



//请求home table列表资源
export function loadDataCenterList() {
	return (dispatch, getState) => {
		getDataCenterList(dispatch).done(function(data){
			dispatch(setDataCenterList(data.list));
		})
	}
}

export function setDataCenterList(list = []) {
	return {
		type: 'SET_DATACENTER_LIST',
		list
	}
}


export function setHomeList(list = []) {
	return {
		type: 'SET_HOME_LIST_DATASOURCE',
		list: list
	}
}

export function setSelectedKeys(selectedKeys = []) {
	return {
		type: 'SET_HOME_SELECTED_KEYS',
		selectedKeys
	}
}

export function setHomePagination(pagination) {
	return (dispatch, getState) => {
		dispatch({
			type: 'SET_HOME_PAGINATION',
			pagination
		})
	}
}

/*
	 获取某个数据中心下的集群
*/
export function getClustersListById(id) {
	return (dispatch, getState) => {
		loadClustersListById(
			id, dispatch
		).done(function(data){
			dispatch({
				type: 'SET_CLUSTER_LIST',
				list:data.list ||[]
			})
		})
	}
}

/*
	获取全部集群
*/
export function getAllClustersList() {
	return (dispatch, getState) => {
		loadAllClusters(
			dispatch
		).done(function(data){
			dispatch({
				type: 'SET_CLUSTER_LIST',
				list:data.list ||[]
			})
		})
	}
}