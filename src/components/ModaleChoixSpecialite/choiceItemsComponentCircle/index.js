import { View, Text } from 'react-native'
import React from 'react'
import { Skeleton } from 'native-base'

const LoadingCircle = () => {
    return (
        <View style={{marginLeft: 7, marginRight: 10}}>
            <Skeleton h={5} w={5} borderRadius={50} />
        </View>
    )
}

export default LoadingCircle