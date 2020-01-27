import React from 'react'
import { Page } from 'components'
import { Row, Col, message } from 'antd'
import styles from './userList.less'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import SeachGroups from '../../components/userManage/searchGroup';
import TableList from '../../components/userManage/tableList';
import CouponModal from '../../components/userManage/couponModal';
import ImModal from '../../components/userManage/IM';


const UserList = ({ userMg, dispatch }) => {
  const { modalVisible, IMVisible, uList, userListSelect, couponList, couponData, userInfo,
    nameSearch,startTime,endTime,currentPage,pageSize,selectedTime } = userMg
  const dataSource = uList ? uList.records : []
  const total = uList ? uList.total : 0
  //点击推送优惠券的函数 弹出Modal
  const handleClickCoupon = () => {
    if (userListSelect.length == 0) {
      message.error("请选择将要推送优惠券的用户")
    } else {
      dispatch({
        type: 'userMg/listCoupon'
      }),
        dispatch({
          type: 'userMg/showModal',
          payload: {
            modalVisible: true
          }
        })
    }
  }
  //点击IM会话
  const handleImClick = (e) => {
    dispatch({
      type: 'userMg/showModal',
      payload: {
        IMVisible: true,
        userInfo: e
      }
    })
  }
  //点击Modal的X或取消按钮
  const hideModal = () => {
    dispatch({
      type: 'userMg/showModal',
      payload: {
        modalVisible: false,
        IMVisible: false
      }
    })
  }
  // 点击Modal的确认按钮
  const handleOk = () => {
    userListSelect.map((item) => {
      dispatch({
        type: 'userMg/pushCoupon',
        payload: [{
          number: couponData.number,
          openId: item,
        }]
      })
    }),
      dispatch({
        type: 'userMg/showModal',
        payload: {
          modalVisible: false,
        }
      })
  }
  //用户列表的分页
  const handlePageChange = (current, pageSize) => {
    dispatch({
      type: 'userMg/querySuccess',
      payload: {
        currentPage: current,
        pageSize: pageSize
      }
    }),
    dispatch({
      type: 'userMg/Ulist',
      payload: {
        currentPage: current,
        pageSize: pageSize,
        condition: nameSearch,
        timeType: selectedTime,
        startTime: startTime,
        endTime: endTime,
      }
    })
  }
  //用户列表的分页
  const handleSizeChange = (current, pageSize) => {
    dispatch({
      type: 'userMg/querySuccess',
      payload: {
        currentPage: current,
        pageSize: pageSize
      }
    }),
    dispatch({
      type: 'userMg/Ulist',
      payload: {
        currentPage: current,
        pageSize: pageSize,
        condition: nameSearch,
        timeType: selectedTime,
        startTime: startTime,
        endTime: endTime,
      }
    })
  }
  //用户列表的多选
  const rowSelection = {
    onSelect: (record, selected, selectedRows) => {
      const data = selectedRows.map((item) => item.openid)
      dispatch({
        type: 'userMg/querySuccess',
        payload: {
          userListSelect: data
        }
      })
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      const data = selectedRows.map((item) => item.openid)
      dispatch({
        type: 'userMg/querySuccess',
        payload: {
          userListSelect: data
        }
      })
    },
  };
  //推送优惠券的单选
  const rowRadioSelection = {
    type: 'radio',
    columnTitle: "选择",
    onSelect: (selectedRowKeys, selectedRows) => {
      dispatch({
        type: 'userMg/querySuccess',
        payload: {
          couponData: selectedRowKeys
        }
      })
    },
  }
  return (
    <div>
      <Page inner>
        <Row>
          <Col span="3">
            <h1>用户列表</h1>
          </Col>
          <Col span="21">
            <div className={styles.headerRight}><SeachGroups onClickCoupon={handleClickCoupon} /></div>
          </Col>
        </Row>
        <div className={styles.content}>
        {window.localStorage.getItem('userRolePermission')&&
      				JSON.parse(window.localStorage.getItem('userRolePermission')).filter(
                v => v.id == 762
              ) != [] ? (
          <TableList onImClick={handleImClick} dataSource={dataSource} rowSelection={rowSelection} total={total} onPageChange={handlePageChange} onSizeChange={handleSizeChange} />
               ):('')}
          <CouponModal visible={modalVisible} onHideModal={hideModal} onHandleOk={handleOk} couponList={couponList} rowSelection={rowRadioSelection} />
          {IMVisible && <ImModal visible={IMVisible} onHideModal={hideModal} onHandleOk={handleOk} couponList={couponList} rowSelection={rowRadioSelection} userInfo={userInfo} />}
        </div>

      </Page>
    </div>
  )
}
UserList.propTypes = {
  userMg: PropTypes.object,
  dispatch: PropTypes.func,
}
export default connect(({ userMg }) => ({ userMg }))(UserList)