import { request, config } from 'utils';

const { api, sessionApi } = config;
const { user, userLogout, userLogin, roleDetail } = api;

export function login(params) {
    return request({
        url: userLogin,
        method: 'post',
        data: params
    });
}

// 获取角色详情
export function getRoleDetail(params) {
    return request({
        url: roleDetail,
        method: 'post',
        data: params
    });
}

export function logout(params) {
    return request({
        url: userLogout,
        method: 'post',
        data: params
    });
}

export function query(params) {
    return request({
        url: user,
        method: 'post',
        data: params
    });
}

// let ws
// export function wsConnect (action) {
//   ws = new WebSocket(sessionApi)
//   ws.onopen = () => {
//     // do something
//   }
//   ws.onmessage = ({ data }) => {
//     action(data)
//   }
// }
