import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import {
  getRoleList,
  getRoleDetail,
  addRole,
  deleteRole,
  updateRole,
  getPermissionList,
} from '../service.js'
import { model } from 'utils/model'
import { message } from 'antd'
import { isSuccess } from '../../../utils/handleError'

export default modelExtend(model, {
  namespace: 'role',

  state: {
    roleList: [],
    roleDetail: [],
    permissionList: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const data = {
          current: 1,
          pages: 1,
          size: 10,
        }
        if (pathname === '/systemManage/role') {
          dispatch({
            type: 'getRoleList',
            payload: data
          })
        }
      })
    },
  },

  effects: {
    *getRoleList({ payload }, { call, put }) {
      const res = yield call(getRoleList, parse(payload))
      yield put({
        type: 'update',
        payload: {
          roleList: res.data
        }
      })
    },
    *getRoleDetail({ payload }, { call, put }) {
      const res = yield call(getRoleDetail, payload)
      yield put({
        type: 'update',
        payload: {
          roleDetail: res.data
        }
      })
    },
    *deleteRole({ payload }, { call, put }) {
      const res = yield call(deleteRole, payload)
      if (isSuccess(res)) {
        message.success('删除角色成功！')
        yield put({ type: 'getRoleList' })
      }
      else {
        message.error(res.message)
      }
    },
    *addRole({ payload }, { call, put }) {
      const loading = message.loading('保存中...', 0)
      const res = yield call(addRole, parse(payload))
      if (isSuccess(res)) {
        message.success('添加角色成功！', 2.5)
        yield put({ type: 'getRoleList' })
      } else {
        message.error(res.message)
      }
      setTimeout(loading, 0)
    },
    *updateRole({ payload }, { call, put }) {
      const loading = message.loading('保存中...', 0)
      const res = yield call(updateRole, parse(payload))
      if (isSuccess(res)) {
        message.success('更新角色成功！', 2.5)
        yield put({ type: 'getRoleList' })
      } else {
        message.error(res.message)
      }
      setTimeout(loading, 0)
    },
    *getPermissionList({ payload }, { call, put }) {
      const res = yield call(getPermissionList, parse(payload))
      yield put({
        type: 'update',
        payload: {
          permissionList: res.data.records
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
