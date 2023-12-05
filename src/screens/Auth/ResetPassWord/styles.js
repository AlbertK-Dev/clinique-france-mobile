import { StyleSheet } from "react-native";

import colors from "../../../constants/colours";

const styles = StyleSheet.create({
    btn: {
        width: '95%',
        marginLeft: 10,
    },
    widthItem: {
        width: '100%'
    },
    textNumber: {
        fontWeight: "600",
        // marginBottom: 1,
        marginLeft: 14,
        marginBottom: 16,
    },

    head: {
        backgroundColor: colors.primaryColor,
        height: 50,
    },
    headTilte: {
        color: colors.whiteColor
    }

});

export default styles;