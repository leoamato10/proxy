import React from 'react';
import { styles } from './DetailScreenStyles';
import { Image, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../../Navigators/RootNavigator';
import HeroComicsList from './HeroComicsList';


type Props = NativeStackScreenProps<RootStackParams, 'DetailScreen'>;


const DetailScreen: React.FC<Props> = ({ route }) => {
  const { hero } = route.params;
  const { name, description } = hero;

  const uri = `https://${hero.thumbnail.path.substring(7)}.${hero.thumbnail.extension
    }`;
  const heroHasComics = hero.comics.returned !== 0;
  const { items } = hero.comics


  return (
    <SafeAreaView edges={['right', 'bottom', 'left']} style={{ paddingBottom: 20 }}>
      <ScrollView>

        <View style={styles.imageContainer}>
          <View style={styles.imageBorder}>
            <Image source={{ uri }} style={styles.posterImage} />
          </View>
        </View>

        <View style={styles.marginContainer}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.subTitle}>
            {description == '' ? 'No description to show' : description}
          </Text>
        </View>

        <View style={styles.marginContainer}>
          <Text
            style={[styles.subTitle, { fontWeight: 'bold', paddingBottom: 10 }]}>
            Appears on:
          </Text>
          {
            heroHasComics
              ? <HeroComicsList heroComicsItems={items} />
              : <Text>No comics</Text>
          }
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailScreen;


