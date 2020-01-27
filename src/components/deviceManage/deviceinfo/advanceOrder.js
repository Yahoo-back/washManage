import React from 'react'
import { Table, Button } from 'antd'
import Link from 'umi/link';
import Pagination from './../../Pagination'

const Advanceorder = ({data,total,handlePageChange,handleSizeChange}) => {
  const columns = [
     {
      title: '订单号',
      dataIndex: 'orderNo',
      width:180
    }, {
      title: '微信openid',
      dataIndex: 'openid',
      width:180
    }, {
      title: '微信名',
      dataIndex: 'weixinName',
      width:180
    }, {
      title: '预约时间',
      dataIndex: 'ctime',
      width:180
    }, {
      title: '类型',
      dataIndex: 'serveName',
      width:120
    }, {
      title: '模式',
      dataIndex: 'producerName',
      width:120
    }, {
      title: '订单金额',
      dataIndex: 'orderMoney',
      render(orderMoney){
        return `￥${orderMoney}`
      },
      width:120
    }, {
        title: '操作',
          render:(item)=>{
              return(
                  <Link to={`../orderManage/OrderDetail?orderNo=${item.orderNo}`} >详情</Link>
              )
          },
          fixed: 'right',
          width:120,
          
    }
  ]

  return (
    <div>
      <Table
        bordered
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey={data=>data.orderNo}
        scroll={{x:1150}}
      />
      <Pagination total={total} onPageChange={handlePageChange} onSizeChange={handleSizeChange}/>
    </div>
  )
}

export default Advanceorder
