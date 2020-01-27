import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import {
  getConfigList,
  addConfig,
  deleteConfig,
  updateConfig,
} from '../service'
import { model } from 'utils/model'
import { message } from 'antd'
import { isSuccess } from '../../../utils/handleError'

export default modelExtend(model, {
  namespace: 'sysConfig',

  state: {
    configList: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const data = {
          current: 1,
          pages: 1,
          size: 10,
        }
        if (pathname === '/systemManage/sysConfig') {
          dispatch({
            type: 'getConfigList',
            payload: data
          })
        }
      })
    },
  },

  effects: {
    *getConfigList({ payload }, { call, put }) {
      const res = yield call(getConfigList, parse(payload))
      yield put({
        type: 'update',
        payload: {
          configList: res.data
        }
      })
    },
    *addConfig({ payload }, { call, put }) {
      const res = yield call(addConfig, parse(payload))
      if (isSuccess(res)) {
        message.success('添加权限成功！')
        yield put({ type: 'getConfigList' })
      }
      else {
        return
      }
    },
    *deleteConfig({ payload }, { call, put }) {
      const res = yield call(deleteConfig, payload)
      if (isSuccess(res)) {
        message.success('删除权限成功！')
        yield put({ type: 'getConfigList' })
      }
      else {
        return
      }
    },
    *updateConfig({ payload }, { call, put }) {
      const res = yield call(updateConfig, parse(payload))
      if (isSuccess(res)) {
        message.success('更新权限成功！')
        yield put({ type: 'getConfigList' })
      }
      else {
        return
      }
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
