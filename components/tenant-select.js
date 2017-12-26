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

const geTenant = delay(function(dispatch, tenant, regionId, success){
  http({
        showLoading:false,
        url:config.baseUrl + 'region-center/regions/'+regionId+'/tenants/query',
        type:'get',
        data:{
          tenant_name: tenant
        }
      }, dispatch).done(function(data){
        
         success && success(data)
      })
}, 300)



class userSelect extends Component {
  constructor(props){
  	super(props);
    const value = this.props.value || {};
  	this.state = {
  	    data: [],
  	    tenant: value.tenant ||''
  	}
	  this.handleChange = this.handleChange.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const value = nextProps.value;
      this.setState(value);
    }
  }
  handleChange (tenant, isLoad) {
  	var self = this;
  	var oldValue = this.state.tenant;

    var inputTenant = this.state.data.filter(function(data) {
        return data.tenant_name === tenant;
    })

    var showTenant = inputTenant[0] ? inputTenant[0].tenant_name : tenant;
    this.setState({tenant: showTenant});
    this.props.onChange({tenant: showTenant, tenantId: inputTenant[0]? inputTenant[0].tenant_id:''});
    if(isLoad !== false){
	    	geTenant(
           this.props.dispatch,
           tenant,
           this.props.regionId,
           (data) => {
             this.setState({ data: data.list||[] })
           }
        )
    }
  
  }
  componentWillUnmount(){
  	this.setState({data:[], tenant:''})
  }
  render() {
    const options = this.state.data.map(d => <Option key={d.tenant_name} value={d}>{d}</Option>);
    return (
      <Select
        combobox
        value={this.state.tenant}
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