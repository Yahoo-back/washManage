import React from 'react'
import { Page } from 'components'
import Detail from './components/Detail'
import DeviceList from './components/DeviceList'

const detail = ({ isMotion, loading, dispatch }) => {
  return (
    <Page inner>
      <Detail />
      <br />
      <DeviceList />
    </Page>
  )
}

export default detail
