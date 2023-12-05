import { StyleSheet } from "react-native";

import colors from "../../constants/colours";

const styles = StyleSheet.create({

    contenair: {
        flex: 1,
        flexDirection: 'column',
        borderColor: "red",
        backgroundColor: colors.bg_grey,
        height:'100%',
        },
    section1: {
        flex: 2,
        display: 'flex',
        flexDirection: "row",
        alignItems: 'center',
        padding:8,
    },
    section2: {
        flex: 1,
    },
    item:{
        marginBottom:18
    }
});

export default styles;