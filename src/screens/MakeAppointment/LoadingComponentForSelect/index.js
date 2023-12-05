import { View, Text } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import React from 'react'
import colors from '../../../constants/colours'

const LoadingSelectComponent = () => {
    return (
        <View>
            <ActivityIndicator size={20} color={colors.primary} animating={true}/>
        </View>
    )
}

export default LoadingSelectComponent