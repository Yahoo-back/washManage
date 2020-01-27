import modelExtend from 'dva-model-extend'
import { pageModel } from 'utils/model'
import {message} from 'antd'
import { info, orderList, appointmentList, useredCoupon, listCoupon, allot, evaluation } from './service'

export default modelExtend(pageModel, {

  namespace: 'userIf',
  state: {
    modalVisible: false,
    ratingModalVisible: false,
    Info: [],
    orderData: [],
    currentPage: 1,
    id:0,
    pageSize: 10
  },

  reducers: {
    showModal(state, { payload: value }) {
      return { ...state, ...value }
    },
    querySuccess(state, { payload: value }) {
      return { ...state, ...value }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/userManage/UserInfo') {
          dispatch({
            type: 'info',
            payload: {
              openId: location.query.id,
            },
          }),
            dispatch({
              type: 'orderList',
              payload: {
                openId: location.query.id,
                currentPage: 1,
                pageSize: 10
              }
            })
        }
      })
    },
  },
  effects: {
    //详情的接口
    * info({ payload, }, { call, put }) {
      const data = yield call(info, payload)
      if (data.code == 200) {
        yield put({
          type: 'querySuccess',
          payload: {
            Info: data.data,
          },
        })
      } else {
        throw data
      }
    },
    //订单的接口
    * orderList({ payload, }, { call, put }) {
      const data = yield call(orderList, payload)
      if (data.code == 200) {
        yield put({
          type: 'querySuccess',
          payload: {
            orderData: data.data,
          },
        })
      } else {
        throw data
      }
    },
    //预约订单的接口
    * appointmentList({ payload, }, { call, put }) {
      const data = yield call(appointmentList, payload)
      if (data.code == 200) {
        yield put({
          type: 'querySuccess',
          payload: {
            appointmentData: data.data
          },
        })
      } else {
        throw data
      }
    },
    //已获取优惠券的接口
    * useredCoupon({ payload, }, { call, put }) {
      const data = yield call(useredCoupon, payload)
      if (data.code == 200) {
        yield put({
          type: 'querySuccess',
          payload: {
            useredCouponData: data.data
          },
        })
      } else {
        throw data
      }
    },
    //启用的优惠券列表的接口
    * listCoupon({ payload, }, { call, put }) {
      const data = yield call(listCoupon, payload)
      if (data.code == 200) {
        yield put({
          type: 'querySuccess',
          payload: {
            couponList: data.data
          },
        })
      } else {
        throw data
      }
    },
    //订单评价的接口
    * evaluation({
      payload,
    }, { call, put }) {
      const data = yield call(evaluation, payload)
      if (data.code == 200) {
        yield put({
          type: 'querySuccess',
          payload: {
            evaluationData: data.data,
            ratingModalVisible: true
          },
        })
      } else {
        throw data
      }
    },
    //分配优惠券的接口
    * allot({ payload}, { call, put,select  }) {
      const data = yield call(allot, payload)
      const {id}=yield select(_ => _.userIf)
      if (data.code == 200) {
        message.success("优惠券分配成功")
        yield put({
          type: 'useredCoupon',
          payload: {
            openId:id
          },
        })
      } else {
        throw data
      }
    }
  }
})
