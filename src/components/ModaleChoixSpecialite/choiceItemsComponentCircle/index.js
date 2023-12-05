import { View, Text } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native-paper'
import colors from '../../../constants/colours'
const LoadingCircle = () => {
    return (
        <View style={{marginLeft: 7, marginRight: 10}}>
            <ActivityIndicator size={26} color={colors.primary}/>
        </View>
    )
}

export default LoadingCircle