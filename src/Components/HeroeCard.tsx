import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { HeroPoster } from './HeroPoster'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../Navigators/RootNavigator';
import { styles } from './HeroCardStyles';


type DetailScreenNavigationProp = NativeStackNavigationProp<
    RootStackParams, 'DetailScreen'>;


const HeroeCard = ({ hero }) => {
    const navigation = useNavigation<DetailScreenNavigationProp>();
    const { name, comics, thumbnail } = hero
    const comicsNum = comics.returned

    return (
        <TouchableOpacity style={styles.containerButton}
            onPress={() => navigation.navigate('DetailScreen', { hero })}>
            <View style={styles.cardContainer}>
                <HeroPoster charImgData={thumbnail} />
                <View style={styles.textContainer}>
                    <Text style={[styles.text, { fontSize: 20, fontWeight: "bold" }]}>{name}</Text>
                    <Text style={styles.text}>Appears on {comicsNum} comics </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default HeroeCard

