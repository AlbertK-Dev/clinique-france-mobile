import { Center, HStack, Text, VStack } from "native-base"
import { InfoCircle } from "iconsax-react-native";
import styles from "./style";
import colors from "../../constants/colours";

const CardInfo = (props) => {
    return (
        <VStack space={2}>
            <Text style={styles.sectionTitle}>Informations sur le rendez-vous</Text>
            <VStack space={2} style={styles.appoinmentsBox} mt={1}>
                <HStack justifyContent={'space-between'}>
                    <Text color={'primary.500'}>{props.lieu}</Text>
                    <Text color={'primary.500'}>{props.status}</Text>
                </HStack>

                <VStack>
                    <Text style={styles.medName}>{props.patient}</Text>
                    <Text style={styles.label}>{props.infos}</Text>
                </VStack>

                <VStack>
                    <Text style={styles.label}>Motif du rendez-vous:</Text>
                    <Text style={styles.label}>{props.motif}</Text>
                </VStack>

                <VStack space={2} style={styles.consignes}>
                    <HStack space={2} alignItems={"center"}>
                        <InfoCircle color={colors.primary} size={20}/>
                        <Text color={"primary.500"} fontWeight={500}>Consignes</Text>
                    </HStack>
                    <VStack space={1}>
                        <Text>- Lorem ipsum dolor sit amet</Text>
                        <Text>- Lorem ipsum dolor sit amet</Text>
                        <Text>- Lorem ipsum dolor sit amet</Text>
                    </VStack>
                </VStack>

                <Center mt={2}>
                    <Text style={styles.message}>Rendez-vous fixé au {props.date}</Text>
                    <Text color={"primary.500"}>Vous serez prévenu 30 minutes à l'avance.</Text>
                </Center>
            </VStack>
        </VStack>
    )
}

export default CardInfo