import React from 'react'
import { connect } from 'dva'
import { Form, Select, Input } from 'antd'
import { NowModal } from 'components'
import { mobileExp, pwdExp, emailExp } from '../../../utils/regExp'

const FormItem = Form.Item
const Option = Select.Option

class MyModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      storeIds: []
    }
  }

  handleCreate = () => {
    const { onSure, dispatch, form: { validateFields, resetFields } } = this.props
    validateFields((err, values) => {
      values.roleIds = [parseInt(values.roleIds)]
      if (err) {
        return
      }
      new Promise((resolve, reject) => {
        dispatch({ type: 'account/addAccount', payload: { values, resolve, reject } })
      }).then(() => {
        onSure(false)
        resetFields()
      })
    })
  }

  handleSure = () => {
    const { onSure, dispatch, account: { detailData, stopData }, form: { validateFields, resetFields } } = this.props
    validateFields((err, values) => {
      let store = []
      values.storeIds.length != 0 && values.storeIds.map(v => {
        isNaN(parseInt(v)) ?
          stopData.map(w => {
            v == w.name ? store.push(String(w.id)) : ''
          }) : store.push(v)
      })
      values.id = detailData.id
      values.storeIds = store
      values.roleIds = [parseInt(values.roleIds)]
      values.isEnable =
        values.isEnable == "启用" ? 1
          : values.isEnable == "停用" ? 0
            : values.isEnable
      if (err) {
        return
      }
      new Promise((resolve, reject) => {
        dispatch({ type: 'account/updateAccount', payload: { values, resolve, reject } })
      }).then(() => {
        onSure(false)
        resetFields()
      })
    })
  }

  handleCancel = () => {
    const { onCancel, form: { resetFields } } = this.props
    onCancel()
    resetFields()
  }

  checkStoreIds = (rule, value, callback) => {
    if (value && value.length == 0) {
      callback('请选择所属门店！')
    } else {
      callback()
    }
  }

  handleStoreDropdown = () => {
    this.props.dispatch({ type: 'account/getStoreOptions' })
  }

  handleRoleDropdown = () => {
    this.props.dispatch({ type: 'account/getRolePull' })
  }

  render() {
    const {
      visible,
      title,
      detail,
      form: { getFieldDecorator },
      account: { roleData, detailData },
    } = this.props

    const formItemLayout = {
      labelCol: {
        span: 7
      },
      wrapperCol: {
        span: 14
      }
    }

    const options = this.props.account.stopData

    let storeIds = []
    detailData.storeIds && detailData.storeIds.map(v => {
      options && options.map(w => {
        v == w.id ? storeIds.push(w.name) : null
      })
    })

    return (
      <NowModal
        titleText={title}
        visible={visible}
        okDisabled={
          detail ?
            window.localStorage.getItem('userRolePermission') &&
              JSON.parse(window.localStorage.getItem('userRolePermission')).filter(v => v.id == 45) != []
              ? false : true
            : false
        }
        sure={detail ? "确定" : "新建"}
        handleOk={detail ? this.handleSure : this.handleCreate}
        onCancel={this.handleCancel}
      >
        <Form onSubmit={detail ? this.handleSure : this.handleCreate}>
          <FormItem
            {...formItemLayout}
            label="账号"
          >
            {getFieldDecorator('username', detail ? {
              initialValue: detail && detailData ? detailData.username : null,
              rules: [
                { required: true, message: '请输入账号!', whitespace: true }
              ],
            } : {
                rules: [
                  { required: true, message: '请输入账号!', whitespace: true },
                  { pattern: emailExp.exp, message: emailExp.des }
                ],
              })(
                detail == true ?
                  <Input disabled /> :
                  <Input />
              )}
          </FormItem>
          {
            detail ? null :
              <FormItem
                {...formItemLayout}
                label="密码"
              >
                {getFieldDecorator('password', {
                  rules: [
                    { required: true, message: '请输入密码!', whitespace: true },
                    { pattern: pwdExp.exp, message: pwdExp.des },
                  ],
                })(
                  <Input />
                )}
              </FormItem>
          }
          <FormItem
            {...formItemLayout}
            label="手机"
          >
            {getFieldDecorator('mobile', {
              initialValue: detail && detailData ? detailData.mobile : null,
              rules: [
                { required: true, message: '请输入手机号!', whitespace: true },
                { pattern: mobileExp.exp, message: mobileExp.des },
              ],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="昵称"
          >
            {getFieldDecorator('nickName', {
              initialValue: detail && detailData ? detailData.nickName : null,
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="角色"
          >
            {getFieldDecorator('roleIds', {
              initialValue: detail && detailData ? String(detailData.roleIds) : null,
              rules: [{ required: true, message: '请选择账号角色!', whitespace: true }],
            })(
              <Select
                placeholder={'请选择账号角色'}
                onDropdownVisibleChange={this.handleRoleDropdown}
              >
                {
                  roleData ? roleData.map(v =>
                    <Option value={String(v.id)} key={v.id}>{v.roleName}</Option>
                  ) : ''
                }
              </Select>
            )}
          </FormItem>
          {
            detail ?
              <FormItem
                {...formItemLayout}
                label="账号状态"
              >
                {getFieldDecorator('isEnable', {
                  initialValue: detail && detailData ? detailData.isEnable == 1 ? '启用' :
                    detailData.isEnable == 0 ? '停用' : null : null,
                  rules: [{ required: true, message: '请选择帐号状态!', whitespace: true }],
                })(
                  <Select placeholder={'请选择帐号状态'}>
                    <Option value="1">启用</Option>
                    <Option value="0">停用</Option>
                  </Select>
                )}
              </FormItem>
              : null
          }
          <FormItem
            {...formItemLayout}
            label="所属门店"
          >
            {getFieldDecorator('storeIds', detail ? {
              initialValue: storeIds ? storeIds : null,
              rules: [{ required: true, validator: this.checkStoreIds }],
            } : {
                rules: [{ required: true, validator: this.checkStoreIds }],
              })(
                <Select
                  mode="tags"
                  placeholder="请选择所属门店"
                  onDropdownVisibleChange={this.handleStoreDropdown}
                >
                  {options
                    ? options.map(v => (
                      <Option value={String(v.id)} key={v.id}>
                        {v.name}
                      </Option>
                    ))
                    : ''}
                </Select>
              )}
          </FormItem>
          {
            detail == true ?
              <FormItem
                {...formItemLayout}
                label="创建时间"
              >
                {detail && detailData ? detailData.ctime : null}
              </FormItem>
              : null
          }
        </Form>
      </NowModal>
    )
  }
}

export default connect(({ account }) => ({ account }))(Form.create()(MyModal))