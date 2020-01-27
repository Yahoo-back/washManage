import React from 'react';
import { connect } from 'dva';
import { Link } from 'react-router-dom';
import { Button, Row, Col, Divider, Modal, Input, message } from 'antd';
import { Page, Bread } from 'components';
import styles from '../index.less';
const Search = Input.Search;
const orderstyle = {
    canclebutton: {
        marginLeft: 10,
        background: '#ff9900',
        borderColor: '#ff9900'
    },
    imbutton: {
        marginLeft: 10
    },
    title: {
        fontWeight: 'bold',
        fontSize: '16px'
    },
    margin: {
        marginTop: 30
    },
    padding: {
        marginTop: 60
    },
    left: {
        float: 'left'
    },
    right: {
        float: 'right'
    },
    up: {
        width: '100%',
        fontSize: '15px',
        lineHeight: '200%'
    },
    down: {
        width: '100%',
        fontSize: '15px',
        lineHeight: '200%'
    },
    ul: {
        height: '300px',
        overflow: 'auto',
        borderBottom: '1px solid #f4f4f4',
        marginLeft: '-24px',
        marginRight: '-24px'
    }
};

const { confirm } = Modal;
export class OrderDetail extends React.Component {
    //账号详情
    constructor() {
        super();
        this.state = {
            data: {},
            id: '',
            visible: false,
            value: ''
        };
    }
    componentWillMount = async () => {
        const id = window.location.href.split('=')[1];
        this.setState({
            id: id
        });
    };
    cancleConfirm = () => {
        const { detail } = this.props.order;
        if (detail.orderStatus == '已取消') {
            message.error('订单已取消，不用重复取消');
            return;
        }
        const { id } = this.state;
        const _this = this;
        confirm({
            title: '确定取消该用户的预约订单?',
            content: '请谨慎取消用户预约订单！',
            cancelText: '取消',
            okText: '确定',
            onOk() {
                _this.props.dispatch({
                    type: 'order/cancelOrder',
                    payload: id
                });
            },
            onCancel() {}
        });
    };
    imSession = () => {
        this.setState({
            visible: true
        });
        // const websocket = new WebSocket("ws://2jw2590021.imwork.net/socketServer/1111111");
        // websocket.onopen =(event)=>{
        //   console.log('success')
        // }
    };
    handleCancel = e => {
        this.setState({
            visible: false
        });
    };
    getValue = value => {
        let ul = document.getElementById('session');
        let li = document.createElement('li');
        li.className = 'mySession';
        li.innerHTML = value;
        ul.appendChild(li);
    };
    goBack = () => {
        window.history.back(-1);
    };
    render() {
        const {
            orderNo,
            storeName,
            ctime,
            tradeScene,
            appointDate,
            appointTime,
            coupons,
            merchantNo,
            serverName,
            producerName,
            serveProcedure,
            tradeTime,
            tradeStatus,
            tradeMoney,
            weixinOrderNo,
            weixinName,
            orderStatus,
            openid
        } = this.props.order.detail;
        const { pagination } = this.props.order;
        return (
            <div>
                <Bread title="预约订单管理" />
                <Page inner>
                    <div>
                        <div style={orderstyle.left}>
                            <span style={orderstyle.title}>预约订单详情</span>
                        </div>
                        <div style={orderstyle.right}>
                            <Link to={`/orderManage?pageSize=${pagination.pageSize}`}>
                                <Button>返回</Button>
                            </Link>
                            <Button type="primary" style={orderstyle.imbutton} onClick={this.imSession}>
                                IM会话
                            </Button>
                            {window.localStorage.getItem('userRolePermission') &&
                            JSON.parse(window.localStorage.getItem('userRolePermission')).filter(v => v.id == 802) !=
                                [] ? (
                                orderStatus == '待锁定预约订单' ? (
                                    <Button type="primary" style={orderstyle.canclebutton} onClick={this.cancleConfirm}>
                                        取消预约
                                    </Button>
                                ) : (
                                    ''
                                )
                            ) : (
                                ''
                            )}
                        </div>
                    </div>
                    <Divider style={orderstyle.padding} />
                    <div style={orderstyle.up}>
                        <Row type="flex" justify="space-between" className={styles.title}>
                            <Col span={3}>客户订单号：</Col>
                            <Col span={3}>微信支付单号：</Col>
                            <Col span={3}>订单状态：</Col>
                            <Col span={3} />
                        </Row>
                        <Row type="flex" justify="space-between" className={styles.content}>
                            <Col span={3}>{orderNo}</Col>
                            <Col span={3}>{weixinOrderNo}</Col>
                            <Col span={3}>{orderStatus}</Col>
                            <Col span={3} />
                        </Row>
                    </div>
                    <Divider />
                    <div style={orderstyle.down}>
                        <Row type="flex" justify="space-between" className={styles.title}>
                            <Col span={3}>商户号：</Col>
                            <Col span={3}>门店名：</Col>
                            <Col span={3}>微信OpenID：</Col>
                            <Col span={3}>微信名：</Col>
                        </Row>
                        <Row type="flex" justify="space-between" className={styles.content}>
                            <Col span={3}>{merchantNo}</Col>
                            <Col span={3}>{storeName}</Col>
                            <Col span={3}>{openid}</Col>
                            <Col span={3}>{weixinName}</Col>
                        </Row>
                    </div>
                    <Divider />
                    <div style={orderstyle.down}>
                        <Row type="flex" justify="space-between" className={styles.title}>
                            <Col span={3}>交易时间：</Col>
                            <Col span={3}>交易状态：</Col>
                            <Col span={3}>交易金额：</Col>
                            <Col span={3}>交易场景：</Col>
                        </Row>
                        <Row type="flex" justify="space-between" className={styles.content}>
                            <Col span={3}>{tradeTime}</Col>
                            <Col span={3}>{tradeStatus}</Col>
                            <Col span={3}>{tradeMoney}</Col>
                            <Col span={3}>{tradeScene}</Col>
                        </Row>
                    </div>
                    <div style={orderstyle.down}>
                        <Row type="flex" justify="space-between" className={styles.title}>
                            <Col span={3}>选择优惠券：</Col>
                            <Col span={3}>生成时间：</Col>
                            <Col span={3} />
                            <Col span={3} />
                        </Row>
                        <Row type="flex" justify="space-between" className={styles.content}>
                            <Col span={3}>{coupons}</Col>
                            <Col span={3}>{ctime}</Col>
                            <Col span={3} />
                            <Col span={3} />
                        </Row>
                    </div>
                    <Divider />
                    <div style={orderstyle.down}>
                        <Row type="flex" justify="space-between" className={styles.title}>
                            <Col span={3}>服务类型：</Col>
                            <Col span={3}>服务程序：</Col>
                            <Col span={3}>程序预约日期：</Col>
                            <Col span={3}>程序预约时间：</Col>
                        </Row>
                        <Row type="flex" justify="space-between" className={styles.content}>
                            <Col span={3}>{serverName}</Col>
                            <Col span={3}>{producerName}</Col>
                            <Col span={3}>{appointDate}</Col>
                            <Col span={3}>{appointTime}</Col>
                        </Row>
                    </div>
                </Page>
                <Modal
                    title="会话"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    maskClosable={false}
                    footer={null}
                >
                    <ul style={orderstyle.ul} id="session" />
                    <Row>
                        <Search
                            placeholder="请输入会话内容"
                            enterButton="发送"
                            onSearch={value => this.getValue(value)}
                        />
                    </Row>
                </Modal>
            </div>
        );
    }
}
export default connect(({ order }) => ({ order }))(OrderDetail);
