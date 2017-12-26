import http from './http';
import { setUserList } from '../actions/user-action';
import config from '../config/config';
var $ =  require('../libs/jquery.min');



/*
	根据团队和数据中心查询租户列表
*/
export function getTenantList(dispatch, tenant, dataCenterId, pageNumber, pageSize){
	return http({
		url:config.baseUrl + 'region-center/regions/'+dataCenterId+'/tenants/',
		type: 'get',
		data:{
			tenant_name: tenant,
			page_num: pageNumber,
			page_size: pageSize
		}
	}, dispatch)
}

