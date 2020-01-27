import React from 'react'
import {Tabs, Row, Col, Button, Form, Input,TimePicker} from 'antd'
import styles from './index.less'
import Avatar from '../../../pages/storeManage/storeAdd/avatar'
import moment from 'moment'

const FormItem = Form.Item
const format='HH:mm'
const Info =({form: { getFieldDecorator, validateFields, getFieldsValue },onChangeSubmit,onChangeState,changeState,info,gotoback,onChangeCal,handleAvator,img})=>{
const onChangeSubmits=()=>{
    const value=getFieldsValue()
    onChangeSubmit(value)
}
 const initialstartStime=info.serveTime ? info.serveTime.split('-')[0] : ''
 const initialendStime=info.serveTime ? info.serveTime.split('-')[1] : ''
 const name=info.name
 const address=info.address
const changeStateFalse= <span>
    <div className={styles.img}>
    <img src={info.image} alt="门店头像"/>

    </div>
    <div className={styles.infobox}>
        <div className={styles.name}>门店名：</div>
        <div className={styles.content}>{info.name}</div>
    </div>
    <div className={styles.infobox}>
        <div className={styles.name}>门店地址：</div>
        <div className={styles.content}>{info.address}</div>
    </div>
    <div className={styles.infobox}>
        <div className={styles.name}>服务时间：</div>
        <div className={styles.content}>{info.serveTime}</div>
    </div>
    </span>
const changeStateTrue= <Form>
    <div className={styles.imgform}>
    <FormItem label="门店图片">
            <Avatar onAvator={handleAvator} imageUrl={img}/>
        </FormItem>
         </div>
        <div className={styles.infobox}>
        <FormItem label="门店名称" >
        {getFieldDecorator('name',{
                            initialValue:`${name}`,
                            rules:[{
                                required:true,
                                message:'名称不能为空'
                            },
                         ]
                        })(<Input type="text"/>)}
        </FormItem>
    </div>
    <div className={styles.infobox}>
        <FormItem label="门店地址">
        {getFieldDecorator('address',{
                            initialValue:`${address}`,
                            rules:[{
                                required:true,
                                message:'门店地址不能为空'
                            },
                         ]
                        })(<Input type="text"/>)}
        </FormItem>
    </div>
    <div className={styles.infobox}>
        <FormItem label="服务时间">
        {getFieldDecorator('startStime',{
                            initialValue:moment(initialstartStime, format),
                            rules:[{
                                required:true,
                                message:'可预约时段不能为空'
                            },
                         ]
                        })(<TimePicker format={format}/>)}
                            <span className={styles.timePicker}>
                                --
                            </span>
                        {getFieldDecorator('endStime',{
                             initialValue:moment(initialendStime, format),
                            rules:[{
                                required:true,
                                message:'可预约时段不能为空'
                            },
                         ]
                        })(<TimePicker format={format}/>)}
        </FormItem>
    </div></Form>
    return(
        <div className={styles.page}>
         <div className={styles.wrapper}>
        <Row>
            <Col span="24">
            <span className={styles.title}>门店详情</span>
            {window.localStorage.getItem('userRolePermission')&&
      					JSON.parse(window.localStorage.getItem('userRolePermission')).filter(
                            v => v.id == 831
                            ) != [] ? (
            <span className={styles.rightButton}> {changeState==false?<Button type="primary" onClick={onChangeState}>修改</Button>:<Button type="primary" onClick={onChangeSubmits}>完成</Button>}</span>
                         ):('')}
            <span className={styles.rightButton}> {changeState==false?<Button type="default" onClick={gotoback}>返回</Button>:<Button type="default" onClick={onChangeCal}>取消</Button>}</span>
            </Col>
        </Row>
        <div className={styles.info}>
            {changeState==false?changeStateFalse:changeStateTrue}
            <div className={styles.infobox}>
                <div className={styles.name}>订单总数：</div>
                <div className={styles.content}>{info.orderTotal}</div>
            </div>
            <div className={styles.infobox}>
                <div className={styles.name}>预约订单数：</div>
                <div className={styles.content}>{info.appointmentOrderCount}</div>
            </div>
            <div className={styles.infobox}>
                <div className={styles.name}>分店管理员：</div>
                <div className={styles.content}>{info.sysUserNames ? info.sysUserNames.map((item)=>item).join('; '):''}</div>
            </div>
        </div>
        </div>
        </div>
         )
}
export default Form.create()(Info)