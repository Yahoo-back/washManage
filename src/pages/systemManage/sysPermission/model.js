import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import {
  getPermissionList,
  addPermission,
  deletePermission,
  updatePermission,
} from '../service'
import { model } from 'utils/model'
import { message } from 'antd'
import { isSuccess } from '../../../utils/handleError'

export default modelExtend(model, {
  namespace: 'sysPermission',

  state: {
    permissionList: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/systemManage/sysPermission') {
          dispatch({ type: 'getPermissionList' })
        }
      })
    },
  },

  effects: {
    *getPermissionList({ payload }, { call, put }) {
      const res = yield call(getPermissionList, parse(payload))
      yield put({
        type: 'update',
        payload: {
          permissionList: res.data.records
        }
      })
    },
    *addPermission({ payload }, { call, put }) {
      const res = yield call(addPermission, parse(payload))
      if (isSuccess(res)) {
        message.success('添加权限成功！')
        yield put({ type: 'getPermissionList' })
      }
      else {
        message.error('添加权限失败！')
      }
    },
    *deletePermission({ payload }, { call, put }) {
      const res = yield call(deletePermission, payload)
      if (isSuccess(res)) {
        message.success('删除权限成功！')
        yield put({ type: 'getPermissionList' })
      }
      else {
        message.error('删除权限失败！')
      }
    },
    *updatePermission({ payload }, { call, put }) {
      const res = yield call(updatePermission, parse(payload))
      if (isSuccess(res)) {
        message.success('更新权限成功！')
        yield put({ type: 'getPermissionList' })
      }
      else {
        message.error('更新权限失败！')
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