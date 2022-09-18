import { useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParams } from '../../Navigators/RootNavigator';

const screenHeight = Dimensions.get('screen').height;

interface Props
  extends NativeStackScreenProps<RootStackParams, 'DetailScreen'> { }

const DetailScreen = () => {
  const route = useRoute();

  const { hero } = route.params;
  const { name, description } = hero;

  const uri = `https://${hero.thumbnail.path.substring(7)}.${hero.thumbnail.extension
    }`;
  const heroHasComics = hero.comics.returned !== 0;

  return (
    <SafeAreaView
      edges={['right', 'bottom', 'left']}
      style={{ paddingBottom: 20 }}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <View style={styles.imageBorder}>
            <Image source={{ uri }} style={styles.posterImage} />
          </View>
        </View>

        <View style={styles.marginContainer}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.subTitle}>
            {description == '' ? 'No description to show.' : description}
          </Text>
        </View>

        <View style={styles.marginContainer}>
          <Text
            style={[styles.subTitle, { fontWeight: 'bold', paddingBottom: 10 }]}>
            Appears on:
          </Text>
          {heroHasComics ? (
            <FlatList
              data={hero.comics.items}
              showsHorizontalScrollIndicator={false}
              horizontal
              renderItem={({ item }) => {
                return (
                  <View style={{ paddingRight: 10 }}>
                    <View
                      style={{
                        padding: 15,
                        backgroundColor: 'lightgray',
                        borderRadius: 10,
                      }}>
                      <Text style={{ paddingHorizontal: 10 }}>{item.name}</Text>
                    </View>
                  </View>
                );
              }}
            />
          ) : (
            <Text>No comics</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: screenHeight * 0.7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.24,
    shadowRadius: 7,

    elevation: 9,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },

  imageBorder: {
    flex: 1,
    overflow: 'hidden',
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },
  posterImage: {
    flex: 1,
  },

  marginContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  subTitle: {
    fontSize: 16,
    opacity: 0.8,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});
