import React from 'react';
import { Pagination } from 'antd';
import { connect } from 'dva';

const crrstyle = {
    pagination: {
        marginTop: '16px',
        width: '100%'
    }
};

class BottomPagination extends React.Component {
    general = (current, pageSize) => {
        this.props.dispatch({
            type: 'order/updateState',
            payload: {
                current: Number(current),
                size: pageSize,
                pages: current
            }
        });
    };

    showList = (current, pageSize) => {
        const { orderStatus, pagination, serveType, orderNoOrOpenid, selectStoreName } = this.props.order;
        this.props.dispatch({
            type: 'order/showList',
            payload: {
                current: Number(current),
                size: pageSize,
                pages: current,
                records: [
                    {
                        orderStatus: parseInt(orderStatus),
                        storeName: selectStoreName,
                        serveType: serveType
                    }
                ]
            }
        });
    };

    onShowSizeChange = (current, pageSize) => {
        this.props.dispatch({
            type: 'order/updateState',
            payload: { pagination: { current, pageSize } }
        });
        this.showList(current, pageSize);
    };

    onChange = (current, pageSize) => {
        this.props.dispatch({
            type: 'order/updateState',
            payload: { pagination: { current, pageSize } }
        });
        this.showList(current, pageSize);
    };

    render() {
        const { total, current, pagination } = this.props.order;
        return (
            <Pagination
                style={crrstyle.pagination}
                showTotal={total => `查询结果 ${total} 条`}
                showSizeChanger
                defaultCurrent={1}
                pageSize={pagination.pageSize}
                onShowSizeChange={this.onShowSizeChange}
                onChange={this.onChange}
                total={total}
                current={Number(current)}
            />
        );
    }
}

export default connect(({ order }) => ({ order }))(BottomPagination);
