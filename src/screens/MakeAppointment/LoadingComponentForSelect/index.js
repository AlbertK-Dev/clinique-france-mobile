import { View, Text } from 'react-native'
import React from 'react'
import { Skeleton } from 'native-base'

const LoadingSelectComponent = () => {
    return (
        <View>
            <View style={{ display: "flex", flexDirection: 'row', marginBottom: 10 }}>
                <Skeleton h={8} w={8} borderRadius={50} />
                <Skeleton h={8} w={"70%"} ml={3} borderRadius={10} />
            </View>
            <Skeleton h={4} w={"95%"} borderRadius={15} mb={5} />
            <Skeleton h={10} w={"100%"} borderRadius={10} />
        </View>
    )
}

export default LoadingSelectComponent