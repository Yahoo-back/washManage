import React from 'react'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import { Button, Row, Form, Input, Icon } from 'antd'
import { pwdExp } from '../../utils/regExp'
import { logo } from '../../../assets'
import styles from './index.less'

const FormItem = Form.Item

class ResetPwd extends React.Component {
  handleOk = () => {
    const {
      dispatch,
      form: {
        validateFieldsAndScroll,
      },
    } = this.props
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      delete values.rePassword
      values.token = window.location.href.split('=')[1]
      dispatch({ type: 'reset/forgetPassword', payload: values })
    })
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
    const {
      form: { getFieldDecorator },
    } = this.props

    return (
      <div className={styles.form}>
        <div className={styles.logo}>
          <img alt="logo" src={logo} />
          <span>博世洗悦管理后台</span>
        </div>
        <form>
          <FormItem hasFeedback>
            {getFieldDecorator('newPassword', {
              rules: [
                { required: true, message: '请输入新密码', whitespace: true },
                { pattern: pwdExp.exp, message: pwdExp.des }
              ],
            })(
              <Input
                type="password"
                onPressEnter={this.handleOk}
                placeholder="请输入新密码"
                prefix={<Icon type="lock" className={styles.icon} />}
              />
            )}
          </FormItem>
          <FormItem hasFeedback>
            {getFieldDecorator('rePassword', {
              rules: [
                { required: true, message: '请再次输入新密码', whitespace: true },
                { pattern: pwdExp.exp, message: pwdExp.des },
                { validator: this.checkPassword }
              ],
            })(
              <Input
                type="password"
                onPressEnter={this.handleOk}
                placeholder="请再次输入新密码"
                prefix={<Icon type="lock" className={styles.icon} />}
              />
            )}
          </FormItem>
          <Row>
            <Button type="primary" onClick={this.handleOk}>
              确定
          </Button>
          </Row>
        </form>
      </div>
    )
  }
}

ResetPwd.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ reset }) => ({ reset }))(Form.create()(ResetPwd))
