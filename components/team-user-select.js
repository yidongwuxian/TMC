import React, { Component } from 'react';
import {Select} from 'antd';
import { connect } from 'react-redux';
import http from '../utils/http';
import config from '../config/config';
const Option = Select.Option;

var timer = null;
function delay(fn, interval) {
    return function(){
      var args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
         fn && fn.apply(null, args);
      }, interval)
    }
} 

const searchUser = delay(function(dispatch, tenant_name, userName, success){
  http({
        showLoading:false,
        url:config.baseUrl + 'backend/v1/users/query',
        data:{
          tenant_name: tenant_name || '',
          user_name: userName
        }
      }, dispatch).done(function(data){
         success && success(data)
      })
}, 300)



class userSelect extends Component {
  constructor(props){
  	super(props);
    const value = this.props.value || '';
  	this.state = {
  	    data: [],
  	    tenantName: this.props.tenantName ||'',
        userName:value || ''
  	}
	  this.handleChange = this.handleChange.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const value = nextProps.value;
      this.setState({userName: value});
    }
  }
  handleChange (userName, isLoad) {
  	var self = this;
  	var oldValue = this.state.userName;

    var inputUser = this.state.data.filter(function(data) {
        return data.nick_name === userName;
    })

    var showUser = inputUser[0] ? inputUser[0].nick_name : userName;
    this.setState({userName: showUser});
    this.props.onChange(showUser);
    if(isLoad !== false){
	    	searchUser(
           this.props.dispatch,
           this.props.tenantName,
           userName,
           (data) => {
             this.setState({ data: data.list })
           }
        )
    }
  
  }
  componentWillUnmount(){
  	this.setState({data:[], tenant:''})
  }
  render() {
    const options = this.state.data.map(d => <Option key={d.nick_name} value={d.nick_name}>{d.nick_name}</Option>);
    return (
      <Select
        combobox
        value={this.state.userName}
        placeholder={this.props.placeholder}
        notFoundContent=""
        style={this.props.style}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onChange={this.handleChange}
      >
        {options}
      </Select>
    );
  }
}

export default connect(function(state, props) {
	return {
		
	}
})(userSelect);