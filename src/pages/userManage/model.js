import modelExtend from 'dva-model-extend'
import { pageModel } from 'utils/model'
import { message } from 'antd'
import { Ulist, Elist, evaExport, usExport, listCoupon, pushCoupon, stPull } from './service'

export default modelExtend(pageModel, {

  namespace: 'userMg',
  state: {
    modalVisible: false,
    IMVisible: false,
    userInfo: {},
    ratingModalVisible: false,
    uList: [],
    eList: [],
    currentPage: 1,
    userListSelect: [],
    EvaluationSelect: [],
    pageSize: 10,
    nameSearch:'',
    star:0,
    startTime:'',
    endTime:'',
    storeName:''
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
        if (location.pathname === '/userManage/userList') {
          dispatch({
            type: 'Ulist',
            payload: {
              currentPage: 1,
              pageSize: 10,

            },
          }),
          dispatch({
            type: 'querySuccess',
            payload: {
              modalVisible: false,
              IMVisible: false,
              userInfo: {},
              ratingModalVisible: false,
              uList: [],
              eList: [],
              currentPage: 1,
              userListSelect: [],
              EvaluationSelect: [],
              pageSize: 10,
              nameSearch:'',
              star:0,
              startTime:'',
              endTime:'',
              storeName:''
            }
          })
        } else if (location.pathname === '/userManage/userEvaluation') {
          dispatch({
            type: 'stPull'
          }),
            dispatch({
              type: 'Elist',
              payload: {
                currentPage: 1,
                pageSize: 10
              },
            }),
            dispatch({
              type: 'querySuccess',
              payload: {
              modalVisible: false,
              IMVisible: false,
              userInfo: {},
              ratingModalVisible: false,
              uList: [],
              eList: [],
              currentPage: 1,
              userListSelect: [],
              EvaluationSelect: [],
              pageSize: 10,
              nameSearch:'',
              star:0,
              startTime:'',
              endTime:'',
              storeName:''
              }
            })
        }
      })
    },
  },
  effects: {
    * Ulist({ payload, }, { call, put }) {
      const data = yield call(Ulist, payload)
      if (data.code == 200) {
        yield put({
          type: 'querySuccess',
          payload: {
            uList: data.data,
          },
        })
      } else {
        throw data
      }
    },
    * stPull({ payload, }, { call, put }) {
      const data = yield call(stPull, payload)
      if (data.code == 200) {
        yield put({
          type: 'querySuccess',
          payload: {
            pullData: data.data,
          },
        })
      } else {
        throw data
      }
    },
    * Elist({ payload, }, { call, put }) {
      const data = yield call(Elist, payload)
      if (data.code == 200) {
        yield put({
          type: 'querySuccess',
          payload: {
            eList: data.data,
          },
        })
      } else {
        throw data
      }
    },
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
    * pushCoupon({ payload, }, { call, put }) {
      const data = yield call(pushCoupon, payload)
      if (data.code == 200) {
        yield put({
          type: 'Ulist',
          payload: {
            currentPage: 1,
            pageSize: 10,
          },
        })
        message.success("优惠券推送成功")
      } else {
        throw data
      }
    }
  }
})
