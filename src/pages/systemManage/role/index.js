import React, { Component } from 'react'
import { Card, Table, Button, Modal } from 'antd'
import { Page } from 'components'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import AddRoleModal from './addRoleModal'
import DetailModal from './detailModal'
import BottomPagination from './bottomPagination'

const confirm = Modal.confirm
const crrstyle = {
  action: {
    marginLeft: '10px',
    marginRight: '10px',
  },
  disabledAction: {
    marginLeft: '10px',
    marginRight: '10px',
    color: '#999',
  }
}

class Role extends Component {
  constructor(props) {
    super(props)
    this.state = {
      addVisible: false,
      detailVisible: false,
      detailId: '',
    }
  }

  getModalMessage = (record) => {
    this.setState({
      detailVisible: true,
      detailId: record.id
    })
  }

  showModal = () => {
    this.props.dispatch({ type: 'role/getPermissionList' })
    this.setState({
      addVisible: true
    })
  }

  handleAddCancel = () => {
    this.setState({
      addVisible: false
    })
  }

  onCreate = (addVisible) => {
    this.setState({
      addVisible
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

  deleteConfirm = (record) => {
    const { dispatch } = this.props
    confirm({
      title: '确认删除该角色吗?',
      content: '请确认该角色下没有账号，否则删除不成功。',
      cancelText: '取消',
      okText: '确定',
      onOk() {
        dispatch({
          type: 'role/deleteRole',
          payload: [record.id],
        })
      },
      onCancel() { },
    })
  }

  render() {
    const { role: { roleList, permissionList } } = this.props
    const columns = [{
      title: '序号',
      dataIndex: 'id',
      render: (text, record, index) => `${index + 1}`,
    }, {
      title: '角色名称',
      dataIndex: 'roleName',
    }, {
      title: '角色描述',
      dataIndex: 'remark',
    }, {
      title: '操作',
      dataIndex: 'action',
      render: (text, record, index) => (
        <span>
          {
            window.localStorage.getItem('userRolePermission') &&
              JSON.parse(window.localStorage.getItem('userRolePermission')).filter(v => v.id == 48) != []
              ? <a style={crrstyle.action} onClick={() => this.getModalMessage(record)} >详情</a>
              : ''
          }
          {
            window.localStorage.getItem('userRolePermission') &&
              JSON.parse(window.localStorage.getItem('userRolePermission')).filter(v => v.id == 31) != []
              ? record.roleName === "超级管理员" ?
                <a style={crrstyle.disabledAction}>删除</a> :
                <a style={crrstyle.action} onClick={() => this.deleteConfirm(record)}>删除</a>
              : ''
          }
        </span>
      ),
    }]

    return (
      <Page>
        <Card
          title="角色列表"
          bordered={false}
          extra={
            window.localStorage.getItem('userRolePermission') &&
              JSON.parse(window.localStorage.getItem('userRolePermission')).filter(v => v.id == 7) != []
              ? <Button type="primary" onClick={this.showModal}>添加角色</Button>
              : ''
          }>
          <Table
            columns={columns}
            dataSource={roleList ? roleList.records : ''}
            rowKey={record => record.id}
            pagination={false}
          />
          <AddRoleModal
            title="添加角色"
            permissionList={permissionList}
            visible={this.state.addVisible}
            onCancel={this.handleAddCancel}
            onCreate={this.onCreate}
          />
          <DetailModal
            title="角色详情"
            visible={this.state.detailVisible}
            onCancel={this.handleDetailCancel}
            onSure={this.onSure}
            detailId={this.state.detailId}
          />
        </Card>
        <BottomPagination data={roleList} />
      </Page>
    )
  }
}

Role.propTypes = {
  role: PropTypes.object,
}

export default connect(({ role }) => ({ role }))(Role)
