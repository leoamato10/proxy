import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Containers/LoginScreen';
import DetailScreen from '../Containers/DetailScreen';
import HomeScreen from '../Containers/HomeScreen/HomeScreen';


export type RootStackParams = {
  // HomeScreen: any;
  // DetailScreen: { movie: Movie; filmCategory: string };
  // WhishListScreen: any;
};

const Stack = createNativeStackNavigator<RootStackParams>();
const headerOptions = {
  headerStyle: {
    backgroundColor: 'black'
  },
  headerBackTitleVisible: false,
  headerTintColor: '#fff',
  headerTitleAlign: 'center',
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 23
  }
};

const RootNavigator = () => {

  const token = true

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={headerOptions}>
        {token ?
          <>
            <Stack.Screen
              name="HomeScreen"
              options={{ title: 'Home' }}
              component={HomeScreen}
            />
            <Stack.Screen
              name="DetailScreen"
              component={DetailScreen}
            />
          </>
          :
          <Stack.Screen
            name="Login"
            // options={({ route }) => ({ title: route.params.filmCategory })}
            component={Login}
          />
        }

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
