
import React from 'react'
import HeroesList from './HeroesList'
import { Config } from '../../Config'
import { CachedRequestsProvider } from '../../Context/CachedRequestsProvider'
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {

  return (
    <SafeAreaView edges={['right', 'bottom', 'left']} style={{ flex: 1 }}>
      <CachedRequestsProvider maxResultsPerPage={3} url={Config.API_URL}>
        <HeroesList />
      </CachedRequestsProvider>
    </SafeAreaView>
  )
}

export default HomeScreen

