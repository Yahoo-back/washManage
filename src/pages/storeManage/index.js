import React from 'react';
import { Page } from 'components';
import { Row, Col, message } from 'antd';
import StoreSearch from '../../components/storeManage/storeSearch';
import StoreList from '../../components/storeManage/storeList';
import styles from './index.less';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import DeleteModal from '../../components/storeManage/storeList/deleteModal';

const StoreManage = ({ store, dispatch }) => {
  const { deleteModalVisible, list, data } = store;
  //表的复选
  const rowSelection = {
    onSelect: (record, selected, selectedRows) => {
      const data = selectedRows.map(item => item.id);
      dispatch({
        type: 'store/deleteStore',
        payload: {
          data: data
        }
      });
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      const data = selectedRows.map(item => item.id);
      dispatch({
        type: 'store/deleteStore',
        payload: {
          data: data
        }
      });
    }
  };
  const handleClickDelete = () => {
    if (data.length == 0) {
      message.error('请选择将要删除的门店');
    } else {
      dispatch({
        type: 'store/deleteModal',
        payload: {
          deleteModalVisible: true
        }
      });
    }
  };
  //点击删除Modal的X或取消按钮
  const hideDeleteModal = () => {
    dispatch({
      type: 'store/deleteModal',
      payload: {
        deleteModalVisible: false
      }
    });
  };
  // 点击删除Modal的确认按钮
  const handleDeleteOk = () => {
    dispatch({
      type: 'store/del',
      payload: data
    });
    dispatch({
      type: 'store/deleteModal',
      payload: {
        deleteModalVisible: false,
        data: []
      }
    });
  };
  const handlePageChange = (current, pageSize) => {
    dispatch({
      type: 'store/list',
      payload: {
        current: current,
        pages: pageSize,
        size: pageSize
      }
    });
  };
  const handleSizeChange = (current, pageSize) => {
    dispatch({
      type: 'store/list',
      payload: {
        current: current,
        pages: pageSize,
        size: pageSize
      }
    });
  };
  return (
    <div>
      <Page>
      <div className={styles.store}>门店管理</div>
      </Page>
      <Page inner>
        <Row>
          <Col span="6">
            <h1>门店列表</h1>
          </Col>
          <Col span="18">
            <StoreSearch onClickDelete={handleClickDelete} />
          </Col>
          <DeleteModal visible={deleteModalVisible} onHideModal={hideDeleteModal} onDeleteOk={handleDeleteOk} />
        </Row>
        {window.localStorage.getItem('userRolePermission')&&
      				JSON.parse(window.localStorage.getItem('userRolePermission')).filter(
                v => v.id == 771
              ) != [] ? (
        <div className={styles.content}>
          <StoreList
            rowSelection={rowSelection}
            list={list}
            onPageChange={handlePageChange}
            onSizeChange={handleSizeChange}
          />
        </div>
        ):('')}
      </Page>
    </div>
  );
};
StoreManage.propTypes = {
  store: PropTypes.object,
  dispatch: PropTypes.func
};
export default connect(({ store }) => ({ store }))(StoreManage);
