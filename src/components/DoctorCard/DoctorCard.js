import colors from "../../constants/colours"
import styles from "../../screens/Acceuil/style"
import { View, HStack, VStack, Pressable, Skeleton, Text } from 'native-base'
import { Star1, Hospital } from 'iconsax-react-native';
import { useEffect, useState } from "react";
import { Animated } from "react-native";
import { useSelector } from "react-redux";
import { Ionicons } from '@expo/vector-icons'

const _spacing = 3
const DoctorCard = ({ isEmpty = false, ...props }) => {
    const motifsLoading = useSelector(state => state.RdvForm.motifsLoading)

    return (
        <Pressable
            mx={_spacing}
            mt={_spacing}
            onPress={() => { }}>
            <HStack
                space={_spacing}
                bg={"white"}
                style={[styles.shadow, styles.medCard]}>
                <View style={styles.medPic}>
                    {isEmpty && <Skeleton flex={1} rounded="15" />}
                </View>
                <VStack space={1} flex={1}>
                    <HStack>
                        {!isEmpty && <><Star1 size={15} color={colors.secondary} variant='Bold' />
                            <Star1 size={15} color={colors.secondary} variant='Bold' />
                            <Star1 size={15} color={colors.secondary} variant='Bold' />
                            <Star1 size={15} color={colors.secondary} variant='Bold' />
                            <Star1 size={15} color={colors.secondary} variant='Bold' /></>}
                        {isEmpty && <Skeleton h={15} w={75} rounded={"full"} mb={1} />}
                    </HStack>
                    {!isEmpty && <Text fontWeight={600} style={styles.medName}>
                        Dr. {props.nom_complet}
                    </Text>}
                    {isEmpty && <Skeleton h={15} rounded={"full"} mb={1} />}
                    <HStack space={1}>
                        <HStack space={1} flex={1}>
                            {!isEmpty && <><Hospital color={colors.text_grey_hint} size={18} />
                                <Text flex={1} isTruncated style={styles.infos}>{props.speciality ?? "..."}</Text></>}
                            {isEmpty && <Skeleton h={4} rounded="full" />}
                        </HStack>
                        <HStack space={1} flex={1}>
                            {!isEmpty && <><Hospital color={colors.text_grey_hint} size={18} />
                                <Text flex={1} isTruncated style={styles.infos}>{props.clinique}</Text>
                            </>}
                            {isEmpty && <Skeleton h={4} rounded="full" />}
                        </HStack>
                    </HStack>
                </VStack>
            </HStack>
        </Pressable>
    )
}

export default DoctorCard