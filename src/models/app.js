/* global window */
/* global document */
/* global location */
/* eslint no-restricted-globals: ["error", "event"] */

import { routerRedux } from 'dva/router';
import { parse } from 'qs';
import config from 'config';
import { EnumRoleType } from 'enums';
import { query, logout, getRoleDetail, wsConnect } from 'services/app';
import * as menusService from 'services/menus';
import queryString from 'query-string';
import { notification } from 'antd';
import { isSuccess } from '../utils/handleError';
const { prefix, sessionApi } = config;

export default {
    namespace: 'app',
    state: {
        user: {},
        menu: [], //左边菜单栏
        menuPopoverVisible: false,
        siderFold: window.localStorage.getItem(`${prefix}siderFold`) === 'true',
        darkTheme: window.localStorage.getItem(`${prefix}darkTheme`) === 'true',
        isNavbar: document.body.clientWidth < 769,
        navOpenKeys: JSON.parse(window.localStorage.getItem(`${prefix}navOpenKeys`)) || [],
        locationPathname: '',
        locationQuery: {},
        wsSession: null, //IM会话websocker
        sessions: [
            {
                openid: '',
                content: '',
                isRead: false
            }
        ]
    },
    subscriptions: {
        setupHistory({ dispatch, history }) {
            history.listen(location => {
                dispatch({
                    type: 'imSession'
                });
                dispatch({
                    type: 'updateState',
                    payload: {
                        locationPathname: location.pathname,
                        locationQuery: location.query
                    }
                });
                /**
                 * 自动请求登录接口条件：
                 * 1.非注销登录跳转的登录页
                 * 2.本地未存token，存有自动登录标志位为true，存有用户名密码
                 * 3.非重置密码页
                 */
                if (
                    (window.location.href.indexOf('?') >= 0 &&
                    window.location.href.split('?')[1] == 'isLogout') == false &&
                    window.localStorage.getItem('username') &&
                    window.localStorage.getItem('password') &&
                    !window.localStorage.getItem('token') &&
                    window.localStorage.getItem('checked') == 'true' &&
                    window.location.href.indexOf('reset') < 0
                ) {
                    dispatch({
                        type: 'login/login',
                        payload: {
                            username: window.localStorage.getItem('username'),
                            password: window.localStorage.getItem('password')
                        }
                    });
                } else {
                    return;
                }
            });
        },
        setup({ dispatch }) {
            dispatch({ type: 'query' });
            let tid;
            window.onresize = () => {
                clearTimeout(tid);
                tid = setTimeout(() => {
                    dispatch({ type: 'changeNavbar' });
                }, 300);
            };
        }
        //websocker
        // openSocket ({ dispatch }) {
        //   return wsConnect((data) => {
        //     console.log(data)
        //     if (!data || data.slice(0,1)!=="{") return
        //     const msg = JSON.parse(data)
        //     if (msg.msgType === 2) {
        //       dispatch({ type:'getSession', payload: msg })
        //     } else {
        //       dispatch({ type:'connect', payload: msg })
        //     }
        //   })
        // }
    },
    effects: {
        *query({ payload }, { call, put, select }) {
            const res = yield call(query);
            const { locationPathname } = yield select(_ => _.app);
            if (res.code == 200) {
                const { data } = yield call(menusService.query);
                const userDetail = res.data;
                yield put({
                    type: 'updateState',
                    payload: {
                        menu: data,
                        user: userDetail
                    }
                });
                if (location.pathname === '/login') {
                    yield put(
                        routerRedux.push({
                            pathname: '/dashboard'
                        })
                    );
                }
                // 获取当前用户角色id
                yield put({
                    type: 'getRoleDetail',
                    payload: res.data.roleIds[0]
                });
            }
            /**
             * 个人信息未请求成功（即未登录成功）
             * 如果当前路径非openPages页，跳转至登录页（hash路由）
             * openPages['/login', '/reset']
             */
            else if ( config.openPages && config.openPages.indexOf(locationPathname) < 0 ) {
                yield put(
                    routerRedux.push({
                        pathname: '/login',
                        search: queryString.stringify({
                            from: locationPathname
                        })
                    })
                );
            }
        },

        // 获取当前用户权限
        *getRoleDetail({ payload }, { call }) {
            const userRolePermission = [];
            const res = yield call(getRoleDetail, payload);
            res &&
                res.data &&
                res.data.permissions &&
                res.data.permissions.map(v => {
                    delete v.icon;
                    delete v.pPermissionId;
                    delete v.permissionKey;
                    delete v.permissionType;
                    delete v.sort;
                    userRolePermission.push(v);
                });
            window.localStorage.setItem('userRolePermission', JSON.stringify(userRolePermission));
        },

        *logout({ payload }, { call, put }) {
            const tk = {};
            tk.token = window.localStorage.getItem('token');
            const data = yield call(logout, parse(tk));
            if (data.success) {
                yield put({
                    type: 'updateState',
                    payload: {
                        user: {},
                        menu: [
                            {
                                id: 1,
                                icon: 'laptop',
                                name: 'Dashboard',
                                router: '/dashboard'
                            }
                        ]
                    }
                });
                // 清除token
                window.localStorage.removeItem('token');
                // 清除当前用户权限信息
                window.localStorage.removeItem('userRolePermission');
                yield put(routerRedux.push('/login?isLogout'));
            } else {
                throw data;
            }
        },

        *changeNavbar(action, { put, select }) {
            const { app } = yield select(_ => _);
            const isNavbar = document.body.clientWidth < 769;
            if (isNavbar !== app.isNavbar) {
                yield put({ type: 'handleNavbar', payload: isNavbar });
            }
        },

        /**
         *Session function
         */
        *getSession({ payload }, { put, select }) {
            console.log(payload);
            console.log(notification);
            notification.open({
                message: 'Notification Title',
                description:
                    'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
                onClick: () => {
                    console.log('Notification Clicked!');
                }
            });
        },

        *sendSession({ payload }, { put, select }) {
            const {
                app: { wsSession }
            } = yield select(_ => _);
        }
    },
    reducers: {
        updateState(state, { payload }) {
            console.log(payload);
            return {
                ...state,
                ...payload
            };
        },

        switchSider(state) {
            window.localStorage.setItem(`${prefix}siderFold`, !state.siderFold);
            return {
                ...state,
                siderFold: !state.siderFold
            };
        },

        switchTheme(state) {
            window.localStorage.setItem(`${prefix}darkTheme`, !state.darkTheme);
            return {
                ...state,
                darkTheme: state.darkTheme
            };
        },

        switchMenuPopver(state) {
            return {
                ...state,
                menuPopoverVisible: !state.menuPopoverVisible
            };
        },

        handleNavbar(state, { payload }) {
            return {
                ...state,
                isNavbar: payload
            };
        },

        handleNavOpenKeys(state, { payload: navOpenKeys }) {
            return {
                ...state,
                ...navOpenKeys
            };
        }
    }
};
