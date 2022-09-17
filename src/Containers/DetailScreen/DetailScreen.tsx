import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'

const DetailScreen = () => {
  const route = useRoute()

  const { char } = route.params

  console.log('char', char);
  return (
    <View style={{ padding: 15, backgroundColor: "lightblue", flex: 1 }}>
      <Text>Name:</Text>
      <Text>{char.name}</Text>
      <Text>-----</Text>
      <Text>Descripcion:</Text>
      <Text>{char.description == "" ? "No description" : char.description}</Text>
      <View style={{ paddingTop: 25 }}>
        <FlatList
          data={char.comics.items}
          renderItem={({ item }) => <Text style={{ padding: 5 }}>{item.name}</Text>}
        />
      </View>
    </View>
  )
}

export default DetailScreen