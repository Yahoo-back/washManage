import React from 'react'
import { Input, Button, message,Icon } from 'antd'
import styles from './index.less'
import router from 'umi/router';
import axios from 'axios'
import { connect } from 'dva'
import { download, config } from 'utils'
import AreaSelect from './area'

const crrstyle = {
	search: {
		width: 200
	}
};

const { api } = config
const { storeExport } = api
const Search = Input.Search;
function storeAdd() {
	router.push('/storeManage/storeAdd');
}
const StoreSearch = ({ onClickDelete, store, dispatch }) => {
	const { data, nameSearch, addr } = store

	const handleChangeAddress = (data) => {

		const address1 = data[0]
		const address2 = data[1]
		const address3 = data[2]
		const address = `${address1}${address2}${address3}`
		dispatch({
			type: 'store/address',
			payload: {
				addr: address
			}
		})
	}

	const handleSearch = (value) => {
		dispatch({
			type: 'store/querySuccess',
			payload: {
				nameSearch: value
			}
		})
		dispatch({
			type: 'store/list',
			payload: {
				current: 1,
				pages: 1,
				size: 10,
				query: {
					name: value,
					address: addr
				}
			}
		})
	}
	const handleClickExport = async () => {
		if (data.length == 0) {
			message.error("请选择将要导出的门店")
		} else {
			const res = await axios.post(storeExport, {
				appKey: 'appkey',
				data: {
					ids: data,
					properties: ["name", "address", "serveTime", "orderTotal", "appointmentOrderCount"],
					titles: ["门店名", "地址", "服务时间", "订单总数", "预约订单数"],
					query: {
						name: nameSearch,
						address: ''
					}
				},
				version: '1.0'
			}, {
					responseType: 'blob',
					onDownloadProgress: e => {
					}
				});
			download(res.data, '门店列表.xls');

		}
	}
	const emitEmpty = () => {
		dispatch({
			type: 'store/querySuccess',
			payload: {
				nameSearch: ''
			}
		})
		dispatch({
			type: 'store/list',
			payload: {
				current: 1,
				pages: 1,
				size: 10,
				query: {
					name: ''
				}
			}
		})
		document.getElementById('storeSearch').value=''
	}
	const suffix = nameSearch ? <Icon type="close-circle" onClick={emitEmpty} key={nameSearch}/> : null;
	return (
		<div className={styles.option}>
			<span className={styles.SeachMargin}>
				<AreaSelect onChange={handleChangeAddress} />
			</span>
			<span className={styles.SeachMargin}>
				<Search
					placeholder="请输入门店名"
					onSearch={value => handleSearch(value)}
					style={crrstyle.search}
					id="storeSearch"
					suffix={suffix}
				/>
			</span>
			<span className={styles.SeachMargin}>
			{window.localStorage.getItem('userRolePermission')&&
      					JSON.parse(window.localStorage.getItem('userRolePermission')).filter(
							v => v.id == 773
							) != [] ? (
				<Button type="primary" onClick={storeAdd}>增加门店</Button>
				):('')}
			</span>
			<span className={styles.SeachMargin}>
			{window.localStorage.getItem('userRolePermission')&&
      					JSON.parse(window.localStorage.getItem('userRolePermission')).filter(
							v => v.id == 835
							) != [] ? (
				<Button type="primary" onClick={onClickDelete}>删除门店</Button>
				):('')}
			</span>
			<span className={styles.SeachMargin}>
			{window.localStorage.getItem('userRolePermission')&&
      					JSON.parse(window.localStorage.getItem('userRolePermission')).filter(
							v => v.id == 817
							) != [] ? (
				<Button type="primary" onClick={handleClickExport}>导出</Button>
				):('')}
			</span>
		</div>
	)
}
export default connect(({ store }) => ({ store }))(StoreSearch)