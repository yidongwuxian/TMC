import React, { Component } from 'react';
import { Form, Checkbox, Row, Col, Select, Input, Button } from 'antd';
import { connect } from 'react-redux';
const FormItem = Form.Item;

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



class DynamicText extends Component {
	constructor(props) {
		super(props);
		this.state = {
			config:this.props.config || {}
		}
	}
	add = () => {
		const config = this.state.config;
		var values = config.value;
		values.push("");
		this.setState({config: config});
	}
	remove = (index) => {
		const config = this.state.config;
		var values = config.value;
		values.splice(index, 1);
		this.setState({config: config});
	}
	handleChange = (index, e) => {
		const config = this.state.config;
		var values = config.value;
		values.splice(index, 1, e.target.value);
		this.setState({config: config});
	}
	render() {
		const values = this.state.config.value;
		return (
			<FormItem
			{...formItemLayout}
			label={this.state.config.text}
			>
				{
					values.map((item, index) => {
						 return (<Row key={index}>
							      <Col span={18}><Input onChange={this.handleChange.bind(this, index)} value={item} /></Col>
							      <Col span={6} style={{textAlign: 'center'}}>
							      	  {index == 0 ? <Button onClick={this.add} type="primary">添加</Button> : <Button onClick={this.remove.bind(this, index)}>删除</Button>}
							      </Col>
							   </Row>)
					})
				}
			</FormItem>
		)
	}
}


export default DynamicText;
