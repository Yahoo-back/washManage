import React from 'react';
import { Table } from 'antd';
import styles from './index.less';
import Link from 'umi/link';
import Pagination from '../../Pagination';

const TableList = ({ dataSource, total, onPageChange, onSizeChange, rowSelection, onImClick }) => {
  const columns = [
    {
      title: '序号',
      render:(text,record,index)=>`${index+1}`,
      width:'60px'
    },{
    title: '微信openid',
    dataIndex: 'openid',
    width:'120px'
  }, {
    title: '微信名',
    dataIndex: 'nickname',
    width:'120px'
  }, {
    title: '首次进入小程序时间',
    dataIndex: 'ctime',
    width:'120px'
  }, {
    title: '首次下单时间',
    dataIndex: 'orderCtime',
    width:'120px'
  }, {
    title: '操作',
    render:(item)=>{
      return (
      <div>
          <a onClick={()=>{onImClick(item)}}>IM会话</a>
          <div className={styles.margin}>
          <span onClick={()=>{handleUserInfo(item)}}><Link to={`/userManage/UserInfo?id=${item.openid}`}>详情</Link></span>
          </div>
      </div>)
  },
  width:'120px'
  }];

  const handleUserInfo = () => {

  }

  return (
    <div>
      <Table bordered columns={columns} dataSource={dataSource} rowSelection={rowSelection} pagination={false} rowKey={dataSource => dataSource.openid + 1} />
      <Pagination total={total} onPageChange={onPageChange} onSizeChange={onSizeChange} />
    </div>
  )
}
export default TableList
