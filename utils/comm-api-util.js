

/*

通用 api
	
*/
import request from './request';
import config from '../config/config';
import http from './http';
import { message } from 'antd';



/*

	获取云帮url地址
*/
export function getConsoleUrl(dispatch){
	return http({
		url: config.baseUrl + 'backend/console/url',
		type: 'get'
	}, dispatch)
}
