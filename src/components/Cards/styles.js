import { StyleSheet } from "react-native";

import colors from "../../constants/colours";

const styles = StyleSheet.create({
    iconIcon: {
        width: 60,
        height: 60,
        shadowColor: colors.bg_grey,
        elevation: 2,
        backgroundColor: colors.whiteColor,
        borderRadius: 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    textT: {
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400',
        color: colors.blackffColor,
        textAlign: 'center',
    },
    clorS: {
        color: colors.secondaryColor,
        fontSize: 14,
        fontWeight: "400",
        textAlign: 'center',
    },
});

export default styles;