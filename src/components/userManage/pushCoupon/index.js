import React from 'react'
import { Button, Select, Input } from 'antd'
import styles from './index.less'

const PushCoupon = ({ onClickCoupon, onUserListExport }) => {

    return (
        <div className={styles.wrapper}>
            <span className={styles.SeachMargin}>
            {window.localStorage.getItem('userRolePermission')&&
      					JSON.parse(window.localStorage.getItem('userRolePermission')).filter(
                            v => v.id == 846
                            ) != [] ? (
                <Button type="primary" onClick={onClickCoupon}>推送优惠券</Button>
                         ):('')}
            </span>
            <span >
                {window.localStorage.getItem('userRolePermission')&&
      					JSON.parse(window.localStorage.getItem('userRolePermission')).filter(
                            v => v.id == 845
                            ) != [] ? (
                <Button type="primary" onClick={onUserListExport}>导出</Button>
                ):('')}
            </span>
        </div>
    )
};

export default PushCoupon