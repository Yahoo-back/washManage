import { request, config } from 'utils'

const { api } = config
const {
  storePull,
  priceInfomationList,
  priceInfomationEdit,
  uploadimage,
  appimage,
} = api

// 获取门店下拉列表
export function getStoreOptions(params) {
  return request({
    url: storePull,
    method: 'post',
    data: params,
  })
}

// 获取洗衣程序价格信息
export function getPriceInfomationList(params) {
  return request({
    url: priceInfomationList,
    method: 'post',
    data: params,
  })
}

// 编辑洗衣程序价格信息
export function getPriceInfomationEdit(params) {
  return request({
    url: priceInfomationEdit,
    method: 'post',
    data: params,
  })
}

// 上传app首页广告图
export function getUploadimage(params, direcUrl, id) {
  return request({
    url: `${uploadimage}?id=${id}&direcUrl=${encodeURIComponent(direcUrl)}`,
    method: 'post',
    data: params,
    uploadFile: true,
  })
}

// 获取app显示图片信息
export async function getAppimage(params) {
  return request({
    url: appimage,
    method: 'post',
    data: params,
  })
}
