import { View, Text } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'

const DetailScreen = () => {
  const route = useRoute()

  const { char } = route.params

  console.log('char', char);
  return (
    <View>
      <Text>DetailScreen</Text>
    </View>
  )
}

export default DetailScreen