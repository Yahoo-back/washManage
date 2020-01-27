import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Form, Input, Select } from 'antd';
import { NowModal } from 'components';
import { getStoreOptions } from '../services/hcAccount';
import { nickName, pwdExp, emailExp } from '../../../utils/regExp';

const Option = Select.Option;
const FormItem = Form.Item;
const data = {};

class AddModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            storeOptions: []
        };
    }
    //获取门店列表,服务类型
    componentDidMount = async () => {
        const store = await getStoreOptions();
        this.setState({
            storeOptions: store.data
        });
    };

    handleCreate = () => {
        const { onCreate, dispatch, visible } = this.props;
        const { pagination, associateStore } = this.props.hcAccount;
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }
            values.prefix = values.prefix == +86 ? values.prefix : '';
            const createValue = {
                associateStore: values.associateStore,
                homeAccountName: values.homeAccountName,
                mail: values.prefix + values.mail,
                password: values.password
            };
            new Promise((resolve, reject) => {
                dispatch({
                    type: 'hcAccount/create',
                    payload: { createValue, pagination, associateStore, resolve, reject }
                });
            }).then(res => {
                if (res.code == '200') {
                    onCreate(false);
                    this.props.form.resetFields();
                }
            });
        });
    };

    handleCancel = () => {
        const {
            onCancel,
            form: { resetFields }
        } = this.props;
        onCancel();
        resetFields();
    };

    handleDropdown = () => {
        const { dispatch } = this.props;
        dispatch({ type: 'hcAccount/getStoreOptions' });
    };

    render() {
        const { visible, onCancel, title } = this.props;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                span: 7
            },
            wrapperCol: {
                span: 14
            }
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '+86'
        })(
            <Select>
                <Option value="+86">+86</Option>
                <Option value="email">email</Option>
            </Select>
        );
        return (
            <NowModal
                titleText={title}
                visible={visible}
                sure="确认"
                handleOk={this.handleCreate}
                onCancel={this.handleCancel}
                width={480}
            >
                <Form layout="horizontal" onSubmit={this.handleCreate}>
                    <FormItem label="昵称" hasFeedback {...formItemLayout}>
                        {getFieldDecorator('homeAccountName', {
                            initialValue: data.homeAccountName,
                            rules: [
                                {
                                    required: true,
                                    message: '请输入昵称'
                                }
                            ]
                        })(<Input />)}
                    </FormItem>
                    <FormItem label="账号" hasFeedback {...formItemLayout}>
                        {getFieldDecorator('mail', {
                            initialValue: data.mail,
                            rules: [
                                {
                                    required: true,
                                    message: '请输账号!'
                                }
                            ]
                        })(<Input addonBefore={prefixSelector} />)}
                    </FormItem>
                    <FormItem label="密码" hasFeedback {...formItemLayout}>
                        {getFieldDecorator('password', {
                            initialValue: data.password,
                            rules: [
                                {
                                    required: true,
                                    message: '请输入密码',
                                    pattern: pwdExp,
                                    whitespace: true
                                },
                                { pattern: pwdExp.exp, message: pwdExp.des }
                            ]
                        })(<Input />)}
                    </FormItem>
                    <FormItem label="关联门店" hasFeedback {...formItemLayout}>
                        {getFieldDecorator('associateStore', {
                            initialValue: data.associateStore && data.associateStore.split(' '),
                            rules: [
                                {
                                    required: true,
                                    message: '请选择关联门店!'
                                }
                            ]
                        })(
                            <Select placeholder="请选择关联门店" onDropdownVisibleChange={this.handleDropdown}>
                                {this.state.storeOptions
                                    ? this.state.storeOptions.map(v => (
                                          <Option value={v.name} key={v.id}>
                                              {v.name}
                                          </Option>
                                      ))
                                    : ''}
                            </Select>
                        )}
                    </FormItem>
                </Form>
            </NowModal>
        );
    }
}

AddModal.propTypes = {
    form: PropTypes.object.isRequired,
    type: PropTypes.string,
    data: PropTypes.object,
    onOk: PropTypes.func,
    create: PropTypes.object
};

export default connect(({ hcAccount }) => ({ hcAccount }))(Form.create()(AddModal));
