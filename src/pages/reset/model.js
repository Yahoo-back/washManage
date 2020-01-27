import { forgetPassword } from './service'
import { isSuccess } from '../../utils/handleError'
import { message } from 'antd'

export default {
  namespace: 'reset',

  state: {},

  effects: {
    *forgetPassword({ payload }, { call, put }) {
      const res = yield call(forgetPassword, payload)
      yield put({
        type: 'update',
        payload: res
      })
      if (isSuccess(res)) {
        message.success('重置密码成功将跳往登录页面！')
        setTimeout(() =>{
          window.location = '/#/login'
        },1000)
      } else {
        message.error('重置密码失败！')
      }
    },
  },
}
