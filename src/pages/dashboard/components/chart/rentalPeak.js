import React from 'react'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import { Card } from 'antd'
import ReactEcharts from 'echarts-for-react'
import styles from '../../index.less'
import ChartHead from './chartHead'
import { TODAY, PASTDAY } from '../../../../utils/date'

const crrstyle = {
  chartstyle: {
    height: '400px'
  }
}

const crrtime = new Date().toLocaleTimeString('chinese', { hour12: false })  // 获得当前时间点（24小时制）
let start = PASTDAY.split(("/"))
let end = TODAY.split(("/"))
let aTime = start[0] + "-" + start[1] + "-" + start[2] + " " + crrtime // 时间选择器默认时间
let bTime = end[0] + "-" + end[1] + "-" + end[2] + " " + crrtime // 默认时间为当前一周

class RentalPeak extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nowStartTime: aTime,
      nowEndTime: bTime,
    }
  }

  query = async (store, sTime, eTime) => {
    this.props.dispatch({
      type: 'dashboard/getDeviceFastigium',
      payload: {
        endTime: eTime,
        startTime: sTime,
        storeName: store
      }
    })
  }

  componentDidMount() {
    const { slectedStore } = this.props
    this.query(slectedStore, aTime, bTime)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.slectedStore != this.props.slectedStore) {
      this.query(nextProps.slectedStore, this.state.nowStartTime, this.state.nowEndTime)
    }
  }

  // 将时间选择器选定的时间以接口参数所需格式赋值给startTime，endTime
  handleTimeChange = (date, dateString) => {
    const { slectedStore } = this.props
    let start = dateString[0].split(("/"))
    let end = dateString[1].split(("/"))
    let startTime = start[0] + "-" + start[1] + "-" + start[2] + " " + crrtime
    let endTime = end[0] + "-" + end[1] + "-" + end[2] + " " + crrtime
    this.setState({
      nowStartTime: startTime,
      nowEndTime: endTime,
    }, () => {
      this.query(slectedStore, startTime, endTime)
    })
  }

  render() {
    const { dashboard: { deviceData } } = this.props
    let data = deviceData && deviceData.dataMap
    let i = 0
    let chartData = []
    for (let p in data) {
      chartData[i] = {
        num: [],
        date: []
      }
      data[p] && data[p].map(v => {
        chartData[i].date.push(v.week)
        chartData[i].num.push(v.num)
      })
      i++
    }

    const option = {
      color: ['#55ce64', '#10a0f7'],
      tooltip: {
        trigger: 'axis',
        padding: [10, 20],
        formatter: params => (`
          ${params[0] ? params[0].name : ''}<br/>
          ${params[0] ? (params[0].seriesName + ':' + params[0].value) : ''}<br />
          ${params[1] ? (params[1].seriesName + ':' + params[1].value) : ''}<br />
        `)
      },
      grid: {
        left: '0',
        right: '1%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        // 获取动态数据
        data: chartData[0] ? chartData[0].date : '',
        axisTick: {
          show: false
        },
        // x轴label
        axisLabel: {
          textStyle: {
            color: '#aaa'
          }
        },
        // x轴坐标线
        axisLine: {
          show: false
        }
      },
      yAxis: {
        name: '单位/次',
        nameTextStyle: {
          color: '#ccc',
          fontSize: 12,
          padding: [0, 0, 0, 10]
        },
        type: 'value',
        // 坐标轴网格
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        },
        // 刻度线
        axisTick: {
          show: false
        },
        // y轴label
        axisLabel: {
          textStyle: {
            color: '#aaa',
            fontSize: 14
          }
        },
        // y轴坐标线
        axisLine: {
          show: false
        }
      },
      series: [
        {
          name: '洗衣机',
          type: 'bar',
          barWidth: '15%',
          // 获取动态数据
          data: chartData[0] ? chartData[0].num : '',
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          }
        },
        {
          name: '干洗机',
          type: 'bar',
          barWidth: '15%',
          // 获取动态数据
          data: chartData[1] ? chartData[1].num : '',
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          }
        }
      ]
    }

    return (
      <Card bordered={false}>
        <ChartHead
          chartTitle="设备租赁高峰段"
          legend={
            <div className={styles.legend}>
              <div className={styles.green}></div>
              <span>洗衣机</span>
              <div className={styles.blue}></div>
              <span>干洗机</span>
            </div>
          }
          handleChange={this.handleTimeChange}
        />
        <ReactEcharts
          option={option}
          style={crrstyle.chartstyle}
        />
      </Card>
    )
  }
}

RentalPeak.propTypes = {
  dashboard: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ dashboard }) => ({ dashboard }))(RentalPeak)