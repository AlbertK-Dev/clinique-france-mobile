import { View, Text } from 'react-native'
import React from 'react'
import { Skeleton } from 'native-base'


const DispoLoader = () => {
    return (
        <View>
            <View style={{ height: 40, display: 'flex', flexDirection: 'row', marginBottom: 15 }}>
                <Skeleton h={"100%"} w={"30%"} borderRadius={10} />
                <Skeleton h={"100%"} w={"30%"} borderRadius={10} ml={3} />
                <Skeleton h={"100%"} w={"30%"} borderRadius={10} ml={3} />
            </View>
        </View>
    )
}

export default DispoLoader