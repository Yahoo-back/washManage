import { request, config } from 'utils';

const { api } = config;
const { getListPage, storePull, read } = api;

//获取系统通知
export async function getSystemList(params) {
	return request({
		url: getListPage,
		method: 'POST',
		data: params
	});
}

//获取模糊查询时用的下拉门店
export async function getStore(params) {
	return request({
		url: storePull,
		method: 'POST',
		data: params
	})
}

//标记为已读
export async function getRead(params) {
	return request({
		url: read,
		method: 'POST',
		data: params,
	})
}