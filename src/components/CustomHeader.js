import { Avatar, Box, HStack, Text } from "native-base"
import { Pressable, StyleSheet, TouchableOpacity } from "react-native"
import * as SCREENS from '../constants/screens'
import colors from "../constants/colours"
import { Entypo } from '@expo/vector-icons';
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { troncate } from "../utils/helper";

const styles = StyleSheet.create({
    boxGoogle: {
        justifyContent: 'center',
        width: 28,
        height: 28,
        paddingLeft: 0,
        paddingTop: 0,
        backgroundColor: colors.primary

    }
})

const CustomHeader = ({ navigation, mb, userInfos, screen }) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        if (userInfos?.user) setUser(userInfos.user)
    }, [userInfos]);

    return (
        <HStack
            justifyContent={"space-between"}
            padding={2}
            alignItems={'center'}
            backgroundColor={'white'}
            style={{
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.1,
                shadowRadius: 3.84,
                elevation: 1
            }}
            mb={mb}>
            <HStack
                alignItems={"center"}>
                <Pressable
                    onPress={() => navigation.navigate(screen)}>
                    <Avatar
                        bg={colors.primary}
                        width={37}
                        height={37}
                        source={{
                            uri: user?.photo ?? null
                        }}></Avatar>
                </Pressable>
                <Text style={{ marginLeft: 15, fontSize: 18 }}>{troncate(user?.name)}</Text>
            </HStack>
            <TouchableOpacity onPress={() => navigation.navigate(SCREENS.MAKE_APPOINTMENT_SCREEN)}>
                <Box style={styles.boxGoogle} width={50} rounded={50} shadow={2}>
                    <Entypo name="plus" size={29} color={colors.white} />
                </Box>
            </TouchableOpacity>
        </HStack>
    )
}

const mapStateToProps = ({ UserReducer }) => ({
    userInfos: UserReducer.userInfos
})

export default connect(mapStateToProps)(CustomHeader)