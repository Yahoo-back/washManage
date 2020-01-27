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
  general = (current, pageSize) => {
    const priceData = {
      currentPage: current,
      pageSize: pageSize
    }
    this.props.dispatch({
      type: 'price/getPriceInfomationList',
      payload: priceData
    })
  }
  onShowSizeChange = (current, pageSize) => {
    this.general(current, pageSize)
  }
  onChange = (current, pageSize) => {
    this.general(current, pageSize)
  }
  showTotal = (current, pageSize) => {
    this.general(current, pageSize)
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

export default connect(({ price }) => ({ price }))(BottomPagination)