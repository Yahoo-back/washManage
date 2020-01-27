import React from 'react'
import { message, Row, Col, Button, Table, Modal } from 'antd'
import styles from './index.less'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import router from 'umi/router';
import AddTime from '../../../components/deviceManage/addTime';
import DeleteModal from '../../../components/deviceManage/addTime/deleteModal';
import moment from 'moment'
const AppointmentTime = ({ appointment, dispatch }) => {
	const { appointmentList, modalVisible, deleteModalVisible, deleteId, selectedTags, stateOk, id, initialName, initialStartTime, initialEndTime } = appointment
	const columns = [
		{
			title: '名称',
			dataIndex: 'name',
		}, {
			title: '可预约时段',
			dataIndex: 'time',
			render: (text, record) => `${record.startTime}-${record.endTime}`

		}, {
			title: '周期',
			dataIndex: 'cycle',
		},
		{
			title: '操作',
			render: (item) => {
				return (
					<div>
						{window.localStorage.getItem('userRolePermission')&&
      					JSON.parse(window.localStorage.getItem('userRolePermission')).filter(
					    v => v.id == 791
						) != [] ? (
						<Button type="primary" onClick={() => { handleEdit(item) }}>编辑</Button>
						) : ('')}
						<div className={styles.margin}>
						{window.localStorage.getItem('userRolePermission')&&
      					JSON.parse(window.localStorage.getItem('userRolePermission')).filter(
					    v => v.id == 790
						) != [] ? (
							<Button type="danger" onClick={() => { handleDel(item) }}>删除</Button>
							) : ('')}
							</div>
					</div>)
			},
		},
	]
	function gotoback() {
		router.push('/deviceManage');
	}
	const handleDel = (item) => {
		dispatch({
			type: 'appointment/deleteModal',
			payload: {
				deleteModalVisible: true,
				deleteId: item.id
			}
		})
	}
	const handleEdit = (item) => {
		const data = item.cycle
		const selectedTag = data.split(',')
		dispatch({
			type: 'appointment/showModal',
			payload: {
				modalVisible: true,
				modalName: '编辑预约时段',
				stateOk: 2,
				id: item.id,
				initialName: item.name,
				selectedTags: selectedTag,
				initialStartTime: item.startTime,
				initialEndTime: item.endTime
			}
		})
	}

	//点击添加时间段的函数 弹出Modal
	const newApTime = () => {
		dispatch({
			type: 'appointment/showModal',
			payload: {
				modalVisible: true,
				modalName: '添加预约时段',
				stateOk: 1
			}
		})
	}
	//点击Modal的X或取消按钮
	const hideModal = () => {
		dispatch({
			type: 'appointment/showModal',
			payload: {
				modalVisible: false,
				selectedTags: [],
				initialName: '',
				initialStartTime: '00:00',
				initialEndTime: '00:00'
			}
		})
	}
	// 点击Modal的确认按钮
	const handleOk = (data) => {
		const startTime = moment(data.startTime).format('HH:mm')
		const endTime = moment(data.endTime).format('HH:mm')
		const tstart=startTime.split(':')
		const tend=endTime.split(':')
		if (stateOk == 1) {
			const dataTags = selectedTags ? selectedTags.map((item) => item).join(',') : ''
			if(data.name==""){
				return message.error('名称不能为空')
			}else if(dataTags==""){
				return message.error('周期不能为空')
			}
			else if(tstart[0]-tend[0]> 0){
				return message.error('可预约时段开始时间需要小于结束时间')
			}
			else if(tstart[0]==tend[0]&&tstart[1]-tend[1]>= 0){
				return message.error('可预约时段开始时间需要小于结束时间')
			}
			else{
			dispatch({
				type: 'appointment/add',
				payload: {
					name: data.name,
					startTime: startTime,
					endTime: endTime,
					cycle: dataTags
				}
			}),
			dispatch({
				type: 'appointment/showModal',
				payload: {
					selectedTags: [],
					initialName: '',
					initialStartTime: '00:00',
					initialEndTime: '00:00'
				}
			})
		}
		} else if (stateOk == 2) {
			const dataTags = selectedTags ? selectedTags.map((item) => item).join(',') : ''
			if(data.name==""){
				return message.error('名称不能为空')
			}else if(dataTags==""){
				return message.error('周期不能为空')
			}else if(tstart[0]-tend[0]> 0){
				return message.error('可预约时段开始时间需要小于结束时间')
			}
			else if(tstart[0]==tend[0]&&tstart[1]-tend[1]>= 0){
				return message.error('可预约时段开始时间需要小于结束时间')
			}
			else{
			dispatch({
				type: 'appointment/edit',
				payload: {
					name: data.name,
					startTime: startTime,
					endTime: endTime,
					cycle: dataTags,
					id: id
				}
			})
		}
		}
		dispatch({
			type: 'appointment/showModal',
			payload: {
				modalVisible: false,
				selectedTags: [],
				initialName: '',
				initialStartTime: '00:00',
				initialEndTime: '00:00'
			}
		})

	}
	//点击删除Modal的X或取消按钮
	const hideDeleteModal = () => {
		dispatch({
			type: 'appointment/deleteModal',
			payload: {
				deleteModalVisible: false,
				deleteId: '',
			}
		})
	}
	// 点击删除Modal的确认按钮
	const handleDeleteOk = () => {
		dispatch({
			type: 'appointment/del',
			payload: {
				id: deleteId
			}
		})
	}
	return (
		<div className={styles.wrapper}>
			<Row>
				<Col span="24">
					<span className={styles.title}>预约时段设置</span>
					<span className={styles.rightButton}> <Button type="default" onClick={gotoback}>返回</Button></span>
				</Col>
			</Row>
			<span className={styles.lineHight} >
			{window.localStorage.getItem('userRolePermission')&&
      		JSON.parse(window.localStorage.getItem('userRolePermission')).filter(
				v => v.id == 789
				) != [] ? (
			<Button type="primary" onClick={newApTime}>添加时间段</Button>
			) : ('')}
			</span>
			<AddTime visible={modalVisible} handleHideModal={hideModal} onHandleOk={handleOk} />
			<DeleteModal visible={deleteModalVisible} onHideModal={hideDeleteModal} onDeleteOk={handleDeleteOk} />
			<div>
			{window.localStorage.getItem('userRolePermission')&&
      		JSON.parse(window.localStorage.getItem('userRolePermission')).filter(
				v => v.id == 792
				) != [] ? (
				<Table
					columns={columns}
					bordered
					dataSource={appointmentList}
					pagination={false}
					rowKey={appointmentList => appointmentList.id}
				/>
			) : ('')}
			</div>
		</div>

	)
}
AppointmentTime.propTypes = {
	appointment: PropTypes.object,
	dispatch: PropTypes.func,
}
export default connect(({ appointment }) => ({ appointment }))(AppointmentTime)