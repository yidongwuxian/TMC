var $ =  require('../libs/jquery.min');
import { message } from 'antd';
import cookie from './cookie-util';


/*
 * 通用ajax服务
 * */

//瞬间请求的次数
let total_loading = 0;
function showLoading(dispatch){

	if(!dispatch) return;

	if(total_loading  === 0){
		dispatch && dispatch({
			type:'SHOW_LOADING'
		})
	}
	total_loading ++;
}
function hiddenLoading(dispatch){
	if(!dispatch) return;
	total_loading --;

	if(total_loading <= 0){
		dispatch && dispatch({
			type:'HIDDEN_LOADING'
		})
	}
}


var filters = [];
//用于配置
var config = window.httpConfig = {
		beforeLoad:function(dispatch){
			showLoading(dispatch);
		},
		afterLoad:function(dispatch){
			
			hiddenLoading(dispatch);
		},
		addFilters:function(handle){
			if(handle){
				filters.push(handle);
			}
		}
		
};

//当前正在请求的ajax的记录对象， 以url为标示
var ajaxIngCache = {
		cache:{},
		handleUrl:function(url){
			url = (url||'').replace(/\?.*/, "");
			return url;
		},
		get:function(url){
			var url = this.handleUrl(url);
			return this.cache[url];
		},
		add:function(url){
			if(!url)return;
			var url = this.handleUrl(url);
			this.cache[url] = true;
			
		},
		remove:function(url){
			var url = this.handleUrl(url);
			delete this.cache[url];
		}
}

//身份凭证
var userToken = 'Token a905b993b5035122abe7be3a5c13ce2e55047981';
var userToken = '';
function http(option, dispatch){
	 option = option || {};
	 option.type = option.type || option.method || 'get';
	 var isTipError = option.isTipError == (void 0) ? true : option.isTipError;
	 option.timeout = option.timeout || 1000 * 20; //20秒超时
	 option.multiple = option.multiple || true;//已url为标示， 是否可以同一个请求没返回之前再次发起
	 if(option.multiple === false){
		 if(!ajaxIngCache.get(option.url)){
			 ajaxIngCache.add(option.url)
		 }else{
			 return {
				 done:function(){},
				 fail:function(){}
			 }
		 }
	 }
	 //promise对象
	 var dfd = $.Deferred();
	 option.success=function(data = {}){
		 ajaxIngCache.remove(option.url);
		 if(option.showLoading !== false){
			 config.afterLoad(dispatch);
		 }
		 if(data.code == '0000') {
		 	dfd.resolve(data.data, data.msg_show);
		 }else{
		 	message.warning(data.msg_show);
		 	dfd.reject(data.data.msg_show);
		 }
		 
	 }
	 
	 option.error=function(xmlHttpRequest){
		 ajaxIngCache.remove(option.url);
		 if(option.showLoading !== false){
			 config.afterLoad(dispatch);
		 }
		 if(xmlHttpRequest.status == '403'){
		 	message.error("没有权限");
		 }else{
		 	 message.error("网络异常，请稍后再试");
		 }
		
		 dfd.reject(xmlHttpRequest);
		 
	}
	if(option.showLoading !== false){
		 config.beforeLoad(dispatch);
	}

	option.headers = {
        Authorization: userToken,
        csrftoken : cookie.get('csrftoken')
    }

	option.beforeSend = function(request) {
        request.setRequestHeader("Authorization", userToken);
    }
	 
	if(option.cache === undefined){
		//不缓存
		option.cache = false;
	}
     
	 
	$.ajax(option);
	return dfd;
 }

 http.setToken = (token) => {
 	userToken = 'Token ' +token;
 }
 http.removeToken = () => {
 	userToken = '';
 }

 http.getToken = () => {
 	return userToken;
 }

 export default http;