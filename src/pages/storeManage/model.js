import modelExtend from 'dva-model-extend'
import { pageModel } from 'utils/model'
import { message } from 'antd'
import { list, del, area, stExport } from './service'

export default modelExtend(pageModel, {

  namespace: 'store',
  state: {
    deleteModalVisible: false,
    data: [],
    nameSearch: '',
    addr: ''
  },
  reducers: {
    deleteModal(state, { payload: value }) {
      return { ...state, ...value }
    },
    querySuccess(state, { payload: value }) {
      return { ...state, ...value }
    },
    deleteStore(state, { payload: value }) {
      return { ...state, ...value }
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/storeManage') {
          dispatch({
            type: 'list',
            payload: {
              current: 1,
              pages: 0,
              size: 10
            },
          })
          dispatch({
            type: 'querySuccess',
            payload:{
              data: [],
              nameSearch: ''
            }
          })
        }
      })
    },
  },
  effects: {
    * list({ payload, }, { call, put }) {
      const data = yield call(list, payload)
      if (data.code == 200) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
          },
        })
      } else {
        throw data
      }
    },
    * address({ payload }, { call, put }) {
      yield put({
        type: 'querySuccess',
        payload: {
          addr: payload.addr,
        },
      })
    },
    * del({ payload, }, { call, put }) {
      const data = yield call(del, payload)
      if (data.code == 200) {
        message.success('删除成功');
        yield put({
          type: 'list',
          payload: {
            current: 1,
            pages: 0,
            size: 10
          },
        })
      } else {
        throw data
      }
    }
  }
})
