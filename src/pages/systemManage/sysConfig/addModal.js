import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Form, Select, Input } from 'antd'
import { NowModal } from 'components'

const FormItem = Form.Item
const Option = Select.Option

class AddModal extends Component {
  handleCreate = () => {
    const { onCreate, dispatch, form: { validateFields, resetFields } } = this.props
    validateFields((err, values) => {
      values.roleIds = [parseInt(values.roleIds)]
      if (err) {
        return
      }
      dispatch({ type: 'sysConfig/addConfig', payload: values })
      onCreate(false)
      resetFields()
    })
  }

  handleCancel = () => {
    const { onCancel, form: { resetFields } } = this.props
    onCancel()
    resetFields()
  }

  render() {
    const {
      visible,
      title,
      form: { getFieldDecorator },
    } = this.props

    const formItemLayout = {
      labelCol: {
        span: 7
      },
      wrapperCol: {
        span: 14
      }
    }

    return (
      <NowModal
        titleText={title}
        visible={visible}
        sure="新建"
        handleOk={this.handleCreate}
        onCancel={this.handleCancel}
      >
        <Form onSubmit={this.handleCreate}>
          <FormItem
            {...formItemLayout}
            label="配置Key"
          >
            {getFieldDecorator('configKey', {
              rules: [
                { required: true, message: '请输入配置Key!', whitespace: true },
              ],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="配置值"
          >
            {getFieldDecorator('configValue', {
              rules: [
                { required: true, message: '请输入配置值!', whitespace: true },
              ],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="说明"
          >
            {getFieldDecorator('remark')(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="状态"
          >
            {getFieldDecorator('status', {
              rules: [{ required: true, message: '请选择状态!' }],
            })(
              <Select placeholder={'请选择状态'}>
                <Option value="1">启用</Option>
                <Option value="0">禁用</Option>
              </Select>
            )}
          </FormItem>
        </Form>
      </NowModal>
    )
  }
}

AddModal.propTypes = {
  sysConfig: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ sysConfig }) => ({ sysConfig }))(Form.create()(AddModal))
