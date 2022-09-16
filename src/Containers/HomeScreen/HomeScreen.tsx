
import React from 'react'
import HeroesList from './HeroesList'
import { Config } from '../../Config'
import { CachedRequestsProvider } from '../../Context/CachedRequestsProvider'

const HomeScreen = () => {

  return (
    <CachedRequestsProvider maxResultsPerPage={5} url={Config.API_URL}>
      <HeroesList />
    </CachedRequestsProvider>
  )
}

export default HomeScreen

