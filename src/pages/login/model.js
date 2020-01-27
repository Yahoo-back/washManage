import { routerRedux } from 'dva/router'
import { login, getEmail } from './service'
import { isSuccess } from '../../utils/handleError'
import { message } from 'antd'

export default {
  namespace: 'login',

  state: {},

  effects: {
    * login({
      payload,
    }, { put, call, select }) {
      const data = yield call(login, payload)
      const { locationQuery } = yield select(_ => _.app)
      if (isSuccess(data)) {
        window.localStorage.setItem('username', payload.username)
        window.localStorage.setItem('password', payload.password)
        const { data: { token } } = data
        window.localStorage.setItem('token', token);
        const { from } = locationQuery
        yield put({ type: 'app/query' })
        if (from && (from !== '/login' || from !== '/')) {
          yield put(routerRedux.push(from))
        } else {
          yield put(routerRedux.push('/dashboard'))
          message.success('登录成功！')
        }
      }
      else {
        return
      }
    },
    *getEmail({ payload }, { call, put }) {
      const res = yield call(getEmail, payload)
      yield put({
        type: 'update',
        payload: res
      })
      if (isSuccess(res)) {
        message.success('邮件已发送，请登录邮箱验证后进行修改密码操作！')
      }
      else {
        message.error(res.message);
      }
    },
  },

}
