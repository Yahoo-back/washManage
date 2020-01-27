/* global window */
import modelExtend from 'dva-model-extend';
import { parse } from 'qs';
import { config } from 'utils';
import { message } from 'antd';
import { showList, create, deleteCoupons, changeStatus, editCoupons, Select, getType } from './services/coupon';

const { prefix } = config;

export default {
    namespace: 'couponList',
    state: {
        couponData: [],
        couponListData: [],
        createCoupon: [],
        deleteData: [],
        couponStatus: [],
        number: '',
        currentPage: '',
        pageSize: '',
        pagination: { currentPage: 1, pageSize: 10 }
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
        //账号列表
        *showList({ payload }, { call, put }) {
            const loading = message.loading('加载中...', 0);
            const couponData = yield call(showList, payload);
            if (payload.resolve) {
                payload.resolve(createData);
            }
            if (couponData.code == 200) {
                yield put({
                    type: 'updateState',
                    payload: {
                        couponListData: couponData.data.records,
                        total: couponData.data.total,
                        current: couponData.data.current
                    }
                });
            }
            setTimeout(loading, 0);
        },

        //添加优惠券
        *create({ payload }, { call, put }) {
            const loading = message.loading('保存中...', 0);
            const createCoupon = yield call(create, parse(payload));
            if (payload.resolve) {
                payload.resolve(createCoupon);
            }
            if (createCoupon.code == 200) {
                yield put({
                    type: 'showList',
                    payload: {
                        currentPage: 1,
                        pageSize: 10
                    }
                });
                message.success('优惠券添加成功!', 2.5);
            } else {
                message.error(createCoupon.message);
            }
            setTimeout(loading, 0);
        },

        //删除优惠券
        *deleteCoupons({ payload }, { call, put }) {
            const deleteData = yield call(deleteCoupons, payload);
            if (deleteData.code == 200) {
                yield put({
                    type: 'showList',
                    payload: {
                        currentPage: 1,
                        pageSize: 10
                    }
                });
                message.success('优惠券删除成功');
            } else {
                message.error(deleteData.message);
            }
        },

        //查询优惠券
        *Select({ payload }, { call, put }) {
            const loading = message.loading('加载中...', 0);
            const selectCoupon = yield call(Select, parse(payload));
            if (selectCoupon.code == 200) {
                yield put({
                    type: 'showList',
                    payload: {
                        currentPage: 1,
                        pageSize: 10
                    }
                });
            } else {
                message.error(selectCoupon.message);
            }
            setTimeout(loading, 0);
        },

        //改变优惠券状态
        *changeStatus({ payload }, { call, put }) {
            const couponStatus = yield call(changeStatus, payload);
            if (couponStatus.code == 200) {
                yield put({
                    type: 'showList',
                    payload: {
                        currentPage: 1,
                        pageSize: 10
                    }
                });
                message.success('优惠券状态已修改！');
            } else {
                message.error(couponStatus.message);
            }
        },

        *editCoupons({ payload }, { call, put }) {
            const loading = message.loading('保存中...', 0);
            const editDetail = yield call(editCoupons, payload);
            if (editDetail.code == 200) {
                yield put({
                    type: 'showList',
                    payload: {
                        currentPage: 1,
                        pageSize: 1000
                    }
                });
                message.success('修改成功！', 2.5);
            } else {
                message.error(editDetail.message);
            }
            setTimeout(loading, 0);
        },

        //服务类型下拉
        *getType({ payload }, { call, put }) {
            const data = yield call(getType, payload);
            if (data.code == 200) {
                yield put({
                    type: 'updateState',
                    payload: data
                });
            } else {
                message.error(data.message);
            }
        }
    },

    subscriptions: {
        //获取数据的方法
        setup({ dispatch, history }) {
            history.listen(({ pathname }) => {
                if (pathname === '/couponManage') {
                    dispatch({
                        type: 'showList',
                        payload: {
                            currentPage: 1,
                            pageSize: 10,
                            condition: '',
                            records: [{ number: '' }]
                        }
                    });
                }
            });
        }
    }
};
