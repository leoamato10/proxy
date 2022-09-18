import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../Navigators/RootNavigator';




interface Props {
  charImgData: "Movie";
}

export const Heroe = ({ charImgData }: Props) => {


  const imageUri = `https://${charImgData.path.substring(7)}.${charImgData.extension}`


  return (
    <View>
      <View style={styles.button}>
        <Image source={{ uri: imageUri }} style={styles.image} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    borderRadius: 18,
  },
  button: {
    marginHorizontal: 2,
    paddingBottom: 20,
    paddingHorizontal: 7,
    width: 180,
    height: 220,
  }
});
