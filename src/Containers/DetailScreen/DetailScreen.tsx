import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'

const DetailScreen = () => {
  const route = useRoute()

  const { hero } = route.params

  console.log('char', hero);
  return (
    <View style={{ padding: 15, backgroundColor: "lightblue", flex: 1 }}>
      <Text>Name:</Text>
      <Text>{hero.name}</Text>
      <Text>-----</Text>
      <Text>Descripcion:</Text>
      <Text>{hero.description == "" ? "No description" : hero.description}</Text>
      <View style={{ paddingTop: 25 }}>
        <FlatList
          data={hero.comics.items}
          renderItem={({ item }) => <Text style={{ padding: 5 }}>{item.name}</Text>}
        />
      </View>
    </View>
  )
}

export default DetailScreen