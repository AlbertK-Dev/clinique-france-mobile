import { StyleSheet } from "react-native";
import colors from "../../constants/colours";

const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 16,
        fontWeight: 500,
        color: colors.text_grey_hint,
        marginBottom:8
    },
    medName: {
        fontSize: 14,
        fontWeight: 600,
        color: colors.black,
    },
    profile: {
        height: 60,
        width: 60,
        borderRadius: 10,
        backgroundColor: colors.text_grey_hint
    },
    hStack:{
        display:"flex",
        flexDirection:"row",
        width:"100%"
    },

    hStackPay:{
        display:"flex",
        flexDirection:"row",
        width:"100%",
        justifyContent:"space-between",
        marginBottom:5
    },

    textCancelRdv:{
        color:colors.danger,
        fontWeight:500,
        marginLeft:5
    },

    vStack:{
        display:"flex",
        flexDirection:"column"
    },

    medCard: {
        backgroundColor: colors.white,
        padding: 10,
        borderRadius: 10,
        alignItems:"center",
        display:"flex",
        flexDirection:"row"
    },
    label: {
        color: colors.text_grey_hint
    },
    button: {
        flexGrow: 1,
        borderRadius: 20,
        marginBottom:8,
        marginTop:5
    },
    appoinmentsBox: {
        backgroundColor: colors.white,
        padding: 10,
        borderRadius: 10,
    },
    consignes: {
        backgroundColor: colors.trans_primary,
        padding: 10,
        borderRadius: 10
    },
    message: {
        textAlign: 'center',
        color: colors.text_grey_hint
    },
    alert: {
        backgroundColor: colors.transp_warning,
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        alignItems:"center",
        display:"flex",
        flexDirection:"row"
    },
    paiementContainer: {
        transition: '5s',
    },
    payment: {
        backgroundColor: "white",
    }
})

export default styles