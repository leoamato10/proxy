import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../Navigators/RootNavigator';
import { styles } from './HeroPosterStyles';




interface Props {
  charImgData: "Movie";
}

export const HeroPoster = ({ charImgData }: Props) => {

  const imageUri = `https://${charImgData.path.substring(7)}.${charImgData.extension}`


  return (
    <View>
      <View style={styles.container}>
        <Image source={{ uri: imageUri }} style={styles.image} />
      </View>
    </View>
  );
};

