import React from 'react'
import {Table, Icon} from 'antd'
import Link from 'umi/link';
import Pagination from '../../Pagination'

const crrstyle = {
    unread: {
        color: '#9a8484',
        background: '#fffb78',
        border: '2px solid #fff'
    }
}

const SystemList = ({ handleDevice, data, selectKey,total,onPageChange,onSizeChange})=>{
  const columns = [
    {
      title: '状态',
      dataIndex: 'isRead',
          key:'isRead',
      width:80,
      render:(isRead)=>{
          if (isRead==0){
              return (
                  <i className="fa fa-envelope-o fa-fw" style={crrstyle.unread}></i>
              )
          }else{
              return(
                  <i className="fa fa-envelope-open-o fa-fw"></i>
              )
          }
        }
    },{
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    align:'left',
  }, {
    title: '时间',
    dataIndex: 'utime',
    key:'utime',
    width:180
  }, {
    title: '操作',
    key:'opertion',
    render:(text,records)=>{
        return(
            <Link to={`/deviceManage/deviceInfo?id=${records.deviceId}`}>
                <span onClick={()=>{handleDevice(records.id)}}>查看设备</span>
            </Link>
        )
    },
    width:120
  },
  ];
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        selectKey(selectedRows)
    },
    onSelect: (record, selected, selectedRows) => {
   
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
    
    },
  };

  return(
    <div>
        <Table 
            rowKey='id'
            bordered={true}
            columns={columns} 
            dataSource={data} 
            rowSelection={rowSelection}
            position="both"
            pagination={false}
        />
 <Pagination total={total} onPageChange={onPageChange} onSizeChange={onSizeChange} />
    </div>

  )
}
export default SystemList
