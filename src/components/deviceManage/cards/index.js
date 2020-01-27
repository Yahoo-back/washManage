import React from 'react'
import { Card,Row,Col,Icon } from 'antd'
import styles from './index.less'
import {online,offline,standby,running,failure,wash} from './../../../../assets'

const Cards=({...cardcontent})=>{
  const card={...cardcontent}
  //判断是否在线
  const lineCode=(state)=>{
    if(state==1){
     return(
      <Col span="8"><span className={styles.online}><span className={styles.icon}> <img alt="online" src={online} /></span>在线</span></Col>
     )
   }else if(state==2){
    return <Col span="8"><span className={styles.outline}><span className={styles.icon}><img alt="offline" src={offline} /></span>离线</span></Col>
   }
  }
  const state=lineCode(card.onlineStatus)

//判断为何种状态
const ACstatus=(state)=>{
  if(state==2){
    return(
      <Col span="10"><span className={styles.wait}><span className={styles.icon}><img alt="standby" src={standby} /></span>待机</span></Col>
    )
  }else if(state==1){
    return <Col span="10"><span className={styles.yue}><span className={styles.icon}><img alt="running" src={running} /></span>正在运行</span></Col>
  }else if(state==3){
    return <Col span="10"><span className={styles.error}><span className={styles.icon}><img alt="failure" src={failure} /></span>电机故障</span></Col>
   }
   else{
     return <Col span="10"></Col>
   }
}
const status=ACstatus(card.workStatus)

  //判断是否可以预约
  const reservationCode=(state)=>{
    if(state==1){
      return(
        <Col span="6"><span className={styles.yue}>预约开放</span></Col>
      )
    }else if(state==2){
      return <Col span="6"><span>不可预约</span></Col>
    }
   }
   const yue=reservationCode(card.setReservation)

    return(
        <div className={styles.main}>
          <Card className={styles.card}>
          <Row>
            <Col span={8}>
            <h2>{card.customNumber}</h2>
            </Col>
            <Col span={4} offset={12}>
            {card.appointOrderNum>0?
            <span><img alt="wash" src={wash} width={20} height={20}/>{card.appointOrderNum}</span>:''}
            </Col>
            </Row>
            <p>设备名称:<span className={styles.text}>{card.name}</span></p>
            <p>最近使用:<span className={styles.text}>{card.latestTime}</span></p>
            <p>管理人员:<span className={styles.text}>{card.username}  {card.mobile}</span></p>
            <div className={styles.option}>
            <Row>
              {state}
              {status}
              {yue}
            </Row>
            </div>
          </Card>
        </div>
    )
}
export default Cards