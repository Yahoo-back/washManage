/* global window */
import modelExtend from 'dva-model-extend';
import { parse } from 'qs';
import { config } from 'utils';
import { message } from 'antd';
import {
    cancle,
    exportorder,
    getStoreOptions,
    showList,
    create,
    detail,
    getProcedure,
    getType,
    selectCoupon,
    getMoney
} from './service/order';
const { prefix } = config;

export default {
    namespace: 'order',
    state: {
        addVisible: false,
        pagination: {
            current: 1,
            pageSize: 10,
            size: 10,
        },
        size: '',
        orderList: [],
        orderStatus: '1',
        selectStoreName: '',
        orderNoOrOpenid: '',
        storeName: [],
        serveType: '',
        getType: [],
        detail: {
            orderNo: '',
            storeName: '',
            ctime: '',
            tradeScene: '',
            appointDate: '',
            appointTime: '',
            coupons: '',
            merchantNo: '',
            serveType: '',
            serveProcedure: '',
            tradeTime: '',
            tradeStatus: '',
            tradeMoney: '',
            weixinOrderNo: '',
            weixinName: '',
            orderStatus: '',
            openid: ''
        }
        //账号列表数据
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
        //取消预约
        *cancelOrder({ payload }, { call, put }) {
            const data = yield call(cancle, payload);
            if (data.code == 200) {
                yield put({
                    type: 'detail',
                    payload: payload
                });
                message.success('取消成功');
            } else {
                message.error(data.message);
            }
        },

        //门店下拉
        *getStoreOptions({ payload }, { call, put }) {
            const data = yield call(getStoreOptions, payload);
            if (data.code == '200') {
                yield put({
                    type: 'updateState',
                    payload: { storeName: data.data }
                });
            } else {
                message.error(data.message);
            }
        },

        //订单列表
        *showList({ payload }, { call, put }) {
            const loading = message.loading('加载中...', 0);
            const data = yield call(showList, payload);
            if (data.code == 200) {
                yield put({
                    type: 'updateState',
                    payload: { orderList: data.data.records, total: data.data.total, current: data.data.current }
                });
            } else {
                message.error(data.message);
            }
            setTimeout(loading, 0);
        },

        //创建预约订单
        *create({ payload }, { call, put }) {
            const loading = message.loading('保存中...', 0);
            const data = yield call(create, payload.data);
            if (payload.resolve) {
                payload.resolve(data);
            }
            if (data.code == 200) {
                yield put({
                    type: 'showList',
                    payload: {
                        current: 1,
                        size: 10,
                        records: [
                            {
                                orderStatus: 1
                            }
                        ]
                    }
                });
                message.success('预约订单创建成功!', 2.5);
            } else {
                message.error(data.message);
            }
            setTimeout(loading, 0);
        },

        //订单详情
        *detail({ payload }, { call, put }) {
            const data = yield call(detail, payload);
            if (data.code == 200) {
                yield put({
                    type: 'updateState',
                    payload: { detail: data.data }
                });
            } else {
                message.error(data.message);
            }
        },

        //服务程序下拉
        *getProcedure({ payload }, { call, put }) {
            const data = yield call(getProcedure, payload);
            if (data.code == '200') {
                yield put({
                    type: 'updateState',
                    payload: { procedure: data.data }
                });
            } else {
                message.error(data.message);
            }
        },

        //服务类型下拉
        *getType({ payload }, { call, put }) {
            const data = yield call(getType, payload);
            if (data.code == '200') {
                yield put({
                    type: 'updateState',
                    payload: { getType: data.data }
                });
            } else {
                message.error(data.message);
            }
        },

        //选择优惠券下拉
        *selectCoupon({ payload }, { call, put }) {
            const data = yield call(selectCoupon, payload);
            if (data.code == 200) {
                yield put({
                    type: 'updateState',
                    payload: { selectCouponPull: data.data }
                });
            } else {
                message.error(data.message);
            }
        },

        //获取订单金额
        *getMoney({ payload }, { call, put }) {
            const data = yield call(getMoney, payload);
            if (data.code == 200) {
                yield put({
                    type: 'updateState',
                    payload: { getMoney: data.data }
                });
            } else {
                message.error(data.message);
            }
        }
    },

    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname }) => {
                if (pathname === '/orderManage') {
                    const size = history.location.query.pageSize;
                    dispatch({
                        type: 'showList',
                        payload: {
                            current: 1,
                            size: size,
                            pages: 1,
                            records: [{ orderStatus: 1, storeName: '', serveType: '', orderNoOrOpenid: '' }]
                        }
                    });
                    dispatch({ type: 'updateState', payload: { orderStatus: '1', storeName: '', serveType: '' } });
                }
                if (pathname === '/orderManage/OrderDetail') {
                    const id = history.location.query.orderNo;
                    dispatch({ type: 'detail', payload: id });
                }
            });
        }
    }
};
