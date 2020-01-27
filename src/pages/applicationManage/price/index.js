import React, { Component } from 'react'
import { Card, Select, Table } from 'antd'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import { Page } from 'components'
import PriceMsgModal from './priceMsgModal'
import BottomPagination from './bottomPagination'
import styles from '../index.less'

const Option = Select.Option
const proOptions = [{
  value: 'all',
  label: '所有类型'
}, {
  value: 'wash',
  label: '洗衣'
}, {
  value: 'dry',
  label: '烘干'
}]

class PriceMsg extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      modalRecord: [],
      storeOptions: [],
      slectedStore: "",
    }
  }

  handleChange = value => {
    this.setState({
      slectedStore: value
    })
  }

  getModalMessage = (record) => {
    this.setState({
      visible: true,
      modalRecord: record
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false
    })
  }

  onSure = (visible) => {
    this.setState({
      visible
    })
  }

  handleProChange = (value) => {
    const priceData = {
      currentPage: 1,
      pageSize: 10,
    }
    value === "all" ?
      priceData.type = 0 :
      value === "wash" ?
        priceData.type = 1 :
        priceData.type = 2
    this.props.dispatch({ type: 'price/getPriceInfomationList', payload: priceData })
  }

  render() {
    const { price: { listData } } = this.props
    const columns = [{
      title: '序号',
      dataIndex: 'id',
      width: 50,
      render: (text, record, index) => `${index + 1}`
    }, {
      title: '类型',
      dataIndex: 'type',
      width: 100,
      render: (text, record, index) => record.type == 1 ? "洗衣" : record.type == 2 ? "烘干" : ""
    }, {
      title: '程序名称',
      dataIndex: 'procedureName',
      width: 100
    }, {
      title: '大约时间',
      dataIndex: 'time',
      width: 120
    }, {
      title: '金额',
      dataIndex: 'money',
      width: 100
    }, {
      title: '描述',
      dataIndex: 'describe'
    }, {
      title: '操作',
      dataIndex: 'edit',
      fixed: 'right',
      render: (text, record, index) => (
        window.localStorage.getItem('userRolePermission') &&
        JSON.parse(window.localStorage.getItem('userRolePermission')).filter(v => v.id == 827) != []
          ? <a onClick={() => this.getModalMessage(record)}>编辑</a>
          : ''
      ),
      width: 100
    }]

    return (
      <Page>
        <Card
          title="洗衣程序价格信息"
          bordered={false}
          extra={
            <Select
              className={styles.select}
              defaultValue={proOptions[0].label}
              onChange={this.handleProChange}>
              {proOptions.map(v => <Option value={v.value} key={v.value}>{v.label}</Option>)}
            </Select>
          }>
          <Table
            columns={columns}
            dataSource={listData ? listData.records : ''}
            rowKey={record => record.id}
            scroll={{ x: 1300 }}
            pagination={false}
          />
          <PriceMsgModal
            title="编辑程序"
            visible={this.state.visible}
            onCancel={this.handleCancel}
            modalRecord={this.state.modalRecord}
            onSure={this.onSure}
          />
        </Card>
        <BottomPagination data={listData} />
      </Page>
    )
  }
}

PriceMsg.propTypes = {
  price: PropTypes.object,
}

export default connect(({ price }) => ({ price }))(PriceMsg)
