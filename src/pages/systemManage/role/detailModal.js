import React from 'react'
import { connect } from 'dva'
import { Form, Input, Tree } from 'antd'
import { NowModal } from 'components'
import { getRoleDetail, getPermissionList } from '../service'

const FormItem = Form.Item
const { TextArea } = Input
const TreeNode = Tree.TreeNode

const crrstyle = {
  form: {
    display: 'inline-block',
    padding: '0 30px',
  },
  tree: {
    float: 'left',
    width: '46%',
    height: '265px',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  formItem: {
    float: 'right',
    width: '54%',
    paddingTop: '85px',
  },
}

class DetailModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expandedKeys: [],
      autoExpandParent: true,
      checkedKeys: [],
      selectedKeys: [],
      permissionList: [],
      roleDetail: [],
    }
  }

  componentWillReceiveProps = async (nextProps) => {
    if (nextProps.detailId != this.detailId) {
      const data = {}
      const res = await getRoleDetail(nextProps.detailId)
      const listRes = await getPermissionList(data)
      let permissions = res.data != null ? res.data.permissions : []
      const per = []
      permissions.length == 0 ? ''
        : permissions.map(v => {
          per.push(v.id)
        })
      this.setState({
        checkedKeys: per,
        permissionList: listRes.data ? listRes.data.records : '',
        roleDetail: res.data
      })
    }
  }

  handleCreate = () => {
    const { onSure, dispatch, form: { validateFields, resetFields } } = this.props
    this.state.checkedKeys.map(v => {
      this.state.permissionList.map(w => {
        v == w.id ? w.pPermissionId == 0 ? '' : this.state.checkedKeys.push(w.pPermissionId) : ''
      })
    })
    validateFields((err, values) => {
      if (err) {
        return
      }
      values.permissions = this.state.checkedKeys.map(v => parseInt(v))
      if (values.permissions == []) {
        message.error("权限不能为空！")
      }
      values.id = this.state.roleDetail.id
      dispatch({ type: 'role/updateRole', payload: values })
      onSure(false)
      resetFields()
    })
  }

  handleCancel = () => {
    const { onCancel, form: { resetFields } } = this.props
    onCancel()
    resetFields()
  }

  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    })
  }

  onCheck = (checkedKeys) => {
    this.setState({
      checkedKeys: checkedKeys.checked
    })
  }

  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.id} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        )
      }
      return <TreeNode {...item} />
    })
  }

  render() {
    const {
      visible,
      title,
      form: { getFieldDecorator }
    } = this.props
    const {
      checkedKeys,
      permissionList,
      roleDetail,
      expandedKeys,
      autoExpandParent,
      selectedKeys
    } = this.state

    const list = []
    const treeData = []
    permissionList && permissionList.map(v => {
      const a = {
        title: v.permissionName,
        id: v.id,
        pPermissionId: v.pPermissionId,
        children: []
      }
      list.push(a)
    })
    list.map(v => {
      v.pPermissionId != 0 ? list.map(x => {
        v.pPermissionId == x.id ? x.children.push(v) : ''
      }) : treeData.push(v)
    })

    const formItemLayout = {
      labelCol: {
        span: 10
      },
      wrapperCol: {
        span: 12
      }
    }

    return (
      <NowModal
        titleText={title}
        visible={visible}
        sure="确定"
        okDisabled={
          window.localStorage.getItem('userRolePermission') &&
          JSON.parse(window.localStorage.getItem('userRolePermission')).filter(v => v.id == 41) != []
            ? false
            : true
        }
        handleOk={this.handleCreate}
        onCancel={this.handleCancel}
        width={530}
      >
        <Form style={crrstyle.form}>
          <div style={crrstyle.tree}>
            <Tree
              checkable
              checkStrictly
              onExpand={this.onExpand}
              expandedKeys={expandedKeys}
              autoExpandParent={autoExpandParent}
              onCheck={this.onCheck}
              checkedKeys={checkedKeys}
              selectedKeys={selectedKeys}
            >
              {this.renderTreeNodes(treeData)}
            </Tree>
          </div>
          <div style={crrstyle.formItem}>
            <FormItem
              {...formItemLayout}
              label="角色名"
            >
              {getFieldDecorator('roleName', {
                initialValue: roleDetail ? roleDetail.roleName : null,
                rules: [{ required: true, message: '请输入角色名!', whitespace: true }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="角色描述"
            >
              {getFieldDecorator('remark', {
                initialValue: roleDetail ? roleDetail.remark : null,
                rules: [{ required: true, message: '请输入角色描述!', whitespace: true }],
              })(
                <TextArea autosize="true" />
              )}
            </FormItem>
          </div>
        </Form>
      </NowModal>
    )
  }
}

export default connect(({ role }) => ({ role }))(Form.create()(DetailModal))
