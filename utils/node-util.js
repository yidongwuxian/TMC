const nodeType = {
	'compute': '计算节点',
	'manage' : '管理节点',
	'storage' : '存储节点'
}

const nodeUtil = {
	getNodeTypeCN: function(role=[]){
		var res = [];
		for(var i=0;i<role.length;i++){
			res.push(nodeType[role[i]] || '未知')
		}
		return res.join(',')
	}
}


export default  nodeUtil;