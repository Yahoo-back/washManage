import React from 'react';
import axios from 'axios';
import { connect } from 'dva';
import { Tabs, Button, Input, Select } from 'antd';
import { Page, HeadFilter } from 'components';
import styles from './index.less';
import OrderList from './components/OrderList';
import BottomPagination from './components/BottomPagination';
import AddModal from './components/Modal';
import { appKey, api } from '../../utils/config';
import { download } from '../../utils/index.js';
const { exportOrders } = api;
const orderstyle = {
    select: {
        width: 100
    },
    search: {
        width: '220px',
        marginLeft: '10px'
    },
    right: {
        float: 'right'
    }
};

const { TabPane } = Tabs;
const Search = Input.Search;
const Option = Select.Option;
export class Order extends React.Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            title: '创建预约订单',
            data: [],
            options: [],
            slectedStore: '',
            lxoptions: [],
            orderNoOrOpenid: ''
        };
    }

    handleChange = value => {
        const { pagination, orderStatus, serveType } = this.props.order;
        this.setState({
            slectedStore: value
        });
        const { status } = this.state;
        this.props.dispatch({
            type: 'order/showList',
            payload: {
                current: pagination.current,
                size: pagination.pageSize,
                pages: pagination.current,
                records: [
                    {
                        orderStatus: parseInt(orderStatus),
                        storeName: value,
                        serveType: serveType
                    }
                ]
            }
        });
        this.props.dispatch({
            type: 'order/updateState',
            payload: { selectStoreName: value }
        });
    };

    onCancel = () => {
        this.setState({
            visible: false
        });
        this.props.dispatch({
            type: 'order/updateState',
            payload: {
                getMoney: '',
                selectCouponPull: []
            }
        });
    };

    showModal = () => {
        let visible = this.state.visible;
        this.setState({
            visible: !visible
        });
    };

    //创建预约订单
    onCreate = async visible => {
        this.setState({
            visible
        });
    };

    handleSearch = value => {
        this.setState({
            orderNoOrOpenid: value
        });
        const { pagination, orderStatus } = this.props.order;
        this.props.dispatch({
            type: 'order/showList',
            payload: {
                current: pagination.current,
                size: pagination.pageSize,
                pages: pagination.current,
                records: [
                    {
                        orderNoOrOpenid: value,
                        orderStatus: parseInt(orderStatus)
                    }
                ]
            }
        });
        this.props.dispatch({
            type: 'order/updateState',
            payload: { orderNoOrOpenid: value }
        });
    };

    handleTypeDropdown = () => {
        const { dispatch } = this.props;
        dispatch({ type: 'order/getType' });
    };

    selectModel = e => {
        const { pagination, orderStatus, selectStoreName } = this.props.order;
        this.props.dispatch({
            type: 'order/updateState',
            payload: { serveType: e }
        });
        this.props.dispatch({
            type: 'order/showList',
            payload: {
                current: pagination.current,
                pages: pagination.current,
                size: pagination.pageSize,
                records: [
                    {
                        orderStatus: parseInt(orderStatus),
                        serveType: e,
                        storeName: selectStoreName
                    }
                ]
            }
        });
    };

    callback = key => {
        this.setState({
            status: key
        });
        const { pagination, current, pageSize, serveType, selectStoreName } = this.props.order;
        this.props.dispatch({
            type: 'order/showList',
            payload: {
                current: 1,
                size: pagination.pageSize,
                pages: 1,
                records: [
                    {
                        orderStatus: parseInt(key),
                        storeName: selectStoreName,
                        serveType: serveType
                    }
                ]
            }
        });
        this.props.dispatch({
            type: 'order/updateState',
            payload: { orderStatus: key }
        });
    };

    export = async () => {
        const { orderList, orderStatus, selectStoreName, orderNoOrOpenid, serveType } = this.props.order;
        const ids = [];
        const res = await axios.post(
            exportOrders,
            {
                appKey: 'appkey',
                data: {
                    ids: ids,
                    titles: [
                        '交易时间',
                        '微信支付订单',
                        '客户订单',
                        '商户号',
                        '微信名',
                        '支付成功模块',
                        '交易金额',
                        '服务类型',
                        '服务程序',
                        '程序预约日期',
                        '程序预约时间',
                        '门店名'
                    ],
                    properties: [
                        'tradeTime',
                        'weixinOrderNo',
                        'orderNo',
                        'merchantNo',
                        'weixinName',
                        'successfulTime',
                        'tradeMoney',
                        'serveType',
                        'serveProcedure',
                        'appointDate',
                        'appointTime',
                        'storeName'
                    ],
                    query: {
                        orderNoOrOpenid: orderNoOrOpenid,
                        orderStatus: orderStatus,
                        serveType: serveType,
                        storeName: selectStoreName
                    }
                },
                version: '1.0'
            },
            {
                responseType: 'blob',
                onDownloadProgress: e => {
                    this.setState({ expored: parseInt(e.loaded / 1024) });
                }
            }
        );
        download(res.data, 'exportOrders.xls');
    };

    //门店Select选框
    handleDropdown = () => {
        const { dispatch } = this.props;
        dispatch({ type: 'order/getStoreOptions' });
    };

    render() {
        const { getType, storeName, orderStatus } = this.props.order;
        return (
            <div>
                <Page className={styles.dashboard}>
                    <HeadFilter
                        title="预约订单管理"
                        options={storeName}
                        handleChange={this.handleChange}
                        handleDropdown={this.handleDropdown}
                    />
                </Page>
                <Page inner>
                    <div>
                        <Tabs
                            activeKey={orderStatus}
                            onChange={this.callback}
                            tabBarExtraContent={
                                <div style={orderstyle.right} id="lxoptions">
                                    <Select
                                        style={orderstyle.select}
                                        defaultValue="类型"
                                        onDropdownVisibleChange={this.handleTypeDropdown}
                                        getPopupContainer={() => document.getElementById('lxoptions')}
                                        onChange={e => this.selectModel(e)}
                                    >
                                        <Option value="">类型</Option>
                                        {getType.map((item, index) => {
                                            return (
                                                <Option value={index + 1} key={index}>
                                                    {item}
                                                </Option>
                                            );
                                        })}
                                    </Select>
                                    <Search
                                        placeholder="请输入客户订单号"
                                        style={orderstyle.search}
                                        onSearch={this.handleSearch}
                                    />
                                    {window.localStorage.getItem('userRolePermission') &&
                                    JSON.parse(window.localStorage.getItem('userRolePermission')).filter(
                                        v => v.id == 801
                                    ) != [] ? (
                                        <Button type="primary" className={styles.btn} onClick={this.showModal}>
                                            创建预约订单
                                        </Button>
                                    ) : (
                                        ''
                                    )}
                                    <AddModal
                                        visible={this.state.visible}
                                        title={this.state.title}
                                        onCancel={this.onCancel}
                                        onCreate={this.onCreate}
                                    />
                                    {window.localStorage.getItem('userRolePermission') &&
                                    JSON.parse(window.localStorage.getItem('userRolePermission')).filter(
                                        v => v.id == 851
                                    ) != [] ? (
                                        <Button type="primary" className={styles.btn} onClick={this.export}>
                                            导出
                                        </Button>
                                    ) : (
                                        ''
                                    )}
                                </div>
                            }
                        >
                            <TabPane tab="待锁定预约单" key="1">
                                <OrderList />
                            </TabPane>
                            <TabPane tab="已锁定预约单" key="2">
                                <OrderList />
                            </TabPane>
                            <TabPane tab="已取消" key="3">
                                <OrderList />
                            </TabPane>
                            <TabPane tab="已完成" key="4">
                                <OrderList />
                            </TabPane>
                        </Tabs>
                    </div>
                </Page>
                <BottomPagination />
            </div>
        );
    }
}
export default connect(({ order }) => ({ order }))(Order);
