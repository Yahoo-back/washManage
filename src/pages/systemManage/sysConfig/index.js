import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Page } from 'components'
import { Card, Table, Button, Modal } from 'antd'
import DetailModal from './detailModal'
import AddModal from './addModal'
import BottomPagination from './bottomPagination'

const confirm = Modal.confirm

const styles = {
  action: {
    marginLeft: '12px'
  }
}

class SysConfig extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      detailVisible: false,
      addVisible: false,
      modalRecord: [],
    }
  }

  getModalMessage = (record) => {
    this.setState({
      modalRecord: record,
      detailVisible: true,
    })
  }

  showAddModal = () => {
    this.setState({
      addVisible: true
    })
  }

  handleDetailCancel = () => {
    this.setState({
      detailVisible: false
    })
  }

  onSure = (detailVisible) => {
    this.setState({
      detailVisible
    })
  }

  handleAddCancel = () => {
    this.setState({
      addVisible: false
    })
  }

  onCreate = addVisible => {
    this.setState({
      addVisible
    })
  }

  deleteConfirm = (record) => {
    const { dispatch } = this.props
    confirm({
      title: '确认删除该账号吗?',
      content: '删除账号后，不再保留账号所有信息。',
      cancelText: '取消',
      okText: '确定',
      onOk() {
        dispatch({
          type: 'sysConfig/deleteConfig',
          payload: record.id,
        })
      },
      onCancel() { }
    })
  }

  render() {
    const { sysConfig: { configList } } = this.props
    const columns = [{
      title: '配置Key',
      dataIndex: 'configKey',
    }, {
      title: '配置值',
      dataIndex: 'configValue',
    }, {
      title: '备注',
      dataIndex: 'remark',
    }, {
      title: '添加时间',
      dataIndex: 'ctime',
    }, {
      title: '操作',
      dataIndex: 'action',
      width: 100,
      render: (text, record, index) => (
        <span>
          <a onClick={() => this.getModalMessage(record)} >详情</a>
          <a style={styles.action} onClick={() => this.deleteConfirm(record)} >删除</a>
        </span>
      ),
    }]

    return (
      <Page>
        <Card
          title="系统配置"
          bordered={false}
          extra={
            <span>
              <Button type="primary" onClick={this.showAddModal}>
                添加配置
              </Button>
            </span>
          }
        >
          <Table
            columns={columns}
            rowKey={record => record.configKey}
            dataSource={configList ? configList.records : ''}
            pagination={false}
          />
          <DetailModal
            title="配置详情"
            visible={this.state.detailVisible}
            onCancel={this.handleDetailCancel}
            modalRecord={this.state.modalRecord}
            onSure={this.onSure}
          />
          <AddModal
            title="添加配置"
            visible={this.state.addVisible}
            onCancel={this.handleAddCancel}
            onCreate={this.onCreate}
          />
        </Card>
        <BottomPagination data={configList} />
      </Page>
    )
  }
}

SysConfig.propTypes = {
  sysConfig: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ sysConfig }) => ({ sysConfig }))(SysConfig)
