import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import LoginScreen from '../Containers/LoginScreen/LoginScreen';
import DetailScreen from '../Containers/DetailScreen/DetailScreen';
import HomeScreen from '../Containers/HomeScreen/HomeScreen';
import UserContext from '../Context/UserProvider';
import { Text, TouchableOpacity } from 'react-native';
import { Hero } from '../Types/ApiResponsetypes.ts';
import { getLoginData } from '../Context/Helpers';
import { styles } from './RootNavigatorStyle';


export type RootStackParams = {
  LoginScreen: any;
  HomeScreen: any;
  DetailScreen: { hero: Hero };
};


const Stack = createNativeStackNavigator<RootStackParams>();


const RootNavigator: React.FC = () => {
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

  const headerOptions: NativeStackNavigationOptions = {
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
            name="LoginScreen"
            options={{ headerShown: false }}
            component={LoginScreen}
          />
        }

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;

