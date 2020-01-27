import React from 'react'
import { Table } from 'antd'
import RatingModal from '../../ratingModal';
import Pagination from '../../Pagination'
const Orderlist = ({onClickRating,evaluationData,ratingModalVisible,hideRatingModal,total,dataSource,onSizeChange,onPageChange,pageSize,current}) => {

  const columns = [
    {
      title: '交易时间',
      dataIndex: 'tradeTime',
      width:130,
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
      width:120
    }, {
      title: '订单状态',
      dataIndex: 'orderStatus',
      render:(orderStatus)=>{
        let config={
          '1':'已预约',
          '2':'待付款',
          '3':'执行中',
          '4':'已取消',
          '5':'已完成',
        }
        return config[orderStatus]
      },
      width:120
    }, {
      title: '交易状态',
      dataIndex: 'tradeStatus',
      render:(tradeStatus)=>{
        let config={
          '1':'已支付',
          '2':'待支付',
          '3':'全额退款',
        }
        return config[tradeStatus]
      },
      width:120
    }, {
      title: '支付成功时间',
      dataIndex: 'successfulTime',
      width:130
    }, {
      title: '交易金额',
      dataIndex: 'tradeMoney',
      render(tradeMoney){
        return `￥${tradeMoney}`
      },
      width:120
    }, {
      title: '服务类型',
      dataIndex: 'serverName',
      width:120
    }, {
        title: '服务程序',
        dataIndex: 'producerName',
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
        scroll={{x:1200}}
        rowKey={dataSource => dataSource.orderNo}
      />
      <Pagination total={total} onPageChange={onPageChange} onSizeChange={onSizeChange} pageSize={pageSize} current={current}/>
      <RatingModal onHideModal={hideRatingModal} visible={ratingModalVisible} data={evaluationData}/>
    </div>
  )
}

export default Orderlist
