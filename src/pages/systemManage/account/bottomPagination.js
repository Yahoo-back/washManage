import { Component } from 'react'
import { Pagination } from 'antd'
import { connect } from 'dva'

const styles = {
  pagination: {
    marginTop: '16px',
    width: '100%',
  }
}

class BottomPagination extends Component {
  general = (current, pageSize, total) => {
    this.props.dispatch({
      type: 'account/getAccountList',
      payload: {
        current: current,
        pages: current,
        size: pageSize,
        total: total
      }
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
    const { data } = this.props
    const { total, current, size } = data ? data : ''
    return (
      <Pagination
        style={styles.pagination}
        showTotal={total => `查询结果 ${total} 条`}
        onShowSizeChange={this.onShowSizeChange}
        showSizeChanger={true}
        defaultCurrent={1}
        onChange={this.onChange}
        total={total}
        current={current}
        pageSize={size ? size : null}
      />
    )
  }
}

export default connect(({ account }) => ({ account }))(BottomPagination)