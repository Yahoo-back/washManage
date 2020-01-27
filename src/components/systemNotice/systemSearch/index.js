import React from 'react'
import { Select, Input, Button,Icon } from 'antd'
import styles from './index.less'

const crrstyle = {
	select: {
		width: 120
	},
	search: {
		width: 200
	}
};

const Option = Select.Option;
const Search = Input.Search;

const SystemSearch = ({ handleClick, handleSelect, handleInput,emitEmpty,titleName }) => {
	const suffix = titleName ? <Icon type="close-circle" onClick={emitEmpty} key={titleName}/> : null;
	return (
		<div className={styles.option}>
			<span className={styles.SeachMargin} id='Select'>
				<Select style={crrstyle.select} onChange={handleSelect} defaultValue=""
					getPopupContainer={() => document.getElementById('Select')}
				>
					<Option value="">请选择状态</Option>
					<Option value="设备故障">设备故障</Option>
					<Option value="运行状态">运行状态</Option>
					<Option value="用户反馈">用户反馈</Option>
				</Select>
			</span>
			<span className={styles.SeachMargin}>
				<Search
					placeholder="请输入标题"
					id="notSearch"
          			suffix={suffix}
					onSearch={handleInput}
					style={crrstyle.search}
				/>
			</span>
			<span className={styles.SeachMargin}>
			{window.localStorage.getItem('userRolePermission')&&
      					JSON.parse(window.localStorage.getItem('userRolePermission')).filter(
							v => v.id == 800
							) != [] ? (
				<Button type="primary" onClick={handleClick}>标记已读</Button>
				):('')}
			</span>
		</div>
	)
}
export default SystemSearch