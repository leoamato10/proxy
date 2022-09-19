import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export function getAuthQueryStringParams(): {
  apikey: string;
  ts: string;
  hash: string;
} {
  return {
    apikey: "da3dce8fa885f5501a0fa544558226e4",
    ts: "leo",
    hash: "36f480b7ff3d3ee33e463bdf692b2716",
  }
}

export function getPaginationQueryStringParams(maxResults: number, page: number): {
  limit: string; offset: string;
} {
  return {
    limit: maxResults.toString(),
    offset: page.toString(),
  }
}

export const persistUserData = async (userCredentials): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(userCredentials)
    await AsyncStorage.setItem('@storage_Key', jsonValue)

  } catch (e) {
    Alert.alert("Error saving data")
  }
}

export const getLoginData = async (login): Promise<void> => {
  try {
    const jsonValue = await AsyncStorage.getItem('@storage_Key')
    const userCredentials = jsonValue != null ? JSON.parse(jsonValue) : null;
    return login(userCredentials)
  } catch (e) {
    Alert.alert("Error reading login data")
  }
}

export const removeUserPersistedData = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem('@MyApp_key')
  } catch (e) {
    Alert.alert("Error erasing login data")
  }
}