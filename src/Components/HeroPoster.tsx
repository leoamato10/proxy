import React from 'react';
import { styles } from './HeroPosterStyles';
import { Image, View } from 'react-native';
import { Thumbnail } from '../Types/ApiResponsetypes.ts';


interface Props {
  charImgData: Thumbnail
}


export const HeroPoster: React.FC<Props> = ({ charImgData }) => {

  const imageUri = `https://${charImgData.path.substring(7)}.${charImgData.extension}`

  return (
    <View>
      <View style={styles.container}>
        <Image source={{ uri: imageUri }} style={styles.image} />
      </View>
    </View>
  );
};


