const { config } = require('./common')

const { apiPrefix } = config;
let database = [
  {
    id: '1',
    name: '数据分析',
    icon: 'pie-chart',
    router: '/dashboard'
  },
  {
    id: '2',
    name: 'HomeConnect账号管理',
    icon: 'team'
  },
  {
    id: '21',
    mpId: '2',
    bpId: '2',
    name: 'HomeConnect账号列表',
    router: '/hcAccountList'
  },
  {
    id: '21',
    mpId: '-1',
    bpId: '-1',
    name: 'User Detail',
    router: '/hcAccountList/deviceDetail'
  },
  {
    id: '3',
    name: '设备管理',
    icon: 'appstore-o'
  },
  {
    id: '31',
    mpId: '3',
    bpId: '3',
    name: '设备列表',
    router: '/deviceManage'
  },
  {
    id: '31',
    bpId: '-1',
    mpId: '-1',
    name: '设备详情',
    router: '/deviceManage/deviceInfo',
  },
  {
    id: '31',
    bpId: '-1',
    mpId: '-1',
    name: '管理预约时间段',
    router: '/deviceManage/appointmentTime',
  },
  {
    id: '4',
    name: '预约订单管理',
    icon: 'file'
  },
  {
    id: '41',
    bpId: '4',
    mpId: '4',
    name: '预约订单列表',
    router: '/orderManage'
  },
  {
    id: '41',
    mpId: '-1',
    bpId: '-1',
    name: 'CreateOrder',
    router: '/orderManage/CreateOrder'
  },
  {
    id: '41',
    mpId: '-1',
    bpId: '-1',
    name: 'OrderDetail',
    router: '/orderManage/OrderDetail'
  },
  {
    id: '5',
    name: '用户管理',
    icon: 'user'
  },
  {
    id: '51',
    bpId: '5',
    mpId: '5',
    name: '用户列表',
    router: '/userManage/userList',
  },{
    id: '53',
    bpId: '-1',
    mpId: '-1',
    name: '用户详情',
    router: '/userManage/userInfo',
  },
  
  {
    id: '52',
    bpId: '5',
    mpId: '5',
    name: '用户评价',
    router: '/userManage/userEvaluation'
  },
  {
    id: '6',
    name: '优惠券管理',
    icon: 'pay-circle'
  },
  {
    id: '61',
    bpId: '6',
    mpId: '6',
    name: '优惠券列表',
    router: '/couponManage'
  },
  {
    id: '61',
    mpId: '-1',
    bpId: '-1',
    name: 'Create Coupon',
    router: '/couponManage/CreateCoupon'
  },
  {
    id: '61',
    mpId: '-1',
    bpId: '-1',
    name: 'Coupon Detail',
    router: '/couponManage/CouponDetail'
  },

  {
    id: '7',
    name: '系统通知',
    icon: 'bell'
  },
  {
    id: '71',
    bpId: '7',
    mpId: '7',
    name: '系统通知列表',
    router: '/systemNotice'
  },
  {
    id: '8',
    name: '应用管理',
    icon: 'share-alt'
  },
  {
    id: '81',
    bpId: '8',
    mpId: '8',
    name: 'APP首页广告管理',
    router: '/applicationManage/adManage'
  },
  {
    id: '82',
    bpId: '8',
    mpId: '8',
    name: '洗衣程序价格信息管理',
    router: '/applicationManage/price'
  },
  {
    id: '9',
    name: '门店管理',
    icon: 'shop'
  },
  {
    id: '91',
    bpId: '9',
    mpId: '9',
    name: '门店列表',
    router: '/storeManage'
  },
  {
    id: '91',
    bpId: '-1',
    mpId: '-1',
    name: '门店详情',
    router: '/storeManage/storeInfo',
  },{
    id: '91',
    bpId: '-1',
    mpId: '-1',
    name: '新增门店',
    router: '/storeManage/storeAdd',
  },
  {
    id: '10',
    name: '系统管理',
    icon: 'setting'
  },
  {
    id: '101',
    bpId: '10',
    mpId: '10',
    name: '账号管理',
    router: '/systemManage/account'
  },
  {
    id: '102',
    bpId: '10',
    mpId: '10',
    name: '个人中心',
    router: '/systemManage/personalCenter',
  },
  {
    id: '103',
    bpId: '10',
    mpId: '10',
    name: '角色管理',
    router: '/systemManage/role'
  }
];

module.exports = {
  [`GET ${apiPrefix}/menus`](req, res) {
    res.status(200).json(database)
  }
}
