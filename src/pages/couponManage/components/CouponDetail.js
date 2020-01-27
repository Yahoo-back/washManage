import React from 'react';
import { connect } from 'dva';
import { Link } from 'react-router-dom';
import { Card, Button, Select, Row, Form, Input, InputNumber, Radio, DatePicker, Col, message } from 'antd';
import moment from 'moment';
import { LocaleProvider } from 'antd';
import zh_cn from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import { Page, Bread } from 'components';
import styles from '../index.less';
import { getType } from '../services/coupon';
import { DATE_COUPON } from '../../../utils/date';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const modalstyle = {
    inputnum: {
        width: 232
    },
    font: {
        marginLeft: 15,
        marginRight: 15
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
    dateInput: {
        width: 180
    }
};

export class CouponDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            data: [],
            id: '',
            edit: false,
            serveTypeOptions: [],
            startTime: '',
            endTime: '',
            endOpen: false,
            name: '',
            denomination: '',
            issueAmount: '',
            value1: '',
            value2: '',
            useRange: '',
            useRule: ''
        };
    }

    //获取门店列表,服务类型
    componentDidMount = async () => {
        const type = await getType();
        const serveTypeOptions = type.data;
        this.setState({
            serveTypeOptions: serveTypeOptions
        });
    };

    //详情修改
    editFn = () => {
        const { couponListData } = this.props.couponList;
        const id = window.location.href.split('=')[1];
        const couponDetail = couponListData.filter((item, index) => {
            if (item.id == id) {
                return item;
            }
        });
        const useRange = couponDetail[0].useRange;
        const useRule = couponDetail[0].useRule;
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }
            if (useRule == 0) {
                values.money = 1;
            } else {
                values.money = 2;
            }
            if (useRange == 3) {
                values.useType = 3;
            } else {
                values.useType = 4;
            }
            const moneys = values.money;
            const useTypes = values.useType;
            this.setState({
                edit: true,
                money: moneys,
                useType: useTypes
            });
        });
    };

    saveFn = () => {
        const { dispatch } = this.props;
        const { couponListData } = this.props.couponList;
        const id = window.location.href.split('=')[1];
        const couponDetail = couponListData.filter((item, index) => {
            if (item.id == id) {
                return item;
            }
        });
        const money = this.state.value1;
        const { number, useRange, useRule } = couponDetail[0];
        const useType = this.state.value2 == '' ? (useRange == 3 ? 3 : 4) : this.state.value2;
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }
            if (money == 1) {
                values.useRule = 0;
            }
            if (money == 2) {
                values.useRule = parseInt(values.useRule);
            }
            if (useType == 3) {
                values.useRange = 3;
            }
            if (useType == 4) {
                values.useRange = values.useRange == '烘干' ? 2 : values.useRange == '洗衣' ? 1 : values.useRange; //values.useRange改为3
            }
            values.startTime = moment(values.startTime).format(DATE_COUPON);
            values.endTime = moment(values.endTime).format(DATE_COUPON);
            dispatch({
                type: 'couponList/editCoupons',
                payload: {
                    number: number,
                    name: values.name,
                    denomination: values.denomination,
                    useRange: values.useRange,
                    useRule: values.useRule,
                    issueAmount: values.issueAmount,
                    startTime: values.startTime == '' ? couponDetail[0].startTime : values.startTime,
                    endTime: values.endTime == '' ? couponDetail[0].endTime : values.endTime
                }
            });
            this.setState({
                edit: false
            });
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
        return e.target.value;
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

    onChange = (field, date) => {
        this.setState({
            [field]: date
        });
    };

    onStartChange = date => {
        this.onChange('startTime', date);
        this.setState({
            startTime: date
        });
    };

    onEndChange = date => {
        this.onChange('endTime', date);
        this.setState({
            endTime: date
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

    //取消按钮
    cancle = () => {
        this.setState({
            edit: false
        });
    };

    handleDropdown = () => {
        const { dispatch } = this.props;
        dispatch({ type: 'couponList/getType' });
    };

    render() {
        const useType = this.state.useType;
        const money = this.state.money;
        const { edit, endOpen } = this.state;
        const { couponListData } = this.props.couponList;
        const id = window.location.href.split('=')[1];
        const couponDetail = couponListData.filter((item, index) => {
            if (item.id == id) {
                return item;
            }
        });
        const { getFieldDecorator } = this.props.form;
        const {
            denomination,
            name,
            useRange,
            useRule,
            issueAmount,
            startTime,
            endTime,
            obtainAmount
        } = couponDetail[0];

        return (
            <LocaleProvider locale={zh_cn}>
                <div>
                    <Bread title="优惠券管理" />
                    <Page inner>
                        <Card
                            title="优惠券详情"
                            extra={
                                !edit ? (
                                    <div>
                                        <Link to="/couponManage">
                                            <Button>返回</Button>
                                        </Link>
                                        {window.localStorage.getItem('userRolePermission') &&
                                        JSON.parse(window.localStorage.getItem('userRolePermission')).filter(
                                            v => v.id == 814
                                        ) != [] ? (
                                            <Button type="primary" className={styles.btn} onClick={this.editFn}>
                                                修改
                                            </Button>
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                ) : (
                                    <div>
                                        <Button type="primary" onClick={this.cancle}>
                                            取消
                                        </Button>
                                        <Button type="primary" className={styles.btn} onClick={this.saveFn}>
                                            保存
                                        </Button>
                                    </div>
                                )
                            }
                        >
                            <div>
                                <div className={styles.up}>
                                    <Row>
                                        <Col span={12}>优惠券名称：</Col>
                                    </Row>
                                    <Row>
                                        <Col span={12} className={styles.content}>
                                            {edit ? (
                                                <div>
                                                    <FormItem formItemLayout>
                                                        {getFieldDecorator('name', {
                                                            initialValue: name ? name : null
                                                        })(<Input />)}
                                                    </FormItem>
                                                </div>
                                            ) : (
                                                <div>{name}</div>
                                            )}
                                        </Col>
                                    </Row>
                                </div>
                                <br />
                                <div className={styles.down}>
                                    <Row>
                                        <Col span={12}>优惠券面值：</Col>
                                    </Row>
                                    <Row>
                                        <Col span={12} className={styles.content}>
                                            {edit ? (
                                                <div>
                                                    <FormItem formItemLayout>
                                                        {getFieldDecorator('denomination', {
                                                            initialValue: denomination ? denomination : null
                                                        })(
                                                            <InputNumber
                                                                min={1}
                                                                formatter={denomination => `${denomination}元`}
                                                                parser={denomination => denomination.replace('元', '')}
                                                            />
                                                        )}
                                                    </FormItem>
                                                </div>
                                            ) : (
                                                <div>{denomination}元</div>
                                            )}
                                        </Col>
                                    </Row>
                                </div>
                                <br />
                                <div className={styles.down}>
                                    <Row>
                                        <Col span={12}>订单金额：</Col>
                                    </Row>
                                    <Row className={styles.content}>
                                        {edit ? (
                                            <div>
                                                <Col style={modalstyle.radiogroup}>
                                                    {getFieldDecorator('money', {
                                                        initialValue: money
                                                    })(
                                                        <RadioGroup
                                                            onChange={this.onChange1}
                                                            setfieldsvalue={this.state.value1}
                                                        >
                                                            <Radio value={1} style={modalstyle.radiogroup}>
                                                                不限制
                                                            </Radio>
                                                            <Radio value={2} style={modalstyle.radiogroup}>
                                                                满
                                                            </Radio>
                                                        </RadioGroup>
                                                    )}
                                                    {getFieldDecorator('useRule', {
                                                        initialValue: useRule == 0 ? 0 : useRule
                                                    })(
                                                        <InputNumber
                                                            min={0}
                                                            formatter={useRule => `${useRule}元`}
                                                            parser={useRule => useRule.replace('元', '')}
                                                        />
                                                    )}
                                                    <span style={modalstyle.font}>可使用</span>
                                                </Col>
                                            </div>
                                        ) : (
                                            <div>{useRule == 0 ? '不限' : `满 ${useRule} 元可用`}</div>
                                        )}
                                    </Row>
                                </div>
                                <div className={styles.down}>
                                    <Row>
                                        <Col span={12}>发放总量：</Col>
                                    </Row>
                                    <Row className={styles.content}>
                                        <Col span={12}>
                                            {edit ? (
                                                <div>
                                                    <FormItem formItemLayout>
                                                        {getFieldDecorator('issueAmount', {
                                                            initialValue: issueAmount ? issueAmount : null
                                                        })(
                                                            <InputNumber
                                                                min={1}
                                                                formatter={issueAmount => `${issueAmount}张`}
                                                                parser={issueAmount => issueAmount.replace('张', '')}
                                                            />
                                                        )}
                                                    </FormItem>
                                                </div>
                                            ) : (
                                                <div>{issueAmount}张</div>
                                            )}
                                        </Col>
                                    </Row>
                                </div>
                                <br />
                                <div className={styles.down}>
                                    <Row>
                                        <Col span={12}>适用范围：</Col>
                                    </Row>
                                    <Row className={styles.content}>
                                        <Col span={14}>
                                            {edit ? (
                                                <div>
                                                    <Col style={modalstyle.radiogroup}>
                                                        {getFieldDecorator('useType', {
                                                            initialValue: useType
                                                        })(
                                                            <RadioGroup
                                                                onChange={this.onChange2}
                                                                setfieldsvalue={this.state.value2}
                                                            >
                                                                <Radio value={3} style={modalstyle.radiogroup}>
                                                                    不限制
                                                                </Radio>
                                                                <Radio value={4} style={modalstyle.radiogroup}>
                                                                    限
                                                                </Radio>
                                                            </RadioGroup>
                                                        )}
                                                        {getFieldDecorator('useRange', {
                                                            initialValue:
                                                                useRange == 1 ? '洗衣' : useRange == 2 ? '烘干' : ''
                                                        })(
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
                                                </div>
                                            ) : (
                                                <div>{useRange == 3 ? '不限' : useRange == 1 ? '洗衣' : '烘干'}</div>
                                            )}
                                        </Col>
                                    </Row>
                                </div>
                                <br />
                                <div className={styles.down}>
                                    <Row>
                                        <Col span={12}>生效日期：</Col>
                                    </Row>
                                    <Row className={styles.content}>
                                        <Col>
                                            {edit ? (
                                                <div>
                                                    <Col span={16}>
                                                        {getFieldDecorator('startTime', {
                                                            initialValue: moment(startTime, DATE_COUPON)
                                                        })(
                                                            <DatePicker
                                                                format={DATE_COUPON}
                                                                disabledDate={this.disabledStartDate}
                                                                setfieldsvalue={startTime}
                                                                onChange={this.onStartChange}
                                                                onOpenChange={this.handleStartOpenChange}
                                                            />
                                                        )}
                                                        <span style={modalstyle.font}>至</span>
                                                        {getFieldDecorator('endTime', {
                                                            initialValue: moment(endTime, DATE_COUPON)
                                                        })(
                                                            <DatePicker
                                                                format={DATE_COUPON}
                                                                disabledDate={this.disabledEndDate}
                                                                setfieldsvalue={endTime}
                                                                onChange={this.onEndChange}
                                                                open={endOpen}
                                                                onOpenChange={this.handleEndOpenChange}
                                                            />
                                                        )}
                                                    </Col>
                                                </div>
                                            ) : (
                                                <div>
                                                    {startTime} 至 {endTime}
                                                </div>
                                            )}
                                        </Col>
                                    </Row>
                                </div>
                                <br />
                                <div className={styles.down}>
                                    <Row>
                                        <Col span={12}>获取的总数量：</Col>
                                    </Row>
                                    <Row className={styles.content}>
                                        <Col span={12}>{obtainAmount}</Col>
                                    </Row>
                                </div>
                            </div>
                        </Card>
                    </Page>
                </div>
            </LocaleProvider>
        );
    }
}

export default connect(({ couponList }) => ({ couponList }))(Form.create()(CouponDetail));
