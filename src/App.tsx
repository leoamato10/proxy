
import React from 'react'
import RootNavigator from './Navigators/RootNavigator'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { UserProvider } from './Context/UserProvider';


const App: React.FC = () => {

  return (
    <SafeAreaProvider>
      <UserProvider>
        <RootNavigator />
      </UserProvider>
    </SafeAreaProvider>
  )
}

export default App

