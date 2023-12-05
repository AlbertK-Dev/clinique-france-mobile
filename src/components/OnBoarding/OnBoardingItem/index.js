import { View, StyleSheet, useWindowDimensions, Image } from 'react-native'
import { Text } from 'native-base';
import React from 'react'
import colors from '../../../constants/colours';
import Doctor from '../../../assets/img/Doctor_Two_Color__2__1.png'
import { Center, VStack } from 'native-base';

export default function OnBoardingItem({ item, scrollX }) {

    const { width } = useWindowDimensions();

    return (
        <VStack display={'flex'} justifyContent={'center'} style={[styles.constainer, { width, height: 400 }]}>
            <Center>
            <View style={styles.second}>
                <Image source={Doctor} style={{ height: 200, width: 200 }} />
            </View>
            <View style={styles.third}>
                <VStack alignItems={'center'} style={{ width: "90%", marginLeft: 20 }}>
                    <Text style={{ ...styles.greetEn, fontSize: 22, marginBottom: 10 }}>
                        Obtenez plus facilement un rendez-vous chez le médecin
                    </Text>
                    <Text style={{ ...styles.greetEn, fontSize: 16, fontWeight: "normal" }}>
                        Nous mettons à votre disposition des médecins généralistes et spécialistes qualifiés exercant sur tout le territoire
                    </Text>
                </VStack>
                
            </View>
            </Center>
        </VStack>
    )
}

export const styles = StyleSheet.create({
    constainer: {
        backgroundColor: colors.primary,
        // height: 550
    },
    first: {
        flex: 0,
    },
    second: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    third: {
        display: 'flex',
    },
    greetfr: {
        fontSize: 32,
        fontWeight: 'bold',
        color: colors.yellow,
    },
    greetEn: {
        fontSize: 32,
        fontWeight: 'bold',
        color: "white",
    }
})