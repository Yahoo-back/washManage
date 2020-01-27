import modelExtend from 'dva-model-extend'
import { pageModel } from 'utils/model'
import { message } from 'antd'
import { add } from './service'
import router from 'umi/router';

export default modelExtend(pageModel, {

  namespace: 'storeAdd',
  state: {
    initialName: '',
    initialAddress: '',
    initialstartStime: '00:00',
    initialendStime: '00:00',
    img:''
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/storeManage/storeAdd') {
          dispatch({
            type: 'addSuccess',
            payload: {
              img:''
            },
          })
        }
      })
    },
  },
  effects: {
    * add({
      payload,
    }, { call, put }) {
      const data = yield call(add, payload)
      message.loading('保存中...', 1)
      .then(() => {
      if (data.code == 200) {
        message.success("新建门店成功")
      }
    })
    if (data.code == 200) {
      yield put({
        type: 'addSuccess',
        payload: {
          initialName: '',
          initialAddress: '',
          initialstartStime: '00:00',
          initialendStime: '00:00',
        },
      })
      router.push('/storeManage');
    }else {
      throw data
    }
    }
  },
  reducers: {
    addSuccess(state, { payload: value }) {
      return { ...state, ...value }
    },
  },

})
