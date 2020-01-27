import React, { Component } from 'react';
import moment from 'moment';
import { Form, Input, Select, Button, Modal, Cascader, DatePicker, TimePicker } from 'antd';
import { NowModal } from 'components';
import { connect } from 'dva';
import { TIME_FORMAT } from '../../../utils/date';
const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;
const orderstyle = {
    input: {
        width: '100%'
    }
};

const item = {};
class AddModal extends Component {
    constructor() {
        super();
        this.state = {
            serviceType: '',
            ServiceProgram: '',
            open: false
        };
    }
    handleCreate = () => {
        const { onCreate } = this.props;
        const { getMoney, selectCouponPull } = this.props.order;
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }
            values.appointDate = moment(values.appointDate).format('YYYY-MM-DD');
            values.appointTime = moment(values.appointTime).format('HH:mm');
            new Promise((resolve, reject) => {
                this.props.dispatch({
                    type: 'order/create',
                    payload: {
                        data: {
                            appointDate: values.appointDate,
                            appointTime: values.appointTime,
                            orderMoney: getMoney,
                            couponsId: values.couponsId,
                            merchantNo: values.merchantNo,
                            openid: values.openid,
                            serveProcedure: values.serveProcedure,
                            serveType: values.serveType,
                            storeName: values.storeName,
                            weixinName: values.weixinName
                        },
                        resolve,
                        reject
                    }
                });
            }).then(res => {
                if (res.code == '200') {
                    onCreate(false);
                    this.props.form.resetFields();
                    this.props.dispatch({
                        type: 'order/updateState',
                        payload: {
                            getMoney: '',
                            selectCouponPull: []
                        }
                    });
                }
            });
        });
    };
    getTypeOne = e => {
        const { ServiceProgram } = this.state;
        this.setState({
            serviceType: e
        });
        if (ServiceProgram !== '') {
            this.props.dispatch({
                type: 'order/selectCoupon',
                payload: {
                    serveProcedure: ServiceProgram,
                    serveType: e
                }
            });
            this.props.dispatch({
                type: 'order/getMoney',
                payload: {
                    serveProcedure: ServiceProgram,
                    serveType: e
                }
            });
        }
    };
    getServe = e => {
        const { serviceType } = this.state;
        this.setState({
            ServiceProgram: e
        });
        if (serviceType !== '') {
            this.props.dispatch({
                type: 'order/selectCoupon',
                payload: {
                    serveProcedure: e,
                    serveType: serviceType
                }
            });
            this.props.dispatch({
                type: 'order/getMoney',
                payload: {
                    serveProcedure: e,
                    serveType: serviceType
                }
            });
        }
    };
    onClose = () => {
        const { onCancel } = this.props;
        onCancel();
        this.props.form.resetFields();
    };
    handleClose = () => {
        this.setState({
            open: false
        });
    };
    handleOpenChange = open => {
        this.setState({ open });
    };
    handleDropdown = () => {
        const { dispatch } = this.props;
        dispatch({ type: 'order/getStoreOptions' });
    };
    handleTypeDropdown = () => {
        const { dispatch } = this.props;
        dispatch({ type: 'order/getType' });
    };
    handleProcedureDropdown = () => {
        const { serviceType } = this.state;
        const { dispatch } = this.props;
        dispatch({
            type: 'order/getProcedure',
            payload: serviceType == '洗衣' ? 1 : 2
        });
    };
    render() {
        const { getType, procedure, storeName, selectCouponPull, getMoney } = this.props.order;
        const { visible, onCancel, title } = this.props;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                span: 7,
                offset: 2
            },
            wrapperCol: {
                span: 12
            }
        };

        return (
            <NowModal
                titleText={title}
                visible={visible}
                sure="创建"
                handleOk={this.handleCreate}
                onCancel={this.onClose}
            >
                <Form layout="horizontal" id="general">
                    <FormItem label="商户号" hasFeedback {...formItemLayout}>
                        {getFieldDecorator('merchantNo', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入商户号!',
                                    whitespace: true
                                }
                            ]
                        })(<Input />)}
                    </FormItem>
                    <FormItem label="门店名" hasFeedback {...formItemLayout}>
                        {getFieldDecorator('storeName', {
                            rules: [
                                {
                                    required: true,
                                    message: '请选择门店!'
                                }
                            ]
                        })(
                            <Select
                                placeholder="请选择门店名"
                                onDropdownVisibleChange={this.handleDropdown}
                                getPopupContainer={() => document.getElementById('general')}
                            >
                                {storeName &&
                                    storeName.map((item, index) => {
                                        return (
                                            <Option value={item.name} key={index}>
                                                {item.name}
                                            </Option>
                                        );
                                    })}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="微信名" hasFeedback {...formItemLayout}>
                        {getFieldDecorator('weixinName', {
                            rules: [
                                {
                                    required: false,
                                    message: '请输入微信名!',
                                    whitespace: true
                                }
                            ]
                        })(<Input />)}
                    </FormItem>
                    <FormItem label="服务类型" hasFeedback {...formItemLayout}>
                        {getFieldDecorator('serveType', {
                            rules: [
                                {
                                    required: true,
                                    message: '请选择服务类型!'
                                }
                            ]
                        })(
                            <Select
                                placeholder="请选择服务类型"
                                onDropdownVisibleChange={this.handleTypeDropdown}
                                onChange={e => this.getTypeOne(e)}
                                getPopupContainer={() => document.getElementById('general')}
                            >
                                {getType &&
                                    getType.map((item, index) => {
                                        return (
                                            <Option value={item} key={index}>
                                                {item}
                                            </Option>
                                        );
                                    })}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="服务程序" hasFeedback {...formItemLayout}>
                        {getFieldDecorator('serveProcedure', {
                            rules: [
                                {
                                    required: true,
                                    message: '请选择服务程序!'
                                }
                            ]
                        })(
                            <Select
                                placeholder="请选择服务程序"
                                onChange={e => this.getServe(e)}
                                onDropdownVisibleChange={this.handleProcedureDropdown}
                                getPopupContainer={() => document.getElementById('general')}
                            >
                                {procedure &&
                                    procedure.map((item, index) => {
                                        return (
                                            <Option value={item} key={index}>
                                                {item}
                                            </Option>
                                        );
                                    })}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="选择优惠券" hasFeedback {...formItemLayout}>
                        {getFieldDecorator('couponsId', {
                            rules: [
                                {
                                    required: false,
                                    message: '请选择优惠券!'
                                }
                            ]
                        })(
                            <Select
                                placeholder="请选择优惠券"
                                getPopupContainer={() => document.getElementById('general')}
                            >
                                {selectCouponPull &&
                                    selectCouponPull.map((item, index) => {
                                        return (
                                            <Option value={item.id} key={index}>
                                                {item.name}
                                            </Option>
                                        );
                                    })}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="微信OpenID" hasFeedback {...formItemLayout}>
                        {getFieldDecorator('openid', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入微信OpenID!',
                                    whitespace: true
                                }
                            ]
                        })(<Input />)}
                    </FormItem>
                    <FormItem label="程序预约日期" hasFeedback {...formItemLayout}>
                        {getFieldDecorator('appointDate', {
                            rules: [
                                {
                                    required: true,
                                    message: '请选择程序预约日期!'
                                }
                            ]
                        })(
                            <DatePicker
                                placeholder="请选择程序预约日期"
                                style={orderstyle.input}
                                getCalendarContainer={() => document.getElementById('general')}
                            />
                        )}
                    </FormItem>
                    <FormItem label="程序预约时间" hasFeedback {...formItemLayout}>
                        {getFieldDecorator('appointTime', {
                            rules: [
                                {
                                    required: true,
                                    message: '请选择程序预约时间!'
                                }
                            ]
                        })(
                            <TimePicker
                                open={this.state.open}
                                onOpenChange={this.handleOpenChange}
                                addon={() => (
                                    <Button size="small" type="primary" onClick={this.handleClose}>
                                        确定
                                    </Button>
                                )}
                                placeholder="请选择程序预约时间"
                                format={TIME_FORMAT}
                                style={orderstyle.input}
                                getPopupContainer={() => document.getElementById('general')}
                            />
                        )}
                    </FormItem>
                    <FormItem label="订单金额" hasFeedback {...formItemLayout}>
                        {getFieldDecorator('orderMoney', {})(<span className="ant-form-text">￥ {getMoney}</span>)}
                    </FormItem>
                </Form>
            </NowModal>
        );
    }
}

export default Form.create()(connect(({ order }) => ({ order }))(AddModal));
