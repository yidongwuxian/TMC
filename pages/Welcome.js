import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Table, Icon} from 'antd';
import {Link} from 'react-router-dom';


class Welcome extends Component {
	render(){
		return (
			<h1>Welcom</h1>
		)
	}
}


function mapStateToProps(state, props){
	return {
		
	}
}


export default connect(mapStateToProps)(Welcome)