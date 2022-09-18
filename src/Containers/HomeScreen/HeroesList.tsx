import React, { useState } from "react";
import { FlatList, View } from "react-native";
import HeroeCard from "../../Components/HeroeCard";
import { useCachedRequests } from "../../Context/HeroesProvider";
import Lottie from 'lottie-react-native';





function HeroesList() {
  const [state, actions] = useCachedRequests();
  const [isRefreshing, setIsRefreshing] = useState(false);


  const results = state.data && state.data["/v1/public/characters"].data.results

  if (state.isFetching) {
    return (
      // <ActivityIndicator size={"large"} style={{ flex: 1 }} />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Lottie
          source={require('../../Assets/Animations/loading1.json')}
          autoPlay
          loop
          style={{ width: 200 }}
        />
      </View>
    );
  }


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