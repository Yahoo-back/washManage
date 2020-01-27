import React from 'react';
import PropTypes from 'prop-types';
import router from 'umi/router';
import { connect } from 'dva';
import { Table, Button, Row, Col, Input, Modal, message } from 'antd';
import { Page, Bread } from 'components';
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
        marginLeft: '50px'
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
class Coupon extends React.Component {
    constructor(props) {
        super(props);
        const { couponListData } = this.props.couponList;
        this.state = {
            addVisible: false,
            data: [],
            options: [],
            selectedStore: '',
            listData: couponListData,
            deleteId: '',
            detailId: '',
            number: '',
            status: ''
        };
    }

    onChange = selectedRowKeys => {
        this.setState({
            deleteId: selectedRowKeys
        });
    };

    //添加优惠券
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

    //删除优惠券
    deleteConfirm = () => {
        const { couponListData } = this.props.couponList;
        let coupons = [];
        if (this.state.deleteId.length == 0) {
            message.error('请选择要删除的优惠券！');
        } else {
            couponListData.filter((item, index) => {
                this.state.deleteId.map(v => {
                    if (item.id == v) {
                        coupons.push(item);
                    }
                });
            });
            let data = [];
            coupons.map(v => {
                data.push({ number: v.number });
            });
            const { dispatch } = this.props;
            confirm({
                title: '确定删除所选优惠券吗?',
                content: '请确认该优惠券没有启用，否则不能删除！',
                cancelText: '取消',
                okText: '确定',
                onOk() {
                    dispatch({
                        type: 'couponList/deleteCoupons',
                        payload: data
                    });
                },
                onCancel() {}
            });
        }
    };

    //详情页面跳转
    goDetail = record => {
        router.push(`/couponManage/CouponDetail?id=${record.id}`);
    };

    //改变优惠券状态
    stopConfirm = record => {
        const { dispatch } = this.props;
        confirm({
            title: record.status == 1 ? '确认停用该优惠券吗?' : '确认启用该优惠券吗?',
            content: record.status == 1 ? '停用的优惠券不能被领取。' : '启用的优惠券可以给用户领取。',
            cancelText: '取消',
            okText: '确定',
            onOk() {
                dispatch({
                    type: 'couponList/changeStatus',
                    payload: { number: record.number, status: record.status == 1 ? '2' : '1' }
                });
            },
            onCancel() {}
        });
    };

    //点击详情跳转
    detail = id => {
        localStorage.setItem('detailId', id);
        routerRedux.push('/couponManage/CouponDetail');
    };

    //优惠券查询
    handleSearch = value => {
        this.props.dispatch({
            type: 'couponList/showList',
            payload: {
                currentPage: 1,
                pageSize: 10,
                condition: value,
                records: [{ number: value }]
            }
        });
        this.props.dispatch({
            type: 'couponList/updateState',
            payload: { number: value }
        });
    };

    render() {
        const rowSelection = {
            onChange: this.onChange
        };
        const columns = [
            {
                title: '序号',
                dataIndex: 'id',
                key: 'id',
                render: (text, record, index) => `${index + 1}`
            },
            {
                title: '优惠券名称',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: '面值',
                dataIndex: 'denomination',
                key: 'denomination',
                render: (text, record, index) => `￥${record.denomination}`
            },
            {
                title: '条件',
                dataIndex: 'useRule',
                key: 'useRule',
                render: (text, record, index) => (record.useRule == 0 ? '不限' : `满${record.useRule}元可用`)
            },

            {
                title: '范围',
                dataIndex: 'useRange',
                key: 'useRange',
                render: (text, record, index) =>
                    record.useRange == 3 ? '不限' : record.useRange == 1 ? '洗衣' : '烘干'
            },
            {
                title: '生效日期',
                dataIndex: 'startTime',
                key: 'startTime',
                render: (text, record, index) => `${record.startTime}~${record.endTime}`
            },
            {
                title: '获取的总数量',
                dataIndex: 'obtainAmount',
                key: 'obtainAmount'
            },
            {
                title: '是否启用',
                dataIndex: 'status',
                key: 'status',
                render: (text, record, index) => (record.status == 2 ? '否' : record.status == 1 ? '是' : null)
            },
            {
                title: '优惠券号码',
                dataIndex: 'number',
                key: 'number'
            },
            {
                title: '操作',
                dataIndex: 'remark',
                key: 'remark',
                render: (text, record, index) => (
                    <span>
                        {window.localStorage.getItem('userRolePermission') &&
                        JSON.parse(window.localStorage.getItem('userRolePermission')).filter(v => v.id == 812) != [] ? (
                            <a
                                className={styles.action}
                                onClick={() => {
                                    this.stopConfirm(record);
                                }}
                            >
                                {record.status == 1 ? '停用' : record.status == 2 ? '启用' : ''}
                            </a>
                        ) : (
                            ''
                        )}
                        {window.localStorage.getItem('userRolePermission') &&
                        JSON.parse(window.localStorage.getItem('userRolePermission')).filter(v => v.id == 767) != [] ? (
                            <a
                                className={styles.action}
                                onClick={() => {
                                    this.goDetail(record);
                                }}
                            >
                                详情
                            </a>
                        ) : (
                            ''
                        )}
                    </span>
                )
            }
        ];

        const { couponListData } = this.props.couponList;

        return (
            <div>
                <Page className={styles.dashboard}>
                    <Bread title="优惠券管理" />
                </Page>
                <Page inner>
                    <Row gutter={24}>
                        <br />
                        <div>
                            <Col {...ColProps} xl={{ span: 12 }} md={{ span: 12 }}>
                                <span style={hcaccount.title}>优惠券列表</span>
                            </Col>
                        </div>
                        <div style={hcaccount.right}>
                            <Col {...ColProps} xl={{ span: 14 }} md={{ span: 14 }}>
                                <Search placeholder="请输入优惠券名称\号码" onSearch={this.handleSearch} />
                            </Col>
                            <Col {...TwoColProps} xl={{ span: 8 }} md={{ span: 8 }} sm={{ span: 8 }}>
                                <div style={hcaccount.btn}>
                                    <div className="flex-vertical-center">
                                        {window.localStorage.getItem('userRolePermission') &&
                                        JSON.parse(window.localStorage.getItem('userRolePermission')).filter(
                                            v => v.id == 811
                                        ) != [] ? (
                                            <Button type="primary" onClick={this.showAddModal}>
                                                添加优惠券
                                            </Button>
                                        ) : (
                                            ''
                                        )}
                                        {window.localStorage.getItem('userRolePermission') &&
                                        JSON.parse(window.localStorage.getItem('userRolePermission')).filter(
                                            v => v.id == 813
                                        ) != [] ? (
                                            <Button
                                                type="primary"
                                                onClick={this.deleteConfirm}
                                                style={hcaccount.deletebtn}
                                            >
                                                删除优惠券
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
                        className={styles.table}
                        columns={columns}
                        simple
                        rowSelection={rowSelection}
                        dataSource={couponListData ? couponListData : []}
                        rowKey={record => record.id}
                        pagination={false}
                    />
                    <AddModal
                        title="添加优惠券"
                        visible={this.state.addVisible}
                        onCancel={this.handleAddCancel}
                        onCreate={this.onCreate}
                    />
                </Page>
                <BottomPagination list={this.state.listData} />
            </div>
        );
    }
}

Coupon.propTypes = {
    loading: PropTypes.object
};

export default connect(({ couponList }) => ({ couponList }))(Coupon);
