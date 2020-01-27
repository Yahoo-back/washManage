import React from 'react'
import { Pagination } from 'antd'
import { connect } from 'dva'
import { Page, Bread } from 'components'
import Detail from '../components/Detail'
import DeviceList from '../components/DeviceList'

const bottom = {
	Pagination: {
		marginTop: 16,
		width: '100%',
	},
}
class deviceDetail extends React.Component {
	general = (current, pageSize, total) => {
		this.props.dispatch({
			type: 'hcAccount/devList',
			payload: { current: current, pages: current, size: pageSize, total: total },
		})
	}

	onShowSizeChange = (current, pageSize, total) => {
		this.general(current, pageSize, total)
	}

	onChange = (current, pageSize, total) => {
		this.general(current, pageSize, total)
	}

	showTotal = (current, pageSize, total) => {
		this.general(current, pageSize, total)
	}

	render() {
		const { total, current } = this.props.hcAccount
		return (
			<div>
				<Bread title="HomeConnect账号管理" />
				<Page inner>
					<Detail />
					<br />
					<DeviceList />
				</Page>
				<Pagination
					style={bottom.Pagination}
					showTotal={total => `查询结果 ${total} 条`}
					onShowSizeChange={this.onShowSizeChange}
					showSizeChanger
					defaultCurrent={1}
					onChange={this.onChange}
					total={total}
					current={current}
				/>
			</div>
		)
	}
}

export default connect(({ hcAccount }) => ({ hcAccount }))(deviceDetail)
