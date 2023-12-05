import { StyleSheet } from "react-native";
import colors from "../../constants/colours";

const styles = StyleSheet.create({
    filter: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.01,
        shadowRadius: 3.84,
        elevation: 0.1,
    },
    medCard: {
        borderRadius: 10,
        padding: 10
    },
    medPic: {
        height: 65,
        width: 65,
        backgroundColor: colors.bg_grey,
        borderRadius: 15
    },
    infos: {
        fontSize: 12,
        color: colors.text_grey_hint,
    }
})

export default styles