import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Row, Form, Input, Checkbox, Icon } from 'antd'
import { pwdExp } from '../../utils/regExp'

const FormItem = Form.Item
const styles = {
  icon: {
    color: 'rgba(0,0,0,.25)'
  }
}

class LoginForm extends React.Component {
  handleOk = () => {
    this.props.form.validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      this.props.dispatch({ type: 'login/login', payload: values })
    })
  }

  handleClick = () => {
    const { setNowform } = this.props
    setNowform('forget')
  }

  onRemember = (e) => {
    window.localStorage.setItem('checked', e.target.checked)
  }

  render() {
    const {
      loading,
      form: { getFieldDecorator },
    } = this.props

    return (
      <form>
        <FormItem hasFeedback>
          {getFieldDecorator('username', {
            initialValue: window.localStorage.getItem('checked') == 'true' ?
              window.localStorage.getItem('username') : '',
            rules: [
              { required: true, message: '请输入用户名', whitespace: true }
            ],
          })(
            <Input
              onPressEnter={this.handleOk}
              placeholder="请输入用户名"
              prefix={<Icon type="mail" style={styles.icon} />}
            />
          )}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('password', {
            initialValue: window.localStorage.getItem('checked') == 'true' ?
              window.localStorage.getItem('password') : '',
            rules: [
              { required: true, message: '请输入密码', whitespace: true },
              { pattern: pwdExp.exp, message: pwdExp.des }
            ],
          })(
            <Input
              type="password"
              onPressEnter={this.handleOk}
              placeholder="请输入密码"
              prefix={<Icon type="lock" style={styles.icon} />}
            />
          )}
        </FormItem>
        <p>
          <Checkbox
            onChange={this.onRemember}
            defaultChecked={
              window.localStorage.getItem('checked') == 'true' ? true : false
            }
          >
            自动登录</Checkbox>
          <a onClick={this.handleClick}>忘记密码</a>
        </p>
        <Row>
          <Button type="primary" onClick={this.handleOk} loading={loading.effects.login}>
            登录
          </Button>
        </Row>
      </form>
    )
  }
}

LoginForm.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ loading }) => ({ loading }))(Form.create()(LoginForm))
