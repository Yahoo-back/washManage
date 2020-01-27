import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import {
  getAccountList,
  getAccountDetail,
  stopAccount,
  deleteAccount,
  getRolePull,
  addAccount,
  updateAccount,
  getStoreOptions,
} from '../service.js'
import { model } from 'utils/model'
import { message } from 'antd'
import { isSuccess } from '../../../utils/handleError'

export default modelExtend(model, {
  namespace: 'account',

  state: {
    listData: [],
    detailData: [],
    stopData: [],
    roleData: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const data = {
          current: 1,
          pages: 1,
          size: 10,
        }
        if (pathname === '/systemManage/account') {
          dispatch({
            type: 'getAccountList',
            payload: data
          })
          dispatch({ type: 'getRolePull' })
        }
      })
    },
  },

  effects: {
    *getAccountList({ payload }, { call, put }) {
      const res = yield call(getAccountList, parse(payload))
      yield put({
        type: 'update',
        payload: {
          listData: res.data
        }
      })
    },
    *getAccountDetail({ payload }, { call, put }) {
      const res = yield call(getAccountDetail, payload)
      yield put({
        type: 'update',
        payload: {
          detailData: res.data
        }
      })
    },
    *stopAccount({ payload }, { call, put }) {
      const loading = message.loading('保存中...', 0)
      const res = yield call(stopAccount, payload)
      if (isSuccess(res)) {
        message.success('修改帐号状态成功！', 2.5)
        yield put({ type: 'getAccountList' })
      } else {
        message.error(res.message)
      }
      setTimeout(loading, 0)
    },
    *deleteAccount({ payload }, { call, put }) {
      const res = yield call(deleteAccount, payload)
      if (isSuccess(res)) {
        message.success('删除帐号成功！')
        yield put({ type: 'getAccountList' })
      }
      else {
        message.error(res.message)
      }
    },
    *addAccount({ payload: { values, resolve, reject } }, { call, put }) {
      const loading = message.loading('保存中...', 0)
      const res = yield call(addAccount, parse(values))
      if (isSuccess(res)) {
        message.success('添加帐号成功！', 2.5)
        resolve(res)
        yield put({ type: 'getAccountList' })
      } else {
        reject(res)
        message.error(res.message)
      }
      setTimeout(loading, 0)
    },
    *updateAccount({ payload: { values, resolve, reject } }, { call, put }) {
      const loading = message.loading('保存中...', 0)
      const res = yield call(updateAccount, values)
      if (isSuccess(res)) {
        message.success('更新帐号成功！', 2.5)
        resolve(res)
        yield put({ type: 'getAccountList' })
      } else {
        reject(res)
        message.error(res.message)
      }
      setTimeout(loading, 0)
    },
    *getRolePull({ payload }, { call, put }) {
      const res = yield call(getRolePull)
      yield put({
        type: 'update',
        payload: {
          roleData: res.data
        }
      })
    },
    *getStoreOptions({ payload }, { call, put }) {
      const res = yield call(getStoreOptions, parse(payload))
      yield put({
        type: 'update',
        payload: {
          stopData: res.data
        },
      })
    },
  },

  reducers: {
    update(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    }
  },
})
