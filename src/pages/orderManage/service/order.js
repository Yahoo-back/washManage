import { request, config } from 'utils';

const { api } = config;
const {
  storePull,
  orderList,
  addOrder,
  cancelOrder,
  orderDetail,
  couponPull,
  storeOrderList,
  getOrderMoney,
  serveProcedure,
  serveType,
  exportOrders
} = api;
//门店下拉
export function getStoreOptions(params) {
  return request({
    url: storePull,
    method: 'post',
    data: params
  });
}
//优惠券下拉
export function selectCoupon(params) {
  return request({
    url: couponPull,
    method: 'post',
    data: params
  });
}
//获取订单金额
export function getMoney(params) {
  return request({
    url: getOrderMoney,
    method: 'post',
    data: params
  });
}
//订单列表
export function showList(data) {
  return request({
    url: orderList,
    method: 'post',
    data
  });
}

//订单详情
export function detail(data) {
  return request({
    url: orderDetail,
    method: 'post',
    data
  });
}

//创建订单
export function create(data) {
  return request({
    url: addOrder,
    method: 'post',
    data
  });
}

//取消预约订单
export function cancle(data) {
  return request({
    url: cancelOrder,
    method: 'post',
    data
  });
}

//服务程序下拉
export function getProcedure(params) {
  return request({
    url: serveProcedure,
    method: 'post',
    data: params
  });
}

//服务类型下拉
export function getType(params) {
  return request({
    url: serveType,
    method: 'get',
    data: params
  });
}
