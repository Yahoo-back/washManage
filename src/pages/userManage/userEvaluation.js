import React from 'react';
import { Page,HeadFilter  } from 'components';
import { Row, Col } from 'antd';
import { connect } from 'dva';
import EvaluationSearch from '../../components/userManage/evaluationSearch';
import TableEvaluation from '../../components/userManage/tableEvaluation';
import styles from './userEvaluation.less';
import Paginations from '../../components/Pagination';

const UserEvaluation = ({ userMg, dispatch }) => {
  const { eList,pullData,currentPage,pageSize,star,nameSearch,storeName } = userMg;
  const dataSource = eList ? eList.records : [];
  const total = eList ? eList.total : 0;
  const handlePageChange = (current, pageSize) => {
    dispatch({
      type: 'userMg/querySuccess',
      payload: {
        currentPage: current,
        pageSize: pageSize
      }
    }),
      dispatch({
        type: 'userMg/Elist',
        payload: {
          currentPage: current,
          pageSize: pageSize,
          evaluationStar: star,
          condition:nameSearch,
          storeName:storeName,
        }
      });
  };
  const handleSizeChange = (current, pageSize) => {
    dispatch({
      type: 'userMg/querySuccess',
      payload: {
        currentPage: current,
        pageSize: pageSize
      }
    }),
      dispatch({
        type: 'userMg/Elist',
        payload: {
          currentPage: current,
          pageSize: pageSize,
          evaluationStar: star,
          condition:nameSearch,
          storeName:storeName,
        }
      });
  };
  const rowSelection = {
    onSelect: (record, selected, selectedRows) => {
      const data = selectedRows.map(item => item.orderNo);
      dispatch({
        type: 'userMg/querySuccess',
        payload: {
          EvaluationSelect: data
        }
      });
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      const data = selectedRows.map(item => item.orderNo);
      dispatch({
        type: 'userMg/querySuccess',
        payload: {
          EvaluationSelect: data
        }
      });
    }
  };
  const handleStoreSelect=(data)=>{
    dispatch({
      type: 'userMg/querySuccess',
      payload: {
        storeName:data,
      }
    }),
    dispatch({
      type:'userMg/Elist',
      payload:{
            currentPage: currentPage,
            pageSize: pageSize,
            storeName:data,
            evaluationStar: star,
            condition:nameSearch,
      }
    })
   }
  return (
    <div>
      <Page>
        <HeadFilter title="用户评价" options={pullData} handleChange={handleStoreSelect}/>
      </Page>
      <Page inner>
        <Row>
          <Col span="6">
            <h1>用户评价列表</h1>
          </Col>
          <Col span="18">
            <EvaluationSearch />
          </Col>
        </Row>
        {window.localStorage.getItem('userRolePermission')&&
      				JSON.parse(window.localStorage.getItem('userRolePermission')).filter(
                v => v.id == 841
              ) != [] ? (
        <div className={styles.content}>
          <TableEvaluation
            dataSource={dataSource}
            rowSelection={rowSelection}
            total={total}
            onPageChange={handlePageChange}
            onSizeChange={handleSizeChange}
          />
        </div>
               ):('')}
      </Page>
    </div>
  );
};
export default connect(({ userMg }) => ({ userMg }))(UserEvaluation);
