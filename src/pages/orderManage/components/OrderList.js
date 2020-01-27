import React from 'react';
import { Table } from 'antd';
import { showList } from '../service/order';
import { Link } from 'react-router-dom';
import { connect } from 'dva';

const crrstyle = {
    table: {
        width: '100%'
    }
};

class DeviceList extends React.Component {
    constructor() {
        super();
        this.state = {
            data: []
        };
    }

    render() {
        const { pagination } = this.props.order;
        const columns = [
            {
                title: '交易时间',
                dataIndex: 'tradeTime',
                key: 'tradeTime',
                fixed: 'left',
                width: 100
            },
            {
                title: '微信支付订单号',
                dataIndex: 'weixinOrderNo',
                key: 'weixinOrderNo',
                fixed: 'left',
                width: 150
            },
            {
                title: '客户订单号',
                dataIndex: 'orderNo',
                key: 'orderNo'
            },
            {
                title: '商户号',
                dataIndex: 'merchantNo',
                key: 'merchantNo'
            },
            {
                title: '微信名',
                dataIndex: 'weixinName',
                key: 'weixinName'
            },
            {
                title: '支付成功时间',
                dataIndex: 'successfulTime',
                key: 'successfulTime'
            },
            {
                title: '交易金额',
                dataIndex: 'tradeMoney',
                key: 'tradeMoney'
            },
            {
                title: '服务类型',
                dataIndex: 'serverName',
                key: 'serverName'
            },
            {
                title: '服务程序',
                dataIndex: 'producerName',
                key: 'producerName'
            },
            {
                title: '程序预约日期',
                dataIndex: 'appointDate',
                key: 'appointDate'
            },
            {
                title: '程序预约时间',
                dataIndex: 'appointTime',
                key: 'appointTime'
            },
            {
                title: '门店名',
                dataIndex: 'storeName',
                key: 'storeName'
            },
            {
                title: '操作',
                dataIndex: 'remark',
                key: 'remark',
                fixed: 'right',
                width: 100,
                render: (text, record) => (
                    <span>
                        {' '}
                        {window.localStorage.getItem('userRolePermission') &&
                        JSON.parse(window.localStorage.getItem('userRolePermission')).filter(v => v.id == 804) != [] ? (
                            <Link
                                to={`/orderManage/OrderDetail?orderNo=${record.orderNo}&pageSize=${
                                    pagination.pageSize
                                }`}
                            >
                                {'详情'}
                            </Link>
                        ) : (
                            ''
                        )}
                    </span>
                )
            }
        ];
        const { orderList } = this.props.order;
        return (
            <div>
                <Table
                    style={crrstyle.table}
                    scroll={{ x: 1250 }}
                    columns={columns}
                    dataSource={orderList ? orderList : []}
                    rowKey={record => record.orderNo}
                    pagination={false}
                />
            </div>
        );
    }
}

export default connect(({ order }) => ({ order }))(DeviceList);
