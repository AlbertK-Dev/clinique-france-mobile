import { StyleSheet } from "react-native";
import colors from "../../constants/colours";


export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        borderRadius: 10,
        padding: 5,
        paddingLeft: 15,
        justifyContent: 'space-between'
    },
    subContainer: {
        display: 'flex',
        flexDirection: 'row',
    },

    image: {
        width: 25,
        height: 25,
        marginRight: 20
    },
    rimage: {
        width: 15,
        height: 15,
        marginRight: 20
    },
    label: {
        fontSize: 15
    }
})