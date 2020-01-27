import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Form, Input, InputNumber, Radio, DatePicker, Select, Col } from 'antd';
import { LocaleProvider } from 'antd';
import zh_cn from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import { connect } from 'dva';
import { NowModal } from 'components';
import { getType } from '../services/coupon';
import { DATE_COUPON } from '../../../utils/date';
import { inputNum } from '../../../utils/regExp';

const RadioGroup = Radio.Group;
const Option = Select.Option;
const FormItem = Form.Item;
const modalstyle = {
    inputnum: {
        width: 232
    },
    font: {
        marginLeft: 7,
        marginRight: 7
    },
    inputorder: {
        width: 100
    },
    radiogroup: {
        color: '#000'
    },
    select: {
        width: 100,
        color: '#000'
    },
    form: {
        marginLeft: 28
    },
    datePicker: {
        width: 150
    }
};

function onChange() {}

class AddModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            serveTypeOptions: [],
            startTime: '',
            endTime: '',
            endOpen: false,
            value1: '',
            value2: ''
        };
    }

    //获取门店列表,服务类型
    componentDidMount = async () => {
        const type = await getType();
        this.setState({
            serveTypeOptions: type.data
        });
    };

    //单选按钮组
    onChange1 = e => {
        this.setState({
            value1: e.target.value
        });
        return e.target.value;
    };

    onChange2 = e => {
        this.setState({
            value2: e.target.value
        });
    };

    //日期
    disabledStartDate = startTime => {
        const endTime = this.state.endTime;
        if (!startTime || !endTime) {
            return false;
        }
        return startTime.valueOf() > endTime.valueOf();
    };

    disabledEndDate = endTime => {
        const startTime = this.state.startTime;
        if (!endTime || !startTime) {
            return false;
        }
        return endTime.valueOf() <= startTime.valueOf();
    };

    onChange = (field, value) => {
        this.setState({
            [field]: value
        });
    };

    onStartChange = value => {
        this.onChange('startTime', value);
        this.setState({
            startTime: value
        });
    };

    onEndChange = value => {
        this.onChange('endTime', value);
        this.setState({
            endTime: value
        });
    };

    handleStartOpenChange = open => {
        if (!open) {
            this.setState({ endOpen: true });
        }
    };

    handleEndOpenChange = open => {
        this.setState({ endOpen: open });
    };

    handleCreate = () => {
        const { onCreate, dispatch } = this.props;
        const useType = this.state.value2;
        const money = this.state.value1;
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }
            if (money == 1) {
                values.useRule = 0;
            }
            if (money == 2) {
                values.useRule = parseInt(values.useRules);
            }
            if (useType == 3) {
                values.useRange = 3;
            }
            if (useType == 4) {
                values.useRange = parseInt(values.useRanges);
            }
            values.startTime = moment(values.startTime).format(DATE_COUPON);
            values.endTime = moment(values.endTime).format(DATE_COUPON);
            // 这里可以对数据做处理
            onCreate(false);
            const couponValues = {
                denomination: values.denomination,
                issueAmount: values.issueAmount,
                useRange: values.useRange,
                useRule: values.useRule,
                name: values.name,
                startTime: values.startTime,
                endTime: values.endTime
            };
            dispatch({ type: 'couponList/create', payload: couponValues });
            this.props.form.resetFields();
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
        dispatch({ type: 'couponList/getType' });
    };

    render() {
        const { visible, onCancel, title } = this.props;
        const { startTime, endTime, endOpen, state } = this.state;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                span: 8
            },
            wrapperCol: {
                span: 14
            }
        };
        return (
            <LocaleProvider locale={zh_cn}>
                <NowModal
                    titleText={title}
                    visible={visible}
                    sure="创建"
                    handleOk={this.handleCreate}
                    onCancel={this.handleCancel}
                    width={550}
                >
                    <Form onSubmit={this.handleCreate} style={modalstyle.form}>
                        <FormItem label="优惠券名称" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('name', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入优惠券名称!',
                                        whitespace: true
                                    }
                                ]
                            })(<Input />)}
                        </FormItem>
                        <FormItem label="优惠券面值" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('denomination', {
                                rules: [
                                    {
                                        required: true,
                                        pattern: inputNum.exp,
                                        message: '请输入优惠券面值(整数)!'
                                    }
                                ]
                            })(
                                <InputNumber
                                    formatter={denomination => `${denomination}元`}
                                    parser={denomination => denomination.replace('元', '')}
                                    onChange={onChange}
                                    min={1}
                                    style={modalstyle.inputnum}
                                />
                            )}
                        </FormItem>
                        <FormItem label="订单金额" hasFeedback {...formItemLayout}>
                            <Col style={modalstyle.radiogroup}>
                                {getFieldDecorator('money', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择订单金额!'
                                        }
                                    ]
                                })(
                                    <RadioGroup onChange={this.onChange1} setfieldsvalue={this.state.value1}>
                                        <Radio value={1} style={modalstyle.radiogroup}>
                                            不限制
                                        </Radio>
                                        <Radio value={2} style={modalstyle.radiogroup}>
                                            满
                                        </Radio>
                                    </RadioGroup>
                                )}
                                {getFieldDecorator('useRules', {})(
                                    <InputNumber
                                        min={0}
                                        formatter={useRule => `${useRule}元`}
                                        parser={useRule => useRule.replace('元', '')}
                                    />
                                )}
                                <span style={modalstyle.font}>可使用</span>
                            </Col>
                        </FormItem>
                        <FormItem label="发放总量" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('issueAmount', {
                                rules: [
                                    {
                                        required: true,
                                        pattern: inputNum.exp,
                                        message: '请输入发放总量!'
                                    }
                                ]
                            })(
                                <InputNumber
                                    min={1}
                                    formatter={issueAmount => `${issueAmount}张`}
                                    parser={issueAmount => issueAmount.replace('张', '')}
                                    onChange={onChange}
                                    style={modalstyle.inputnum}
                                />
                            )}
                        </FormItem>
                        <FormItem label="适用范围" hasFeedback {...formItemLayout}>
                            <Col style={modalstyle.radiogroup}>
                                {getFieldDecorator('useType', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择适用范围!'
                                        }
                                    ]
                                })(
                                    <RadioGroup onChange={this.onChange2} setfieldsvalue={this.state.value2}>
                                        <Radio value={3} style={modalstyle.radiogroup}>
                                            不限制
                                        </Radio>
                                        <Radio value={4} style={modalstyle.radiogroup}>
                                            限
                                        </Radio>
                                    </RadioGroup>
                                )}
                                {getFieldDecorator('useRanges', {})(
                                    <Select
                                        style={modalstyle.select}
                                        placeholder="类型"
                                        onDropdownVisibleChange={this.handleDropdown}
                                    >
                                        {this.state.serveTypeOptions
                                            ? this.state.serveTypeOptions.map((v, index) => {
                                                  return (
                                                      <Option value={index + 1} key={v}>
                                                          {v}
                                                      </Option>
                                                  );
                                              })
                                            : ''}
                                    </Select>
                                )}
                                <span style={modalstyle.font}>使用</span>
                            </Col>
                        </FormItem>
                        <FormItem label="生效日期" hasFeedback {...formItemLayout}>
                            <Col>
                                {getFieldDecorator('startTime', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择生效日期!'
                                        }
                                    ]
                                })(
                                    <DatePicker
                                        locale={zh_cn}
                                        disabledDate={this.disabledStartDate}
                                        format={DATE_COUPON}
                                        style={modalstyle.datePicker}
                                        setfieldsvalue={startTime}
                                        placeholder="开始时间"
                                        onChange={this.onStartChange}
                                        onOpenChange={this.handleStartOpenChange}
                                    />
                                )}
                                <span style={modalstyle.font}>至</span>
                                {getFieldDecorator('endTime', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择生效日期!'
                                        }
                                    ]
                                })(
                                    <DatePicker
                                        locale={zh_cn}
                                        disabledDate={this.disabledEndDate}
                                        format={DATE_COUPON}
                                        style={modalstyle.datePicker}
                                        setfieldsvalue={endTime}
                                        placeholder="结束时间"
                                        onChange={this.onEndChange}
                                        open={endOpen}
                                        onOpenChange={this.handleEndOpenChange}
                                    />
                                )}
                            </Col>
                        </FormItem>
                    </Form>
                </NowModal>
            </LocaleProvider>
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

export default connect(({ couponList }) => ({ couponList }))(Form.create()(AddModal));
