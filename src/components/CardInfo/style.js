import { StyleSheet } from "react-native";
import colors from "../../constants/colours";

const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 16,
        color: colors.text_grey_hint
    },
    medName: {
        fontSize: 14,
//        fontWeight: 600,
        color: colors.black
    },
    label: {
        color: colors.text_grey_hint
    },
    appoinmentsBox: {
        backgroundColor: colors.white,
        padding: 10,
        borderRadius: 10,
        marginTop:2,
        gap:3
    },
    consignes: {
        backgroundColor: colors.trans_primary,
        padding: 10,
        borderRadius: 10,
        marginTop:10
    },
    message: {
        textAlign: 'center',
        color: colors.text_grey_hint
    },
    alert: {
        backgroundColor: colors.transp_warning,
        borderRadius: 10,
        padding: 10,
        alignItems: "center",
    },

    hStackView:{
        display:"flex",
        flexDirection:"row",
        justifyContent:'space-between'
    },
    textColor:{
        color:colors.primary,
        fontSize:16
    },
    iconTextConsigne:{
        display: "flex", 
        flexDirection: "row", 
        alignContent:"center",
        gap:5
    }
})

export default styles