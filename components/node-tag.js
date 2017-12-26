import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'antd';
import TagSelect from './tag-select';



class nodeTagDialog extends Component {
	constructor(props){
		super(props);
		var labels = this.props.labels ? this.props.labels.selfdefine_labels : {};
		var selectedLabels = Object.assign(labels || {});

		for(var k in selectedLabels){
			selectedLabels[k] = 'selfdefine';
		}

		this.state = {
			labels: selectedLabels
		}
	}
	componentDidMount(){

	}
    handleChange = (labels) => {
    	this.setState({labels: labels});
    }
	onOk = () => {
		const { onOk } = this.props;
		onOk && onOk(this.state.labels);
	}
	saveTagSelect = (ref) => {
		this.ref = ref;
	}
	render(){
		const { onCancel, data, edit } = this.props;
		let editable = this.props.editable;
		if(editable === void 0){
			editable = true;
		}
		return (
			<Modal
				style={{top:20}}
				width={650}
				visible = {true}
			    title={this.props.title || 'title'}
				onCancel = {onCancel}
				footer={!editable ? null : <div><Button size={"large"} onClick={this.props.onCancel || function(){}}>取消</Button><Button size={"large"} type="primary" onClick={this.onOk || function(){}}>确定</Button></div>}

			>
				<span style={{display:'inline-block',marginBottom: '20px',color:'#ccc'}}>点击标签进行选择或取消</span>
				<TagSelect ref={this.saveTagSelect} value={this.state.labels} onChange={this.handleChange} />
			</Modal>
		)
	}
}

export default connect()(nodeTagDialog);
