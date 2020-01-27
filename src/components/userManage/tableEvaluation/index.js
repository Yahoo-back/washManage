import React from 'react'
import { Table } from 'antd'
import Pagination from '../../Pagination'
import styles from './index.less'

const TableList = ({ dataSource, total, onPageChange, onSizeChange, rowSelection }) => {
  const columns = [
    {
      title: '订单号',
      dataIndex: 'orderNo',
      width:'120px'
    },{
    title: '微信openid',
    dataIndex: 'openid',
    width:'120px'
  }, {
    title: '微信名',
    dataIndex: 'weixinName',
    width:'80px'
  }, {
    title: '类型',
    dataIndex: 'serverName',
    width:'40px'
  }, {
    title: '模式',
    dataIndex: 'producerName',
    width:'40px'
  }, {
    title: '评价时间',
    dataIndex: 'ctime',
    width:'120px'
  }, {
    title: '评价星级',
    dataIndex: 'evaluationStar',
    render(evaluationStar){
      if(evaluationStar==null){
        return `0星`
      }
      return `${evaluationStar}星`
    },
    width:'60px'
  }, {
    title: '评价内容',
    dataIndex: 'evaluation',
    width:'180px',
    render:(text)=>{
      return (
        <div className={styles.scrolls}>{text}</div>
      )}
  }
  ];

  return (
    <div>
      <Table bordered columns={columns} pagination={false} dataSource={dataSource} rowSelection={rowSelection} rowKey={dataSource => dataSource.orderNo} />
      <Pagination total={total} onPageChange={onPageChange} onSizeChange={onSizeChange} />
    </div>
  )
}
export default TableList
