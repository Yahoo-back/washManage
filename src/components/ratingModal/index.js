import React from 'react'
import { message, Icon, Col, Button, Modal, Form, Input } from 'antd'
import styles from './index.less'

const RatingModal = ({ visible, onHideModal, data }) => {
	const value = data ? data.evaluationStar : ''
	const daValue = 5
	const noValue = daValue - value

	var starArr = []
	for (let i = 0; i < value; i++) {
		starArr.push(<span className={styles.icon} key={i}><Icon type="star" theme="filled" twoToneColor="#FFF100" /></span>)
	}
	for (let j = 0; j < noValue; j++) {
		starArr.push(<span className={styles.icon} key={j + 11}><Icon type="star" theme="outlined" /></span>)
	}
	return (
		<div>
			<Modal
				title={null}
				visible={visible}
				onCancel={onHideModal}
				footer={null}
				className={styles.modal}
			>
				<div className={styles.title}>
					订单评价
        </div>
				<div className={styles.content}>
					<span className={styles.title1}>该订单评价星级：</span>
					<div className={styles.text}>
						{
							starArr.length == 5 ? '非常满意，推荐使用'
								: starArr.length == 4 ? '满意，推荐使用'
									: starArr.length == 3 ? '基本满意，推荐使用'
										: starArr.length == 2 ? '一般，期待改进'
											: starArr.length == 1 ? '不满意，期待改进'
												: starArr.length == 0 ? '不推荐使用' : ''
						}
					</div>
					<div className={styles.icBor}>
						{starArr.map((item) => item)}
					</div>

					<span className={styles.title1}>评价内容：</span>
					<p className={styles.drc}>{data ? data.evaluation : ''}</p>

				</div>
			</Modal>
		</div>
	)

}
export default RatingModal