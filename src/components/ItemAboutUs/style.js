import { StyleSheet } from "react-native";
import colors from "../../constants/colours";


export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        backgroundColor: colors.white,
        padding: 5
    },
    subContainer: {
        alignItems: 'center',
        padding: 10,
        display:"flex",
        flexDirection:"row"
    },
    label: {
        fontSize: 14,
        color: colors.black
    },

    description: {
        fontSize: 12,
        color: colors.text_grey_hint
    }
})