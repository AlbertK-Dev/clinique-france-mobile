import { View } from 'native-base'
import React from 'react'
import { Image, Text } from 'react-native'
import user from "../../assets/img/user.png"
import { styles } from './style'
import right from "../../assets/img/right-chevron.png"

export default function Settings({ image, label, icon }) {
    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <Image source={icon ?? user} style={styles.image} />
                <Text style={styles.label}>{label}</Text>
            </View>
            <View>
                <Image source={right} style={styles.rimage} />
            </View>
        </View>
    )
}
