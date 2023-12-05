import styles from "./styles";
import { EmojiNormal, EmojiSad, EmojiHappy } from 'iconsax-react-native'
import colors from "../../constants/colours";
import { formatTimeFromDate } from "../../utils/helper";
import { Pressable, View } from "react-native";
import * as SCREENS from '../../constants/screens'
import { useNavigation } from "@react-navigation/native";
import { Surface, Text } from "react-native-paper";

const NotificationsCard = ({ notification }) => {
    const navigation = useNavigation()
    console.log('color text', notification.background)
    return (
        <Surface elevation={2} style={styles.card}>
            <View style={styles.header}>
                <View  style={{...styles.headLabel, backgroundColor:notification.background}}>
                    <Text style={{...styles.label, color:notification.color}}>{notification.triggeredBy}</Text>
                </View>
                <Text style={styles.footerDate}>{formatTimeFromDate(notification.created_at)}</Text>
            </View>
            <View  style={styles.content}>
                <Text  style={styles.contentTitle}>{notification.title}</Text>
                <Text style={styles.contentBody}>
                    {notification.content}
                </Text>
                {notification.type === 'completed' &&
                    <View  style={styles.userReact} >
                        <View style={styles.emoji}><EmojiSad color={colors.danger} size={60} variant="Bulk" /></View>
                        <View style={styles.emoji}><EmojiNormal color={colors.primary} size={60} variant="Bulk" /></View>
                        <View style={styles.emoji}><EmojiHappy color={colors.success} size={60} variant="Bulk" /></View>
                    </View>}
            </View>
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
        </Surface >
    )
}

export default NotificationsCard;