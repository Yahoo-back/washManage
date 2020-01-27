import React from 'react'
import { Table } from 'antd'
import Link from 'umi/link'
import Pagination from '../../Pagination'

const Orderlist = ({ dataSource, total, onPageChange, onSizeChange }) => {
    const columns = [
        {
            title: '交易时间',
            dataIndex: 'tradeTime',
            width: 140,
        },
        {
            title: '微信支付单号',
            dataIndex: 'weixinOrderNo',
            width: 150,
        },
        {
            title: '客户订单号',
            dataIndex: 'orderNo',
            width: 150,
        },
        {
            title: '商户号',
            dataIndex: 'merchantNo',
            width: 120,
        },
        {
            title: '微信名',
            dataIndex: 'weixinName',
            width: 120,
        },
        {
            title: '订单状态',
            dataIndex: 'orderStatus',
            width: 140,
        },
        {
            title: '交易状态',
            dataIndex: 'tradeStatus',
            width: 120,
        },
        {
            title: '支付成功时间',
            dataIndex: 'successfulTime',
            width: 130,
        },
        {
            title: '交易金额',
            dataIndex: 'tradeMoney',
            render (tradeMoney) {
                return `￥${tradeMoney}`
            },
            width: 120,
        },
        {
            title: '服务类型',
            dataIndex: 'producerName',
            width: 120,
        },
        {
            title: '服务程序',
            dataIndex: 'serverName',
            width: 120,
        },
        {
            title: '程序预约日期',
            dataIndex: 'appointDate',
            width: 120,
        },
        {
            title: '程序预约时间',
            dataIndex: 'appointTime',
            width: 120,
        },
        {
            title: '操作',
            render: item => {
                return <Link to={`../orderManage/OrderDetail?orderNo=${item.orderNo}`}>详情</Link>
            },
            fixed: 'right',
            width: 80,
        },
    ]

    return (
        <div>
            <Table
                bordered
                columns={columns}
                dataSource={dataSource}
                pagination={false}
                scroll={{ x: 1500 }}
                rowKey={dataSource => dataSource.orderNo}
            />
            <Pagination total={total} onPageChange={onPageChange} onSizeChange={onSizeChange} />
        </div>
    )
}

export default Orderlist
