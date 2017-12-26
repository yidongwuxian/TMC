import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Row, Col} from 'antd';
import Echarts from '../components/echars';
import echarUtil from '../utils/echar-util';
import { 
	getNodeMemoryCharData, 
	getNodeCpuCharData, 
	getNodeDiskCharData,
	getNodeLoadCharData
} from '../utils/node-api-util';
var $ =  require('../libs/jquery.min');

class NodeSourceChar extends Component {
	constructor(args){
		super(args);
		this.state = {
			mem: null,
			cpu: null,
			disk: null,
			load: null,
			timer:null
		}
	}
	componentWillMount(){
		this.mounted = true;
		this.loadData();
		
	}
	componentWillUnmount(){
		this.mounted = false;
	}
	loadData = () => {

		if(!this.mounted) return;

		const node = this.props.node || {};
		const region_id = node.region_id;
		const cluster_id = node.cluster_id;
		const uuid = node.uuid;

		$.when(getNodeMemoryCharData(
			null,
			region_id,
			cluster_id,
			uuid
		), getNodeCpuCharData(
			null,
			region_id,
			cluster_id,
			uuid
		), getNodeDiskCharData(
			null,
			region_id,
			cluster_id,
			uuid
		), getNodeLoadCharData(
			null,
			region_id,
			cluster_id,
			uuid
		)).done((mem, cpu, disk, load) => {
			try{
				var m = echarUtil.nodeMemory(mem[0].bean, this.state.mem);
				var c = echarUtil.nodeCpu(cpu[0].bean, this.state.cpu);
				var d = echarUtil.nodeDisk(disk[0].bean, this.state.disk);
				var l = echarUtil.nodeLoad(load[0].bean, this.state.load);
				this.setState({mem: m, cpu: c, disk: d, load: l});
			}catch(e){
				console.log(e)
			}
			

			if(this.mounted){
				setTimeout(() => {
					this.loadData()
				}, 15*1000)
			}
		})

	}

	render(){
		if(!this.state.mem || !this.state.cpu || !this.state.disk || !this.state.load){
			return null;
		}
		return (
			<div>
				<Row>
			      <Col span={12}>
			      		<Echarts style={{height: 300}} option={this.state.mem} />
			      </Col>
			      <Col span={12}>
			      	<Echarts style={{height: 300}} option={this.state.cpu} />
			      </Col>
			    </Row>
			    <Row>
			      <Col span={12}>
			      		<Echarts style={{height: 300}} option={this.state.disk} />
			      </Col>
			      <Col span={12}>
			      		<Echarts style={{height: 300}} option={this.state.load} />
			      </Col>
			    </Row>
		    </div>
		)
	}
}

export default connect()(NodeSourceChar)
