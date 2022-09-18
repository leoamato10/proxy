
import { useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Image, Text, View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { RootStackParams } from '../../Navigators/RootNavigator';


// import { useMovieDetails } from '../hooks/useMovieDetails';
// import { MovieDetails } from '../components/MovieDetails';
// import Icon from 'react-native-vector-icons/Ionicons';

const screenHeight = Dimensions.get('screen').height;



interface Props extends NativeStackScreenProps<RootStackParams, 'DetailScreen'> { };

export const DetailScreen2 = () => {
  const route = useRoute()

  const { hero } = route.params

  console.log('hero', hero);
  // const uri = `https://${hero.thumbnail.path.substring(7)}.${hero.thumbnail.extension}`



  return (

    <ScrollView>
      <View style={styles.imageContainer}>
        <View style={styles.imageBorder}>
          <Image
            source={{ uri }}
            style={styles.posterImage}
          />
        </View>
      </View>

      <View style={styles.marginContainer}>
        <Text style={styles.subTitle}>{"movie.original_title}"}</Text>
        <Text style={styles.title}>{"movie.title"}</Text>
      </View>


      {/* {
                isLoading 
                    ? <ActivityIndicator size={ 35 } color="grey" style={{ marginTop: 20 }} />
                    : <MovieDetails movieFull={ movieFull! } cast={ cast } />
            } */}

      {/* Boton para cerrar */}
      {/* <View style={ styles.backButton }>
                <TouchableOpacity
                    onPress={() => navigation.pop() }
                >
                    <Icon 
                        color="white"
                        name="arrow-back-outline"
                        size={ 60 }
                    />
                </TouchableOpacity>
            </View> */}


    </ScrollView>
  )
}


const styles = StyleSheet.create({
  imageContainer: {
    // backgroundColor: 'red',
    // overflow: 'hidden',
    width: '100%',
    height: screenHeight * 0.7,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.24,
    shadowRadius: 7,

    elevation: 9,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25
  },

  imageBorder: {
    flex: 1,
    overflow: 'hidden',
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25
  },
  posterImage: {
    flex: 1,
  },

  marginContainer: {
    marginHorizontal: 20,
    marginTop: 20
  },
  subTitle: {
    fontSize: 16,
    opacity: 0.8
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  backButton: {
    position: 'absolute',
    zIndex: 999,
    elevation: 9,
    top: 30,
    left: 5
  }
});