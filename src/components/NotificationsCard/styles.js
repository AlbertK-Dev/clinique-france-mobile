import { StyleSheet } from "react-native";
import colors from "../../constants/colours";

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.white,
        borderRadius: 10,
        padding: 10,
        marginBottom:12,
        margin:3,
        gap:5
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    headLabel: {
        height: 30,
        width: '35%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },

    label: {
        fontWeight: '700',
        fontSize:16
    },

    contentTitle: {
        fontWeight: '600',
        fontSize: 16
    },

    contentBody: {
        color: colors.text_grey_hint,
        fontSize:14
    },

    footerLink: {
        padding: 5,
        width: 120
    },

    footerText: {
        color: colors.primary,
        textDecorationLine: 'underline',
    },

    footerDate: {
        fontSize: 12,
        color: colors.text_grey_hint,
    },

    userReact: {
        alignItems: 'center',
        justifyContent: 'center',
        display:'flex',
        flexDirection:'row',
        gap:5
    },

    emoji: {
        height: 50,
        width: 50,
        borderRadius: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: "center"
    }
})

export default styles;