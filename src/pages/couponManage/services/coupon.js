import { request, config } from 'utils';

const { api } = config;
const { couponList, addCoupon, storePull, serveType, selectCoupon, deleteCoupon, changeCouponStatus, editCoupon } = api;

//账号列表
export function showList(params) {
  return request({
    url: couponList,
    method: 'post',
    data: params
  });
}

//查询优惠券
export function Select(params) {
  return request({
    url: selectCoupon,
    method: 'post',
    data: params
  });
}

//添加优惠券
export function create(params) {
  return request({
    url: addCoupon,
    method: 'post',
    data: params
  });
}

//删除优惠券
export function deleteCoupons(params) {
  return request({
    url: deleteCoupon,
    method: 'post',
    data: params
  });
}

//改变优惠券状态
export function changeStatus(params) {
  return request({
    url: changeCouponStatus,
    method: 'post',
    data: params
  });
}

//编辑优惠券
export function editCoupons(params) {
  return request({
    url: editCoupon,
    method: 'post',
    data: params
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

//服务类型下拉
export function getType(params) {
  return request({
    url: serveType,
    method: 'get',
    data: params
  });
}
