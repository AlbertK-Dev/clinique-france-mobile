import { Text, Box, HStack, View } from "native-base";
import styles from "./styles";
import { EmojiNormal, EmojiSad, EmojiHappy } from 'iconsax-react-native'
import colors from "../../constants/colours";
import { formatTimeFromDate } from "../../utils/helper";
import { Pressable } from "react-native";
import * as SCREENS from '../../constants/screens'
import { useNavigation } from "@react-navigation/native";

const NotificationsCard = ({ notification }) => {
    const navigation = useNavigation()
    return (
        <Box mb={3} style={styles.card}>
            <View style={styles.header}>
                <Box mb={2} bgColor={notification.background} style={styles.headLabel}>
                    <Text color={notification.color} fontWeight={600} style={styles.label}>{notification.triggeredBy}</Text>
                </Box>
                <Text style={styles.footerDate}>{formatTimeFromDate(notification.created_at)}</Text>
            </View>
            <Box mb={3} style={styles.content}>
                <Text mb={1} style={styles.contentTitle}>{notification.title}</Text>
                <Text style={styles.contentBody}>
                    {notification.content}
                </Text>
                {notification.type === 'completed' &&
                    <HStack mt={2} style={styles.userReact} space={5}>
                        <Box style={styles.emoji}><EmojiSad color={colors.danger} size={60} variant="Bulk" /></Box>
                        <Box style={styles.emoji}><EmojiNormal color={colors.primary} size={60} variant="Bulk" /></Box>
                        <Box style={styles.emoji}><EmojiHappy color={colors.success} size={60} variant="Bulk" /></Box>
                    </HStack>}
            </Box>
            <Pressable
                onPress={() => navigation.navigate(SCREENS.RDV_CONTAINER, {
                    screen: SCREENS.APPOINTMENT_DETAILS_SCREEN,
                    params: {
                        _id: notification.appointment
                    },
                    initial: false
                })}
                style={styles.footerLink}>
                <Text style={styles.footerText}>Afficher les détails</Text>
            </Pressable>
        </Box >
    )
}

export default NotificationsCard;