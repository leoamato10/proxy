
import React from 'react'
import HeroesList from './HeroesList'
import { Config } from '../../Config'
import { HeroesProvider } from '../../Context/HeroesProvider'
import { SafeAreaView } from 'react-native-safe-area-context';

const resultsPerPage = 10


const HomeScreen: React.FC = () => {

  return (
    <SafeAreaView edges={['right', 'bottom', 'left']}
      style={{ flex: 1, backgroundColor: "#ed1d24" }}>
      <HeroesProvider maxResultsPerPage={resultsPerPage} url={Config.API_URL}>
        <HeroesList />
      </HeroesProvider>
    </SafeAreaView>
  )
}

export default HomeScreen

