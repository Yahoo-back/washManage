import React, { Component } from 'react'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import { Card, Input, Table, Button, Modal } from 'antd'
import { Page } from 'components'
import styles from './index.less'
import MyModal from './modal'
import BottomPagination from './bottomPagination'

const Search = Input.Search
const confirm = Modal.confirm

class Account extends Component {
  constructor(props) {
    super(props)
    this.state = {
      detailVisible: false,
      addVisible: false,
    }
  }

  getModalMessage = (record) => {
    this.props.dispatch({ type: 'account/getAccountDetail', payload: record.id })
    this.setState({
      detailVisible: true,
    })
  }

  showAddModal = () => {
    this.setState({
      addVisible: true
    })
  }

  handleDetailCancel = () => {
    this.setState({
      detailVisible: false
    })
  }

  onSure = (detailVisible) => {
    this.setState({
      detailVisible
    })
  }

  handleAddCancel = () => {
    this.setState({
      addVisible: false
    })
  }

  onCreate = addVisible => {
    this.setState({
      addVisible
    })
  }

  deleteConfirm = (record) => {
    const { dispatch } = this.props
    confirm({
      title: '确认删除该账号吗?',
      content: '删除账号后，不再保留账号所有信息。',
      cancelText: '取消',
      okText: '确定',
      onOk() {
        dispatch({
          type: 'account/deleteAccount',
          payload: [record.id],
        })
      },
      onCancel() { }
    })
  }

  stopConfirm = (record) => {
    const { dispatch } = this.props
    confirm({
      title: record.isEnable == 0 ? '确认启用该账号吗?' : '确认停用该账号吗?',
      content: record.isEnable == 0 ? '启用的账号可以登录系统。' : '停用账号后，可再次启用。',
      cancelText: '取消',
      okText: '确定',
      onOk() {
        dispatch({
          type: 'account/stopAccount',
          payload: record.id,
        })
      },
      onCancel() { }
    })
  }

  handleSearch = value => {
    const data = []
    const records = [{
      usernameOrmobile: value
    }]
    data.records = records
    this.props.dispatch({
      type: 'account/getAccountList',
      payload: data,
    })
  }

  render() {
    const { account: { listData, detailData } } = this.props
    const columns = [
      {
        title: '序号',
        dataIndex: 'id',
        render: (text, record, index) => `${index + 1}`
      },
      {
        title: '账号',
        dataIndex: 'username'
      },
      {
        title: '手机号',
        dataIndex: 'mobile'
      },
      {
        title: '角色名',
        dataIndex: 'roleName'
      },
      {
        title: '状态',
        dataIndex: 'isEnable',
        render: (text, record, index) =>
          (record.isEnable === 0 ? '禁用' : record.isEnable === 1 ? '启用' : null)
      },
      {
        title: '创建时间',
        dataIndex: 'ctime'
      },
      {
        title: '操作',
        dataIndex: 'action',
        render: (text, record, index) => (
          <span>
            {
              window.localStorage.getItem('userRolePermission') &&
                JSON.parse(window.localStorage.getItem('userRolePermission')).filter(v => v.id == 129) != []
                ? <a className={styles.action} onClick={() => this.getModalMessage(record)}>详情</a>
                : ''
            }
            {
              window.localStorage.getItem('userRolePermission') &&
                JSON.parse(window.localStorage.getItem('userRolePermission')).filter(v => v.id == 854) != []
                ? <a onClick={() => { this.stopConfirm(record) }}>
                  {record.isEnable === 1 ? '停用' : record.isEnable === 0 ? '启用' : ''}
                </a>
                : ''
            }
            {
              window.localStorage.getItem('userRolePermission') &&
              JSON.parse(window.localStorage.getItem('userRolePermission')).filter(v => v.id == 130) != []
                ? <a className={styles.action} onClick={() => { this.deleteConfirm(record) }}>删除</a>
                : ''
            }
          </span>
        )
      }
    ]

    return (
      <Page>
        <Card
          title="账号管理"
          bordered={false}
          extra={
            <span>
              <Search placeholder="请输入帐号/手机号" onSearch={this.handleSearch} className={styles.search} />
              {
                window.localStorage.getItem('userRolePermission') &&
                JSON.parse(window.localStorage.getItem('userRolePermission')).filter(v => v.id == 6) != []
                  ? <Button type="primary" className={styles.button} onClick={this.showAddModal}>
                    添加账号
                    </Button>
                  : ''
              }
            </span>
          }
        >
          <Table
            columns={columns}
            dataSource={listData ? listData.records : ''}
            rowKey={record => record.id}
            pagination={false}
            rowClassName={(record, index) => (record.isEnable === 0 ? styles.unabletr : '')}
          />
          <MyModal
            title="账号详情"
            visible={this.state.detailVisible}
            onCancel={this.handleDetailCancel}
            modalRecord={detailData}
            onSure={this.onSure}
            detail={true}
          />
          <MyModal
            title="添加账号"
            visible={this.state.addVisible}
            onCancel={this.handleAddCancel}
            onSure={this.onCreate}
            detail={false}
          />
        </Card>
        <BottomPagination data={listData} />
      </Page>
    )
  }
}

Account.propTypes = {
  account: PropTypes.object,
}

export default connect(({ account }) => ({ account }))(Account)
