import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Table, Icon} from 'antd';
import {Link} from 'react-router-dom';


class About extends Component {
	render(){
		return (
			<div>
				<Link to="/home">to home</Link>
			</div>
		)
	}
}


function mapStateToProps(state, props){
	return {
		
	}
}


export default connect(mapStateToProps)(About)