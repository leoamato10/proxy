import React, { useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { Heroe } from "../../Components/Heroe";
import { useCachedRequests } from "../../Context/HeroesProvider";


function HeroesList() {
  const [state, actions] = useCachedRequests();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const results = state.data && state.data["/v1/public/characters"].data.results

  if (state.isFetching) {
    return (
      <ActivityIndicator size={"large"} style={{ flex: 1 }} />
    );
  }

  const renderItem = ({ item }) => <Heroe char={item} />


  return (
    <View >
      <FlatList
        data={results}
        renderItem={renderItem}
        onEndReachedThreshold={-0.1}
        onRefresh={() => {
          setIsRefreshing(true)
          actions.paginate("prevPage")
          setIsRefreshing(false)
        }}
        refreshing={isRefreshing}
        onEndReached={() => {
          if (state.isFetching === false) actions.paginate("nextPage")
        }}
      />
    </View>
  );
}

export default HeroesList