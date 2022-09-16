import React from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { Heroe } from "../../Components/Heroe";
import { useCachedRequests } from "../../Context/CachedRequestsProvider";


function HeroesList() {
  const [state, actions] = useCachedRequests();

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
        onEndReached={actions.paginate}
      />
    </View>
  );
}

export default HeroesList