import React from 'react'
import { View } from 'react-native'
import Lottie from 'lottie-react-native';

interface Props {
    size?: number
}

const Loader: React.FC<Props> = ({ size = 200 }) => {
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