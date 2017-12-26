import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Form, Input, Icon, Radio} from 'antd';
import {Link} from 'react-router-dom';
import TenantSelect from './tenant-select';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;


const mapToArr  = (map={}) => {
	let arr = [];
	for(var k in map){
		let val = map[k];
		let key = k;
		arr.push({
			key: key,
			val: val
		})
	}
	return arr;
}

class InputComponent extends Component {
	constructor(props){
		super(props);
		this.state = {
			value : this.props.value || ''
		}
	}
	handleChange(){

	}
}



class RadioComponent extends Component {
	constructor(props){
		super(props);
		const items = mapToArr(this.props.items);
		const defaultValue = this.props.defaultValue;
		const childDefaultValue = this.props.childDefaultValue;
		const index = this.getIndex(items, defaultValue)
		this.state = {
			items: items,
			value: defaultValue || '',
			childValue:childDefaultValue || {},
			index: index == -1 ? 0 : index
		}
		this.childs = [];
	}
	getIndex(items=[], key){
		for(var i= 0;i<items.length;i++){
			if(items[i].key == key){
				return i;
			}
		}
		return -1;
	}
	handleChange = (e) => {
		this.setState({
			value: e.target.value,
			index:this.getIndex(this.state.items, e.target.value)
		})
	}
	getInputDefaultVal(key){
		return this.state.childValue[key] || '';
	}
	saveRef(com){
		this.childs.push(com)
	}
	render(){
		const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, getFieldValue } = this.props.form;
		const disabled = this.props.disabled;
		return (
			<div className="radio-component-wrap">
				<RadioGroup defualtValue={this.state.value} onChange={this.handleChange}>
					{
						this.state.items.map((item) => {
							return (
								<RadioButton disabled={disabled} checked={item.key == this.state.value} value={item.key}>{item.key}</RadioButton>
							)
						})
					}
				</RadioGroup>

				<div className="radio-component-child">
					{
						this.state.items.map((item, index) => {
							return (
								<Form style={{display: this.state.index == index ? 'block' :'none'}}  className="radio-component-child-item">
									{
										item.val.map((ite) => {
											return (
												<FormItem
												label={ite}
												>
													 {getFieldDecorator('password', {
											            rules: [{ required: true, message: '必填!' }],
											          })(
											            <Input ref={this.saveRef} name={ite} onChange={this.onInputChange} disabled={disabled} defaultValue={this.getInputDefaultVal(ite)}  />
											          )}
													
												</FormItem>
											)
										})
									}
								</Form>
							)
	
						})
					}
				</div>
			</div>
		)
	}
}



class CreateTagForm extends Component {
	constructor(props){
		super(props);
		const formItem = this.props.formItem;
		this.state = {
			name: this.props.name,
			val: this.props.val
		}
	}
	render(){
		const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, getFieldValue } = this.props.form;
		const formItemLayout = {
	      labelCol: {
	        xs: { span: 24 },
	        sm: { span: 4 }
	      },
	      wrapperCol: {
	        xs: { span: 24 },
	        sm: { span: 18 }
	      }
	    };
	    const optional_type = this.state.val.optional_type;
	    const values = this.state.val.values;
	    const disabled = !this.state.val.is_configurable;
	    const childDefaultValue = this.state.val.opts;
	    const defaultValue = this.state.val.type;

		return (
			<Form>
				<FormItem
				{...formItemLayout}
				label={this.state.name}
				>
					{
						values.length > 0 ? 
							values.join(',') 
						:
						''
					}

					{
						values.length <= 0 ?
							
							  <RadioComponent 
							    form = {this.props.form}
							    items={optional_type} 
							    disabled={disabled}
							    defaultValue={defaultValue}
							    childDefaultValue={childDefaultValue}
							  />
						:''
					}
				</FormItem>
			</Form>
		)
	}
}

const createTagForm = Form.create()(CreateTagForm);


export default createTagForm;