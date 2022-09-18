import { View, Text } from 'react-native'
import React from 'react'
import Lottie from 'lottie-react-native';

const Loader = ({ size = 200 }) => {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Lottie
                source={require('../Assets/Animations/loading.json')}
                autoPlay
                loop
                style={{ width: size }}
            />
        </View>
    )
}

export default Loader