import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Tabs } from 'antd'
import { Page, HeadFilter } from 'components'
import SeachGroups from '../../components/deviceManage/seachGroup';
import Cards from '../../components/deviceManage/cards';
import Link from 'umi/link';
import Pagination from '../../components/Pagination'

const { TabPane } = Tabs
const styles={
  minHeight: 100
}
const Index = ({
  device, dispatch
}) => {
  const { list, nameKey, pullData, workStatusData, onlineStatusData, conditionData,pageSize,currentPage,storeName } = device
  const SelectGroups = <SeachGroups />
  const deviceList = list ? list.records : []
  const total = list ? list.total : 0
  const cardlist = deviceList ? deviceList.map((item, index) => {
    return (<Link to={`/deviceManage/deviceInfo?id=${item.id}`} key={index}><Cards {...item} key={index} /></Link>)
  }) : ''
  function callback(key) {
    dispatch({
      type: 'device/listSuccess',
      payload: {
        nameKey: key,
      }
    })
    if (key == "Washer") {
      dispatch({
        type: 'device/list',
        payload: {
          type: "Washer",
          currentPage: currentPage,
          pageSize: pageSize,
          condition: conditionData,
          onlineStatus: onlineStatusData,
          workStatus: workStatusData,
          storeName:storeName
        }
      })
    } else if (key == "Dryer") {
      dispatch({
        type: 'device/list',
        payload: {
          type: "Dryer",
          currentPage: currentPage,
          pageSize: pageSize,
          condition: conditionData,
          onlineStatus: onlineStatusData,
          workStatus: workStatusData,
          storeName:storeName
        }
      })
    }
  }
  const handleStoreSelect = (data) => {
    dispatch({
      type: 'device/querySuccess',
      payload: {
        storeName: data,
      }
    }),
    dispatch({
      type: 'device/list',
      payload: {
        type: nameKey,
        currentPage: currentPage,
        pageSize: pageSize,
        storeName: data,
        condition: conditionData,
        onlineStatus: onlineStatusData,
        workStatus: workStatusData,
      }
    })
  }
  const handlePageChange = (current, pageSize) => {
    dispatch({
      type: 'device/querySuccess',
      payload: {
        currentPage: current,
        pageSize: pageSize,
      }
    }),
    dispatch({
      type: 'device/list',
      payload: {
        currentPage: current,
        pageSize: pageSize,
        type: nameKey,
        storeName:storeName,
        condition: conditionData,
        onlineStatus: onlineStatusData,
        workStatus: workStatusData,
      }
    })
  }
  const handleSizeChange = (current, pageSize) => {
    dispatch({
      type: 'device/querySuccess',
      payload: {
        currentPage: current,
        pageSize: pageSize,
      }
    }),
    dispatch({
      type: 'device/list',
      payload: {
        currentPage: current,
        pageSize: pageSize,
        type: nameKey,
        storeName:storeName,
        condition: conditionData,
        onlineStatus: onlineStatusData,
        workStatus: workStatusData,
      }
    })
  }
  return (
    <div>
      <Page>
        <HeadFilter title="设备管理" options={pullData} handleChange={handleStoreSelect} />
      </Page>

      <Page inner>
      {window.localStorage.getItem('userRolePermission')&&
      					JSON.parse(window.localStorage.getItem('userRolePermission')).filter(
                  v => v.id == 796
                ) != [] ? (
        <Tabs tabBarExtraContent={SelectGroups} defaultActiveKey="1" onChange={callback}>
          <TabPane tab="洗衣机设备" key="Washer">
            <div style={styles}>
              {cardlist}
              <Pagination total={total} onPageChange={handlePageChange} onSizeChange={handleSizeChange} />
              </div>
          </TabPane>
          <TabPane tab="烘干机设备" key="Dryer">
          <div style={styles}>
            {cardlist}
            <Pagination total={total} onPageChange={handlePageChange} onSizeChange={handleSizeChange} />
            </div>
          </TabPane>
        </Tabs>  
         ):('')}
      </Page>
    </div>)
}

Index.propTypes = {
  device: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}
export default connect(({ device }) => ({ device }))(Index)
