const APIV1 = '/WashinFUNadmin/api'
const APIV2 = '/api/v2'

module.exports = {
	name: '博世洗悦管理后台',
	prefix: '博世洗悦管理后台',
	footerText: '博世洗悦管理后台 © 2018',
	iconFontCSS: '/public/iconfont.css',
	iconFontJS: '/public/iconfont.js',
	CORS: [],
	version: '1.0',
	appKey: 'appKey',
	openPages: ['/login', '/reset'],
	apiPrefix: '/WashinFUNadmin/api',
	APIV1,
	APIV2,
	sessionApi: "ws://193.112.138.53:7080/socketServer",
	sessionStorageNum: 100,
	// sessionApi: "wss://solution-validation.home-connect.cn/WashinFUNadmin/api/socketServer",
	api: {
		userLogin: `${APIV1}/sys/sysUser/login`,
		userLogout: `${APIV1}/user/logout`,
		userInfo: `${APIV1}/userInfo`,
		users: `${APIV1}/users`,
		posts: `${APIV1}/posts`,
		user: `${APIV1}/sys/sysUser/userDetailInfo`,
		dashboard: `${APIV1}/dashboard`,
		menus: `${APIV1}/menus`,

		//密码重置
		sendEmail: `${APIV1}/sys/sysUser/sendEmail`,	//忘记密码--发送邮件
		forgetPwd: `${APIV1}/sys/sysUser/forgetPassword`,	//忘记密码--重置密码

		//门店管理
		storeDetail: `${APIV1}/store/detail`, //门店详情
		userLogin: `${APIV1}/sys/sysUser/login`, //登录
		userLogout: `${APIV1}/sys/sysUser/loginOut`, //退出登录
		utomaticLogin: `${APIV1}/sys/sysUser/utomaticLogin`, //自动登录
		user: `${APIV1}/sys/sysUser/userDetailInfo`, //个人信息详情
		menus: `${APIV1}/sys/sysUser/menu`, //左侧菜单

		//数据分析
		deviceFastigium: `${APIV1}/bsxystat/deviceFastigium`, //设备租赁高峰段
		income: `${APIV1}/bsxystat/income`, //设备租赁总收入
		programRate: `${APIV1}/bsxystat/programRate`, //程序使用频率
		userEvaluation: `${APIV1}/bsxystat/userEvaluation`, //用户使用打分统计

		//门店管理
		posts: `${APIV1}/posts`,
		storeInfo: `${APIV1}/store/detial`,//门店详情
		storeList: `${APIV1}/store/getListByPage`,//门店列表
		storeInfoOrderList: `${APIV1}/bsxyorder/getListPageByStore`,//门店详情中的订单列表
		storeAdd: `${APIV1}/store/add`,//添加门店
		storeAvator: `${APIV1}/sys/file/upload`,//添加门店的图片
		storeDelete: `${APIV1}/store/delete`,//删除门店
		storeExport: `${APIV1}/store/export`,//导出门店
		orderEvaluation: `${APIV1}/store/orderEvaluation`,//门店详情中订单的评价
		storeUpdate: `${APIV1}/store/update`,//修改门店
		menus: `${APIV1}/sys/sysUser/menu`,
		storepull: `${APIV1}/store/storePull`,
		chinaArea: `${APIV1}/China/chinaArea/area`,//省市查询

		//设备管理
		deviceList: `${APIV1}/bsxydevice/pageListDevice`, //设备列表
		deviceDetail: `${APIV1}/bsxydevice/deviceDetail`, //设备详情
		deviceOrder: `${APIV1}/bsxydevice/deviceOrder`, //设备订单
		deviceReservation: `${APIV1}/bsxydevice/deviceReservation`, //更改设备预约状态
		addAppointment: `${APIV1}/bsxydevice/addAppointment`, //添加预约时间段
		deleteAppointment: `${APIV1}/bsxydevice/deleteAppointment`, //删除预约时间段
		editAppointment: `${APIV1}/bsxydevice/editAppointment`, //编辑预约时间段
		listAppointment: `${APIV1}/bsxydevice/listAppointment`, //查找预约时间段
		selectUseAppointment: `${APIV1}/bsxydevice/selectUseAppointment`, //查找符合条件的预约时间段
		deviceAddAppointment: `${APIV1}/bsxydevice/deviceAddAppointment`, //查找预约时间段
		selectEvaluation: `${APIV1}/bsxydevice/selectEvaluation`, //设备订单的评价
		//用户管理/bsxydevice/selectEvaluation
		userList: `${APIV1}/weixinuser/listWeixinUser`, //用户列表
		userInfo: `${APIV1}/weixinuser/checkWeixinUserInfo`, //用户详情
		userOrder: `${APIV1}/weixinuser/listWeixinUserOrder`, //用户订单列表
		appointmentOrder: `${APIV1}/weixinuser/listWeixinUserAppointmentOrder`, //用户预约订单列表
		evaluationList: `${APIV1}/weixinuser/listWeixinUserEvaluation`, //用户评价列表
		userCoupon: `${APIV1}/weixinuser/listWeixinUserCoupon`, //用户已领取优惠券
		listOnUseCoupon: `${APIV1}/coupon/listOnUseCoupon`, //获取已启用优惠券
		pushUserCoupon: `${APIV1}/weixinuser/pushUserCoupon`, //推送优惠券
		allotUserCoupon: `${APIV1}/weixinuser/allotUserCoupon`, //分配优惠券
		userExport: `${APIV1}/bsxyweixinuser/export`, //用户信息列表导出
		evaluationExport: `${APIV1}/bsxyorderEvalution/export`, //评价列表导出

		storeRevise: `${APIV1}/store/export`, //修改门店
		storePull: `${APIV1}/store/storePull`, //各模块查询门店的下拉列表

		//HomeConnect账号管理
		hcStorePull: `${APIV1}/store/pull`, //新建账号门店下拉
		hcAccountList: `${APIV1}/HomeConnUser/getListByPage`, //账号列表
		hcAccountDetail: `${APIV1}/HomeConnUser/detail`, //账号详情
		addAccount: `${APIV1}/HomeConnUser/add`, //添加账号
		deleteAccount: `${APIV1}/HomeConnUser/delete`, //删除账号
		updateAccount: `${APIV1}/HomeConnUser/update`, //修改账号
		checkPsd: `${APIV1}/HomeConnUser/check`, //查看密码
		DeviceList: `${APIV1}/bsxydevice/pageByHomeConnect`, //设备列表

		//订单管理
		addOrder: `${APIV1}/bsxyorder/add`, //新建预约订单
		cancelOrder: `${APIV1}/bsxyorder/cancel`, //取消预约订单
		orderDetail: `${APIV1}/bsxyorder/detail`, //订单详情
		couponPull: `${APIV1}/bsxyorder/couponPull`, //优惠券下拉列表
		orderList: `${APIV1}/bsxyorder/getListPage`, //预约订单列表
		storeOrderList: `${APIV1}/bsxyorder/getListPageByStore`, //门店订单列表
		getOrderMoney: `${APIV1}/bsxyorder/getOrderMoney`, //获取订单金额
		serveProcedure: `${APIV1}/bsxyorder/serveProcedurePull`, //服务程序下拉
		serveType: `${APIV1}/bsxyorder/serveTypePull`, //服务类型下拉
		exportOrders: `${APIV1}/bsxyorder/export`,//预约订单导出

		//优惠券管理
		addCoupon: `${APIV1}/coupon/addCoupon`, //添加优惠券
		changeCouponStatus: `${APIV1}/coupon/changeCouponStatus`, //优惠券状态
		deleteCoupon: `${APIV1}/coupon/deleteCoupon`, //删除优惠券
		editCoupon: `${APIV1}/coupon/editCoupon`, //编辑优惠券
		couponList: `${APIV1}/coupon/listCoupon`, //分页展示优惠券
		selectCoupon: `${APIV1}/coupon/selectCoupon`, //查询优惠券
		serveType: `${APIV1}/bsxyorder/serveTypePull`, //服务类型下拉

		//系统通知接口
		getListPage: `${APIV1}/inform/getListPage`, //系统通知分页列表
		read: `${APIV1}/inform/read`, //标记已读

		//应用管理
		priceInfomationList: `${APIV1}/applicationManagement/priceInfomationList`, //查询价格信息
		priceInfomationEdit: `${APIV1}/applicationManagement/priceInfomationEdit`, //编辑价格信息
		uploadimage: `${APIV1}/advertising/image/uploadimage`, //广告图片上传
		appimage: `${APIV1}/advertising/image/appimage`, //app显示图片

		//系统管理 账号管理
		accountList: `${APIV1}/sys/sysUser/getListByPage`, //账号管理分页查询
		accountAdd: `${APIV1}/sys/sysUser/add`, //账号管理添加账号
		accountDelete: `${APIV1}/sys/sysUser/delete`, //账号管理删除账号
		accountDetail: `${APIV1}/sys/sysUser/detail`, //账号管理账号详情
		accountUpdateStatus: `${APIV1}/sys/sysUser/updateStatus`, //账号管理账号停用/启用
		accountUpdate: `${APIV1}/sys/sysUser/update`, //账号管理的更新

		//系统管理 个人中心
		checkInfomation: `${APIV1}/sys/sysUser/personal`, //查看个人信息
		changeInfomation: `${APIV1}/sys/sysUser/updatePersonal`, //修改个人信息
		updateAvatar: `${APIV1}/sys/file/upload`, //修改头像
		resetPwd: `${APIV1}/sys/sysUser/resetPwd`, //密码重置

		//系统管理 角色管理
		roleList: `${APIV1}/sys/sysRole/getListByPage`, //角色分页列表
		roleAdd: `${APIV1}/sys/sysRole/add`, //添加角色
		roleDelete: `${APIV1}/sys/sysRole/delete`, //删除角色
		roleDetail: `${APIV1}/sys/sysRole/detail`, //角色详情
		rolePull: `${APIV1}/sys/sysRole/pull`, //角色下拉列表
		roleUpdate: `${APIV1}/sys/sysRole/update`, //角色更新

		//系统管理 权限管理
		permissionList: `${APIV1}/sys/sysPermission/getListByPage`,	//权限分页列表
		sysPermissionAdd: `${APIV1}/sys/sysPermission/add`,	//添加权限
		sysPermissionUpdate: `${APIV1}/sys/sysPermission/update`,	//更新权限
		sysPermissionDelete: `${APIV1}/sys/sysPermission/delete`,	//删除权限

		//系统管理 系统配置
		sysConfigList: `${APIV1}/sys/sysConfig/getListByPage`,	//查询配置
		sysConfigAdd: `${APIV1}/sys/sysConfig/add`,	//添加配置
		sysConfigUpdate: `${APIV1}/sys/sysConfig/update`,	//更新配置
		sysConfigDelete: `${APIV1}/sys/sysConfig/delete`,	//删除配置
	},
}
