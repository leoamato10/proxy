import React from 'react'
import { styles } from './DetailScreenStyles'
import { View, Text, FlatList, ListRenderItem } from 'react-native'
import { Comic } from '../../Types/ApiResponsetypes.ts'


type Props = {
    heroComicsItems: Comic[]
}


const HeroComicsList: React.FC<Props> = ({ heroComicsItems }) => {

    const renderItem: ListRenderItem<Comic> = ({ item }) => {
        const { name } = item
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.text}>{name}</Text>
                </View>
            </View>
        );
    }


    return (
        <FlatList
            data={heroComicsItems}
            showsHorizontalScrollIndicator={false}
            horizontal
            renderItem={renderItem}
        />
    )
}

export default HeroComicsList

