import { View } from 'react-native'
import React from 'react'

const LoadingChoiceComponent = () => {
    return (
        <View style={{marginLeft: 7, marginRight: 10}}>
            <ActivityIndicator size={26} color={colors.primary}/>
        </View>
    )
}

export default LoadingChoiceComponent