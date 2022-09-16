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


  return (
    <View>
      <TouchableOpacity style={styles.button}
        onPress={() => navigation.navigate('DetailScreen', { char })}
        activeOpacity={0.8}>
        <Text>{char.name}</Text>
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUri }} style={styles.image} />
        </View>
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
    backgroundColor: "red"
  },
  button: {
    marginHorizontal: 2,
    paddingBottom: 20,
    paddingHorizontal: 7,
    marginTop: 10,
    width: 150,
    height: 200,
  }
});
