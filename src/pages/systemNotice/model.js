import modelExtend from 'dva-model-extend'
import { pageModel } from 'utils/model'
import { message } from 'antd'
import { getSystemList, getStore, getRead } from './service.js'

export default modelExtend(pageModel, {

	namespace: 'systemNotice',
	state: {
		storeList: [],
		currentPage: 1,
		pageSize: 10,
		dataList: [],
		selectData: [],
		total: 0,
		storeName: '',
		type: '',
		title: '',
		selectedData:[]
	},
	subscriptions: {
		setup({ dispatch, history }) {
			history.listen((location) => {
				if (location.pathname === '/systemNotice') {
					dispatch({
						type: 'getSystemList',
						payload: {
							current: 1,
							size: 10,
							pages: 1,
							records: []
						},
					});
					dispatch({
						type: 'getStore',
					})
				}
			})
		},

	},
	effects: {
		*getSystemList({ payload }, { call, put }) {
			const data = yield call(getSystemList, payload);
			if (data.code == '200') {
				if (data.data == null) {
					yield put({
						type: 'updateState',
						payload: []
					})
					yield put({
						type: 'updateTotal',
						payload: 0
					})
				} else {
					const dataList = data.data.records;
					const total = data.data.total;
					yield put({
						type: 'updateState',
						payload: dataList
					})
					yield put({
						type: 'updateTotal',
						payload: total
					})
				}

			} else {
				message.error(data.message)
			}
		},
		*getStore({ payload }, { call, put }) {
			const data = yield call(getStore, payload)
			if (data.code == '200') {
				const storeList = data.data;
				yield put({
					type: 'updateStore',
					payload: storeList,
				})
			} else {
				message.error(data.message)
			}
		},
		*getRead({ payload }, { call, put }) {
			const data = yield call(getRead, payload.id);
			if (data.code == '200') {
				if (!payload.title) {
					yield put({
						type: 'getSystemList',
						payload: {
							current: 1,
							size: 10,
							pages: 1,
							records: []
						}
					})
					message.success('已标记为已读！')
				} else {
					return
				}
			} else {
				message.error(data.message)
			}
		}
	},
	reducers: {
		updateState(state, { payload }) {
			return {
				...state,
				dataList: payload
			}
		},
		updateStore(state, { payload }) {
			return {
				...state,
				storeList: payload
			}
		},
		updateSelect(state, { payload }) {
			return {
				...state,
				selectData: payload
			}
		},
		updateTotal(state, { payload }) {
			return {
				...state,
				total: payload
			}
		},
		updateStoreName(state, { payload }) {
			return {
				...state,
				storeName: payload
			}
		},
		updateType(state, { payload }) {
			return {
				...state,
				type: payload,
			}
		},
		updateTitle(state, { payload }) {
			return {
				...state,
				title: payload
			}
		},
		updatePage(state, { payload }) {
			return {
				...state,
				page: payload
			}
		},
		querySuccess(state, { payload: value }) {
			return { ...state, ...value }
		  },
		selectData(state, { payload }) {
			return {
				...state,
				selectedData: payload
			}
		}
	},

})