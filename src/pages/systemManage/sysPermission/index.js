import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Card } from 'antd'
import { Page } from 'components'
import PermissionTree from './PermissionTree'
import MyModal from './modal'

class SysPermission extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      modalTitle: 0,
      data: []
    }
  }
  // 编辑权限
  edit = (t) => {
    this.setState({
      modalTitle: 1,
      data: t,
      visible: true
    })
  }
  // 增加权限
  add = (t) => {
    this.setState({
      modalTitle: 2,
      visible: true
    })
  }
  // 删除权限
  delete = (t) => {
    this.props.dispatch({
      type: 'sysPermission/deletePermission',
      payload: [t.id]
    })
  }

  // 弹窗确定
  onOk = () => {
    const { modalTitle } = this.state;
    this.form.validateFields((err, values) => {
      if (err) {
        return
      }
      if (modalTitle == 2) {
        this.props.dispatch({
          type: 'sysPermission/addPermission',
          payload: values
        })
      } else if (modalTitle == 1) {
        this.props.dispatch({
          type: 'sysPermission/updatePermission',
          payload: values
        })
      }
      this.setState({
        visible: false,
        modalTitle: 0,
        data: []
      })
      this.form.resetFields();
    })

  }

  // 弹窗取消
  handleCancle = () => {
    this.setState({
      visible: false,
      modalTitle: 0,
    })
    this.form.resetFields();
  }
  // 表单 dom操作
  saveForm = (form) => {
    this.form = form;
  }
  render() {
    const { sysPermission: { permissionList } } = this.props
    const { visible, data } = this.state;
    return (
      <Page>
        <Card
          title="权限管理"
          bordered={false}
        >
          <PermissionTree
            list={permissionList}
            edit={this.edit}
            add={this.add}
            delete={this.delete}
          />
        </Card>
        <MyModal
          ref={this.saveForm}
          title={this.state.modalTitle}
          visible={visible}
          itemData={data}
          onOk={this.onOk}
          handleCancle={this.handleCancle}
        />
      </Page>
    )
  }
}

SysPermission.propTypes = {
  sysPermission: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ sysPermission }) => ({ sysPermission }))(SysPermission)