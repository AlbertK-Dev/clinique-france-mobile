import { Avatar, HStack, Text, VStack } from 'native-base'
import React from 'react'
import colors from '../../constants/colours'
import { styles } from './style'

export default function UserAvatar({ uri, name, email, age }) {
    return (
        <HStack space={2} alignItems={"center"}>
            <Avatar bg={colors.primary}
                width={60}
                height={60}
                source={{
                    uri: uri
                }}></Avatar>
            <VStack>
                <Text style={styles.nameText} fontWeight="500">{name}</Text>
                <Text style={styles.emailText}>{email}</Text>
            </VStack>
        </HStack>
    )
}
