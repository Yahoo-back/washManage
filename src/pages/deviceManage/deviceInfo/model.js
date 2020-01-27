import modelExtend from 'dva-model-extend'
import { pageModel } from 'utils/model'
import { message } from 'antd'
import { detail, reservation, order, evaluation, selectAppointment, deviceAppointment } from './service'


export default modelExtend(pageModel, {

  namespace: 'deviceIf',
  state: {
    setModalVisible: false,
    setModalAbled: false,
    OpValue: { period: [] },
    orderType: 1,
    deviceIds: ''
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/deviceManage/deviceInfo') {
          dispatch({
            type: 'detail',
            payload: {
              deviceId: location.query.id,
            },
          }),
            dispatch({
              type: 'order',
              payload: {
                deviceId: location.query.id,
                orderType: 1,
                currentPage: 1,
                pageSize: 10
              },
            })
        }
      })
    },
  },
  effects: {
    * detail({
      payload,
    }, { call, put }) {
      const data = yield call(detail, payload)
      if (data.code == 200) {
        yield put({
          type: 'detailSuccess',
          payload: {
            list: data.data,
            deviceIds: payload.deviceId
          },
        })
      } else {
        throw data
      }
    },
    * reservation({
      payload,
    }, { call, put, select }) {
      const data = yield call(reservation, payload)
      const { deviceIds } = yield select(_ => _.deviceIf)
      if (data.code == 200) {
        yield put({
          type: 'detail',
          payload: {
            deviceId: deviceIds
          },
        })
      } else {
        message.error("预约状态错误")
      }
    },
    * evaluation({
      payload,
    }, { call, put }) {
      const data = yield call(evaluation, payload)
      if (data.code == 200) {
        yield put({
          type: 'orderSuccess',
          payload: {
            evaluationData: data.data,
            ratingModalVisible: true
          },
        })
      } else {
        throw data
      }
    },
    * selectAppointment({
      payload,
    }, { call, put }) {
      const data = yield call(selectAppointment, payload)
      if (data.code == 200) {
        yield put({
          type: 'detailSuccess',
          payload: {
            selectList: data.data,
            setModalVisible: true
          },
        })
      } else {
        throw data
      }
    },
    * deviceAppointment({
      payload,
    }, { call, put }) {
      const data = yield call(deviceAppointment, payload)
      if (data.code == 200) {
        yield put({
          type: 'detailSuccess',
          payload: {
            selectId: '',
            setModalVisible: false
          },
        })
        message.success('设置成功')
      } else {
        throw data
      }
    },
    * order({
      payload,
    }, { call, put }) {
      const data = yield call(order, payload)
      if (data.code == 200) {
        yield put({
          type: 'orderSuccess',
          payload: {
            orderList: data.data,
          },
        })
      } else {
        throw data
      }
    },
  },
  reducers: {
    detailSuccess(state, { payload: value }) {
      return { ...state, ...value }
    },
    orderSuccess(state, { payload: value }) {
      return { ...state, ...value }
    },
    setModal(state, { payload: value }) {
      return { ...state, ...value }
    },
  },
})
