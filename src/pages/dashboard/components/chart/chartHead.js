import React from 'react'
import moment from 'moment'
import { DatePicker } from 'antd'
import styles from '../../index.less'
import { TODAY, PASTDAY, DATA_FORMAT } from '../../../../utils/date'

const { RangePicker } = DatePicker

// 时间选择器
class ChartHead extends React.Component {
  disabledDate = (Value) => {
    return Value > moment().endOf('day')
  }
  render() {
    const { chartTitle, legend, handleChange } = this.props
    return (
      <div>
        <div className={styles.chartTitle}>{chartTitle}</div>
        <RangePicker
          className={styles.rangePicker}
          defaultValue={[
            moment(PASTDAY, DATA_FORMAT),
            moment(TODAY, DATA_FORMAT),
          ]}
          disabledDate={this.disabledDate}
          format={DATA_FORMAT}
          onChange={handleChange} // 触发时间选择事件
        />
        {legend}
      </div>
    )
  }
}

export default ChartHead