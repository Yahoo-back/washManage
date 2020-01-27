import React from 'react'
import { DatePicker, Select, Input, message,Icon } from 'antd'
import styles from './index.less'
import PushCoupon from '../pushCoupon';
import { connect } from 'dva'
import axios from 'axios'
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import { download, config } from 'utils'

const crrstyle = {
  select: {
    width: 150
  },
  select2: {
    width: 130
  },
  search: {
    width: 210
  },
  rangePicker: {
    width: 195
  }
};

const { api } = config
const { userExport } = api

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
const monthFormat = 'YYYY-MM';
const Option = Select.Option;
const Search = Input.Search;
const SeachGroups = ({ onClickCoupon, userMg, dispatch }) => {
  const { userListSelect, currentPage, pageSize, selectedTime,nameSearch,startTime,endTime } = userMg
  const handleSearch = (value) => {
    dispatch({
      type: 'userMg/querySuccess',
      payload: {
        nameSearch: value
      }
    })
    dispatch({
      type: 'userMg/Ulist',
      payload: {
        currentPage: currentPage,
        pageSize: pageSize,
        condition: value,
        timeType: selectedTime,
        startTime: startTime,
        endTime: endTime,
      }
    })
  }
  const handleSelectTime = (value) => {
    dispatch({
      type: 'userMg/querySuccess',
      payload: {
        selectedTime: value
      }
    })
  }
 const onChange=(date, dateString)=>{
  dispatch({
    type: 'userMg/querySuccess',
    payload: {
      startTime: dateString[0],
      endTime: dateString[1],
    }
  }),
    dispatch({
      type: 'userMg/Ulist',
      payload: {
        currentPage: currentPage,
        pageSize: pageSize,
        timeType: selectedTime,
        startTime: dateString[0],
        endTime: dateString[1],
        condition: nameSearch
      }
    })
  }
  const handleUserListExport = async () => {
    if (userListSelect.length == 0) {
      message.error("请选择将要导出的用户")
    } else {
      const res = await axios.post(userExport, {
        appKey: 'appkey',
        data: {
          ids: userListSelect,
          properties: ['openid', 'nickname', 'ctime', 'orderCtime'],
          titles: ['微信openid', '微信名', '首次进入小程序时间', '首次下单时间'],
          query: {
            currentPage: currentPage,
            pageSize: pageSize,
          }
        },
        version: '1.0'
      }, {
          responseType: 'blob',
          onDownloadProgress: e => {
          }
        });
      download(res.data, '用户列表.xls');
    }
  }
  const emitEmpty = () => {
		dispatch({
      type: 'userMg/querySuccess',
      payload: {
        nameSearch: ''
      }
    })
    dispatch({
      type: 'userMg/Ulist',
      payload: {
        currentPage: 1,
        pageSize: 10,
        condition: ''
      }
    })
		document.getElementById('userSearch').value=''
	}
	const suffix = nameSearch ? <Icon type="close-circle" onClick={emitEmpty} key={nameSearch}/> : null;
  return (
    <div>
      <span className={styles.SeachMargin} id='userSelectTime'>
        <Select defaultValue="0" style={crrstyle.select} onChange={handleSelectTime}
          getPopupContainer={() => document.getElementById('userSelectTime')}>
          <Option value="0">下单时间段</Option>
          <Option value="1">首次进入小程序时间</Option>
          <Option value="2">首次下单时间</Option>
        </Select>
        <span id="SelectTime">
        <LocaleProvider locale={zh_CN}>
          <RangePicker
            format={dateFormat} onChange={onChange}
            style={crrstyle.rangePicker}
            getCalendarContainer={() => document.getElementById('SelectTime')}
          />
          </LocaleProvider>
        </span>
      </span>
      <span className={styles.SeachMargin}>
        <Search
          placeholder="请输入微信openid\微信名称"
          onSearch={value => handleSearch(value)}
          id="userSearch"
          suffix={suffix}
          style={crrstyle.search}
        />
      </span>
      <span >
        <PushCoupon onClickCoupon={onClickCoupon} onUserListExport={handleUserListExport} />
      </span>
    </div>
  )
}
export default connect(({ userMg }) => ({ userMg }))(SeachGroups)