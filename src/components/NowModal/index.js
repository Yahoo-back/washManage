import React from 'react'
import { Modal, Button } from 'antd'
import styles from './index.less'

class NowModal extends React.Component {
  render() {
    const { visible, handleOk, onCancel, sure, titleText, width, okDisabled } = this.props
    return (
      <Modal
        title={null}
        visible={visible}
        footer={null}
        closable={false}
        className={styles.modal}
        width={width}
      >
        <div className={styles.title}>
          {titleText}
        </div>
        {this.props.children}
        <div className={styles.footer}>
          <Button onClick={onCancel}>取消</Button>
          <Button type="primary" onClick={handleOk} disabled={okDisabled}>{sure}</Button>
        </div>
      </Modal>
    )
  }
}

export default NowModal