import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Containers/LoginScreen/LoginScreen';
import DetailScreen from '../Containers/DetailScreen/DetailScreen';
import HomeScreen from '../Containers/HomeScreen/HomeScreen';
import UserContext from '../Context/UserProvider';
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Hero } from '../Types/ApiResponsetypes.ts';
import { getLoginData } from '../Context/Helpers';
import { styles } from './RootNavigatorStyle';


export type RootStackParams = {
  HomeScreen: any;
  DetailScreen: { char: Hero };
};


const Stack = createNativeStackNavigator<RootStackParams>();


const RootNavigator = () => {
  const { user, login, logout } = useContext(UserContext);


  useEffect(() => {
    getLoginData(login)
  }, [])


  const HeaderLeft = () => <Text style={styles.text}>Hi, Test</Text>
  const HeaderRight = () => {
    return (
      <TouchableOpacity onPress={() => logout()}>
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>
    )
  }

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
    },
    headerRight: HeaderRight
  };


  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={headerOptions}>
        {user ?
          <>
            <Stack.Screen
              name="HomeScreen"
              options={{
                title: 'Heroes', headerLeft: HeaderLeft
              }}

              component={HomeScreen}
            />
            <Stack.Screen
              name="DetailScreen"
              options={({ route }) => ({ title: route.params.hero.name })}
              component={DetailScreen}
            />
          </>
          :
          <Stack.Screen
            name="Login"
            options={{ headerShown: false }}
            component={Login}
          />
        }

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;

