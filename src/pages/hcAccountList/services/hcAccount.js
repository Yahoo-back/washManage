import { request, config } from 'utils';

const { api } = config;
const {
    hcAccountList,
    hcAccountDetail,
    addAccount,
    deleteAccount,
    updateAccount,
    checkPsd,
    DeviceList,
    storePull
} = api;

//账号列表(包括查询，以及门店查询)
export function showList(data) {
    return request({
        url: hcAccountList,
        method: 'post',
        data
    });
}

//账号详情
export function detail(data) {
    return request({
        url: hcAccountDetail,
        method: 'post',
        data
    });
}

//创建账号
export function create(params) {
    return request({
        url: addAccount,
        method: 'post',
        data: params
    });
}

//删除账号
export function accountDelete(data) {
    return request({
        url: deleteAccount,
        method: 'post',
        data
    });
}

//修改账号
export function update(data) {
    return request({
        url: updateAccount,
        method: 'post',
        data
    });
}

//查看密码
export function check(data) {
    return request({
        url: checkPsd,
        method: 'post',
        data
    });
}

//设备列表
export function devList(data) {
    return request({
        url: DeviceList,
        method: 'post',
        data
    });
}

//门店下拉
export function getStoreOptions(params) {
    return request({
        url: storePull,
        method: 'post',
        data: params
    });
}
