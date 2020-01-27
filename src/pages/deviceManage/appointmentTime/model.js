import modelExtend from 'dva-model-extend'
import { pageModel } from 'utils/model'
import { add, del, edit, list } from './service'
import { message } from 'antd'
export default modelExtend(pageModel, {

  namespace: 'appointment',
  state: {
    modalVisible: false,
    deleteModalVisible: false,
    deleteId: '',
    selectedTags: [],
    modalName: '',
    initialName: '',
    initialStartTime: '00:00',
    initialEndTime: '00:00'
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/deviceManage/appointmentTime') {
          dispatch({
            type: 'list',
            payload: {

            },
          })
        }
      })
    },
  },
  effects: {
    * list({
      payload,
    }, { call, put }) {
      const data = yield call(list, payload)
      if (data.code == 200) {
        yield put({
          type: 'querySuccess',
          payload: {
            appointmentList: data.data,
          },
        })
      } else {
        throw data
      }
    },
    * add({
      payload,
    }, { call, put }) {
      const data = yield call(add, payload)
      message.loading('保存中...', 1)
      .then(() => {
      if (data.code == 200) {
        message.success('添加成功');
      }
    })
    if (data.code == 200) {
      yield put({
        type: 'list'
      })
    }else {
      throw data
    }
    },
    * del({
      payload,
    }, { call, put }) {
      const data = yield call(del, payload)
      if (data.code == 200) {
        yield put({
          type: 'querySuccess',
          payload: {
            deleteModalVisible: false,
            deleteId: ''
          },
        })
        message.success('删除成功');
        yield put({
          type: 'list',
        })
      } else {
        throw data
      }
    },
    * edit({
      payload,
    }, { call, put }) {
      const data = yield call(edit, payload)
      message.loading('保存中...', 1)
      .then(() => {
      if (data.code == 200) {
        message.success('编辑成功');
      }
    })
    if (data.code == 200) {
      yield put({
        type: 'list'
      })
    }else {
      throw data
    }
    },
  },
  reducers: {
    showModal(state, { payload: value }) {
      return { ...state, ...value }
    },
    deleteModal(state, { payload: value }) {
      return { ...state, ...value }
    },
    querySuccess(state, { payload: value }) {
      return { ...state, ...value }
    },
  },

})
