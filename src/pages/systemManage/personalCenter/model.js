import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { checkInfo, resetPassword, changeInfo } from '../service.js'
import { model } from 'utils/model'
import { message } from 'antd'
import { isSuccess } from '../../../utils/handleError'

export default modelExtend(model, {
  namespace: 'personalCenter',

  state: {
    userData: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/systemManage/personalCenter') {
          dispatch({ type: 'checkInfo' })
        }
      })
    },
  },

  effects: {
    *checkInfo({ payload }, { call, put }) {
      const res = yield call(checkInfo, parse(payload))
      yield put({
        type: 'update',
        payload: {
          userData: res.data
        }
      })
    },
    *resetPassword({ payload }, { call, put }) {
      const loading = message.loading('保存中...', 0)
      const res = yield call(resetPassword, parse(payload))
      if (isSuccess(res)) {
        message.success('重置密码成功！', 2.5)
        yield put({
          type: 'update',
          payload: res
        })
      } else {
        message.error(res.message)
      }
      setTimeout(loading, 0)
    },
    *changeInfo({ payload }, { call, put }) {
      const loading = message.loading('保存中...', 0)
      const res = yield call(changeInfo, parse(payload))
      if (isSuccess(res)) {
        message.success('修改信息成功！', 2.5)
        yield put({ type: 'checkInfo' })
      } else {
        message.error(res.message)
      }
      setTimeout(loading, 0)
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
