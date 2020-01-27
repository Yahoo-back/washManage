import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import {
  getStoreOptions,
  getDeviceFastigium,
  getIncome,
  getProgramRate,
  getUserEvaluation
} from './services/dashboard'
import { model } from 'utils/model'
import { TODAY, PASTDAY } from '../../utils/date'

const crrtime = new Date().toLocaleTimeString('chinese', { hour12: false })  // 获得当前时间点（24小时制）
let start = PASTDAY.split(("/"))
let end = TODAY.split(("/"))
let aTime = start[0] + "-" + start[1] + "-" + start[2] + " " + crrtime // 时间选择器默认时间
let bTime = end[0] + "-" + end[1] + "-" + end[2] + " " + crrtime // 默认时间为当前一周

export default modelExtend(model, {
  namespace: 'dashboard',

  state: {
    storePull: [],
    deviceData: [],
    incomeData: [],
    evaluationData: [],
    washRateData: [],
    dryRateData: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/dashboard') {
          dispatch({
            type: 'getDeviceFastigium',
            payload: {
              endTime: bTime,
              startTime: aTime,
              storeName: ''
            }
          })
          dispatch({
            type: 'getIncome',
            payload: {
              endTime: bTime,
              startTime: aTime,
              storeName: '',
              type: 1
            }
          })
          dispatch({
            type: 'getWashRate',
            payload: {
              endTime: bTime,
              startTime: aTime,
              storeName: '',
              serveType: 1,
            }
          })
          dispatch({
            type: 'getDryRate',
            payload: {
              endTime: bTime,
              startTime: aTime,
              storeName: '',
              serveType: 2,
            }
          })
          dispatch({
            type: 'getUserEvaluation',
            payload: {
              endTime: bTime,
              startTime: aTime,
              storeName: ''
            }
          })
        }
      })
    },
  },

  effects: {
    *getStoreOptions({ payload }, { call, put }) {
      const res = yield call(getStoreOptions, parse(payload))
      yield put({
        type: 'update',
        payload: {
          storePull: res.data
        },
      })
    },
    *getDeviceFastigium({ payload }, { call, put }) {
      const res = yield call(getDeviceFastigium, payload)
      yield put({
        type: 'update',
        payload: {
          deviceData: res.data
        },
      })
    },
    *getIncome({ payload }, { call, put }) {
      const res = yield call(getIncome, payload)
      yield put({
        type: 'update',
        payload: {
          incomeData: res.data
        },
      })
    },
    *getWashRate({ payload }, { call, put }) {
      const res = yield call(getProgramRate, payload)
      yield put({
        type: 'update',
        payload: {
          washRateData: res.data
        },
      })
    },
    *getDryRate({ payload }, { call, put }) {
      const res = yield call(getProgramRate, payload)
      yield put({
        type: 'update',
        payload: {
          dryRateData: res.data
        },
      })
    },
    *getUserEvaluation({ payload }, { call, put }) {
      const res = yield call(getUserEvaluation, payload)
      yield put({
        type: 'update',
        payload: {
          evaluationData: res.data
        },
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
