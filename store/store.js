import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';
import {fromJS, Map} from 'immutable';

const initState = {
	isInitAdmin:null,
	userInfo:null,
	//当前是否在请求状态
	isAppLoading:false,
	//app初始化数据是否加载完成
	initDataLoaded:false,
	//home列表选中的数据keys
	homeSelectedKeys:[],
	//数据中心详情列表
	dataCenterList:[],
	//home列表分页配置
	homeTablePagination:{
		current:1,
		total:0,
		pageSize:50
	},
	//集群列表
	clusterList:[
	],
	codeLibList:[
		{
			id:1,
			name: 'gitHub',
			connected: false
		},
		{
			id:2,
			name: 'gitLub',
			connected: false
		}
	],
	//数据中心节点类型
	nodeType:[{
		value: 'compute',
		text: '计算节点'
	},{
		value: 'manage',
		text: '管理节点'
	},{
		value: 'storage',
		text: '存储节点'
	}],
	nodeStatus:[{
		text: '未安装计算节点组件',
		value: false
	},{
		text: '已安装计算节点组件',
		value: true
	}],
	//用户管理列表
	userList:[],
	//云帮控制台访问地址
	console_url:''
}


const store = createStore(reducer, initState, applyMiddleware(thunk));
export default store;