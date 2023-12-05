import { View } from 'react-native'
import { Text , Avatar} from 'react-native-paper'
import React from 'react'
import colors from '../../constants/colours'
import { styles } from './style'

export default function UserAvatar({ uri, name, email, age }) {
    return (
        <View style={styles.avatarBox}>
            <Avatar.Image bg={colors.primary}
                source={{
                    uri: uri
                }}/>
            <View>
                <Text style={styles.nameText} fontWeight="500">{name}</Text>
                <Text style={styles.emailText}>{email}</Text>
            </View>
        </View>
    )
}
