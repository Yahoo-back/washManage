import React, { Component } from 'react'
import { Card, Row, Col, Form, Button, message, Input, Icon, Upload, Modal } from 'antd'
import { Page } from 'components'
import { connect } from 'dva'
import { config } from 'utils'
import PropTypes from 'prop-types'
import ResetPwdModal from './resetPwd'

const FormItem = Form.Item
const { api, apiPrefix } = config
const { updateAvatar } = api

const styles = {
  tlehed: {
    fontSize: '13px',
    lineHeight: '30px'
  },
  button: {
    marginTop: '10px',
    marginBottom: '20px'
  },
  avatar: {
    width: '96px',
    height: '96px',
    marginBottom: '30px'
  },
  img: {
    width: '100%'
  }
}
const formItemLayout = {
  labelCol: {
    span: 2
  },
  wrapperCol: {
    span: 5
  },
  antFormItemLabel: {
    textAlign: 'left'
  }
}

class PersonalCenter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      edit: false,
      visible: false,
      previewVisible: false,
      previewImage: '',
      fileList: [],
      file: [],
      logo: '',
    }
  }

  handleAvatarCancel = () => this.setState({ previewVisible: false })

  handleAvatarPreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    })
  }

  handleAvatarChange = ({ file, fileList }) => {
    if (file.status == 'done') {
      this.setState({
        logo: file.response.data
      })
    }
    this.setState({
      file,
      fileList,
    })
  }

  editFn = () => {
    this.setState({
      edit: true
    })
  }

  saveFn = () => {
    const {
      dispatch,
      personalCenter: { userData },
      form: { validateFields, resetFields }
    } = this.props
    validateFields((err, values) => {
      values.id = userData.id
      values.logo = this.state.logo == '' ? userData.logo : this.state.logo
      if (err) {
        return
      }
      dispatch({ type: 'personalCenter/changeInfo', payload: values })
      this.setState({
        edit: false
      })
      resetFields()
    })
  }

  showModal = () => {
    this.setState({
      visible: true
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false
    })
  }

  onSure = (visible) => {
    this.setState({
      visible
    })
  }

  render() {
    const { edit, previewVisible, previewImage, file } = this.state
    const { personalCenter: { userData }, form: { getFieldDecorator } } = this.props
    const { logo } = userData ? userData : ''
    const fileList = logo && file.length == 0 ? [{
      uid: '-1',
      status: 'done',
      url: logo == undefined ? '' : logo
    }] : this.state.fileList
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    const headers = {
      Authorization: window.localStorage.getItem("token")
    }
    const Avatar = (
      <div className="clearfix">
        <Upload
          action={updateAvatar}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handleAvatarPreview}
          onChange={this.handleAvatarChange}
          headers={headers}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleAvatarCancel}>
          <img alt="example" style={styles.img} src={previewImage} />
        </Modal>
      </div>
    )
    return (
      <Page>
        <Form>
          <Card
            title="个人资料"
            bordered={false}
            extra={
              window.localStorage.getItem('userRolePermission') &&
              JSON.parse(window.localStorage.getItem('userRolePermission')).filter(v => v.id == 869) != []
                ? !edit ? <Button onClick={this.editFn}>编辑</Button>
                  : <Button onClick={this.saveFn}>保存</Button>
                : ''
            }
          >
            <Row>
              {edit ? Avatar : <img src={userData ? userData.logo : null} style={styles.avatar} />}
              <Col>
                <p style={styles.tlehed}>{`账号：${userData && userData.account ? userData.account : ''}`}</p>
                <div>
                  {edit ? (
                    <div>
                      <FormItem {...formItemLayout}>
                        {getFieldDecorator('name', {
                          initialValue: userData ? userData.sysUserName : null,
                          rules: [{ required: true, message: '请输入姓名' }]
                        })(<Input addonBefore="姓名：" placeholder="姓名" />)}
                      </FormItem>
                      <FormItem {...formItemLayout}>
                        {getFieldDecorator('age', {
                          initialValue: userData ? userData.age : null,
                          rules: [{ required: true, message: '请输入年龄' }]
                        })(<Input addonBefore="年龄：" placeholder="年龄" />)}
                      </FormItem>
                    </div>
                  ) : (
                      <div>
                        <p style={styles.tlehed}>{`姓名：${userData && userData.sysUserName ? userData.sysUserName : ''}`}</p>
                        <p style={styles.tlehed}>{`年龄：${userData && userData.age ? userData.age : ''}`}</p>
                      </div>
                    )}
                </div>
                <p style={styles.tlehed}>{`我的角色：${userData && userData.roleName ? userData.roleName : ''}`}</p>
                <p style={styles.tlehed}>{`最近登录时间：${userData && userData.loginTime ? userData.loginTime : ''}`}</p>
                {
                  window.localStorage.getItem('userRolePermission') &&
                  JSON.parse(window.localStorage.getItem('userRolePermission')).filter(v => v.id == 167) != []
                    ?
                    <Button type="primary" style={styles.button} onClick={this.showModal}>
                      重置密码
                    </Button>
                    : ''
                }
              </Col>
            </Row>
            <ResetPwdModal
              title="重置密码"
              visible={this.state.visible}
              onCancel={this.handleCancel}
              onSure={this.onSure}
            />
          </Card>
        </Form>
      </Page>
    )
  }
}

PersonalCenter.propTypes = {
  personalCenter: PropTypes.object,
}

export default connect(({ personalCenter }) => ({ personalCenter }))(Form.create()(PersonalCenter))
