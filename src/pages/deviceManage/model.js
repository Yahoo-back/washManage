import modelExtend from 'dva-model-extend'
import { query, list, stPull } from './service'
import { pageModel } from 'utils/model'

export default modelExtend(pageModel, {

  namespace: 'device',
  state: {
    modalVisible: false,
    visible: '',
    conditionData: '',
    nameKey: "Washer",
    onlineStatusData: 0,
    workStatusData: 0,
    storeName:'',
    currentPage: 1,
    pageSize: 10,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/deviceManage') {
          dispatch({
            type: 'stPull'
          }),
            dispatch({
              type: 'list',
              payload: {
                currentPage: 1,
                pageSize: 10,
                type: "Washer",
                workStatus: 0,
                onlineStatus: 0,
                condition: ''
              },
            }),
            dispatch({
              type: 'listSuccess',
              payload: {
                modalVisible: false,
                visible: '',
                conditionData: '',
                nameKey: "Washer",
                onlineStatusData: 0,
                workStatusData: 0,
                storeName:'',
                currentPage: 1,
                pageSize: 10,
              }
            })
        }
      })
    },

  },
  reducers: {
    listSuccess(state, { payload: value }) {
      return { ...state, ...value }
    },
    querySuccess(state, { payload: value }) {
      return { ...state, ...value }
    },
  },

  effects: {
    * list({
      payload,
    }, { call, put }) {
      const data = yield call(list, payload)
      if (data.code == 200) {
        yield put({
          type: 'listSuccess',
          payload: {
            list: data.data
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
          type: 'listSuccess',
          payload: {
            pullData: data.data,
          },
        })
      } else {
        throw data
      }
    },
  },
})
