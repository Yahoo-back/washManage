import React from 'react'
import { connect } from 'dva'
import { Form, Input, Tree, message } from 'antd'
import { NowModal } from 'components'

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

class AddRoleModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expandedKeys: [],
      autoExpandParent: true,
      checkedKeys: [],
      halfCheckedKeys: [],
      selectedKeys: [],
    }
  }

  handleCreate = () => {
    const { onCreate, dispatch, form: { validateFields, resetFields } } = this.props
    validateFields((err, values) => {
      if (err) {
        return
      }
      values.permissions = this.state.halfCheckedKeys.concat(
        this.state.checkedKeys).map(v => parseInt(v)
      )
      // 默认添加个人信息权限下菜单和个人信息的访问权限
      values.permissions.indexOf(630) < 0 ? values.permissions.push(630) : ''   // 个人信息
      values.permissions.indexOf(640) < 0 ? values.permissions.push(640) : ''   // 查询用户菜单
      values.permissions.indexOf(716) < 0 ? values.permissions.push(716) : ''   // 个人信息详情
      if (values.permissions == '') {
        message.error("权限不能为空！")
      } else {
        dispatch({ type: 'role/addRole', payload: values })
        onCreate(false)
        resetFields()
      }
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

  onCheck = (checkedKeys, halfChecked) => {
    this.setState({
      checkedKeys,
      halfCheckedKeys: halfChecked.halfCheckedKeys
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
    const { visible, title, permissionList } = this.props
    const { getFieldDecorator } = this.props.form

    const list = []
    const treeData = []
    permissionList.map(v => {
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
        sure="新建"
        handleOk={this.handleCreate}
        onCancel={this.handleCancel}
        width={530}
      >
        <Form style={crrstyle.form}>
          <div style={crrstyle.tree}>
            <Tree
              checkable
              onExpand={this.onExpand}
              expandedKeys={this.state.expandedKeys}
              autoExpandParent={this.state.autoExpandParent}
              onCheck={this.onCheck}
              checkedKeys={this.state.checkedKeys}
              selectedKeys={this.state.selectedKeys}
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

export default connect(({ role }) => ({ role }))(Form.create()(AddRoleModal))
