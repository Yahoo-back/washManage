import React from 'react';
import { Table, Card, Divider } from 'antd';
import { connect } from 'dva';
import { Link } from 'react-router-dom';
import styles from './DeviceList.less';
class DeviceList extends React.Component {
    constructor() {
        super();
        this.state = {
            addVisible: false
        };
    }

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
                title: '设备HAID',
                dataIndex: 'deviceHaid'
            },
            {
                title: '在线状态',
                dataIndex: 'onlineStatus'
            },
            {
                title: '运行状态',
                dataIndex: 'workStatus'
            },
            {
                title: '设备名称',
                dataIndex: 'name'
            },
            {
                title: '最近使用',
                dataIndex: 'latestTime'
            },
            {
                title: '操作',
                dataIndex: 'intro',
                render: (text, record) => (
                    <span>
                        {' '}
                        {window.localStorage.getItem('userRolePermission') &&
                        JSON.parse(window.localStorage.getItem('userRolePermission')).filter(v => v.id == 793) != [] ? (
                            <Link to={`/deviceManage/deviceInfo?id=${record.id}`}>{'详情'}</Link>
                        ) : (
                            ''
                        )}
                    </span>
                )
            }
        ];

        const { deviceList } = this.props.hcAccount;

        return (
            <div>
                <Card>
                    <span className={styles.cardTitle}>设备列表</span>
                    <Divider />
                    <Table
                        columns={columns}
                        rowSelection={rowSelection}
                        dataSource={deviceList}
                        rowKey={deviceList => deviceList.id}
                        pagination={false}
                        handleChange={this.handleChange}
                    />
                </Card>
            </div>
        );
    }
}

export default connect(({ hcAccount }) => ({ hcAccount }))(DeviceList);
