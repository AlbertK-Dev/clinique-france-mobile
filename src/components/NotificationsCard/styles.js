import { StyleSheet } from "react-native";
import colors from "../../constants/colours";

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.white,
        borderRadius: 10,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 1
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
        fontWeight: '500',
    },

    contentTitle: {
        fontWeight: '600',
        fontSize: 16
    },

    contentBody: {
        color: colors.text_grey_hint
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
        justifyContent: 'center'
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