import React from 'react'
import { Tabs,message } from 'antd'
import styles from './index.less'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import Orderlist from '../../../components/storeManage/storeInfo/orderList';
import ApOrderlist from '../../../components/storeManage/storeInfo/apOrderList';
import RatingModal from '../../../components/ratingModal';
import Info from '../../../components/storeManage/storeInfo'
import router from 'umi/router';
import moment from 'moment'
const TabPane = Tabs.TabPane;
const StoreInfo =({storeIf,dispatch})=>{
    const {ratingModalVisible,changeState,list,orderList,evaluationData,total,orderType,img}=storeIf
    const info=list
    function callback(key) {
        dispatch({
            type:'storeIf/orderSuccess',
            payload:{
                orderType:key,
            }
          })
        if(key==1){
            dispatch({
                type:'storeIf/list',
                payload:{ 
                    query:{
                    storeName:info.name,
                    orderType:1
                },
                    current:1,
                    pages:1,
                    size:10
                }
              })
        }else if(key==2){
            dispatch({
                type:'storeIf/list',
                payload:{
                    query:{
                        storeName:info.name,
                        orderType:2
                    },
                    current:1,
                    pages:1,
                    size:10
                }
              })
        }
       }
  const handleClickRating=(data)=>{
      dispatch({
        type:'storeIf/evaluation',
        payload:{
            orderNo:data.orderNo
        }
      })
  }
  //点击删除Modal的X或取消按钮
 const hideRatingModal=()=>{
  dispatch({
      type: 'storeIf/ratingModal',
      payload:{
        ratingModalVisible: false
      }
    })   
}
//切换改变状态
const handleChangeState=()=>{
      dispatch({
        type:'storeIf/ratingModal',
        payload:{
            changeState:true,
            img:info.image
        }
    })
}
//取消更改
const handleChangeCal=()=>{
    dispatch({
      type:'storeIf/ratingModal',
      payload:{
          changeState:false
      }
  })
}
const gotoback=()=>{
    router.goBack();
    dispatch({
        type:'storeIf/ratingModal',
        payload:{
            changeState:false
        }
    })
}
//改变值后的提交
const handleChangeSubmit=(data)=>{
    const startTime=moment(data.startStime).format('HH:mm')
    const endTime=moment(data.endStime).format('HH:mm')
    const tstart=startTime.split(':')
		const tend=endTime.split(':')
    if(data.name==""){
        return message.error('门店名不能为空')
    }else if(data.address==""){
        return message.error('门店地址不能为空')
    }
    else if(tstart[0]-tend[0]> 0){
        return message.error('服务开始时间需要小于结束时间')
    }
    else if(tstart[0]==tend[0]&&tstart[1]-tend[1]>= 0){
        return message.error('服务开始时间需要小于结束时间')
    }
    else if(img==""){
        return message.error('请上传有效的门店图片')
    }
    else{
    dispatch({
        type:'storeIf/update',
        payload:{
            name:data.name,
            address:data.address,
            endStime:endTime,
            startStime:startTime,
            id:info.id,
            image:img
        }
    })
     dispatch({
       type:'storeIf/ratingModal',
       payload:{
           changeState:false,
           id:info.id,
           img:''
       }
   })
}
}
const handlePageChange=(current, pageSize)=>{
    dispatch({
      type:'storeIf/list',
      payload:{
        current: current,
        pages: pageSize,
        size:pageSize,
        query:{
            storeName:info.name,
            orderType:orderType
        }
      }
    })
  }
  const handleSizeChange=(current, pageSize)=>{
    dispatch({
      type:'storeIf/list',
      payload:{
        current: current,
        pages: pageSize,
        size:pageSize,
        query:{
            storeName:info.name,
            orderType:orderType
        }
      }
    })
  }
  const handleAvator=(data)=>{
    const imgUrl=data.fileList[0].response.data
    dispatch({
      type: 'storeIf/ratingModal',
      payload:{
          img:imgUrl
      }
    })
  }
    return(
        <div className={styles.page}>
       <Info info={info} img={img} onChangeSubmit={handleChangeSubmit} onChangeState={handleChangeState} changeState={changeState} gotoback={gotoback} onChangeCal={handleChangeCal} handleAvator={handleAvator}/>
       {window.localStorage.getItem('userRolePermission')&&
      					JSON.parse(window.localStorage.getItem('userRolePermission')).filter(
                            v => v.id == 806
                            ) != [] ? (
        <div className={styles.Tablewrapper}>
        <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="订单列表" key="1"><Orderlist onClickRating={handleClickRating} dataSource={orderList} total={total} onPageChange={handlePageChange} onSizeChange={handleSizeChange}/></TabPane>    
            <TabPane tab="预约订单" key="2"><ApOrderlist dataSource={orderList} total={total} onPageChange={handlePageChange} onSizeChange={handleSizeChange}/></TabPane>
        </Tabs>
        </div>
                         ):('')}
        {window.localStorage.getItem('userRolePermission')&&
      					JSON.parse(window.localStorage.getItem('userRolePermission')).filter(
                            v => v.id == 839
                            ) != [] ? (
        <RatingModal onHideModal={hideRatingModal} visible={ratingModalVisible} data={evaluationData}/>
        ):('')}       
        </div>
         )
}
StoreInfo.propTypes = {
	storeIf: PropTypes.object,
	dispatch: PropTypes.func,
}
export default connect(({ storeIf }) => ({ storeIf }))(StoreInfo)