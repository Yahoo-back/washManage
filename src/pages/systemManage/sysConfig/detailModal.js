import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Form, Select, Input } from 'antd'
import { NowModal } from 'components'

const FormItem = Form.Item
const Option = Select.Option

class DetailModal extends React.Component {
	handleUpdate = () => {
		const { onSure, dispatch, modalRecord, form: { validateFields, resetFields } } = this.props
		validateFields((err, values) => {
			values.id = modalRecord.id
			values.status =
				values.status == "启用" ? 1
					: values.status == "禁用" ? 0
						: values.status
			if (err) {
				return
			}
			dispatch({ type: 'sysConfig/updateConfig', payload: values })
			onSure(false)
			resetFields()
		})
	}

	handleCancel = () => {
		const { onCancel, form: { resetFields } } = this.props
		onCancel()
		resetFields()
	}

	render() {
		const {
			visible,
			title,
			modalRecord,
			form: { getFieldDecorator },
		} = this.props

		const formItemLayout = {
			labelCol: {
				span: 7
			},
			wrapperCol: {
				span: 14
			}
		}

		return (
			<NowModal
				titleText={title}
				visible={visible}
				sure="确定"
				handleOk={this.handleUpdate}
				onCancel={this.handleCancel}
			>
				<Form onSubmit={this.handleUpdate}>
					<FormItem
						{...formItemLayout}
						label="配置Key"
					>
						{getFieldDecorator('configKey', {
							initialValue: modalRecord ? modalRecord.configKey : null,
							rules: [
								{ required: true, message: '请输入配置Key!', whitespace: true },
							],
						})(
							<Input />
						)}
					</FormItem>
					<FormItem
						{...formItemLayout}
						label="配置值"
					>
						{getFieldDecorator('configValue', {
							initialValue: modalRecord ? modalRecord.configValue : null,
							rules: [
								{ required: true, message: '请输入配置值!', whitespace: true },
							],
						})(
							<Input />
						)}
					</FormItem>
					<FormItem
						{...formItemLayout}
						label="说明"
					>
						{getFieldDecorator('remark', {
							initialValue: modalRecord ? modalRecord.remark : null
						})(
							<Input />
						)}
					</FormItem>
					<FormItem
						{...formItemLayout}
						label="状态"
					>
						{getFieldDecorator('status', {
							initialValue: modalRecord ? modalRecord.status == 1 ? '启用' :
								modalRecord.status == 0 ? '禁用' : null : null,
							rules: [{ required: true, message: '请选择状态!', whitespace: true }],
						})(
							<Select placeholder={'请选择帐号状态'}>
								<Option value="1">启用</Option>
								<Option value="0">禁用</Option>
							</Select>
						)}
					</FormItem>
					<FormItem
						{...formItemLayout}
						label="添加时间"
					>
						{modalRecord ? modalRecord.ctime : null}
					</FormItem>
				</Form>
			</NowModal>
		)
	}
}

DetailModal.propTypes = {
	sysConfig: PropTypes.object,
	dispatch: PropTypes.func,
}

export default connect(({ sysConfig }) => ({ sysConfig }))(Form.create()(DetailModal))
