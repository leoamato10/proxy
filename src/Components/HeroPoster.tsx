import React from 'react';
import { Image, View } from 'react-native';
import { Thumbnail } from '../Types/ApiResponsetypes.ts';
import { styles } from './HeroPosterStyles';


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


