import React, { Component } from 'react'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import { Row, Col, Card, Button, message, Upload, Icon, Modal, Input, Form } from 'antd'
import { Page } from 'components'
import { config } from 'utils'
import { adrExp } from '../../../utils/regExp'
import styles from '../index.less'

const crrstyle = {
  modalImg: {
    width: '100%'
  }
}

const FormItem = Form.Item
const { api, apiPrefix } = config

class AdManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: [],
      file: [],
    }
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  }

  handleChange = ({ file, fileList }) => {
    this.setState({
      file,
      fileList
    })
  }

  render() {
    const { adManage, form: { getFieldDecorator } } = this.props
    const { appPic } = adManage ? adManage : ''
    const { saveUrl } = appPic ? appPic : ''
    const { previewVisible, previewImage, file } = this.state
    const fileList = saveUrl && file.length == 0 ? [{
      uid: '-1',
      status: 'done',
      url: saveUrl == undefined ? '' : saveUrl
    }] : this.state.fileList

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">选择图片</div>
      </div>
    )
    const props = {
      listType: "picture-card"
    }
    const saveSuccess = () => {
      const { form: { validateFields }, dispatch } = this.props
      validateFields((err, values) => {
        if (err) {
          return
        }
        dispatch({
          type: 'adManage/getUploadimage',
          payload: {
            direcUrl: values.pushLink,
            id: appPic.id,
            fileList: fileList,
          }
        })
      })
    }

    return (
      <Page className={styles.page}>
        <Form>
          <Row gutter={24}>
            <Col lg={24} md={24}>
              <Card
                title="APP首页广告管理"
                bordered={false}
                extra={
                  window.localStorage.getItem('userRolePermission') &&
                  JSON.parse(window.localStorage.getItem('userRolePermission')).filter(v => v.id == 786) != []
                    ? <Button type="primary" onClick={saveSuccess}>保存</Button>
                    : ''
                }
              >
                <div className="clearfix">
                  <p>请上传APP首页广告图：</p>
                  <Upload
                    {...props}
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                  >
                    {fileList.length >= 1 ? null : uploadButton}
                  </Upload>
                  <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={crrstyle.modalImg} src={previewImage} />
                  </Modal>
                </div>
                <div className={styles.msg}>
                  <FormItem label="APP首页广告图的链接：">
                    {getFieldDecorator('pushLink', {
                      initialValue: appPic ? appPic.direcUrl : null,
                      rules: [{ required: true, message: '请输入链接', }, {
                        pattern: adrExp.exp,
                        message: adrExp.des
                      },],
                    })(
                      <Input placeholder="请输入推送链接" />
                    )}
                  </FormItem>
                </div>
              </Card>
            </Col>
          </Row>
        </Form>
      </Page>
    )
  }
}

AdManage.propTypes = {
  adManage: PropTypes.object,
}

export default connect(({ adManage }) => ({ adManage }))(Form.create()(AdManage))
