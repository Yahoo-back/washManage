import React from 'react'
import { Pagination } from 'antd'
import styles from './index.less'

const Paginations = ({ total, onPageChange, onSizeChange, pageSize, current }) => {
    function onChange (current, pageSize) {
        onPageChange(current, pageSize)
    }
    function onShowSizeChange (current, pageSize) {
        onSizeChange(current, pageSize)
    }
    return (
        <div className={styles.content}>
            <Pagination
                showTotal={total => `查询结果 ${total} 条`}
                onChange={onChange}
                onShowSizeChange={onShowSizeChange}
                showSizeChanger
                defaultCurrent={1}
                total={total}
                pageSize={pageSize}
                current={current}
            />
        </div>
    )
}

export default Paginations
