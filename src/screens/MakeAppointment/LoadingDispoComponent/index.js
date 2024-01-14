import { View, Text } from 'react-native'
import React from 'react'
import colors from '../../../constants/colours'
import { ActivityIndicator } from 'react-native-paper'
import ShimmerPlaceholder from 'react-native-shimmer-placeholder'


const LoadingDispoComponent = () => {
    return (
        <View>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                <View style={{ marginRight: 10 }}>
                    <ShimmerPlaceholder
                        style={{ borderRadius: 50, width: 25, height: 25 }}
                        stopAutoRun
                    />
                </View>
                <View>
                    <ShimmerPlaceholder
                        style={{ borderRadius: 10 }}
                        stopAutoRun
                    />
                </View>
            </View>
            <View style={{ display: "flex", flexDirection: 'column', width: "100%" }}>
                <View style={{ marginBottom: 10 }}>
                    <ShimmerPlaceholder
                        style={{ borderRadius: 10, width: "80%" }}
                        stopAutoRun
                    />
                </View>
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
        </View>
    )
}

export default LoadingDispoComponent