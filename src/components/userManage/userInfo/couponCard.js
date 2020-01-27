import React from 'react'
import styles from './couponCard.less'

const CouponCard=({data})=>{
    const cardInfo=data


const serviceType=(state)=>{
  if(state==3){
    return(
        <span>不限</span>
    )
  }else if(state==1){
   return <span className={styles.serviceType}>洗衣</span>
  }else if(state==2){
    return <span className={styles.serviceType}>烘干</span>
   }
}
const service=serviceType(cardInfo.useRange)


    return(
        <div className={styles.card}>
          <div className={styles.header}>￥
          <span className={styles.price}>{cardInfo.denomination}</span>
          </div>
          <div className={styles.content}>
          <p>条件：
              <span className={styles.cardType}>{cardInfo.name}</span>
              <span className={styles.condition}>满 {cardInfo.useRule}元可用</span>
          </p>
          <p>范围：
             {service}
          </p>
          <p>日期：
              <span>{cardInfo.startTime}</span>-
              <span>{cardInfo.endTime}</span>
          </p>
          </div>
        </div>
    )
}
export default CouponCard