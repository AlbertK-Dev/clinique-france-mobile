import { View, Text } from 'react-native'
import React from 'react'
import { Skeleton } from 'native-base'

const LoadingChoiceComponent = () => {
    return (
        <View>
            <Skeleton h={5} w={"100px"} borderRadius={5} />
        </View>
    )
}

export default LoadingChoiceComponent