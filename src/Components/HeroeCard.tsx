import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Heroe } from './Heroe'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../Navigators/RootNavigator';


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
                <Heroe charImgData={thumbnail} />
                <View style={styles.textContainer}>
                    <Text style={[styles.text, { fontSize: 20, fontWeight: "bold" }]}>{name}</Text>
                    <Text style={styles.text}>Appears on {comicsNum} comics </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default HeroeCard

const styles = StyleSheet.create({
    containerButton: { padding: 5, paddingBottom: 15 },
    cardContainer: {
        flexDirection: "row",
        padding: 15,
        backgroundColor: "black",
        borderRadius: 18,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.24,
        shadowRadius: 7,
        elevation: 9,
    },
    textContainer: { flex: 1, paddingVertical: 15, justifyContent: "space-between" },
    text: { color: "white", textAlign: "center" }
})