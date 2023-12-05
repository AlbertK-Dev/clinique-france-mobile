import { View, Text } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native-paper'
import colors from '../../../constants/colours'


const LoadingItemsComponents = () => {
    return (
        <View>
            <ActivityIndicator size={20} color={colors.primary} animating={true}/>
        </View>
    )
}

export default LoadingItemsComponents