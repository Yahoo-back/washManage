import React, { Component } from 'react'
import { Form, Modal, Select, Input } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

class MyModal extends Component {

  render() {
    const { form, title, visible, itemData, onOk, handleCancle } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        title={title == 1 ? `编辑${itemData.permissionName}` : title == 2 ? '新增权限' : ''}
        visible={visible}
        onOk={onOk}
        onCancel={handleCancle}
      >
        <Form>
          <FormItem label="权限父id" {...formItemLayout}>
            {getFieldDecorator('pPermissionId', {
              initialValue: itemData.pPermissionId,
              rules: [{
                required: true,
                message: '请输入权限父id!',
              }]
            })(
              <Input />
            )}
          </FormItem>
          {
            title == 1 ?
              <FormItem label="权限id" {...formItemLayout}>
                {getFieldDecorator('id', {
                  initialValue: itemData.id,
                  rules: [{
                    required: true,
                    message: '请输入权限id!',
                  }]
                })(
                  <Input />
                )}
              </FormItem>
              : null
          }
          <FormItem label="前端路由" {...formItemLayout}>
            {getFieldDecorator('permissionKey', {
              initialValue: itemData.permissionKey,
              rules: [{
                required: true,
                message: '请输入前端路由',
              }]
            })(<Input />)}
          </FormItem>
          <FormItem label="权限名称" {...formItemLayout}>
            {getFieldDecorator('permissionName', {
              initialValue: itemData.permissionName,
              rules: [{
                required: true,
                message: '请输入权限名称',
              }]
            })(<Input />)}
          </FormItem>
          <FormItem label="类型" {...formItemLayout}>
            {getFieldDecorator('permissionType', {
              initialValue: itemData.permissionType,
              rules: [{
                required: true,
                message: '请选择类型',
              }]
            })(
              <Select>
                <Option value='1'>左侧菜单</Option>
                <Option value='2'>功能模块</Option>
                <Option value='3'>头部菜单</Option>
                <Option value='4'>表格菜单</Option>
                <Option value='5'>数据类型</Option>
                <Option value='6'>看板类型</Option>
              </Select>)}
          </FormItem>
          <FormItem label="排序" {...formItemLayout}>
            {getFieldDecorator('sort', {
              initialValue: itemData.sort,
              rules: [{
                required: true,
                message: '请输入排序',
              }]
            })(
              <Input />
            )}
          </FormItem>
          <FormItem label="请求路径" {...formItemLayout}>
            {getFieldDecorator('uri', {
              initialValue: itemData.uri,
              rules: [{
                required: true,
                message: '请输入请求路径!'
              }]
            })(<Input />)}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}
export default Form.create()(MyModal)