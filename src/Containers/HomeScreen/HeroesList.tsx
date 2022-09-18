import React, { useState } from "react";
import { FlatList, View } from "react-native";
import HeroeCard from "../../Components/HeroeCard";
import Loader from "../../Components/Loader";
import { useCachedRequests } from "../../Context/HeroesProvider";




function HeroesList() {
  const [state, actions] = useCachedRequests();
  const [isRefreshing, setIsRefreshing] = useState(false);


  const results = state.data && state.data["/v1/public/characters"].data.results

  if (state.isFetching) return <Loader size={200} />


  const renderItem = ({ item }) => <HeroeCard hero={item} />


  return (
    <View style={{ padding: 10 }}>
      <FlatList
        data={results}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
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