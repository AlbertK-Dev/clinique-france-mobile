import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    back: {
        position: "relative",
        height: 45,
        width: 45,
        borderRadius: 50
    },
    title: {
        fontSize: 18,
        marginLeft: -10
    },
    mapView: {
        flex: 1
    },
    mapHeader: {
        display: "flex",
        flexDirection: 'row',
        position: 'absolute',
        top: 20,
        left: "50%",
        transform: [{
            translateX: -170
        }],
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: {
            height: 1,
            width: 0
        },
        alignItems: 'center',
        width: 50,
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        backgroundColor: "white"
    }
})

export default styles