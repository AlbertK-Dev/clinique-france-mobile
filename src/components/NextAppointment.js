import { Calendar, Clock, DocumentText, Hospital, Map1 } from "iconsax-react-native"
import { Box, HStack, Icon, IconButton, Text, VStack } from "native-base"
import { StyleSheet } from "react-native"
import colors from "../constants/colours"

const _spacing = 3

const NextAppointment = (props) => {
    return (
        <VStack mx={_spacing} bg="primary.500" p={_spacing} borderRadius={10} space={_spacing}>
            <HStack space={_spacing}>
                <Box style={styles.medPic}></Box>
                <HStack flex={1} justifyContent={'space-between'}>
                    <VStack>
                        <Text fontSize={16} color="white" fontWeight="600">Dr Shana Khan</Text>
                        <Text color="white">Cardiologue</Text>
                    </VStack>
                    <IconButton
                        borderRadius={50}
                        h={8}
                        w={8}
                        bg="white"
                        icon={<Map1 color={colors.primary} />}
                        onPress={() => { }}
                        color="primary.500"
                        size="xs"
                    />
                </HStack>
            </HStack>
            <VStack borderRadius={10} bg="#00A3B4" p={_spacing} space={_spacing}>
                <HStack justifyContent={'space-between'}>
                    <HStack w={"60%"} alignItems={'center'} space={_spacing * .5}>
                        <Icon
                            as={<DocumentText />}
                            color="white"
                        />
                        <Text fontSize={12} color="white">Consultation ophta</Text>
                    </HStack>
                    <HStack w={"40%"} alignItems={'center'} space={_spacing * .5}>
                        <Icon
                            as={<Hospital />}
                            color="white"
                        />
                        <Text fontSize={12} color="white">Centre pasteur</Text>
                    </HStack>
                </HStack>
                <HStack justifyContent={'space-between'}>
                    <HStack w={"60%"} alignItems={'center'} space={_spacing * .5}>
                        <Icon
                            as={<Calendar />}
                            color="white"
                        />
                        <Text fontSize={12} color="white">Lun, 28 aout 2023</Text>
                    </HStack>
                    <HStack w={"40%"} alignItems={'center'} space={_spacing * .5}>
                        <Icon
                            as={<Clock />}
                            color="white"
                        />
                        <Text fontSize={12} color="white">14:30</Text>
                    </HStack>
                </HStack>
            </VStack>
        </VStack>
    )
}

const styles = StyleSheet.create({
    medPic: {
        height: 45,
        width: 45,
        borderRadius: 5,
        backgroundColor: colors.bg_grey
    },
})

export default NextAppointment