import modelExtend from 'dva-model-extend';
import { message } from 'antd';
import { parse } from 'qs';
import { config } from 'utils';
import { showList, detail, create, update, check, accountDelete, devList, getStoreOptions } from './services/hcAccount';

const { prefix } = config;

export default {
    namespace: 'hcAccount',
    state: {
        pagination: {
            current: 1,
            pageSize: 10
        },
        size: '',
        selectedRowKeys: [],
        page: null,
        createData: [],
        listData: [],
        delData: [],
        accountList: [],
        deviceList: [],
        detailList: '',
        checkPsd: false,
        associateStore: '',
        storePull: [],
        hcStorePull: '',
        detail: {
            homeAccountName: '',
            mail: '',
            associateStore: '',
            remark: '',
            ctime: '',
            password: ''
        },
        createDatas: ''
    },

    reducers: {
        updateState(state, { payload }) {
            return {
                ...state,
                ...payload
            };
        }
    },

    effects: {
        //创建账号
        *create({ payload }, { call, put }) {
            const loading = message.loading('保存中...', 0);
            const createData = yield call(create, payload.createValue);
            const { pagination, associateStore } = payload;
            const { current, pageSize } = pagination;
            if (payload.resolve) {
                payload.resolve(createData);
            }
            if (createData.code == 200) {
                yield put({
                    type: 'showList',
                    payload: {
                        current: current,
                        size: pageSize,
                        records: [{ associateStore: associateStore }]
                    }
                });
                message.success('账号创建成功！');
            } else {
                message.error(createData.message);
            }
            setTimeout(loading, 0);
        },

        //账号列表
        *showList({ payload }, { call, put }) {
            const loading = message.loading('加载中...', 0);
            const listData = yield call(showList, payload);
            if (listData.code == 200) {
                yield put({
                    type: 'updateState',
                    payload: {
                        accountList: listData.data.records,
                        total: listData.data.total,
                        current: listData.data.current
                    }
                });
            } else {
                message.error(listData.message);
            }
            setTimeout(loading, 0);
        },

        //账号详情
        *detail({ payload }, { call, put }) {
            const detailData = yield call(detail, payload);
            if (detailData.code == 200) {
                yield put({
                    type: 'updateState',
                    payload: { detail: detailData.data }
                });
            } else {
                message.error(detailData.message);
            }
        },

        //删除账号
        *accountDelete({ payload }, { call, put }) {
            const { pagination, associateStore } = payload;
            const { current, pageSize } = pagination;
            const delData = yield call(accountDelete, payload.deleteIds);
            if (delData.code == 200) {
                yield put({
                    type: 'showList',
                    payload: { current: current, size: pageSize, records: [{ associateStore: associateStore }] }
                });
                message.success('账号已删除！');
            } else {
                message.error(delData.message);
            }
        },

        //修改
        *update({ payload }, { call, put }) {
            const loading = message.loading('保存中...', 0);
            const data = yield call(update, payload);
            if (data.code == 200) {
                yield put({
                    type: 'detail',
                    payload: payload.id
                });
                message.success('HomeConnect账号信息已修改！');
            } else {
                message.error(data.message);
            }
            setTimeout(loading, 0);
        },

        //查看密码
        *check({ payload }, { call, put }) {
            const data = yield call(check, payload);
            if (data.code == 200) {
                yield put({
                    type: 'updateState',
                    payload: { checkPsd: true }
                });
            } else {
                message.error(data.message);
            }
        },

        //设备列表
        *devList({ payload }, { call, put }) {
            const devListData = yield call(devList, payload);
            if (devListData.code == 200) {
                yield put({
                    type: 'updateState',
                    payload: {
                        deviceList: devListData.data.records,
                        total: devListData.data.total,
                        current: devListData.data.current
                    }
                });
            } else {
                message.error(devListData.message);
            }
        },

        //门店下拉
        *getStoreOptions({ payload }, { call, put }) {
            const data = yield call(getStoreOptions, payload);
            if (data.code == '200') {
                yield put({
                    type: 'updateState',
                    payload: { storePull: data.data }
                });
            } else {
                message.error(data.message);
            }
        }
    },

    subscriptions: {
        //获取数据的方法
        setup({ dispatch, history }) {
            return history.listen(({ pathname }) => {
                if (pathname === '/hcAccountList') {
                    dispatch({
                        type: 'showList',
                        payload: { current: 1, size: 10, records: [{ accountOrMail: '', associateStore: '' }] }
                    });
                }
                if (pathname === '/hcAccountList/deviceDetail') {
                    const { id, homeAccountName } = history.location.query;
                    dispatch({ type: 'detail', payload: id });
                    dispatch({ type: 'updateState', payload: id });
                    dispatch({
                        type: 'devList',
                        payload: { current: 1, size: 10, query: { homeAccountName: homeAccountName } }
                    });
                }
            });
        }
    }
};
