import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Icon, Popconfirm, Button} from 'antd';
import { onlineDataCenter, offlineDataCenter,shareDataCenter, removeDataCenter,handleDataCenterShare } from '../utils/dataCenter-api-util';
import { PieChart, Pie, Sector, Cell, Tooltip,Text, Legend  } from 'recharts';
import EditDataCenter from './EditShareDataCenter';
import EditFalseDataCenter from './EditShareFalseDataCenter';


const TipConent = React.createClass({
	render () {
		const { active } = this.props;
		if(active){
			const { payload, label } = this.props;
		  	return (
		  		<div className="custom-tooltip">
		          
		        </div>
		    );
		}
		

	    return null;
	 }
})



class DataCenterTable extends Component {
	constructor(props){
		super(props);
		this.state = {
			editDataId: null,
			showtip : null

		}
	}
	handleDelete = (data) => {
		const { handleDel } = this.props;
		handleDel && handleDel(data);
	}
	handleEdit = (data) => {
		const { handleEdit } = this.props;
		handleEdit && handleEdit(data);
	}
	handleShare = (data) => {
		console.log(data);
		handleDataCenterShare(
			this.props.dispatch,
			data.region_id
		).done((datas) => {
			var loadList = this.props.loadList;
			loadList && loadList();
			var isActive = datas.bean.is_active;
			isActive ==  true ? this.setState({editDataId: data.region_id}) : this.setState({showtip: data.enterprise_id});
		})
	}
	handleRemove = (data) => {
		removeDataCenter(
			this.props.dispatch,
			data.region_id
		).done(()=>{
			var loadList = this.props.loadList;
			loadList && loadList();
		})
	}
	handleShareOk =() =>{
		this.setState({editDataId: null});
		var loadList = this.props.loadList;
		loadList && loadList();
	}
	handleShareCanel =() =>{
		this.setState({editDataId: null})
	}
	handletipCanel =() =>{
		this.setState({showtip: null})
	}
	handleOnline = (data) => {
		onlineDataCenter(
			this.props.dispatch,
			data.region_id
		).done(() => {
			var loadList = this.props.loadList;
			loadList && loadList();
		})
	}
	handleOffline = (data) => {
		offlineDataCenter(
			this.props.dispatch,
			data.region_id
		).done(() => {
			var loadList = this.props.loadList;
			loadList && loadList();
		})
	}
	render() {
		const columns = [{
		  title: '名称',
		  dataIndex: 'region_alias',
		  render: (text, data) => {
		  	return (
		  	
		  		data.status === 'failure' ? text : <Link to={'/resources/'+ data.region_id + '/' + data.region_alias +'/node'}>{text}</Link>
		  	
		  	)
		  }
		},{
		  title: '节点数量',
		  dataIndex: 'node_num'
		}, {
		  title: '租户数量',
		  dataIndex: 'tenant_num'
		},{
			title: 'CPU统计',
			dataIndex: 'cpu',
			render:(text, datas) => {
				const hasData = (datas.left_cpu+datas.used_cpu) > 0
				const data = [{name: '剩余', value: datas.left_cpu, color:'#eeeff2'}, {name: '已用', value: datas.used_cpu, color:'#8374cd'}];
				const RADIAN = Math.PI / 180;
				const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
				  const radius = innerRadius + (outerRadius - innerRadius) * 0.3;
				  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
				  const y = cy  + radius * Math.sin(-midAngle * RADIAN);
				  
				  return (
				    <text scaleToFit={true} x={x} y={y} fill="#000" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
				    	{`${(percent * 100).toFixed(0)}%`}
				    </text>
				  );
				};
				return (
					<div>
					{
						hasData ? <div style={{textAlign:'center', fontSize: '12px', width: '260px'}}>
								<div className="table-char-wrap" style={{verticalAlign:'middle', display: 'inline-block', position:'relative', marginRight: '20px'}}>
									<PieChart width={90} height={90}>
								        <Pie 
								          data={data} 
								          cx={45} 
								          cy={45} 
								          innerRadius={30}
								          outerRadius={40}
								          fill="#8884d8"
								         >
								         	
								         	{
										        data.map((entry, index) => <Cell fill={entry['color']}/>)
										    }
								         </Pie>
								         <Tooltip />
								    </PieChart>
								 </div>
								 <div style={{display: 'inline-block',verticalAlign:'middle', textAlign: 'left'}}>
								 	<p>
								 	  <span style={{background: data[0].color, display: 'inline-block', width:'10px', height: '10px', marginRight: '10px'}}></span>
								 	  <span style={{display: 'inline-block', marginRight: '10px'}}>
								 	  		{data[0].name}
								 	  </span>
								 	  <span>{data[0].value}核 ({Math.round(data[0].value/(data[0].value+data[1].value) * 100) + '%'})</span>
								 	</p>
								 	<p>
								 		<span style={{background: data[1].color, display: 'inline-block', width:'10px', height: '10px',marginRight: '10px'}}></span>
								 	    <span style={{display: 'inline-block', marginRight: '10px'}}>
								 	  		{data[1].name}
								 	  	</span>
								 	    <span>{data[1].value}核 ({Math.round(data[1].value/(data[0].value+data[1].value) * 100) + '%'})</span>
								 	</p>
								 </div>
							 </div>
						:""
					}
					</div>
				)
				

			}
		}, {
			title:'内存统计',
			dataIndex: 'total_memory',
			render: (text, datas) => {
				const hasData = (datas.total_memory) > 0
				const data = [{name: '剩余', value: datas.left_memory, color:'#eeeff2'}, {name: '已用', value: datas.used_memory, color: '#478afe'}];
				const COLORS = ['#00C49F', '#FF8042'];

				const RADIAN = Math.PI / 180;                    
				const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
				  const radius = innerRadius + (outerRadius - innerRadius) * 0.3;
				  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
				  const y = cy  + radius * Math.sin(-midAngle * RADIAN);
				  
				  return (
				    <text scaleToFit={true} x={x} y={y} fill="#000" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
				    	{`${(percent * 100).toFixed(0)}%`}
				    </text>
				  );
				};

				return (
					<div>
					{
						hasData ? <div style={{textAlign:'center', fontSize: '12px', width: '260px'}}>
								<div className="table-char-wrap" style={{verticalAlign:'middle', display: 'inline-block', position:'relative', marginRight: '20px'}}>
									<PieChart width={90} height={90}>
								        <Pie 
								          data={data} 
								          cx={45} 
								          cy={45} 
								          innerRadius={30}
								          outerRadius={40}
								          fill="#8884d8"
								         >
								         	
								         	{
										        data.map((entry, index) => <Cell fill={entry['color']}/>)
										    }
								         </Pie>
								         <Tooltip />
								    </PieChart>
								 </div>
								 <div style={{display: 'inline-block',verticalAlign:'middle', textAlign: 'left'}}>
								 	<p>
								 	  <span style={{background: data[0].color, display: 'inline-block', width:'10px', height: '10px', marginRight: '10px'}}></span>
								 	  <span style={{display: 'inline-block', marginRight: '10px'}}>
								 	  		{data[0].name}
								 	  </span>
								 	  <span>{data[0].value}G ({Math.round(data[0].value/(data[0].value+data[1].value) * 100) + '%'})</span>
								 	</p>
								 	<p>
								 		<span style={{background: data[1].color, display: 'inline-block', width:'10px', height: '10px',marginRight: '10px'}}></span>
								 	    <span style={{display: 'inline-block', marginRight: '10px'}}>
								 	  		{data[1].name}
								 	  </span>
								 	    <span>{data[1].value}G ({Math.round(data[1].value/(data[0].value+data[1].value) * 100) + '%'})</span>
								 	</p>
								 </div>
							 </div>
						:""
					}
					</div>
				)
			}
		}, {
			title: '操作',
			dataIndex: 'caozuo',
			render:(text, data) => {
				return (
				    data.status === 'failure' ? '' :
					<div style={{textAlign: 'left'}}>
						{
					   	   data.share_status == 'unshared' ?
						   	<Button href="javascript:;" onClick={this.handleShare.bind(this, data)} data-isid={data.region_id}>分享</Button>
						   :
						   <Button href="javascript:;" data-isid={data.region_id}>已分享</Button>
					    }

					   {
					   	   data.status == '1' ?
					   	   <Popconfirm onConfirm={this.handleOffline.bind(this, data)} title="你确定要下线此数据中心吗？" okText="确定" cancelText="取消">
						      <Button href="javascript:;">下线</Button>
						   </Popconfirm>
						   :
						   <Button onClick={this.handleOnline.bind(this, data)} href="javascript:;">上线</Button>
					   }

					   {
					   	   data.status !== '1' ?
					   	   <Button onClick={this.handleEdit.bind(this, data)} href="javascript:;">修改</Button>
						   :''
					   }

					   {
					   	   data.node_num == 0 ? 
					   	   <Popconfirm onConfirm={this.handleRemove.bind(this, data)} title="你确定要删除此数据中心吗？" okText="确定" cancelText="取消">
						      <Button href="javascript:;">删除 </Button>
						   </Popconfirm>
					   	   :''
					   }

					</div>
				)
			}
		}];
		const { dataSource } = this.props;
		const { editDataId,showtip } = this.state; 
 		return (
			<div>
				<Table columns={columns} dataSource={dataSource} />
				{
				 editDataId ?
				 <EditDataCenter onOk={this.handleShareOk} onCancel={this.handleShareCanel} id={editDataId} /> 
				 : ''
				}

				{
				 showtip ?
				 <EditFalseDataCenter  onOk={this.handletipCanel}   onCancel={this.handletipCanel} id={showtip}/> 
				 : ''
				}
			</div>
		)
	}
}

export default DataCenterTable;


