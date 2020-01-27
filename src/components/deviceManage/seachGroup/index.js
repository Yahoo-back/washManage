import React from 'react'
import { Button, Select, Input,Icon } from 'antd'
import styles from './index.less'
import router from 'umi/router';
import { connect } from 'dva'

const crrstyle = {
  select: {
    width: 120
  },
  search: {
    width: 200
  }
};

const Option = Select.Option;
const Search = Input.Search;
const SeachGroups = ({ device, dispatch }) => {
  const { nameKey, workStatusData, onlineStatusData, conditionData,storeName,currentPage,pageSize } = device
  function goToListPage() {
    router.push('/deviceManage/appointmentTime');
  }
  const handleSearch = (data) => {
    dispatch({
      type: 'device/querySuccess',
      payload: {
        conditionData: data
      }
    }),
      dispatch({
        type: 'device/list',
        payload: {
          currentPage: currentPage,
          pageSize: pageSize,
          type: nameKey,
          condition: data,
          onlineStatus: onlineStatusData,
          workStatus: workStatusData,
          storeName:storeName
        }
      })
  }
  const handleSelectLine = (value) => {
    dispatch({
      type: 'device/querySuccess',
      payload: {
        onlineStatusData: value
      }
    }),
      dispatch({
        type: 'device/list',
        payload: {
          currentPage: currentPage,
          pageSize: pageSize,
          type: nameKey,
          onlineStatus: value,
          condition: conditionData,
          workStatus: workStatusData,
          storeName:storeName
        }
      })
  }
  const handleSelectState = (value) => {
    dispatch({
      type: 'device/querySuccess',
      payload: {
        workStatusData: value
      }
    }),
      dispatch({
        type: 'device/list',
        payload: {
          currentPage: currentPage,
          pageSize: pageSize,
          type: nameKey,
          workStatus: value,
          onlineStatus: onlineStatusData,
          condition: conditionData,
          storeName:storeName
        }
      })
  }
  const emitEmpty = () => {
    dispatch({
      type: 'device/querySuccess',
      payload: {
        conditionData: ''
      }
    }),
    dispatch({
      type: 'device/list',
      payload: {
        currentPage: currentPage,
        pageSize: pageSize,
        type: nameKey,
        condition: '',
        onlineStatus: onlineStatusData,
        workStatus: workStatusData,
        storeName:storeName
      }
    })
    document.getElementById('number').value=''
  }
  const suffix = conditionData ? <Icon type="close-circle" onClick={emitEmpty} key={conditionData}/> : null;
  return (
    <div className={styles.wrapper}>
      <span className={styles.SeachMargin} id="selectLine">
        <Select defaultValue="0" style={crrstyle.select}
          getPopupContainer={() => document.getElementById('selectLine')}
          onChange={handleSelectLine}>
          <Option value="0">在线状态</Option>
          <Option value="1">在线</Option>
          <Option value="2">离线</Option>
        </Select>
      </span>
      <span className={styles.SeachMargin} id="selectState">
        <Select defaultValue="0" style={crrstyle.select} onChange={handleSelectState}
         getPopupContainer={() => document.getElementById('selectState')}>
          <Option value="0">设备状态</Option>
          <Option value="2">待机</Option>
          <Option value="1">运行中</Option>
          <Option value="3">故障</Option>
        </Select>
      </span>
      <span className={styles.SeachMargin}>
        <Search
          placeholder="请输入设备编号"
          suffix={suffix}
          id="number"
          onSearch={value => handleSearch(value)}
          style={crrstyle.search}
        />
      </span>
      {window.localStorage.getItem('userRolePermission')&&
      JSON.parse(window.localStorage.getItem('userRolePermission')).filter(
        v => v.id == 758
      ) != [] ? (
      <Button type="primary" onClick={goToListPage}>管理预约时段</Button>
     ) : ('')}
    </div>
  )
}
export default connect(({ device }) => ({ device }))(SeachGroups)