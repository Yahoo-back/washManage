import React from 'react'
import { Pagination } from 'antd'
import { connect } from 'dva'

const bottom = {
	pagination: {
		marginTop: 16,
		width: '100%',
	},
}

class BottomPagination extends React.Component {
	general = (currentPage, pageSize, total) => {
		this.props.dispatch({
			type: 'couponList/showList',
			payload: { currentPage: currentPage, pageSize: pageSize, total: total },
		})
	}

	onShowSizeChange = (currentPage, pageSize, total) => {
		this.general(currentPage, pageSize, total)
	}

	onChange = (currentPage, pageSize, total) => {
		this.general(currentPage, pageSize, total)
	}

	showTotal = (currentPage, pageSize, total) => {
		this.general(currentPage, pageSize, total)
	}

	render() {
		const { total, current } = this.props.couponList

		return (
			<Pagination
				style={bottom.pagination}
				showTotal={total => `查询结果 ${total} 条`}
				onShowSizeChange={this.onShowSizeChange}
				showSizeChanger
				defaultCurrent={1}
				onChange={this.onChange}
				total={total}
				current={current}
			/>
		)
	}
}

export default connect(({ couponList }) => ({ couponList }))(BottomPagination)
