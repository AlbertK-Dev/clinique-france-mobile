import { StyleSheet } from "react-native";
import colors from "../../constants/colours";

const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 16,
        fontWeight: 500,
        color: colors.text_grey_hint
    },
    medName: {
        fontSize: 14,
        fontWeight: 600,
        color: colors.black
    },
    profile: {
        height: 60,
        width: 60,
        borderRadius: 10,
        backgroundColor: colors.text_grey_hint
    },
    medCard: {
        backgroundColor: colors.white,
        padding: 10,
        borderRadius: 10
    },
    label: {
        color: colors.text_grey_hint
    },
    button: {
        flexGrow: 1,
        borderRadius: 20,
    },
    appoinmentsBox: {
        backgroundColor: colors.white,
        padding: 10,
        borderRadius: 10,
    },
    consignes: {
        backgroundColor: colors.trans_primary,
        padding: 10,
        borderRadius: 10
    },
    message: {
        textAlign: 'center',
        color: colors.text_grey_hint
    },
    alert: {
        backgroundColor: colors.transp_warning,
        borderRadius: 10,
        padding: 10,
        alignItems: "center",
        marginBottom: 10,
    },
    paiementContainer: {
        transition: '5s',
    },
    payment: {
        backgroundColor: "white",
    }
})

export default styles