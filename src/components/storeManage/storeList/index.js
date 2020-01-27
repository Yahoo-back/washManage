import React from 'react'
import {Table, Icon} from 'antd'
import Link from 'umi/link';
import Pagination from'../../Pagination'



const StoreList=({rowSelection,list,onPageChange,onSizeChange})=>{
  const dataSource=list?list.records:[]
  const dataTotal=list?list.total:0
  const columns = [
    {
      title: '序号',
      width:80,
      render:(text,record,index)=>`${index+1}`
    },{
    title: '门店名',
    dataIndex: 'name',
    width:180
  },{
    title: '地址',
    dataIndex: 'address',
    width:180
  },{
    title: '服务时间',
    dataIndex: 'serveTime',
    width:150
  }, {
    title: '订单总数',
    dataIndex: 'orderTotal',
    width:80
  },{
    title: '预约订单数',
    dataIndex: 'appointmentOrderCount',
    width:80
  },{
    title: '操作',
    render:(item)=>{
        return(
            <Link to={`/storeManage/storeInfo?id=${item.id}`} >详情</Link>
        )
    },
    width:120
  },
  ];

  return(
    <div>
      <Table bordered columns={columns} dataSource={dataSource} rowSelection={rowSelection} rowKey={dataSource => dataSource.id} pagination={false}/>
      <Pagination total={dataTotal} onPageChange={onPageChange} onSizeChange={onSizeChange}/>
    </div>

  )
}
export default  StoreList
