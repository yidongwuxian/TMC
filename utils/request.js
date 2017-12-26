/*
异步请求包装函数，  封装一些通用的逻辑　
*/

//瞬间请求的次数
let total_loading = 0;
function showLoading(dispatch){
	if(total_loading  === 0){
		dispatch({
			type:'SHOW_LOADING'
		})
	}
	total_loading ++;
}
function hiddenLoading(dispatch){
	total_loading --;
	if(total_loading <= 0){
		dispatch({
			type:'HIDDEN_LOADING'
		})
	}
}
function request(config={}, dispatch){
	const url = config.url||''
	const option = config.option||{};
	option.credentials = option.credentials || 'include';
	const isShowLoading = option.isShowLoading === void 0 ? true : option.isShowLoading;
	delete option.isShowLoading;

	if(isShowLoading && dispatch){
		showLoading(dispatch);
		
	}

	return fetch(url, option).then(function(){
		if(isShowLoading && dispatch){
			hiddenLoading(dispatch)
		}

	}, function(){
		if(isShowLoading && dispatch){
			dispatch({
				type:'HIDDEN_LOADING'
			})
		}
	})
}

export default request;