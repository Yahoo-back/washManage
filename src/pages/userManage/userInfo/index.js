import React from 'react'
import { Tabs, Row, Col, Button } from 'antd'
import styles from './index.less'
import router from 'umi/router';
import PropTypes from 'prop-types'
import { connect } from 'dva'
import Orderlist from '../../../components/userManage/userInfo/orderList';
import AppionmentList from '../../../components/userManage/userInfo/appionmentList';
import CouponCard from '../../../components/userManage/userInfo/couponCard';
import CouponModal from '../../../components/userManage/couponModal';
const TabPane = Tabs.TabPane;
function gotoback() {
	router.push('/userManage/userList');
}
const UserInfo = ({ userIf, dispatch }) => {
	const { modalVisible, couponData, evaluationData, ratingModalVisible, Info, orderData, appointmentData, useredCouponData, couponList } = userIf
	const orderDataSource = orderData ? orderData.records : []
	const orderPageSize = orderData ? orderData.size : []
	const orderCurrent = orderData ? orderData.current : []
	const orderTotal = orderData ? orderData.total : 0
	const appointmentDataSource = appointmentData ? appointmentData.records : []
	const appointPageSize = appointmentData ? appointmentData.size : []
	const appointCurrent = appointmentData ? appointmentData.current : []
	const appointmentTotal = appointmentData ? appointmentData.total : 0
	const useredCouponList = useredCouponData ? useredCouponData.map((item, index) => {
		return (<CouponCard data={item} key={index} />)
	}) : []
	function callback(key) {
		dispatch({
			type: 'userIf/querySuccess',
			payload: {
				tabsType: key,
				id:Info.openId
			}
		})
		if (key == 1) {
			dispatch({
				type: 'userIf/orderList',
				payload: {
					openId: Info.openId,
					currentPage: 1,
					pageSize: 10
				}
			})
		} else if (key == 2) {
			dispatch({
				type: 'userIf/appointmentList',
				payload: {
					openId: Info.openId,
					currentPage: 1,
					pageSize: 10
				}
			})
		} else if (key == 3) {
			dispatch({
				type: 'userIf/useredCoupon',
				payload: {
					openId: Info.openId,
				}
			})
		}
	}
	//点击评价
	const handleClickRating = (data) => {
		dispatch({
			type: 'userIf/evaluation',
			payload: {
				orderNo: data.orderNo
			}
		})
	}
	//点击评价Modal的X或取消按钮
	const hideRatingModal = () => {
		dispatch({
			type: 'userIf/showModal',
			payload: {
				ratingModalVisible: false
			}
		})
	}
	//点击分配优惠券按钮
	const handleClickCoupon = () => {
		dispatch({
			type: 'userIf/listCoupon',
		}),
			dispatch({
				type: 'userIf/showModal',
				payload: {
					modalVisible: true
				}
			})
	}
	//点击Modal的X或取消按钮
	const hideModal = () => {
		dispatch({
			type: 'userIf/showModal',
			payload: {
				modalVisible: false
			}
		})
	}
	// 点击Modal的确认按钮
	const handleOk = () => {
		dispatch({
			type: 'userIf/allot',
			payload: {
				number: couponData.number,
				openId: Info.openId,
			}
		}),
			dispatch({
				type: 'userIf/showModal',
				payload: {
					modalVisible: false,
				}
			})
	}
	//订单列表的分页
	const handlePageChange = (current, pageSize) => {
		dispatch({
			type: 'userIf/orderList',
			payload: {
				openId: Info.openId,
				currentPage: current,
				pageSize: pageSize
			}
		})
	}
	//订单列表的分页
	const handleSizeChange = (current, pageSize) => {
		dispatch({
			type: 'userIf/orderList',
			payload: {
				openId: Info.openId,
				currentPage: current,
				pageSize: pageSize
			}
		})
	}
	//预约订单列表的分页
	const handlePageChangeAp = (current, pageSize) => {
		dispatch({
			type: 'userIf/appointmentList',
			payload: {
				openId: Info.openId,
				currentPage: current,
				pageSize: pageSize
			}
		})
	}
	//预约订单列表的分页
	const handleSizeChangeAp = (current, pageSize) => {
		dispatch({
			type: 'userIf/appointmentList',
			payload: {
				openId: Info.openId,
				currentPage: current,
				pageSize: pageSize
			}
		})
	}
	//优惠券的单选
	const rowRadioSelection = {
		type: 'radio',
		columnTitle: "选择",
		onSelect: (selectedRowKeys, selectedRows) => {
			dispatch({
				type: 'userIf/querySuccess',
				payload: {
					couponData: selectedRowKeys
				}
			})
		},
	}
	return (
		<div className={styles.page}>
			<div className={styles.wrapper}>
				<Row>
					<Col span="24">
						<span className={styles.title}>用户详情</span>
						<span className={styles.rightButton}> <Button type="default" onClick={gotoback}>返回</Button></span>
					</Col>
				</Row>
				<div className={styles.info}>
					<div className={styles.infobox}>
						<div className={styles.name}>微信openid：</div>
						<div className={styles.content}>{Info.openId}</div>
					</div>
					<div className={styles.infobox}>
						<div className={styles.name}>微信名：</div>
						<div className={styles.content}>{Info.nickname}</div>
					</div>
					<div className={styles.infobox}>
						<div className={styles.name}>首次进入小程序时间：</div>
						<div className={styles.content}>{Info.ctime}</div>
					</div>
					<div className={styles.infobox}>
						<div className={styles.name}>首次下单时间：</div>
						<div className={styles.content}>{Info.firstOrderTime}</div>
					</div>
					<div className={styles.infobox}>
						<div className={styles.name}>订单总数：</div>
						<div className={styles.content}>{Info.sumOrder}</div>
					</div>
					<div className={styles.infobox}>
						<div className={styles.name}>订单评价星级：</div>
						<div className={styles.content}>{Info.evaluationStar}星</div>
					</div>
				</div>
			</div>
			<div className={styles.Tablewrapper}>
				<Tabs defaultActiveKey="1" onChange={callback}>
				{window.localStorage.getItem('userRolePermission')&&
      					JSON.parse(window.localStorage.getItem('userRolePermission')).filter(
							v => v.id == 848
							) != [] ? (
					<TabPane tab="订单列表" key="1"><Orderlist pageSize={orderPageSize} current={orderCurrent} onPageChange={handlePageChange} evaluationData={evaluationData} onSizeChange={handleSizeChange} ratingModalVisible={ratingModalVisible} hideRatingModal={hideRatingModal} onClickRating={handleClickRating} dataSource={orderDataSource} total={orderTotal} /></TabPane>
					):('')}
					{window.localStorage.getItem('userRolePermission')&&
      					JSON.parse(window.localStorage.getItem('userRolePermission')).filter(
							v => v.id == 849
							) != [] ? (
					<TabPane tab="预约订单" key="2"><AppionmentList pageSize={appointPageSize} current={appointCurrent} onPageChange={handlePageChangeAp} onSizeChange={handleSizeChangeAp} dataSource={appointmentDataSource} total={appointmentTotal} /></TabPane>
						 ):('')}
					{window.localStorage.getItem('userRolePermission')&&
      					JSON.parse(window.localStorage.getItem('userRolePermission')).filter(
							v => v.id == 850
							) != [] ? (
					<TabPane tab="当前优惠券" key="3">
						<div className={styles.coupon}>
							<div className={styles.header}>
								<span className={styles.title}>已领优惠券：{useredCouponList.length}</span>
								<div className={styles.button}>
					{window.localStorage.getItem('userRolePermission')&&
      					JSON.parse(window.localStorage.getItem('userRolePermission')).filter(
							v => v.id == 852
							) != [] ? (
								<Button type="primary" onClick={handleClickCoupon}>分配优惠券</Button>
						 ):('')}
								</div>
							</div>
							<div>
								{useredCouponList}
							</div>
							<CouponModal visible={modalVisible} onHideModal={hideModal} onHandleOk={handleOk} couponList={couponList} rowSelection={rowRadioSelection} />
						</div>
					</TabPane>
					 ):('')}
				</Tabs>
			</div>
		</div>
	)
}
UserInfo.propTypes = {
	userIf: PropTypes.object,
	dispatch: PropTypes.func,
}
export default connect(({ userIf }) => ({ userIf }))(UserInfo)
