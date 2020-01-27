const Mock = require('mockjs')
const config = require('../src/utils/config')

const { apiPrefix } = config

const Dashboard = Mock.mock({
  rentalPeakData: {
    wash: [
      {
        date: '2018/08/27',
        time: 42,
      },
      {
        date: '2018/08/28',
        time: 45,
      },
      {
        date: '2018/08/29',
        time: 23,
      },
      {
        date: '2018/08/30',
        time: 10,
      },
      {
        date: '2018/08/31',
        time: 19,
      },
      {
        date: '2018/09/01',
        time: 37,
      },
      {
        date: '2018/09/02',
        time: 35,
      },
    ],
    dry: [
      {
        date: '2018/08/27',
        time: 33,
      },
      {
        date: '2018/08/28',
        time: 12,
      },
      {
        date: '2018/08/29',
        time: 16,
      },
      {
        date: '2018/08/30',
        time: 29,
      },
      {
        date: '2018/08/31',
        time: 10,
      },
      {
        date: '2018/09/01',
        time: 12,
      },
      {
        date: '2018/09/02',
        time: 25,
      },
    ],
  },
  washProgrammData: [
    {
      date: '2018/08/27',
      baftaData: 30,
      fiberData: 12,
      mixData: 8,
      silkData: 18,
      woolData: 34,
    },
    {
      date: '2018/08/28',
      baftaData: 13,
      fiberData: 24,
      mixData: 33,
      silkData: 9,
      woolData: 12,
    },
    {
      date: '2018/08/29',
      baftaData: 17,
      fiberData: 20,
      mixData: 11,
      silkData: 33,
      woolData: 9,
    },
    {
      date: '2018/08/30',
      baftaData: 14,
      fiberData: 10,
      mixData: 13,
      silkData: 23,
      woolData: 19,
    },
    {
      date: '2018/08/31',
      baftaData: 19,
      fiberData: 12,
      mixData: 23,
      silkData: 33,
      woolData: 11,
    },
    {
      date: '2018/09/01',
      baftaData: 41,
      fiberData: 22,
      mixData: 13,
      silkData: 30,
      woolData: 21,
    },
    {
      date: '2018/09/02',
      baftaData: 10,
      fiberData: 8,
      mixData: 20,
      silkData: 13,
      woolData: 21,
    },
  ],
  dryProgrammData: [
    {
      date: '2018/08/27',
      baftaData: 30,
      fiberData: 12,
      mixData: 8,
    },
    {
      date: '2018/08/28',
      baftaData: 13,
      fiberData: 24,
      mixData: 33,
    },
    {
      date: '2018/08/29',
      baftaData: 17,
      fiberData: 20,
      mixData: 11,
    },
    {
      date: '2018/08/30',
      baftaData: 14,
      fiberData: 10,
      mixData: 13,
    },
    {
      date: '2018/08/31',
      baftaData: 19,
      fiberData: 12,
      mixData: 23,
    },
    {
      date: '2018/09/01',
      baftaData: 41,
      fiberData: 22,
      mixData: 13,
    },
    {
      date: '2018/09/02',
      baftaData: 10,
      fiberData: 8,
      mixData: 20,
    },
  ],
  rentIncomeData: [
    {
      date: '2018/08/27',
      washData: 30,
      dryData: 12,
    },
    {
      date: '2018/08/28',
      washData: 13,
      dryData: 24,
    },
    {
      date: '2018/08/29',
      washData: 17,
      dryData: 20,
    },
    {
      date: '2018/08/30',
      washData: 14,
      dryData: 10,
    },
    {
      date: '2018/08/31',
      washData: 19,
      dryData: 12,
    },
    {
      date: '2018/09/01',
      washData: 41,
      dryData: 22,
    },
    {
      date: '2018/09/02',
      washData: 10,
      dryData: 8,
      mixData: 20,
    },
  ],
  scoringData: [
    {
      score: '0星',
      time: 2,
    },
    {
      score: '1星',
      time: 6,
    },
    {
      score: '2星',
      time: 8,
    },
    {
      score: '3星',
      time: 21,
    },
    {
      score: '4星',
      time: 19,
    },
    {
      score: '5星',
      time: 33,
    },
  ],
})

module.exports = {
  [`GET ${apiPrefix}/dashboard`] (req, res) {
    res.json(Dashboard)
  },
}
