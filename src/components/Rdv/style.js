import { StyleSheet } from "react-native";
import colors from "../../constants/colours";

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%"
    },
    mapBtn: {
        height: 40,
        width: 40,
        borderRadius: 50,
        backgroundColor: colors.white,
        borderColor: colors.primary,
        borderWidth: 1.5,
        alignItems:"center",
        justifyContent:'center'
    },
    reportBtn: {
        backgroundColor: colors.primary,
        color: "white",
        height: 40,
        display: "flex",
        flexDirection: "row",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    reportText: { color: colors.primary, fontSize: 16, fontWeight: "500" },
    left: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    infoContainer: {
        borderTopWidth: 1,
        paddingLeft: 1,
        borderTopColor: "#DFDFDF",
        marginTop: 10
    },
    infoView: {
        marginTop: 10,
        flexDirection: 'row'
    },
    infoText: {
        fontSize: 12,
        flex: 1
    },
})

export default styles