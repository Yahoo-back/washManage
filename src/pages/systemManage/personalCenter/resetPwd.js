import React from 'react'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import { Form, Input } from 'antd'
import { NowModal } from 'components'
import { pwdExp } from '../../../utils/regExp'

const FormItem = Form.Item

class ResetPwd extends React.Component {
  handleOk = () => {
    const { onSure, dispatch, form: { validateFields, resetFields } } = this.props
    validateFields((err, values) => {
      if (err) {
        return
      }
      dispatch({ type: 'personalCenter/resetPassword', payload: values })
      onSure(false)
      resetFields()
    })
  }

  handleCancel = () => {
    const { onCancel, form: { resetFields } } = this.props
    onCancel()
    resetFields()
  }

  checkPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('newPassword')) {
      callback('两次密码不一致')
    } else {
      callback()
    }
  }

  render() {
    const { visible, title } = this.props

    const { getFieldDecorator } = this.props.form
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
        sure="确定"
        handleOk={this.handleOk}
        onCancel={this.handleCancel}
        width={620}
      >
        <Form>
          <FormItem
            {...formItemLayout}
            label="请输入原密码"
          >
            {getFieldDecorator('oldPassword', {
              rules: [
                { required: true, message: '请输入原密码', whitespace: true },
                { pattern: pwdExp.exp, message: pwdExp.des }
              ],
            })(
              <Input type="password" placeholder="请输入原密码" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="请输入新密码"
          >
            {getFieldDecorator('newPassword', {
              rules: [
                { required: true, message: '请输入新密码', whitespace: true },
                { pattern: pwdExp.exp, message: pwdExp.des }
              ],
            })(
              <Input type="password" placeholder="请输入新密码" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="再次输入新密码"
          >
            {getFieldDecorator('rePassword', {
              rules: [
                { required: true, message: '请再次输入新密码', whitespace: true },
                { pattern: pwdExp.exp, message: pwdExp.des },
                { validator: this.checkPassword }
              ],
            })(
              <Input type="password" placeholder="请再次输入新密码" />
            )}
          </FormItem>
        </Form>
      </NowModal>
    )
  }
}

ResetPwd.propTypes = {
  personalCenter: PropTypes.object,
}

export default connect(({ personalCenter }) => ({ personalCenter }))(Form.create()(ResetPwd))
