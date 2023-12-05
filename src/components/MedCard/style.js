import { StyleSheet } from "react-native";
import colors from "../../constants/colours";

const styles = StyleSheet.create({
    medBox: {
        height: 290,
        backgroundColor: colors.white,
        width: 200,
        borderRadius: 15,
        padding: 10,
        marginRight: 20
    },
    medPic: {
        backgroundColor: colors.bg_grey,
        height: 90,
        borderRadius: 15,
        width:'100%'
    },
    medName: {
        fontWeight: '600',
    },
    location: {
        color: colors.text_grey_hint
    },
    icon: {
        marginRight: 10,
    },
    tarif: {
        color: colors.secondary
    },
    rdvBtn: {
        height: 40,
        width: '100%',
        backgroundColor: colors.primary,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    }
})

export default styles