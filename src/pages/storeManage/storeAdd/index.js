import React from 'react'
import { Tabs, Row, Col, Button, Form, Input, TimePicker,message } from 'antd'
import styles from './index.less'
import Avatar from './avatar'
import router from 'umi/router';
import { connect } from 'dva'
import AreaSelect from './../../../components/storeManage/storeSearch/area'
import moment from 'moment'

const format = 'HH:mm';

const TabPane = Tabs.TabPane;
const FormItem = Form.Item

const formItemLayout = {
	labelCol: {
		span: 6,
	},
	wrapperCol: {
		span: 12,
	},
}

const StoreAdd =({dispatch,storeAdd,form: { getFieldDecorator, validateFields, getFieldsValue }})=>{
const {initialName,initialstartStime,initialendStime,initialAddress,img}=storeAdd
   function gotoback(){
    router.push('/storeManage');
    }
    const handleAvator=(data)=>{
      const imgUrl=data.fileList[0].response.data
      dispatch({
        type: 'storeAdd/addSuccess',
        payload:{
            img:imgUrl
        }
      })
    }
    const handleSubmit=()=>{
        const value=getFieldsValue()
        const startTime=moment(value.startStime).format('HH:mm')
        const endTime=moment(value.endStime).format('HH:mm')
        const data=value.address
        const address1 =data? data[0]:''
		const address2 = data?data[1]:''
		const address3 = data?data[2]:''
		const address = `${address1}${address2}${address3}${value.saddress}`
        if(value.name==""){
            return message.error('门店名不能为空')
        }else if(value.saddress==undefined||value.saddress==''){
            return message.error('详细地址不能为空')
        }else if(address==""){
            return message.error('门店地址不能为空')
        }
        else if(img==""){
            return message.error('请上传有效的门店图片')
        }
        else{
        dispatch({
            type: 'storeAdd/add',
            payload:{
                name:value.name,
                startStime:startTime,
                endStime:endTime,
                address:address,
                image:img
            }
          })
        }
    }
    return(
        <div className={styles.page}>
        <div className={styles.wrapper}>
        <Row>
            <Col span="24">
            <span className={styles.title}>新建门店</span>
            <span className={styles.rightButton}> <Button type="primary" onClick={handleSubmit}>创建</Button></span>
            <span className={styles.rightButton}> <Button type="default" onClick={gotoback}>返回</Button></span>
            </Col>
        </Row>
        <div className={styles.form}>
        <Form >
        <FormItem label="门店图片" {...formItemLayout}>
            <Avatar onAvator={handleAvator} imageUrl={img}/>
        </FormItem>
        <FormItem label="门店名称" {...formItemLayout}>
        {getFieldDecorator('name',{
                            initialValue:`${initialName}`,
                            rules:[{
                                required:true,
                                message:'名称不能为空'
                            },
                         ]
                        })(<Input type="text"/>)}
        </FormItem>
        <FormItem label="门店地址" {...formItemLayout}>
        {getFieldDecorator('address',{
                            rules:[{
                                required:true,
                                message:'门店地址不能为空'
                            },
                         ]
                        })(<AreaSelect/>)}
        </FormItem>
        <FormItem label="详细地址" {...formItemLayout}>
        {getFieldDecorator('saddress',{
                            rules:[{
                                required:true,
                                message:'详细地址不能为空',
                            },
                         ]
                        })(<Input type="text" maxLength={10}/>)}
        </FormItem>
        <FormItem label="服务时间" {...formItemLayout}>
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
							{getFieldDecorator('endStime', {
								initialValue: moment(initialendStime, format),
								rules: [{
									required: true,
									message: '可预约时段不能为空'
								},
								]
							})(<TimePicker format={format} />)}

						</FormItem>
					</Form>
				</div>
			</div>
		</div>
	)
}
export default connect(({ storeAdd }) => ({ storeAdd }))(Form.create()(StoreAdd))