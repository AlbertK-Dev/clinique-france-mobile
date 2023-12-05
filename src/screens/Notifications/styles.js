import { StyleSheet, Dimensions } from "react-native";
import colors from "../../constants/colours";

const screenSize = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        paddingTop: 20,
        paddingBottom: 0,
    },

    headerTitle: {
        fontSize: 20,
        paddingVertical: 6,
        paddingHorizontal:3,
        fontWeight: 700
    },

    groupTitle: {
        fontSize: 16,
        color: colors.text_grey_hint
    },

    emptyNotif: {
        height: screenSize.height*.5,
        alignItems: 'center',
        justifyContent: 'center',
    },

    emptyMsg: {
        fontSize: 16,
        color: colors.text_grey_hint,
        marginTop: 25,
        textAlign: "center"
    },

    flashList: {
        flex: 1,
    }
})

export default styles;