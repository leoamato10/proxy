import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Containers/LoginScreen/LoginScreen';
import DetailScreen from '../Containers/DetailScreen/DetailScreen';
import HomeScreen from '../Containers/HomeScreen/HomeScreen';
import UserContext from '../Context/UserProvider';
import { ActivityIndicator, Alert, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export type RootStackParams = {
  // HomeScreen: any;
  // DetailScreen: { movie: Movie; filmCategory: string };
  // WhishListScreen: any;
};


const Stack = createNativeStackNavigator<RootStackParams>();


const RootNavigator = () => {
  const [loading, setLoading] = useState(false)
  const { user, login, logout } = useContext(UserContext);


  const getLoginData = async () => {
    setLoading(true)

    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key')
      const userCredentials = jsonValue != null ? JSON.parse(jsonValue) : null;
      setLoading(false)
      return login(userCredentials)
    } catch (e) {
      Alert.alert("Error reading login data")
      setLoading(false)
    }
  }

  useEffect(() => {
    getLoginData()
  }, [])


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
    headerRight: () => {
      return (
        <TouchableOpacity onPress={() => logout()}>
          <Text style={{ color: "white", fontWeight: "bold" }}>Logout</Text>
        </TouchableOpacity>
      )
    }
  };


  if (loading) return <ActivityIndicator size={"large"} />

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={headerOptions}>
        {user ?
          <>
            <Stack.Screen
              name="HomeScreen"
              options={{ title: 'Heroes' }}
              component={HomeScreen}
            />
            <Stack.Screen
              name="DetailScreen"
              options={({ route }) => ({ title: route.params.char.name })}
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
