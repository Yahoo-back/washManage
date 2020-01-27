import React from 'react'
import { Table } from 'antd'
import Pagination from '../../Pagination'

const Orderlist = ({onClickRating,dataSource,total,onPageChange,onSizeChange,rowSelection}) => {
  const columns = [
    {
      title: '交易时间',
      dataIndex: 'tradeTime',
      width:140,
    },{
      title: '微信支付单号',
      dataIndex: 'weixinOrderNo',
      width:150
    }, {
      title: '客户订单号',
      dataIndex: 'orderNo',
      width:150
    }, {
      title: '商户号',
      dataIndex: 'merchantNo',
      width:150
    },{
      title: '微信名',
      dataIndex: 'weixinName',
      width:120
    }, {
      title: '订单状态',
      dataIndex: 'orderStatus',
      width:120
    }, {
      title: '交易状态',
      dataIndex: 'tradeStatus',
      width:120
    }, {
      title: '支付成功时间',
      dataIndex: 'successfulTime',
      width:150
    }, {
      title: '交易金额',
      dataIndex: 'tradeMoney',
      render(tradeMoney){
        return `￥${tradeMoney}`
      },
      width:120
    }, {
      title: '服务类型',
      dataIndex: 'producerName',
      width:120
    }, {
        title: '服务程序',
        dataIndex: 'serverName',
        width:120
      }, {
        title: '评价内容',
        render:(item)=>{
          return(
            <a onClick={()=>{onClickRating(item)}}>查看</a>
          )
      },
      fixed: 'right',
       width:120
      },
  ]

  return (
    <div>
      <Table
        bordered
        columns={columns}  
        dataSource={dataSource}
        pagination={false}
        scroll={{x:1400}}
        rowSelection={rowSelection}
        rowKey={dataSource => dataSource.orderNo}
      />
      <Pagination total={total} onPageChange={onPageChange} onSizeChange={onSizeChange}/>
    </div>
  )
}

export default Orderlist
