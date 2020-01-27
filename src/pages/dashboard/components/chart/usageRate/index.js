import React from 'react'
import moment from 'moment'
import { Row, Col, Card, DatePicker, Tabs } from 'antd'
import DryProgramm from './dryProgramm'
import WashProgramm from './washProgramm'
import styles from '../../../index.less'
import { TODAY, PASTDAY, DATA_FORMAT } from '../../../../../utils/date'

const { RangePicker } = DatePicker
const { TabPane } = Tabs

const crrstyle = {
  tabrangePicker: {
    width: '235px',
    marginTop: '8px'
  }
}

const crrtime = new Date().toLocaleTimeString('chinese', { hour12: false })  // 获得当前时间点（24小时制）
let start = PASTDAY.split(("/"))
let end = TODAY.split(("/"))

class UsageRate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeKey: 'wash',
      startTime: start[0] + "-" + start[1] + "-" + start[2] + " " + crrtime, // 时间选择器默认时间
      endTime: end[0] + "-" + end[1] + "-" + end[2] + " " + crrtime, // 默认时间为当前一周
    }
  }
  // 时间限制
  disabledDate = (Value) => {
    return Value > moment().endOf('day')
  }

  // 将时间选择器选定的时间以接口参数所需格式赋值给startTime，endTime
  handleTimeChange = (date, dateString) => {
    let start = dateString[0].split(("/"))
    let end = dateString[1].split(("/"))
    this.setState({
      startTime: start[0] + "-" + start[1] + "-" + start[2] + " " + crrtime,
      endTime: end[0] + "-" + end[1] + "-" + end[2] + " " + crrtime
    })
  }

  render() {
    const { slectedStore } = this.props
    const WashLegend = () => (
      <span className={styles.tablegend}>
        <div className={styles.green}></div>
        <span>棉织物</span>
        <div className={styles.yellow}></div>
        <span>化纤</span>
        <div className={styles.purple}></div>
        <span>混合洗</span>
        <div className={styles.blue}></div>
        <span>丝绸精细</span>
        <div className={styles.pink}></div>
        <span>羊毛</span>
      </span>
    )
    const DryLegend = () => (
      <span className={styles.drytablegend}>
        <div className={styles.green}></div>
        <span>棉织物</span>
        <div className={styles.yellow}></div>
        <span>化纤</span>
        <div className={styles.purple}></div>
        <span>混合洗</span>
      </span>
    )

    const callback = (key) => {
      this.setState({
        activeKey: key
      })
    }

    return (
      <Card bordered={false} className={styles.card}>
        <Tabs
          tabBarGutter={20}
          onChange={callback}
          tabBarExtraContent={
            <Col>
              <RangePicker
                style={crrstyle.tabrangePicker}
                defaultValue={[
                  moment(PASTDAY, DATA_FORMAT),
                  moment(TODAY, DATA_FORMAT),
                ]}
                disabledDate={this.disabledDate}
                format={DATA_FORMAT}
                onChange={this.handleTimeChange} // 触发时间选择事件
              />
              {this.state.activeKey === 'wash' ? <WashLegend /> : <DryLegend />}
            </Col>
          }>
          <TabPane tab="程序使用频率" disabled key="title" className={styles.chartTitle}></TabPane>
          <TabPane tab="洗衣程序" key="wash">
            <Row>
              <Col>
                <WashProgramm
                  slectedStore={slectedStore}
                  startTime={this.state.startTime}
                  endTime={this.state.endTime}
                />
              </Col>
            </Row>
          </TabPane>
          <TabPane tab="烘干程序" key="dry">
            <Row>
              <Col>
                <DryProgramm
                  slectedStore={slectedStore}
                  startTime={this.state.startTime}
                  endTime={this.state.endTime}
                />
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </Card>
    )
  }
}

export default UsageRate