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

class RentIncome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nowStartTime: aTime,
      nowEndTime: bTime,
    }
  }

  query = async (store, sTime, eTime) => {
    this.props.dispatch({
      type: 'dashboard/getIncome',
      payload: {
        endTime: eTime,
        startTime: sTime,
        storeName: store,
        type: 1
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
    const { dashboard: { incomeData } } = this.props
    let data = incomeData && incomeData.dataMap
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
      color: ['#55ce64', '#745af0'],
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#10a0f7',
        padding: [10, 20],
        formatter: params => (`
          ${params[0] ? params[0].name : ''}<br/>
          ${params[0] ? (params[0].seriesName + ':' + params[0].value) : ''}<br />
          ${params[1] ? (params[1].seriesName + ':' + params[1].value) : ''}<br />
        `)
      },
      grid: {
        left: '3%',
        right: '4%',
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
        name: '单位/元',
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
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 7,
          itemStyle: {
            borderColor: '#fff'
          },
          data: chartData[0] ? chartData[0].num : ''
        },
        {
          name: '干洗机',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 7,
          itemStyle: {
            borderColor: '#fff'
          },
          data: chartData[1] ? chartData[1].num : ''
        },
      ]
    }

    return (
      <Card bordered={false}>
        <ChartHead
          chartTitle="设备租赁总收入"
          legend={
            <div className={styles.legend}>
              <div className={styles.green}></div>
              <span>洗衣机</span>
              <div className={styles.purple}></div>
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

RentIncome.propTypes = {
  dashboard: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ dashboard }) => ({ dashboard }))(RentIncome)