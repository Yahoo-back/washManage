import React from 'react'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import { Form, Select, Input } from 'antd'
import { NowModal } from 'components'

const FormItem = Form.Item
const { TextArea } = Input
const Option = Select.Option

class PriceMsgModal extends React.Component {
  handleCreate = () => {
    const { onSure, dispatch, modalRecord, form: { validateFields, resetFields } } = this.props
    const priceData = {
      currentPage: 1,
      pageSize: 10,
    }
    validateFields((err, values) => {
      values.id = modalRecord.id
      values.time = parseInt(values.time)
      values.type = (values.type == '洗衣' ? 1 : values.type == '烘干' ? 2 : values.type)
      if (err) {
        return
      }
      dispatch({ type: 'price/getPriceInfomationEdit', payload: values })
      onSure(false)
      dispatch({ type: 'price/getPriceInfomationList', payload: priceData })
      resetFields()
    })
  }

  handleCancel = () => {
    const { onCancel, form: { resetFields } } = this.props
    onCancel()
    resetFields()
  }

  render() {
    const { visible, title, modalRecord } = this.props

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
        handleOk={this.handleCreate}
        onCancel={this.handleCancel}
      >
        <Form>
          <FormItem
            {...formItemLayout}
            label="类型"
          >
            {getFieldDecorator('type', {
              initialValue: modalRecord ? (modalRecord.type == 1 ? "洗衣" : "烘干") : null,
              rules: [{ required: true, message: '请输入程序类型！', whitespace: true }],
            })(
              <Select placeholder={'请选择产品类别'}>
                <Option value="1">洗衣</Option>
                <Option value="2">烘干</Option>
              </Select>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="程序名称"
          >
            {getFieldDecorator('procedureName', {
              initialValue: modalRecord ? modalRecord.procedureName : null,
              rules: [{ required: true, message: '请输入程序名称！', whitespace: true }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="大约时间(分钟)"
          >
            {getFieldDecorator('time', {
              initialValue: modalRecord ? String(modalRecord.time) : null,
              rules: [
                { required: true, message: '请输入程序运行时间！', whitespace: true },
                { pattern: /^[0-9]*$/, message: '只能输入数字！' },
              ],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="金额(元)"
          >
            {getFieldDecorator('money', {
              initialValue: modalRecord ? String(modalRecord.money) : null,
              rules: [
                { required: true, message: '请输入程序价格！', whitespace: true },
                {
                  pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
                  message: '金额的输入格式不正确！'
                },
              ],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="程序描述"
          >
            {getFieldDecorator('describe', {
              initialValue: modalRecord ? modalRecord.describe : null,
              rules: [{ required: true, message: '请输入程序描述！', whitespace: true }],
            })(
              <TextArea autosize="true" />
            )}
          </FormItem>
        </Form>
      </NowModal>
    )
  }
}

PriceMsgModal.propTypes = {
  price: PropTypes.object,
}

export default connect(({ price }) => ({ price }))(Form.create()(PriceMsgModal))