var echarts = require('echarts');
const echartUtil = {

	/*
		节点内存数据转换
	*/
	nodeMemory(bean, preoption){
		var d = bean.data || {};
		var res = d.result || [];
		var v = res[0] || {};
		var value =v.value ? v.value : [];
		var date = preoption ? preoption.xAxis.data : [];
		var data = preoption ? preoption.series[0].data : [];

		if(value.length){
			for(var i=0;i<value.length;i++){
				var now = new Date(value[i][0]*1000);
	    		date.push([now.getHours(), now.getMinutes(), now.getSeconds()].join(':'));
	   	   		data.push(value[i][1]);
			}
			
		}
		

		var option = {
		    tooltip: {
		        trigger: 'axis',
		        position: function (pt) {
		            return [pt[0], '10%'];
		        }
		    },
		    title: {
		        left: 'center',
		        text: 'memory'
		    },
		    toolbox: {
		        feature: {
		            dataZoom: {
		                yAxisIndex: 'none'
		            },
		            restore: {},
		            saveAsImage: {}
		        }
		    },
		    xAxis: {
		        type: 'category',
		        boundaryGap: false,
		        data: date
		    },
		    yAxis: {
		        type: 'value',
		        boundaryGap: [0, '100%'],
		        max: 100,
		        min: 0,
		        axisLabel:{
                    formatter: function (value) {
						return value + '%';

                    }
                }
		    },
		   
		    series: [
		        {
		            name:'内存',
		            type:'line',
		            smooth:true,
		            symbol: 'none',
		            sampling: 'average',
		            itemStyle: {
		                normal: {
		                    color: 'rgb(255, 70, 131)'
		                }
		            },
		            areaStyle: {
		                normal: {
		                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
		                        offset: 0,
		                        color: 'rgb(255, 158, 68)'
		                    }, {
		                        offset: 1,
		                        color: 'rgb(255, 70, 131)'
		                    }])
		                }
		            },
		            data: data
		        }
		    ]
		};
		return option;
	},
	/*
		节点cpu数据转换
	*/
	nodeCpu(bean={}, preoption){
		var d = bean.data || {};
		var res = d.result || [];
		var v = res[0] || {};
		var value =v.value ? v.value : [];
		var date = preoption ? preoption.xAxis.data : [];
		var data = preoption ? preoption.series[0].data : [];

		if(value.length){
			for(var i=0;i<value.length;i++){
				var now = new Date(value[i][0]*1000);
	    		date.push([now.getHours(), now.getMinutes(), now.getSeconds()].join(':'));
	   	   		data.push(value[i][1]);
			}
			
		}

		var option = {
		    tooltip: {
		        trigger: 'axis',
		        position: function (pt) {
		            return [pt[0], '10%'];
		        }
		    },
		    title: {
		        left: 'center',
		        text: 'cpu'
		    },
		    toolbox: {
		        feature: {
		            dataZoom: {
		                yAxisIndex: 'none'
		            },
		            restore: {},
		            saveAsImage: {}
		        }
		    },
		    xAxis: {
		        type: 'category',
		        boundaryGap: false,
		        data: date
		    },
		    yAxis: {
		        type: 'value',
		        boundaryGap: [0, '100%'],
		        max: 100,
		        min: 0,
		        axisLabel:{
                    formatter: function (value) {
						return value + '%';

                    }
                }
		    },
		    series: [
		        {
		            name:'cpu',
		            type:'line',
		            smooth:true,
		            symbol: 'none',
		            sampling: 'average',
		            itemStyle: {
		                normal: {
		                    color: 'rgb(255, 70, 131)'
		                }
		            },
		            areaStyle: {
		                normal: {
		                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
		                        offset: 0,
		                        color: 'rgb(255, 158, 68)'
		                    }, {
		                        offset: 1,
		                        color: 'rgb(255, 70, 131)'
		                    }])
		                }
		            },
		            data: data
		        }
		    ]
		};
		return option;
	},
	/*
		节点磁盘数据转换
	*/
	nodeDisk(bean, preoption){
		var d = bean.data || {};
		var res = d.result || [];
		var v = res[0] || {};
		var value =v.value ? v.value : [];
		var date = preoption ? preoption.xAxis.data : [];
		var data = preoption ? preoption.series[0].data : [];

		if(value.length){
			for(var i=0;i<value.length;i++){
				var now = new Date(value[i][0]*1000);
	    		date.push([now.getHours(), now.getMinutes(), now.getSeconds()].join(':'));
	   	   		data.push(value[i][1]);
			}
			
		}

		var option = {
		    tooltip: {
		        trigger: 'axis',
		        position: function (pt) {
		            return [pt[0], '10%'];
		        }
		    },
		    title: {
		        left: 'center',
		        text: 'disk'
		    },
		    toolbox: {
		        feature: {
		            dataZoom: {
		                yAxisIndex: 'none'
		            },
		            restore: {},
		            saveAsImage: {}
		        }
		    },
		    xAxis: {
		        type: 'category',
		        boundaryGap: false,
		        data: date
		    },
		    yAxis: {
		        type: 'value',
		        boundaryGap: [0, '100%'],
		        max: 100,
		        min: 0,
		        axisLabel:{
                    formatter: function (value) {
						return value + '%';

                    }
                }
		    },
		    series: [
		        {
		            name:'磁盘',
		            type:'line',
		            smooth:true,
		            symbol: 'none',
		            sampling: 'average',
		            itemStyle: {
		                normal: {
		                    color: 'rgb(255, 70, 131)'
		                }
		            },
		            areaStyle: {
		                normal: {
		                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
		                        offset: 0,
		                        color: 'rgb(255, 158, 68)'
		                    }, {
		                        offset: 1,
		                        color: 'rgb(255, 70, 131)'
		                    }])
		                }
		            },
		            data: data
		        }
		    ]
		};
		return option;
	},
	/*
		节点负载数据转换
	*/
	nodeLoad(bean, preoption){

		var d = bean.data || {};
		var res = d.result || [];
		var v = res[0] || {};
		var value =v.value ? v.value : [];
		var date = preoption ? preoption.xAxis.data : [];
		var data = preoption ? preoption.series[0].data : [];

		if(value.length){
			for(var i=0;i<value.length;i++){
				var now = new Date(value[i][0]*1000);
	    		date.push([now.getHours(), now.getMinutes(), now.getSeconds()].join(':'));
	   	   		data.push(value[i][1]);
			}
		}

		var option = {
		    tooltip: {
		        trigger: 'axis',
		        position: function (pt) {
		            return [pt[0], '10%'];
		        }
		    },
		    title: {
		        left: 'center',
		        text: '负载'
		    },
		    toolbox: {
		        feature: {
		            dataZoom: {
		                yAxisIndex: 'none'
		            },
		            restore: {},
		            saveAsImage: {}
		        }
		    },
		    xAxis: {
		        type: 'category',
		        boundaryGap: false,
		        data: date
		    },
		    yAxis: {
		        type: 'value',
		        boundaryGap: [0, '100%'],
		        max: 100,
		        min: 0,
		        axisLabel:{
                    formatter: function (value) {
						return value + '%';

                    }
                }
		    },
		    
		    series: [
		        {
		            name:'负载',
		            type:'line',
		            smooth:true,
		            symbol: 'none',
		            sampling: 'average',
		            itemStyle: {
		                normal: {
		                    color: 'rgb(255, 70, 131)'
		                }
		            },
		            areaStyle: {
		                normal: {
		                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
		                        offset: 0,
		                        color: 'rgb(255, 158, 68)'
		                    }, {
		                        offset: 1,
		                        color: 'rgb(255, 70, 131)'
		                    }])
		                }
		            },
		            data: data
		        }
		    ]
		};
		return option;
	}
}

export default echartUtil;
