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
  },
  legend: {
    float: 'right',
    width: '80px',
    display: 'flex',
    lineHeight: '30px',
  }
}

const crrtime = new Date().toLocaleTimeString('chinese', { hour12: false })  // 获得当前时间点（24小时制）
let start = PASTDAY.split(("/"))
let end = TODAY.split(("/"))
let aTime = start[0] + "-" + start[1] + "-" + start[2] + " " + crrtime // 时间选择器默认时间
let bTime = end[0] + "-" + end[1] + "-" + end[2] + " " + crrtime // 默认时间为当前一周

class Scoring extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nowStartTime: aTime,
      nowEndTime: bTime,
    }
  }

  query = async (store, sTime, eTime) => {
    this.props.dispatch({
      type: 'dashboard/getUserEvaluation',
      payload: {
        endTime: eTime,
        startTime: sTime,
        storeName: store
      }
    })
  }

  componentDidMount() {
    this.query(this.props.slectedStore, aTime, bTime)
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
    const { dashboard: { evaluationData } } = this.props
    let time = [0, 0, 0, 0, 0, 0]
    evaluationData && evaluationData.map(v => {
      time[v.evaluationStar] = v.num
    })

    const option = {
      color: ['#745af0'],
      tooltip: {
        trigger: 'axis',
        padding: [10, 20],
        formatter: params => (`
          ${params[0] ? params[0].name : ''}<br/>
          ${params[0] ? (params[0].seriesName + ':' + params[0].value) : ''}<br />
        `)
      },
      grid: {
        left: '0',
        right: '1%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['0星', '1星', '2星', '3星', '4星', '5星'],
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
        }
      ],
      yAxis: [
        {
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
        }
      ],
      series: {
        name: '评分',
        type: 'bar',
        data: time,
        barWidth: '30%',
        label: {
          normal: {
            show: true,
            position: 'top'
          }
        }
      }
    }

    return (
      <Card bordered={false}>
        <ChartHead
          chartTitle="用户使用打分统计"
          legend={
            <div style={crrstyle.legend}>
              <div className={styles.purple}></div>
              <span>评分</span>
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

Scoring.propTypes = {
  dashboard: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ dashboard }) => ({ dashboard }))(Scoring)