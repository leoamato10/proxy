
import React from 'react'
import HeroesList from './HeroesList'
import { Config } from '../../Config'
import { HeroesProvider } from '../../Context/HeroesProvider'
import { SafeAreaView } from 'react-native-safe-area-context';


const HomeScreen = () => {


  return (
    <SafeAreaView edges={['right', 'bottom', 'left']} style={{ flex: 1 }}>
      <HeroesProvider maxResultsPerPage={3} url={Config.API_URL}>
        <HeroesList />
      </HeroesProvider>
    </SafeAreaView>
  )
}

export default HomeScreen

