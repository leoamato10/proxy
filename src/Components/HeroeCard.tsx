import React from 'react'
import { styles } from './HeroCardStyles';
import { View, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../Navigators/RootNavigator';

import { HeroPoster } from './HeroPoster'
import { Hero } from '../Types/ApiResponsetypes.ts';


type DetailScreenNavigationProp = NativeStackNavigationProp<
    RootStackParams, 'DetailScreen'>;

interface Props {
    hero: Hero
}


const HeroeCard: React.FC<Props> = ({ hero }) => {
    const navigation = useNavigation<DetailScreenNavigationProp>();
    const { name, comics, thumbnail } = hero
    const comicsNum = comics.returned

    return (
        <TouchableOpacity style={styles.containerButton}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("DetailScreen", { hero })}>
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

