import React from 'react'
import {Tag, Row, Col, Button, TimePicker,Modal, Form,Input} from 'antd'
import styles from './index.less'
import Config from './../../../utils/cycle'
import { NowModal } from 'components';
import { connect } from 'dva'
import moment from 'moment'

const format = 'HH:mm';
const FormItem=Form.Item
const ButtonGroup = Button.Group;
const CheckableTag = Tag.CheckableTag;

const AddTime =({appointment,dispatch,visible,handleHideModal,onHandleOk,form: { resetFields,getFieldDecorator, validateFields, getFieldsValue }})=>{
    const { selectedTags,modalName,initialName,initialStartTime,initialEndTime} = appointment;
    
    const HandleOk = () => {
       const value=getFieldsValue()
       onHandleOk(value)
       resetFields();
      }
      const onHideModal = () =>{
        handleHideModal();
        resetFields();
      }
    const handleChange=(tag, checked)=>{
        const nextSelectedTags = checked? [...selectedTags,tag]: selectedTags.filter(t => t !== tag);
        dispatch({
            type: 'appointment/showModal',
            payload:{
                selectedTags: nextSelectedTags
            }
          })
      }
    
        const formItemLayout={
            labelCol: {
                span: 7
              },
              wrapperCol: {
                span: 16
              }
        }
        const period=["星期一","星期二","星期三","星期四","星期五","星期六","星期日"]
        // const tagsFromServer =period.map((item)=>{ return Config(item)})
        const tagMap=period.map(tag => (
            <CheckableTag
              key={tag}
              checked={selectedTags.indexOf(tag) > -1}
              onChange={checked =>handleChange(tag, checked)}
            >
              {tag}
            </CheckableTag>
          ))
        return(
            <div>
            <NowModal titleText={modalName} width={600} visible={visible} sure="确认" handleOk={HandleOk} onCancel={onHideModal}>
            <Form>
                <FormItem label="名称" {...formItemLayout}>
                {getFieldDecorator('name',{
                            initialValue:`${initialName}`,
                            rules:[{
                                required:true,
                                message:'名称不能为空'
                            },
                         ]
                        })(<Input type="text"/>)}
                    </FormItem>
                    <FormItem label="可预约时段" {...formItemLayout}>
                        {getFieldDecorator('startTime',{
                            initialValue:moment(initialStartTime, format),
                            rules:[{
                                required:true,
                                message:'可预约时段不能为空'
                            },
                         ]
                        })(<TimePicker format={format}/>)}
                            <span className={styles.timePicker}>
                                --
                            </span>
                        {getFieldDecorator('endTime',{
                             initialValue:moment(initialEndTime, format),
                            rules:[{
                                required:true,
                                message:'可预约时段不能为空'
                            },
                         ]
                        })(<TimePicker format={format}/>)}
                       
                </FormItem>
                <FormItem label="周期" {...formItemLayout}>
                
                            {tagMap}
                        
                </FormItem>
            </Form>
                
                </NowModal>
            </div>
        )
    
}
export default connect(({ appointment }) => ({ appointment}))(Form.create()(AddTime))
