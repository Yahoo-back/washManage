import React from 'react';
import { Pagination } from 'antd';
import { connect } from 'dva';
import styles from './Detail.less';
class BottomPagination extends React.Component {
    general = (current, pageSize, total) => {
        this.props.dispatch({
            type: 'hcAccount/showList',
            payload: { current: current, pages: current, size: pageSize }
        });
    };

    onShowSizeChange = (current, pageSize, total) => {
        this.general(current, pageSize, total);
    };

    onChange = (current, pageSize, total) => {
        this.general(current, pageSize, total);
    };

    showTotal = (current, pageSize, total) => {
        this.general(current, pageSize, total);
    };

    render() {
        const { total, current } = this.props.hcAccount;

        return (
            <Pagination
                className={styles.pagination}
                showTotal={total => `查询结果 ${total} 条`}
                onShowSizeChange={this.onShowSizeChange}
                showSizeChanger
                defaultCurrent={1}
                onChange={this.onChange}
                current={current}
                total={total}
            />
        );
    }
}

export default connect(({ hcAccount }) => ({ hcAccount }))(BottomPagination);
