import { StyleSheet, Dimensions } from "react-native";
import colors from "../../constants/colours";

const screenSize = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        paddingTop: 20,
        marginBottom: 20
    },

    headerTitle: {
        fontSize: 18,
        paddingVertical: 2,
        fontWeight: 600
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
        marginTop: 25
    },

    flashList: {
        flex: 1,
    }
})

export default styles;