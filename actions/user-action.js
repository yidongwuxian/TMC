import request from '../utils/request';
import { stopHomeApi, loadHomeListApi } from '../utils/user-api-util';


export function setUserList(list=[]){
	return {
		type: 'SET_USER_LIST',
		list
	}
}
