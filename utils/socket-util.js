/*
	
	当对应用进行重新部署、启动、关闭、回滚等操作时会先去服务器请求一个操作事件eventId
	请求成功后会根据这个eventId发起ajax进行相应的操作
	操作成功后可以用webSocket来获取对应的操作日志信息， 需要把eventId send给服务器
	这个类就是对本webSocket的封装, 该类不会对需要的参数做校验

	本类依赖TimerQueue工具类
*/

import TimerQueue from './timerQueue';
function noop(){}

function LogSocket(option){
	option = option || {};
	this.option = option;
	this.url = option.url;
	this.destroyed = false;
	this.eventId = option.eventId;
	this.onOpen = option.onOpen || noop;
	this.onMessage = option.onMessage || noop;
	this.onError = option.onError || noop;
	this.onClose = option.onClose || noop;
	this.onError = option.onError || noop;
	this.onSuccess = option.onSuccess || noop;
	this.onComplete = option.onComplete || noop;
	this.onFail = option.onFail || noop;
	this.timerQueue = new TimerQueue({
		onExecute:this.onMessage
	})
	this.connect();
}

LogSocket.prototype = {
	constructor: LogSocket,
	connect:function(){
		var self  = this;
		this.webSocket = new WebSocket(this.url);
		this.webSocket.onopen = this._onOpen.bind(this);
		this.webSocket.onmessage = this._onMessage.bind(this);
		this.webSocket.onclose = this._onClose.bind(this);
		this.webSocket.onerror = this._onError.bind(this);
	},
	getSocket: function() {
		return this.webSocket;
	},
	close: function(){
		this.webSocket.close();
	},
	_onOpen: function(evt) {
		this.webSocket.send("event_id=" + this.eventId);
		this.onOpen();
	},
	_onMessage: function(evt) {
		//代表连接成功， 不做任何处理
		if(evt.data === 'ok'){

		} else{
			var data = JSON.parse(evt.data);
			console.log(data)
			if(data.message !== 'ping'){
				this.timerQueue.add(data);
			}
			
		}
	},
	_onClose: function(evt) {
		this.onClose();
		console.log('close');
		if(!this.destroyed){
			this.connect();
		}
	},
	_onError: function() {
		this.onError();
	},
	destroy: function(){
		this.destroyed = true;
		this.webSocket.close();
		if(this.option.onDestroy){
			this.option.onDestroy();
		}
	}
}

export default LogSocket;