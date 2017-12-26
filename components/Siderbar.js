import React, { Component } from 'react';
import { Menu, Icon, Layout } from 'antd';
import { Link } from 'react-router-dom';
const SubMenu  = Menu.SubMenu;

class Siderbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			current: '',
			openKeys: ['/resources']
		}
	}
	shouldComponentUpdate(nextProps, nextState){
		const state = this.state;
		if(state.current === nextState.current && state.openKeys === nextState.openKeys){
			return false;
		}
		return true;
	}
	
	componentWillMount(){
		const props = this.props;
		this.setOpenKeys(props);
		this.setSelected(props);
	}
	componentWillReceiveProps(nextProps) {
        
    }
	onSelect = (menu) => {
		this.setState({current: menu.key})
	}
	openMenu = v => {
        this.setState({
            openKeys: [v[v.length - 1]]
        })
    }
    setOpenKeys(props, initPath){
		const { pathname } = props.location, pathArr = pathname.split('/');
		const path = initPath ? initPath : pathArr[1];
		this.setState({openKeys: ['/resources', '/'+path]});
	}
	setSelected(props){
		const { pathname } = props.location, pathArr = pathname.split('/');
		const current = '/'+pathArr[pathArr.length-1];
		this.setState({current: current})
	}
	render() {
		return (
			<Menu
				onSelect={this.onSelect}
				mode="inline"
				onOpenChange={this.openMenu}
				selectedKeys={[this.state.current]}
				openKeys={this.state.openKeys}
				defaultOpenKeys={['/resources']}
			>
				<SubMenu key="/resources" title={<div><i className={'fa fa-database'} /><span>资源管理</span></div>}>
					<Menu.Item key="/dataCenter"><Link to="/resources/dataCenter">数据中心管理</Link></Menu.Item>
					<Menu.Item key="/allNode"><Link to="/resources/allNode">节点管理</Link></Menu.Item>
				</SubMenu>
		        
		        <Menu.Item key="/tenant"><Link to="/tenant"><i className={'fa fa-object-group'} />租户管理</Link></Menu.Item>
		        <Menu.Item key="/team"><Link to="/team"><i className={'fa fa-group'} />团队管理</Link></Menu.Item>
		        <Menu.Item key="/user"><Link to="/user"><i className={'fa fa-user'} />用户管理</Link></Menu.Item>
				<SubMenu key="/setting" title={<span><i className={'fa fa-gear'} /><span>配置管理</span></span>}>
		            <Menu.Item key="/show"><Link to="/setting/show">个性表现</Link></Menu.Item>
		            <Menu.Item key="/dataSource"><Link to="/setting/dataSource">环境对接</Link></Menu.Item>
		            <Menu.Item key="/authorize"><Link to="/setting/authorize">云帮授权</Link></Menu.Item>
		        </SubMenu>
		        <Menu.Item key="/tag"><Link to="/tag"><i className={'fa fa-puzzle-piece'} />特性管理</Link></Menu.Item>
		        <Menu.Item key="/notice"><Link to="/notice"><i className={'fa fa-bullhorn'} />公告管理</Link></Menu.Item>
			</Menu>

		)
	}
}

export default Siderbar;

