import { View, Text } from 'react-native'
import React from 'react'
import { Skeleton } from 'native-base'


const LoadingDispoComponent = () => {
    return (
        <View>
            <View style={{ display: "flex", flexDirection: 'row', marginBottom: 10 }}>
                <Skeleton h={7} w={7} borderRadius={50} />
                <Skeleton h={7} w={"70%"} ml={3} borderRadius={10} />
            </View>
            <Skeleton h={4} w={"95%"} borderRadius={15} mb={5} />
            <View style={{ height: 40, display: 'flex', flexDirection: 'row' }}>
                <Skeleton h={"100%"} w={"30%"} borderRadius={10} />
                <Skeleton h={"100%"} w={"30%"} borderRadius={10} ml={3} />
                <Skeleton h={"100%"} w={"30%"} borderRadius={10} ml={3} />
            </View>
        </View>
    )
}

export default LoadingDispoComponent