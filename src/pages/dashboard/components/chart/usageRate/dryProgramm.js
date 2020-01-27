import React from 'react'
import ReactEcharts from 'echarts-for-react'
import { connect } from 'dva'
import PropTypes from 'prop-types'

const crrstyle = {
  chartstyle: {
    height: '400px'
  }
}

class DryProgramm extends React.Component {
  query = async (store, sTime, eTime) => {
    this.props.dispatch({
      type: 'dashboard/getDryRate',
      payload: {
        endTime: eTime,
        startTime: sTime,
        storeName: store,
        serveType: 2,
      }
    })
  }

  componentDidMount() {
    this.query(this.props.slectedStore, this.props.startTime, this.props.endTime)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.slectedStore != this.props.slectedStore || nextProps.startTime != this.props.startTime || nextProps.endTime != this.props.endTime) {
      this.query(nextProps.slectedStore, nextProps.startTime, nextProps.endTime)
    }
  }

  render() {
    const { dashboard: { dryRateData } } = this.props
    let data = dryRateData && dryRateData.dataMap
    let i = 0
    let chartData = []
    for (let p in data) {
      chartData[i] = {
        kind: '',
        num: [],
        date: []
      }
      data[p] && data[p].map(v => {
        chartData[i].date.push(v.week)
        chartData[i].num.push(v.num)
        chartData[i].kind = p
      })
      i++
    }

    const option = {
      color: ['#55cd64', '#febc34', '#745af0'],
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#10a0f7',
        padding: [10, 20],
        formatter: params => (`
        ${params[0] ? params[0].name : ''}<br/>
        ${params[0] ? (params[0].seriesName + ':' + params[0].value) : ''}<br />
        ${params[1] ? (params[1].seriesName + ':' + params[1].value) : ''}<br />
        ${params[2] ? (params[2].seriesName + ':' + params[2].value) : ''}<br />
    `)
      },
      grid: {
        left: '0',
        right: '1%',
        bottom: '12%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
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
          name: chartData[0] ? chartData[0].kind : '',
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
          name: chartData[1] ? chartData[1].kind : '',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 7,
          itemStyle: {
            borderColor: '#fff'
          },
          data: chartData[1] ? chartData[1].num : ''
        },
        {
          name: chartData[2] ? chartData[2].kind : '',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 7,
          itemStyle: {
            borderColor: '#fff'
          },
          data: chartData[2] ? chartData[2].num : ''
        }
      ]
    }

    return (
      <div>
        <ReactEcharts
          option={option}
          style={crrstyle.chartstyle}
        />
      </div>
    )
  }
}

DryProgramm.propTypes = {
  dashboard: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ dashboard }) => ({ dashboard }))(DryProgramm)