import colors from "../../constants/colours";
import { StyleSheet } from 'react-native';


const styles = {
    circle: {
        borderRadius: 50,
        height: 100,
        width: 100,
        backgroundColor: colors.secondary,
        alignItems: 'center',
        justifyContent: 'center'
    },

    title: {
        fontSize: 20,
        fontWeight: '700',
        padding: 2
    },

    message: {
        textAlign: 'center',
        color: colors.text_grey_hint,
        marginBottom: 5
    },

    phoneNumber: {
        color: colors.primary,
        fontSize: 16,
        fontWeight: '600'
    },

    btn: {
        height: 45,
        width: '90%',
        fontSize: 14,
        borderRadius: 25,
        borderColor: colors.primary,
    },

    btnLabel: {
        fontSize: 16
    },
    root: {marginBottom: 10},
    title: { textAlign: 'center', fontSize: 30 },
    // codeFiledRoot: { marginTop: 20 },
    cell: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        borderRadius: 50,
        // lineHeight: 38,
        fontSize: 24,
        borderWidth: 1,
        borderColor: '#00000030',
        textAlign: 'center',
        paddingTop: "6%"
    },
    focusCell: {
        borderColor: '#000',
    },
}

export default styles;