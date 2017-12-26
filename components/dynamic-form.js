import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Form, Input, Icon, Radio, Checkbox, Button} from 'antd';
import {Link} from 'react-router-dom';
import KvInput from './kv-input';
import DynamicText from './dynamic-text';
require("../../style/dynamic-form.css");
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const CheckboxGroup = Checkbox.Group;

var typeToForm = {}

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

const tailFormItemLayout = {
	  labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 20,
          offset: 4
        }
      }
    };


class TextInputComponent extends Component {
	constructor(props){
		super(props);
		this.state = {
			config : this.props.config || {},
			bindData: this.props.bindData || null
		}
	}
	handleChange = (e) => {
		const config = this.state.config;
		config.value = e.target.value;
		this.setState({config: config});
	}
	render(){
		return (
			<FormItem
			{...formItemLayout}
			label={this.state.config.text}
			>
				<Input type="text" value={this.state.config.value} onChange={this.handleChange} />
			</FormItem>
		)
	}
}

class RadioInputComponent extends Component {
	constructor(props){
		super(props);
		this.state = {
			config : this.props.config || {},
			bindData: this.props.bindData || null,
			index:this.getIndex(this.props.config.items, this.props.config.value)
		}
		this.childs = [];
	}
	getIndex(items=[], value){
		var values = items.map((item) => {
			return item.value;
		})

		return values.indexOf(value);
	}
	handleChange = (e) => {
		const config = this.state.config;
		config.value = e.target.value;
		this.setState({config: config, index: this.getIndex(config.items, config.value)});
	}
	saveChilds = (com) => {
		this.childs.push(com);
	}
	render(){
		const items = this.state.config.items;
		return (

			<div>
				<FormItem
				className="custom-form-item"
				{...formItemLayout}
				label={this.state.config.text}
				>
					<RadioGroup onChange={this.handleChange} defaultValue={this.state.config.value}>
					  {
					  	  items.map((item) => {
					  	  	 return (
					  	  	 	 <RadioButton value={item.value}>{item.text}</RadioButton>
					  	  	 )
					  	  })
					  }
				    </RadioGroup>
				</FormItem>
				 {
			    	items.map((item, index) => {
			    		if(item.items && item.items.length > 0){
			    			return (
			    				<div className="custom-form-item-childs" style={{display: this.state.index == index ? 'block' : 'none'}}>
			    					{
			    						item.items.map((item) => {
			    							const Com = typeToForm[item.type];
			    							return (
			    								<Com ref={this.saveChilds} config={item} form={this.props.form} />
			    							)
			    						})
			    					}
			    				</div>
			    			)
			    		}else{
			    			return '';
			    		}
			    	})
			    }
			</div>
		)
	}
}

class CheckboxInputComponent extends Component {
	constructor(props){
		super(props);
		this.state = {
			config : this.props.config || {},
			bindData: this.props.bindData || null
		}
		this.childs = [];
	}
	handleChange = (e) => {
		const config = this.state.config;
		config.value = e.target.value;
		this.setState({config: config});
	}
	saveChilds(com){
		this.childs.push(com);
	}
	render(){
		const items = this.state.config.items;
		const value = this.state.config.value||[];
		return (
			<FormItem
			className="custom-form-item"
			{...formItemLayout}
			label={this.state.config.text}
			>
				  {
				  	  items.map((item) => {
				  	  	 return (
				  	  	 	 <Checkbox checked={value.indexOf(item.value) > -1 ? true : false} value={item.value}>{item.text}</Checkbox>
				  	  	 )
				  	  })
				  }
			</FormItem>
		)
	}
}

class TextareaInputComponent extends Component {

}

class SelectInputComponent extends Component {

}


typeToForm = {
	text: TextInputComponent,
	radio: RadioInputComponent,
	checkbox: CheckboxInputComponent,
	select: SelectInputComponent,
	kvInput: KvInput,
	dynamicText: DynamicText
}



class DynamicForm extends Component {

	constructor(props){
		super(props);
		this.state = {
			items:[{
				name: 'aaa',
				text: '中文描述',
				type: 'radio',
				value : 'dnf',
				readonly: false,
				required: true,
				items : [{
					name: 'aaa',
					value: 'dnf',
					text: '中文描述',
					items:[{
						name: 'CASSANDRA_ADDRS',
						text: '111111',
						type: 'text',
						value: '127.0.0.1'
					},{
						name: 'ZOOKEEPER_ADDRS',
						text: '22222',
						type: 'text',
						value: ''
					}]
				},{
					name: 'bbb',
					value: 'dnf2',
					text: '中文描述',
					items:[{
						name: 'CASSANDRA_ADDRS',
						text: '33333',
						type: 'text',
						value: '127.0.0.1'
					},{
						name: 'ZOOKEEPER_ADDRS',
						text: '44444',
						type: 'text',
						value: '127.0.0.1'
					}]
				}]
				},{
					name: 'bbb',
					text: '中文描述',
					type: 'text',
					readonly: false,
					required: true,
					value: 'bbb'
				}
				,{
					name: 'bbb',
					text: '中文描述',
					type: 'dynamicText',
					readonly: false,
					required: true,
					value: ['bbb']
				}]
		}
		this.childs = [];
	}
	check(){
		for(var i=0;i<this.childs.length;i++){
			if(this.childs[i].check && !this.childs[i].check()){
				return false;
			}
		}
		return true;
	}
	saveCom = (com) => {
		this.childs.push(com);
	}
	handleSubmit = () => {
		if(this.check()){
			this.props.onSubmit && this.props.onSubmit();
		}
	}
	render(){
		return (
			<Form className="dynamic-form">

			    {
			    	this.state.items.map((item) => {
			    		const Com = typeToForm[item.type];
			    		return (
			    			<Com ref={this.saveCom} config={item} form={this.props.form} />
			    		)
			    	})
			    }
			    <FormItem {...tailFormItemLayout}>
		          <Button type="primary" onClick={this.handleSubmit} htmlType="submit" size="large">提交</Button>
		        </FormItem>
			</Form>
		)
	}
}


export default DynamicForm;