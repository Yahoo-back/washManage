import React from 'react'
import {Modal, Radio,Table} from 'antd'
import styles from './index.less'
import { NowModal } from 'components';

const CouponModal=({visible,onHideModal,onHandleOk,couponList,rowSelection})=>{
const modalName="选择优惠券"
      const columns = [
        {
          title: '优惠券名称',
          dataIndex: 'name',
          width:120
        },{
        title: '面值',
        dataIndex: 'denomination',
        render:(denomination)=>`￥${denomination}`,
        width:80
      }, {
        title: '条件',
        dataIndex: 'useRule',
        render:(useRule)=>`满${useRule}可用`,
        width:80
      }, {
        title: '范围',
        dataIndex: 'useRange',
        render:(useRange)=>{
          let config={
            '1':'洗衣',
            '2':'烘干',
            '3':'不限',
          }
          return config[useRange]
        },
        width:80
      }, {
        title: '生效日期',
        dataIndex: 'time',
        render:(text,record)=>`${record.startTime}-${record.endTime}`,
        width:150
      }];
        return(
            <div>
              <NowModal titleText={modalName} visible={visible} sure="确认" handleOk={onHandleOk} onCancel={onHideModal}>
            <Table bordered columns={columns} dataSource={couponList} 
            rowKey={couponList=>couponList.id} pagination={false}
            rowSelection={rowSelection}
            />
                </NowModal>
            </div>
        )
    }

export default CouponModal