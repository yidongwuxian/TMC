import request from '../utils/request';


export function setHomeList(list = []) {
	return {
		type: 'SET_HOME_LIST_DATASOURCE',
		list: list
	}
}

