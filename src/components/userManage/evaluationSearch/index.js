import React from 'react'
import { Select, Input, Button, message } from 'antd'
import styles from './index.less'
import { connect } from 'dva'
import axios from 'axios'
import { download, config } from 'utils'
const { api } = config
const { evaluationExport } = api
const Option = Select.Option;
const Search = Input.Search;

const crrstyle = {
  select: {
    width: 150
  },
  search: {
    width: 230
  }
};

const EvaluationSearch = ({ userMg, dispatch }) => {
  const { EvaluationSelect, pageSize, currentPage, nameSearch, star,storeName } = userMg
  const handleSelectStar = (value) => {
    dispatch({
      type: 'userMg/querySuccess',
      payload: {
        star: value
      }
    })
    dispatch({
      type: 'userMg/Elist',
      payload: {
        currentPage: currentPage,
        pageSize: pageSize,
        evaluationStar: value,
        condition:nameSearch,
        storeName:storeName,
      }
    })
  }
  const handleSearch = (value) => {
    dispatch({
      type: 'userMg/querySuccess',
      payload: {
        nameSearch: value
      }
    })
    dispatch({
      type: 'userMg/Elist',
      payload: {
        currentPage: 1,
        pageSize: 10,
        condition: value,
        evaluationStar: star,
        storeName:storeName,
      }
    })
  }
  const handleEvaExport = async () => {
    if (EvaluationSelect.length == 0) {
      message.error("请选择将要导出的用户")
    } else {
      const res = await axios.post(evaluationExport, {
        appKey: 'appkey',
        data: {
          ids: EvaluationSelect,
          properties: ['orderNo', 'openid', 'weixinName', 'serveType', 'serveProcedure', 'ctime', 'evaluationStar', 'evaluation'],
          titles: ['订单号', '微信openid', '微信名', '类型', '模式', '评价时间', '评价星级', '评价内容'],
          query: {
            currentPage: currentPage,
            pageSize: pageSize,
            condition: nameSearch,
            evaluationStar: star,
            storeName:storeName,
          }
        },
        version: '1.0'
      }, {
          responseType: 'blob',
          onDownloadProgress: e => {
          }
        });
      download(res.data, '用户评价列表.xls');
    }
  }
  return (
    <div className={styles.option}>
      <span className={styles.SeachMargin} id='SelectStar'>
        <Select defaultValue="0" style={crrstyle.select} onChange={handleSelectStar}
          getPopupContainer={() => document.getElementById('SelectStar')}>
          <Option value="0">订单评价星级</Option>
          <Option value="5">5星</Option>
          <Option value="4">4星</Option>
          <Option value="3">3星</Option>
          <Option value="2">2星</Option>
          <Option value="1">1星</Option>
        </Select>
      </span>
      <span className={styles.SeachMargin}>
        <Search
          placeholder="请输入微信openid\微信名称"
          onSearch={value => handleSearch(value)}
          style={crrstyle.search}
        />
      </span>
      <span className={styles.SeachMargin}>
      {window.localStorage.getItem('userRolePermission')&&
      					JSON.parse(window.localStorage.getItem('userRolePermission')).filter(
                  v => v.id == 842
                ) != [] ? (
        <Button type="primary" onClick={handleEvaExport}>导出</Button>
               ):('')}
      </span>
    </div>
  )
}
export default connect(({ userMg }) => ({ userMg }))(EvaluationSearch)