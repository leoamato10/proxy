import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../Navigators/RootNavigator';


type DetailScreenNavigationProp = NativeStackNavigationProp<
  RootStackParams,
  'DetailScreen'
>;

interface Props {
  char: "Movie";
}

export const Heroe = ({ char }: Props) => {

  const navigation = useNavigation<DetailScreenNavigationProp>();
  const imageUri = `https://${char.thumbnail.path.substring(7)}.${char.thumbnail.extension}`
  const { name, comics } = char
  const comicsNum = comics.returned

  return (
    <View style={{ justifyContent: "center", alignContent: "center", alignItems: "center" }}>
      <TouchableOpacity style={styles.button}
        onPress={() => navigation.navigate('DetailScreen', { char })}
        activeOpacity={0.8}>
        <View>
          <Text style={{ fontSize: 20, textAlign: "center" }}>{name}</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUri }} style={styles.image} />
        </View>
        <Text>Appears on {comicsNum} comics</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    borderRadius: 18,
  },
  imageContainer: {
    flex: 1,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: 0.24,
    shadowRadius: 7,
    elevation: 9,
    paddingVertical: 15
  },
  button: {
    marginHorizontal: 2,
    paddingBottom: 20,
    paddingHorizontal: 7,
    marginTop: 10,
    width: 180,
    height: 250,
  }
});
