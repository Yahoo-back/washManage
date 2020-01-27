import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { message } from 'antd'
import { getUploadimage, getAppimage } from '../service.js'
import { model } from 'utils/model'
import { isSuccess } from '../../../utils/handleError'

export default modelExtend(model, {
  namespace: 'adManage',

  state: {
    appPic: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/applicationManage/adManage') {
          dispatch({ type: 'getAppimage' })
        }
      })
    },
  },

  effects: {
    *getUploadimage({ payload }, { call, put }) {
      const { fileList, direcUrl, id } = payload
      const formData = new FormData()
      const imgFile = fileList[0] ? (fileList[0].originFileObj ? fileList[0].originFileObj : '') : ''
      formData.append('file', imgFile)
      const loading = message.loading('保存中...', 0)
      const res = yield call(getUploadimage, formData, direcUrl, id)
      if (isSuccess(res)) {
        message.success('APP首页广告图信息已保存成功！', 2.5)
        yield put({
          type: 'update',
          payload: res
        })
      } else {
        message.error(res.message)
      }
      loading();
    },
    *getAppimage({ payload }, { call, put }) {
      const res = yield call(getAppimage, parse(payload))
      yield put({
        type: 'update',
        payload: {
          appPic: res.data
        }
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
