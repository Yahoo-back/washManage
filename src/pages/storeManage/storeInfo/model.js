import modelExtend from 'dva-model-extend'
import { pageModel } from 'utils/model'
import { message } from 'antd'
import { detail, update, list, evaluation } from './service'

export default modelExtend(pageModel, {

  namespace: 'storeIf',
  state: {
    ratingModalVisible: false,
    changeState: false,
    id: '',
    orderType: 1,
    store:'',
    img:''
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/storeManage/storeInfo') {
          dispatch({
            type: 'detail',
            payload:
              location.query.id,
          })
        }
      })
    },
  },
  effects: {
    * detail({
      payload,
    }, { call, put,select}) {
      const data = yield call(detail, payload)
      const {store} = yield select(_=>_.storeIf)
      if (data.code == 200) {
        yield put({
          type: 'detailSuccess',
          payload: {
            list: data.data,
            store:data.data.name
          },
        })
        yield put({
          type: 'list',
          payload: {
            query: {
              storeName: store,
              orderType: 1
            },
            current: 1,
            pages: 1,
            size: 10
          },
        })
      } else {
        throw data
      }
    },
    * update({
      payload,
    }, { call, put, select }) {
      const data = yield call(update, payload);
      const { id } = yield select(_ => _.storeIf)
      message.loading('保存中...', 1)
      .then(() => {
      if (data.code == 200) {
        message.success('修改成功');
      }
    })
    if (data.code == 200) {
      yield put({
        type: 'detail',
        payload: id
      })
    }else {
      throw data
    }
    },
    * list({
      payload,
    }, { call, put }) {
      const data = yield call(list, payload)
      if (data.code == 200) {
        yield put({
          type: 'orderSuccess',
          payload: {
            total: data.data.total,
            orderList: data.data.records,
          },
        })
      } else {
        throw data
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
  },
  reducers: {
    ratingModal(state, { payload: value }) {
      return { ...state, ...value }
    },
    detailSuccess(state, { payload: value }) {
      return { ...state, ...value }
    },
    orderSuccess(state, { payload: value }) {
      return { ...state, ...value }
    },
  },

})
