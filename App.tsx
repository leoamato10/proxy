
import React from 'react'
import { ExampleProvidedComponent } from './ProxyProvider'


    const url = "/v1/public/characters"

    const App = () => {
      return (
        <ExampleProvidedComponent url={ url } /> 
      )
    }
    
    export default App
 
