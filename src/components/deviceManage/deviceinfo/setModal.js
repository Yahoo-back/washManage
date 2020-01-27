import React from 'react'
import {message, Radio, Col, Select,Modal, Form,Input} from 'antd'
import styles from './index.less'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import Config from './../../../utils/cycle'

const RadioGroup = Radio.Group
const Option = Select.Option;
const FormItem=Form.Item
const SetModal =({visible,onHideModal,onSetOk,form: { getFieldDecorator, validateFields, getFieldsValue },deviceIf,dispatch,setReservation})=>{
    const {setModalAbled,OpValue,selectList,selectId}=deviceIf
    const data=selectList?selectList:[]
    const TimeCycle=<div>
    <div>{OpValue.startTime}-{OpValue.endTime}</div>
    <div>{OpValue.cycle}</div>
</div> 
const OpName=OpValue.itemName
    const SetOk = () => {
        const value=getFieldsValue()
        onSetOk(value)
       }
    const handleRadioChange=(e)=>{
        if(e.target.value==1){
            dispatch({
                type:'deviceIf/setModal',
                payload:{
                    setModalAbled:false
                }
            })
        }
        if(e.target.value==2){
            dispatch({
                type:'deviceIf/setModal',
                payload:{
                    setModalAbled:true
                }
            })
        }
    }
   
    const handleChange=(value)=>{
        const Op=data[value]
        dispatch({
            type:'deviceIf/setModal',
            payload:{
                OpValue:Op,
                selectId:Op.id
            }
        })
      }
        return(
            <div>
                <Modal
                    title="设置预约"
                    visible={visible}
                    onOk={SetOk}
                    onCancel={onHideModal}
                    okText="确认"
                    cancelText="取消"
                    width={350}
                    maskClosable={false}
                >
           <div>
             <Form>
                    <FormItem>
                {getFieldDecorator('setReservation',{
                            initialValue:`${setReservation}`,
                        })(<RadioGroup onChange={handleRadioChange}>
                            <Radio value='1'>开放预约</Radio>
                            <Radio value='2'>关闭预约</Radio>
                          </RadioGroup>)}
                    </FormItem>
                    <FormItem label="选择预约时段">
                {getFieldDecorator('appointmentTime',{
                     initialValue:`${OpName}`,
                        })(<Select disabled={setModalAbled} onChange={handleChange}>
                       { data.map((item,index)=>
                           <Option value={index} key={index}>{item.name}</Option> 
                        )}

                </Select>)}
                    </FormItem>
                   {TimeCycle}
             </Form>
           </div>
                </Modal>
            </div>
        )
    
}
export default  connect(({ deviceIf }) => ({ deviceIf}))(Form.create()(SetModal))