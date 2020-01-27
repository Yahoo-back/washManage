import React from 'react'
import {message, Icon, Col, Button,Modal, Form,Input} from 'antd'
import styles from './index.less'

const DeleteModal =({visible,onHideModal,onDeleteOk})=>{
    
        return(
            <div>
                <Modal
                    title="删除操作"
                    visible={visible}
                    onOk={onDeleteOk}
                    onCancel={onHideModal}
                    okText="确认"
                    cancelText="取消"
                >
           <div>
              <span className={styles.icon}><Icon type="question-circle" theme="twoTone" twoToneColor="#FF9900"/></span><span className={styles.title}>确定删除该预约时段？</span>
               <p className={styles.text}>请确认没有设备使用该预约时段，否则不能删除！</p>
           </div>
                </Modal>
            </div>
        )
    
}
export default DeleteModal