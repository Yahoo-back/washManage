import React, { Component } from 'react';
import { Cascader, message } from 'antd';
import _ from 'lodash';
import { isSuccess } from 'utils';
import styles from './area.less'
import { queryArea } from './service';

let options = [];
const areaChildrenMap = {};
let functions = [];
const municipality = ['北京市', '上海市', '天津市', '重庆市', '香港特别行政区', '澳门特别行政区', ];

async function getData(value) {
	let target = null;
	let val = [];
	let code = 0;
	if (value && value.length) {
		val = value.concat();
		target = val.pop();
		code = target.code;
	}
	const isLeaf = !!target && (municipality.includes(target.label) || value.length > 1);
	const tem = val.length ? val.pop().value : 0;
	await getDataByCode(code, isLeaf, areaChildrenMap[tem], target);
}

// 订阅数据更改
function subscribe(callback) {
	functions.push(callback);
}

// 取消订阅
function unsubscribe(callback) {
	functions = functions.filter(fun => fun !== callback);
}

async function getCodes(labels, list) {
	const label = labels.shift();
	const target = list.find(l => l.label === label);
	if (!target) return [];
	const code = target.code;
	let arr = [code];
	if (!labels.length) return arr;
	if (!areaChildrenMap[code]) {
		if (target.code.toString().slice(2, 6) == '0000' && !municipality.includes(target.name)) {
			await getDataByCode(code, true, list);
		} else {
			await getDataByCode(code, true, list);
		}
	}
	arr = arr.concat(await getCodes(labels, areaChildrenMap[code]));
	return arr;
}

async function getDataByCode(code, isLeaf, list, target) {
	const res = await queryArea(code);
	target ? target.loading = false : null;
	if (isSuccess(res)) {
		res.data.forEach(d => {
			d.value = d.code;
			d.label = d.name;
			d.isLeaf = isLeaf;
		});
		areaChildrenMap[code] = res.data;
		if (!code) { // 第一层
			options = res.data;
		} else {
			res.data.length && list.forEach(d => d.code === code ? d.children = res.data : null);
		}
		functions.forEach(fun => fun());
	} else {
		message.error(res.message);
	}
}

getData();// 获取第一层

class AreaSelect extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			value: [],
			labels: [],
			options,
		};
	}
	componentWillMount() {
		subscribe(this.update);
	}

	componentWillReceiveProps(nextProps) {
		// if (!nextProps.visible) {
		// 	this.setState({ value: [] });
		// }
		if (nextProps.value && nextProps.value !== this.state.value) {
			this.setValue(nextProps.value);
		}
	}

	componentWillUnmount() {
		unsubscribe(this.update);
	}

	onChange = (value, selectedOptions) => {
        const { onChange } = this.props;
		let labels = selectedOptions.map(o => o.label);
		value = value.concat(new Array(3 - value.length).fill(''));
		labels = labels.concat(new Array(3 - labels.length).fill(''));
        this.setState({ value, labels });
		onChange ? onChange(labels) : null;
	}

	async setValue(value, key, callback) {
		if (!value.length) {
			this.setState({ value: [], labels: [] }, callback);
			return;
		}
		if (value.length < 3) value = value.slice(0, 2);
		if (key === 'code') this.setState({ value }, callback);
		else {
			this.setState({ labels: value });
			const val = await getCodes(value.concat(), options);
			this.setState({ value: val }, callback);
		}
	}

	getValue(key) {
		if (key === 'code') return this.state.value.concat();
		else return this.state.labels.concat();
	}

	update = () => {
		this.setState({ options: options.concat() });
	}

	loadData = async (selectedOptions) => {
		const targetOption = selectedOptions[selectedOptions.length - 1];
		targetOption.loading = true;
		await getData(selectedOptions);
	}

	render() {
		const { ...props } = this.props;
		return (
			<div className={styles.wrapper} id="Select">
				<Cascader
					{...props}
					options={this.state.options}
					onChange={this.onChange}
					loadData={this.loadData}
                    value={this.state.value}
                    placeholder="请选择省市"
					getPopupContainer={()=>document.getElementById('Select')}
				/>
			</div>
		);
	}
}


export default AreaSelect;
