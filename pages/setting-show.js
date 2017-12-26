import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Card, Form, Upload, Icon, Input, Button, message, Modal, Breadcrumb } from 'antd';
import { getConfigTitle, editConfigTitle, getLogo } from '../utils/config-api-util';
import config from '../config/config';
import {Link} from 'react-router-dom';
import http from '../utils/http';

const FormItem = Form.Item;

const uploadButton = (
  <div>
    <Icon type="plus" />
    <div className="ant-upload-text">上传logo</div>
  </div>
);

class SettingShow extends Component {
	constructor(props){
		super(props);
		this.state = {
			fileList: [],
			title:'',
			//用户输入的标题
			inputTitle:'',
			titleDisabled: true,
			previewVisible: false
		}
	}
	componentDidMount(){
		
	}
	componentWillMount(){
		this.getTitle();
		this.getLogo();
	}
	componentWillUnmount(){

	}
	getLogo(){
		getLogo(this.props.dispatch).done((data) => {
			this.setState(
				{
					fileList:[
						{
							uid: 2,
	    					name: 'logo',
	    					status: '',
	    					url: 'http://'+data.bean.logo
    					}
    				]
    			}
    		)
		})
	}
	getTitle (){
		var self = this;
		getConfigTitle(this.props.dispatch).done(function(data){
			self.setState({title: data.bean.title||'', inputTitle: data.bean.title||''})
		})
	}
	handlePreview = (file) => {
	    this.setState({
	      previewImage: file.url || file.thumbUrl,
	      previewVisible: true
	    });
	  }
	handleChange = ({ fileList }) =>{
		var file = fileList[0];

		this.setState({fileList})

	}
	handleEdit = () => {
		this.setState({titleDisabled: false})
	}
	onTitleChange = (e) => {
		this.setState({inputTitle: e.target.value})
	}
	handleEditSubmit = () => {
		const { inputTitle } = this.state;
		if(!inputTitle){
			message.warning('请输入标题');
			return;
		}
		editConfigTitle(this.props.dispatch, inputTitle).done((data) => {
			this.setState({titleDisabled: true, title: inputTitle});
			message.success('标题修改成功！')
		})
		
	}
	handleCancelEditTitle = () => {
		this.setState({titleDisabled: true, inputTitle: this.state.title});
	}
	handleCancel = () => this.setState({ previewVisible: false })

	handlePreview = (file) => {
	    this.setState({
	      previewImage: file.url || file.thumbUrl,
	      previewVisible: true
	    });
	}
	render(){
		const {file, fileList, titleDisabled, title, inputTitle, previewImage, previewVisible } = this.state;
		return (
			<div className="setting-data-source">	
				<Breadcrumb  separator=">" style={{background:'#fff'}}>
					<Breadcrumb.Item><Icon type="home" />{config.projectName}</Breadcrumb.Item>
				    <Breadcrumb.Item>配置管理</Breadcrumb.Item>
				    <Breadcrumb.Item>个性表现</Breadcrumb.Item>
				</Breadcrumb>
				<Card title="Logo设置">
					<Upload
					  className="logo-uploader"
					  headers = {{Authorization: http.getToken()}}
					  name="logo"
					  accept="image/jpg,image/jpeg,image/png"
			          action={config.baseUrl+ 'backend/v1/config/logo'}
			          listType="picture-card"
			          fileList={fileList}
			          onPreview={this.handlePreview}
			          onChange={this.handleChange}
			        >
			          {fileList.length > 0 ? null : uploadButton}
			        </Upload>
			        <span style={{display:'block', clear:'both', fontSize: 12}}>文件格式:png | jpg ,  图片大小: 不超过50k, 图片尺寸: 182 x 52</span>
				</Card>
				<Card title="title设置">
					<Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
			          <img style={{ width: '100%' }} src={previewImage} />
			        </Modal>
					<Input onChange={this.onTitleChange} value={inputTitle} disabled={titleDisabled} style={{width: 200, marginRight: 10}} placeholder="请输入标题" />
					{titleDisabled && <Button onClick={this.handleEdit} type="primary">修改</Button>}
					{!titleDisabled && <Button onClick={this.handleEditSubmit} type="primary">确定</Button>}
					{!titleDisabled && <Button onClick={this.handleCancelEditTitle} style={{marginLeft: '6px'}}>取消</Button>}
				</Card>
			</div>
		)
	}
}

function mapStateToProps(state, props){
	return {
		
	}
}
export default connect(mapStateToProps)(SettingShow)