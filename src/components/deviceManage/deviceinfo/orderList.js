import React from 'react'
import { Table } from 'antd'
import Pagination from './../../Pagination'
import RatingModal from './../../ratingModal'

const Orderlist = ({onClickRating,data,total,handlePageChange,handleSizeChange,evaluationData,ratingModalVisible,hideRatingModal}) => {
  const columns = [
     {
      title: '订单号',
      dataIndex: 'orderNo',
      width:150
    }, {
      title: '微信openid',
      dataIndex: 'openid',
      width:150
    }, {
      title: '微信名',
      dataIndex: 'weixinName',
      width:120
    }, {
      title: '下单时间',
      dataIndex: 'ctime',
      width:150
    }, {
      title: '类型',
      dataIndex: 'serveName',
      width:80
    }, {
      title: '模式',
      dataIndex: 'producerName',
      width:80
    }, {
      title: '订单金额',
      dataIndex: 'orderMoney',
      render(orderMoney){
        return `￥${orderMoney}`
      },
      width:100
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
        title: '订单完成时间',
        dataIndex: 'successfulTime',
        width:150
      }, {
        title: '评价',
        render:(item,record)=>{
          if(record.orderStatus==5){
          return(
            <a onClick={()=>{onClickRating(item)}}>查看</a>
          )
        }else{
          return 
        }
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
        dataSource={data}
        pagination={false}
        rowKey={dataSource => dataSource.orderNo}
        scroll={{x:1150}}
      />
       <Pagination total={total} onPageChange={handlePageChange} onSizeChange={handleSizeChange}/>
       {window.localStorage.getItem('userRolePermission')&&
      				JSON.parse(window.localStorage.getItem('userRolePermission')).filter(
                v => v.id == 797
              ) != [] ? (
       <RatingModal onHideModal={hideRatingModal} visible={ratingModalVisible} data={evaluationData}/>
               ):('')}
    </div>
  )
}

export default Orderlist
