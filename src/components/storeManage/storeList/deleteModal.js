import React from 'react'
import {message, Icon, Col, Button,Modal, Form,Input} from 'antd'
import { NowModal } from 'components';
import styles from './index.less'

const DeleteModal =({visible,onHideModal,onDeleteOk})=>{
    const modalName="删除操作"
        return(
            <div>
                <NowModal titleText={modalName} visible={visible} sure="确认" handleOk={onDeleteOk} onCancel={onHideModal}>
           <div>
              <span className={styles.icon}><Icon type="question-circle" theme="twoTone" twoToneColor="#FF9900"/></span><span className={styles.title}>确定删除所选门店？</span>
               <p className={styles.text}>请确认该门店没有订单，否则不能删除！</p>
           </div>
           </NowModal>
            </div>
        )
    
}
export default DeleteModal