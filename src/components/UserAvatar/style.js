import { StyleSheet } from "react-native";
import colors from "../../constants/colours";


export const styles = StyleSheet.create({
    nameText: {
        fontSize: 18,
    },
    emailText: {
        color: 'gray'
    },
    age: {
        color: 'gray',
        textAlign: "center"
    },
    info: {
        marginLeft: 10
    },
    image: {
        width: 20,
        height: 30
    },

    avatarBox:{
        alignItems:"center",
        display:'flex',
        flexDirection:'row', 
        gap:10
    }
})