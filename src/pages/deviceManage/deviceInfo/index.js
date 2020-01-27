import React from 'react'
import { Tabs, Row, Col, Button,message } from 'antd'
import styles from './index.less'
import router from 'umi/router';
import { connect } from 'dva'
import PropTypes from 'prop-types'
import Orderlist from '../../../components/deviceManage/deviceinfo/orderList';
import Advanceorder from '../../../components/deviceManage/deviceinfo/advanceOrder';
import SetModal from '../../../components/deviceManage/deviceinfo/setModal';
const TabPane = Tabs.TabPane;
const DeviceInfo = ({ location, deviceIf, dispatch }) => {
	const { list, orderType, orderList, setModalVisible, evaluationData, ratingModalVisible, selectId } = deviceIf
	function gotoback() {
		router.goBack();
	}
	function callback(key) {
		dispatch({
			type: 'deviceIf/orderSuccess',
			payload: {
				orderType: key,
			}
		})
		if (key == 1) {
			dispatch({
				type: 'deviceIf/order',
				payload: {
					deviceId: location.query.id,
					orderType: 1,
					currentPage: 1,
					pageSize: 10,
				}
			})
		} else if (key == 2) {
			dispatch({
				type: 'deviceIf/order',
				payload: {
					deviceId: location.query.id,
					orderType: 2,
					currentPage: 1,
					pageSize: 10,
				}
			})
		}
	}
	const dInfo = list
	const data = orderList ? orderList.records : []
	const total = orderList ? orderList.total : 0
	const appointData = list.bsxyDeviceAppointments ? list.bsxyDeviceAppointments[0] : []
	const appointStartTime = appointData.startTime ? appointData.startTime.split(' ') : ''
	const appointEndTime = appointData.endTime ? appointData.endTime.split(' ') : ''
	
	let config = {
		'2': '待机',
		'1': '正在运行',
		'3': '电机故障',
	};
	const handleOpenSet = () => {
		dispatch({
			type: 'deviceIf/orderSuccess',
			payload: {
				OpValue:{
					name:appointData.id,
					startTime:appointStartTime[1],
					endTime:appointEndTime[1],
					cycle:appointData.cycle,
					itemName:appointData.name
				},
				selectId:appointData.id
			}
		})
		dispatch({
			type: 'deviceIf/selectAppointment',
			payload: {
				deviceHaid: dInfo.deviceHaid
			}
		})
	}
	const handleSetOk = (data) => {
	if(data.setReservation==1){
		dispatch({
			type: 'deviceIf/reservation',
			payload: {
				deviceId: location.query.id,
				setReservation: data.setReservation
			}
		})
		dispatch({
			type: 'deviceIf/deviceAppointment',
			payload: {
				deviceId: location.query.id,
				appointmentId: selectId
			}
		})
	}else{
		dispatch({
			type: 'deviceIf/reservation',
			payload: {
				deviceId: location.query.id,
				setReservation: data.setReservation
			}
		})
		dispatch({
			type: 'deviceIf/setModal',
			payload: {
				setModalVisible: false
			}
		})
		message.success("设置成功")
	}	
	}
	const handleHideModal = () => {
		dispatch({
			type: 'deviceIf/setModal',
			payload: {
				setModalVisible: false
			}
		})
	}
	const handlePageChange = (current, pageSize) => {
		dispatch({
			type: 'deviceIf/order',
			payload: {
				currentPage: current,
				pageSize: pageSize,
				deviceId: location.query.id,
				orderType: orderType,
			}
		})
	}
	const handleSizeChange = (current, pageSize) => {
		dispatch({
			type: 'deviceIf/order',
			payload: {
				currentPage: current,
				pageSize: pageSize,
				deviceId: location.query.id,
				orderType: orderType,
			}
		})
	}
	//点击评价
	const handleClickRating = (data) => {
		dispatch({
			type: 'deviceIf/evaluation',
			payload: {
				orderNo: data.orderNo
			}
		})
	}
	//点击评价Modal的X或取消按钮
	const hideRatingModal = () => {
		dispatch({
			type: 'deviceIf/setModal',
			payload: {
				ratingModalVisible: false
			}
		})
	}
	return (
		<div className={styles.page}>
			<div className={styles.wrapper}>
				<Row>
					<Col span="24">
						<span className={styles.title}>设备详情</span>
						<span className={styles.rightButton}> <Button type="default" onClick={gotoback}>返回</Button></span>
					</Col>
				</Row>
				<div className={styles.info}>
					<div className={styles.infobox}>
						<div className={styles.name}>设备HAID：</div>
						<div className={styles.content}>{dInfo.deviceHaid}</div>
					</div>
					<div className={styles.infobox}>
						<div className={styles.name}>在线状态：</div>
						<div className={styles.content}>{dInfo.onlineStatus > 1 ? "离线" : "在线"}</div>
					</div>
					<div className={styles.infobox}>
						<div className={styles.name}>运行状态：</div>
						<div className={styles.content}>{config[dInfo.workStatus]}</div>
					</div>
					<div className={styles.infobox}>
						<div className={styles.name}>设备名称：</div>
						<div className={styles.content}>{dInfo.name}</div>
					</div>
					<div className={styles.infobox}>
						<div className={styles.name}>服役时长：</div>
						<div className={styles.content}>{parseInt(dInfo.serviceTime/1440)+'天'+(parseInt(dInfo.serviceTime/60)%24)+'小时'+(dInfo.serviceTime%60)+'分钟'}</div>
					</div>
					<div className={styles.infobox}>
						<div className={styles.name}>预约设置：
						{window.localStorage.getItem('userRolePermission')&&
      					JSON.parse(window.localStorage.getItem('userRolePermission')).filter(
							v => v.id == 795
							) != [] ? (
						<Button type="default" onClick={handleOpenSet}>设置</Button>
						) : ('')}
						</div>
						<SetModal visible={setModalVisible} onHideModal={handleHideModal} onSetOk={handleSetOk} setReservation={dInfo.setReservation}/>
						<div className={styles.content}>{appointStartTime?appointStartTime[1]:''}-{appointEndTime?appointEndTime[1]:''}<br />
							{appointData.cycle}</div>
					</div>
					<div className={styles.infobox}>
						<div className={styles.name}>使用人次：</div>
						<div className={styles.content}>{dInfo.userNumber}</div>
					</div>
					<div className={styles.infobox}>
						<div className={styles.name}>订单数：</div>
						<div className={styles.content}>{dInfo.orderNumber}</div>
					</div>
					<div className={styles.infobox}>
						<div className={styles.name}>管理员：</div>
						<div className={styles.content}>{dInfo.sysUser}  {dInfo.phone}</div>
					</div>
					<div className={styles.infobox}>
						<div className={styles.name}>最近使用：</div>
						<div className={styles.content}>{dInfo.latestTime}</div>
					</div>

				</div>
			</div>
			{window.localStorage.getItem('userRolePermission')&&
      					JSON.parse(window.localStorage.getItem('userRolePermission')).filter(
							v => v.id == 794
							) != [] ? (
			<div className={styles.Tablewrapper}>
				<Tabs defaultActiveKey="1" onChange={callback}>
					<TabPane tab="订单列表" key="1"><Orderlist data={data} total={total} handleSizeChange={handleSizeChange} handlePageChange={handlePageChange} evaluationData={evaluationData} ratingModalVisible={ratingModalVisible} hideRatingModal={hideRatingModal} onClickRating={handleClickRating} /></TabPane>
					<TabPane tab="预约订单" key="2"><Advanceorder data={data} total={total} handleSizeChange={handleSizeChange} handlePageChange={handlePageChange} /></TabPane>
				</Tabs>
			</div>
			):('')}
		</div>
	)
}
DeviceInfo.propTypes = {
	deviceIf: PropTypes.object,
	loading: PropTypes.object,
	location: PropTypes.object,
	dispatch: PropTypes.func,
}
export default connect(({ deviceIf }) => ({ deviceIf }))(DeviceInfo)
