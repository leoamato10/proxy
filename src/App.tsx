import React from 'react'
import { ExampleProvidedComponent } from './Components/ExampleProvidedComponent'


const url = "/v1/public/characters"

const App = () => {
  return (
    <ExampleProvidedComponent url={ url } /> 
  )
}

export default App