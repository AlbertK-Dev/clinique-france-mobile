import { View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import React from 'react'
import colors from '../../../constants/colours'
import ShimmerPlaceholder from 'react-native-shimmer-placeholder'


const DispoLoader = () => {
    return (
        <View>
           <View style={{ display: "flex", flexDirection: "row" }}>
                    <ShimmerPlaceholder
                        style={{ borderRadius: 10, height: 40, width: 100, marginRight: 10 }}
                        stopAutoRun
                    />
                    <ShimmerPlaceholder
                        style={{ borderRadius: 10, height: 40, width: 100, marginRight: 10 }}
                        stopAutoRun
                    />
                    <ShimmerPlaceholder
                        style={{ borderRadius: 10, height: 40, width: 100, marginRight: 10 }}
                        stopAutoRun
                    />
                </View> 
        </View>
    )
}

export default DispoLoader