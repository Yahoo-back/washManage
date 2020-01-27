import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { getPriceInfomationList, getPriceInfomationEdit, getStoreOptions } from '../service.js'
import { model } from 'utils/model'
import { message } from 'antd'
import { isSuccess } from '../../../utils/handleError'

export default modelExtend(model, {
  namespace: 'price',

  state: {
    listData: [],
    storePull: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const priceData = {
          currentPage: 1,
          pageSize: 10,
        }
        if (pathname === '/applicationManage/price') {
          dispatch({
            type: 'getPriceInfomationList',
            payload: priceData
          })
        }
      })
    },
  },

  effects: {
    *getPriceInfomationList({ payload }, { call, put }) {
      const res = yield call(getPriceInfomationList, parse(payload))
      yield put({
        type: 'update',
        payload: {
          listData: res.data
        }
      })
    },
    *getPriceInfomationEdit({ payload }, { call, put }) {
      const loading = message.loading('保存中...', 0)
      const res = yield call(getPriceInfomationEdit, parse(payload))
      if (isSuccess(res)) {
        message.success('更新价格信息成功！', 2.5)
        const priceData = {
          currentPage: 1,
          pageSize: 10,
        }
        yield put({
          type: 'getPriceInfomationList',
          payload: priceData
        })
      }
      else {
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
