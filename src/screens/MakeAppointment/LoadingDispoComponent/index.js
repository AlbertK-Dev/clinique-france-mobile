import { View, Text } from 'react-native'
import React from 'react'
import colors from '../../../constants/colours'
import { ActivityIndicator } from 'react-native-paper'


const LoadingDispoComponent = () => {
    return (
        <View>
            <ActivityIndicator size={20} color={colors.primary} animating={true}/>
        </View>
    )
}

export default LoadingDispoComponent