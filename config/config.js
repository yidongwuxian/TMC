let baseUrl = '';
if(process.env.NODE_ENV == 'dev') {
	baseUrl = 'http://dev.goodrain.com/';
}else if(process.env.NODE_ENV == 'test'){
	//baseUrl = 'http://manage.goodrain.com/'
	baseUrl = 'http://5000.gree8a83.goodrain.ali-hz.goodrain.net:10080/';
}else if(process.env.NODE_ENV == 'production'){
	baseUrl = '/';
}

const config = {
	baseUrl: baseUrl,
	projectName: '好雨云帮管理后台'
}
export default config