import React from 'react'
import { Page, HeadFilter } from 'components'
import { Row, Col, message, Pagination } from 'antd'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import SystemSearch from '../../components/systemNotice/systemSearch';
import SystemList from '../../components/systemNotice/systemList'
import styles from './index.less';

const SystemNotice = ({ systemNotice, dispatch }) => {
  const options = systemNotice.storeList;
  const {selectedData,currentPage,pageSize}=systemNotice
  //点击查看设备
  const handleDevice = (value) => {
    dispatch({
      type: 'systemNotice/getRead',
      payload: {
        id: [value],
        title: '点击查看设备'
      }
    })
  }
  //获取勾选的数据
  const selectKey = (value) => {
    const data = [];
    value.map((item, index) => {
      data.push(item.id);
    })
    dispatch({
      type: 'systemNotice/selectData',
      payload: data
    })
    dispatch({
      type: 'systemNotice/updateSelect',
      payload: data
    })
  }
  //点击标记已读
  const handleClick = () => {
    if (selectedData.length == 0) {
      message.error("请选择要标记为已读的通知")
    } else {
    dispatch({
      type: 'systemNotice/getRead',
      payload: {
        id: systemNotice.selectData,
      }
    })
  }
  }
  //选择所有门店的下拉查询
  const handleChange = (value) => {
    dispatch({
      type: 'systemNotice/getSystemList',
      payload: {
        current: currentPage,
        size: pageSize,
        pages: currentPage,
        records: [
          {
            storeName: value == undefined ? '' : value,
            type: systemNotice.type,
            title: systemNotice.title,
          }
        ]
      }
    })
    dispatch({
      type: 'systemNotice/updateStoreName',
      payload: value
    })
  }
  //选择设备状态查询
  const handleSelect = (value) => {
    dispatch({
      type: 'systemNotice/updateType',
      payload: value
    });
    dispatch({
      type: 'systemNotice/getSystemList',
      payload: {
        current: currentPage,
        size: pageSize,
        pages: currentPage,
        records: [
          {
            storeName: systemNotice.storeName,
            type: value == undefined ? '' : value,
            title: systemNotice.title
          }
        ]
      }
    })
  }
  //搜索框enter搜索
  const handleInput = (value) => {
    dispatch({
      type: 'systemNotice/updateTitle',
      payload: value
    });
    dispatch({
      type: 'systemNotice/getSystemList',
      payload: {
        current: currentPage,
        size: pageSize,
        pages: currentPage,
        records: [
          {
            storeName: systemNotice.storeName,
            type: systemNotice.type,
            title: value == undefined ? '' : value
          }
        ]
      }
    })
  }
  const emitEmpty = () => {
    dispatch({
      type: 'systemNotice/updateTitle',
      payload: ''
    });
    dispatch({
      type: 'systemNotice/getSystemList',
      payload: {
        current: currentPage,
        size: pageSize,
        pages: currentPage,
        records: [
          {
            storeName: systemNotice.storeName,
            type: systemNotice.type,
            title: ''
          }
        ]
      }
    })
		document.getElementById('notSearch').value=''
	}
  const handlePageChange = (current, pageSize) => {
    dispatch({
      type: 'systemNotice/querySuccess',
      payload: {
        currentPage: current,
        pageSize: pageSize
      }
    }),
    dispatch({
      type: 'systemNotice/getSystemList',
      payload: {
        current: current,
        size: pageSize,
        pages: current,
        records: [
          {
            storeName: systemNotice.storeName,
            type: systemNotice.type,
            title: systemNotice.title
          }
        ]
      }
    })
  };
  const handleSizeChange = (current, pageSize) => {
    dispatch({
      type: 'systemNotice/querySuccess',
      payload: {
        currentPage: current,
        pageSize: pageSize
      }
    }),
    dispatch({
      type: 'systemNotice/getSystemList',
      payload: {
        current: current,
        size: pageSize,
        pages: current,
        records: [
          {
            storeName: systemNotice.storeName,
            type: systemNotice.type,
            title: systemNotice.title
          }
        ]
      }
    })
  };
  return (
    <div>
      <Page>
        <HeadFilter
          title="系统通知"
          options={options}
          handleChange={handleChange}
        />
      </Page>
      <Page inner>
        <Row>
          <Col span="6">
            <h1>系统通知列表</h1>
          </Col>
          <Col span="18">
            <SystemSearch
              handleClick={handleClick}
              handleSelect={handleSelect}
              handleInput={handleInput}
              emitEmpty={emitEmpty}
              titleName={systemNotice.title}
            />
          </Col>
        </Row>
        {window.localStorage.getItem('userRolePermission')&&
JSON.parse(window.localStorage.getItem('userRolePermission')).filter(
  v => v.id == 768
) != [] ? (
        <div className={styles.content}>
          <SystemList
            data={systemNotice.dataList}
            handleDevice={handleDevice}
            selectKey={selectKey}
            total={systemNotice.total}
            onPageChange={handlePageChange}
            onSizeChange={handleSizeChange}
          />
        </div>
               ):('')}
      </Page>
    </div>
  )
}
SystemNotice.propTypes = {
  systemNotice: PropTypes.object,
  dispatch: PropTypes.func,
}
export default connect(({ systemNotice }) => ({ systemNotice }))(SystemNotice)

