import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Table, Form, Button, Row, Col, DatePicker, Input, Modal, message } from 'antd';
import { Page, HeadFilter, Pagination } from 'components';
import { Link } from 'react-router-dom';
import AddModal from './components/Modal';
import BottomPagination from './components/BottomPagination';
import styles from './index.less';

const { Search } = Input;
const ColProps = {
    xs: 24,
    sm: 12,
    style: {
        marginBottom: 16
    }
};
const TwoColProps = {
    ...ColProps,
    xl: 96
};
const hcaccount = {
    title: {
        fontWeight: 'bold',
        fontSize: '16px'
    },
    right: {
        float: 'left',
        marginLeft: '80px'
    },
    btn: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },
    deletebtn: {
        marginLeft: 10,
        background: 'red',
        color: '#fff',
        borderColor: 'red'
    }
};

const { confirm } = Modal;

class hcAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addVisible: false,
            data: [],
            accountStoreOptions: [],
            selectedStore: '',
            hcSelectedStore: '',
            detailId: '',
            deleteId: ''
        };
    }

    onChange = selectedRowKeys => {
        this.setState({
            deleteId: selectedRowKeys == null ? message.error('请选择要删除的优惠券') : selectedRowKeys
        });
    };

    //新建账号
    state = { addVisible: false };
    showAddModal = () => {
        this.setState({
            addVisible: true
        });
    };

    handleAddCancel = () => {
        this.setState({
            addVisible: false
        });
    };

    onCreate = addVisible => {
        this.setState({
            addVisible
        });
    };

    //删除账号
    deleteConfirm = () => {
        const { dispatch } = this.props;
        const { pagination, associateStore } = this.props.hcAccount;
        const _this = this;
        const deleteIds = _this.state.deleteId;
        if (deleteIds.length == 0) {
            message.error('请选择要删除的账号！');
        } else {
            confirm({
                title: '确定删除所选账号?',
                content: '请谨慎删除！',
                cancelText: '取消',
                okText: '确定',
                onOk() {
                    dispatch({
                        type: 'hcAccount/accountDelete',
                        payload: { deleteIds, pagination, associateStore }
                    });
                },
                onCancel() {}
            });
        }
    };

    //账号查询
    handleSearch = value => {
        const { pagination, associateStore } = this.props.hcAccount;
        this.props.dispatch({
            type: 'hcAccount/showList',
            payload: {
                current: 1,
                size: pagination.pageSize,
                pages: 1,
                records: [
                    {
                        accountOrMail: value == undefined ? '' : value,
                        associateStore: associateStore
                    }
                ]
            }
        });
    };

    //门店下拉查询
    handleChange = value => {
        const { pagination, accountOrMail } = this.props.hcAccount;
        this.props.dispatch({
            type: 'hcAccount/showList',
            payload: {
                current: 1,
                size: pagination.pageSize,
                records: [
                    {
                        associateStore: value == undefined ? '' : value,
                        accountOrMail: accountOrMail
                    }
                ]
            }
        });
        this.props.dispatch({
            type: 'hcAccount/updateState',
            payload: { associateStore: value }
        });
    };

    //门店Select选框
    handleDropdown = () => {
        const { dispatch } = this.props;
        dispatch({ type: 'hcAccount/getStoreOptions' });
    };

    render() {
        const rowSelection = {
            onChange: this.onChange
        };
        const columns = [
            {
                title: '序号',
                dataIndex: 'id',
                render: (text, record, index) => `${index + 1}`
            },
            {
                title: '昵称',
                dataIndex: 'homeAccountName'
            },
            {
                title: '账号',
                dataIndex: 'mail'
            },
            {
                title: '密码',
                dataIndex: 'password'
            },
            {
                title: '添加时间',
                dataIndex: 'ctime'
            },
            {
                title: '设备数',
                dataIndex: 'deviceCount'
            },
            {
                title: '关联门店',
                dataIndex: 'associateStore'
            },
            {
                title: '操作',
                dataIndex: 'remark',
                render: (text, record) => (
                    <span>
                        {' '}
                        {window.localStorage.getItem('userRolePermission') &&
                        JSON.parse(window.localStorage.getItem('userRolePermission')).filter(v => v.id == 822) != [] ? (
                            <Link
                                to={`/hcAccountList/deviceDetail?id=${record.id}&homeAccountName=${
                                    record.homeAccountName
                                }`}
                            >
                                {'详情'}
                            </Link>
                        ) : (
                            ''
                        )}
                    </span>
                )
            }
        ];

        //账号列表
        const { accountList, storePull } = this.props.hcAccount;

        return (
            <div>
                <Page className={styles.dashboard}>
                    <HeadFilter
                        title="HomeConnect账号管理"
                        options={storePull}
                        handleDropdown={this.handleDropdown}
                        handleChange={this.handleChange}
                    />
                </Page>
                <Page inner>
                    <Row gutter={24}>
                        <br />
                        <div>
                            <Col {...ColProps} xl={{ span: 12 }} md={{ span: 12 }}>
                                <span style={hcaccount.title}>HomeConnect账号列表</span>
                            </Col>
                        </div>
                        <div style={hcaccount.right}>
                            <Col {...ColProps} xl={{ span: 14 }} md={{ span: 14 }}>
                                <Search placeholder="请输入昵称\账号" onSearch={this.handleSearch} />
                            </Col>
                            <Col {...TwoColProps} xl={{ span: 8 }} md={{ span: 8 }} sm={{ span: 8 }}>
                                <div style={hcaccount.btn}>
                                    <div className="flex-vertical-center">
                                        {window.localStorage.getItem('userRolePermission') &&
                                        JSON.parse(window.localStorage.getItem('userRolePermission')).filter(
                                            v => v.id == 819
                                        ) != [] ? (
                                            <Button type="primary" onClick={this.showAddModal}>
                                                新建账号
                                            </Button>
                                        ) : (
                                            ''
                                        )}
                                        {window.localStorage.getItem('userRolePermission') &&
                                        JSON.parse(window.localStorage.getItem('userRolePermission')).filter(
                                            v => v.id == 821
                                        ) != [] ? (
                                            <Button
                                                type="primary"
                                                onClick={this.deleteConfirm}
                                                style={hcaccount.deletebtn}
                                            >
                                                删除账号
                                            </Button>
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                </div>
                            </Col>
                        </div>
                    </Row>
                    <Table
                        rowKey={record => record.id}
                        className={styles.table}
                        columns={columns}
                        simple
                        rowSelection={rowSelection}
                        dataSource={accountList == null ? '' : accountList}
                        pagination={false}
                        selectedStore={this.state.selectedStore}
                        defaultSortOrder="ascend"
                    />
                    <AddModal
                        title="添加HomeConnect账号"
                        visible={this.state.addVisible}
                        onCancel={this.handleAddCancel}
                        onCreate={this.onCreate}
                    />
                </Page>
                <BottomPagination />
            </div>
        );
    }
}

hcAccount.propTypes = {
    loading: PropTypes.object,
    current: PropTypes.number
};

export default connect(({ hcAccount }) => ({ hcAccount }))(hcAccount);
