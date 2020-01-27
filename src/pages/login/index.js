import React, { Component } from 'react'
import LoginForm from './login'
import ForgetForm from './forget'
import { logo } from '../../../assets'
import styles from './index.less'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      nowform: 'login'
    }
  }

  setNowform = (nowform) => {
    this.setState({
      nowform
    })
  }

  render() {
    return (
      <div className={styles.form}>
        <div className={styles.logo}>
          <img alt="logo" src={logo} />
          <span>博世洗悦管理后台</span>
        </div>
        {this.state.nowform === 'login' ? <LoginForm setNowform={this.setNowform} /> : <ForgetForm setNowform={this.setNowform} />}
      </div>
    )
  }
}

export default Login
