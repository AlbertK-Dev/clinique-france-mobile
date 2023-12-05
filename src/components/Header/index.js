import { useNavigation } from '@react-navigation/native'
import { View, Icon, Text, IconButton } from 'native-base'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { styles } from './style'
import { MaterialIcons } from '@expo/vector-icons';
import colors from '../../constants/colours'
import { ArrowLeft } from 'iconsax-react-native'

export default function Header({ title, bg }) {
    const navigation = useNavigation();
    return (
        <View style={{ ...styles.constainer, backgroundColor: bg ?? undefined }}>
            <IconButton
                _icon={{ size: "sm" }}
                onPress={() => navigation.goBack()}
                icon={<Icon color={colors.black} as={<ArrowLeft />} style={styles.image} />}
            />
            <View justifyContent={'center'} alignItems={'center'} alignContent={'center'} width={'80%'}>
                <Text style={styles.title}>{title}</Text>
            </View>
        </View>
    )
}