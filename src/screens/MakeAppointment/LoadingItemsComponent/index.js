import { View, Text } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native-paper'
import colors from '../../../constants/colours'
import ShimmerPlaceholder from 'react-native-shimmer-placeholder'


const LoadingItemsComponents = () => {
    return (
        <View>
            <View>
            <View style={{display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 10}}>
                <View style={{marginRight: 10}}>
                    <ShimmerPlaceholder
                        style={{ borderRadius: 50 , width: 25, height: 25 }}
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
            </View>
            <View style={{display: "flex", flexDirection: "row", }}>
            <ShimmerPlaceholder
                style={{ borderRadius: 10, height: 70, width: 120, marginRight: 10 }}
                stopAutoRun
            />
            <ShimmerPlaceholder
                style={{ borderRadius: 10, height: 70, width: 120, marginRight: 10 }}
                stopAutoRun
            />
            <ShimmerPlaceholder
                style={{ borderRadius: 10, height: 70, width: 70 }}
                stopAutoRun
            />
        </View>
        </View>
    )
}

export default LoadingItemsComponents