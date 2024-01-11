import { View } from 'react-native'
import { Text , Avatar} from 'react-native-paper'
import React from 'react'
import colors from '../../constants/colours'
import { styles } from './style'

export default function UserAvatar({ uri, name, email, age }) {
    return (
        <View style={styles.avatarBox}>
            <Avatar.Image bg={colors.bg_grey}
                source={{
                    uri: uri ?? "https://www.ucf.edu/wp-content/blogs.dir/19/files/2019/12/Hospitality-Professional-At-Work-web.jpg"
                }}/>
            <View>
                <Text style={styles.nameText} fontWeight="bold">{name}</Text>
                <Text style={styles.emailText}>{email}</Text>
            </View>
        </View>
    )
}
