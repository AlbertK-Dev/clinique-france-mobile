import { StyleSheet } from 'react-native';
import colors from '../../../constants/colours';


const styles = {
    title: {
        fontSize: 20,
        fontWeight: '700',
        marginTop:20,
        marginBottom:10
    },

    message: {
        textAlign: 'center',
        color: colors.text_grey_hint,
        marginBottom: 10,
        marginTop:15,
        fontSize:16
    },

    phoneNumber: {
        color: colors.primary,
        fontSize: 16,
        fontWeight: '600',
        marginBottom:15,
    },

    btn: {
        height: 45,
        width: '90%',
        fontSize: 14,
        borderRadius: 25,
        borderColor: colors.primary,
    },

    btnLabel: {
        fontSize: 18
    },
    root: {marginBottom: 10, marginTop:10},

    cell: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        borderRadius: 50,
        fontSize: 24,
        borderWidth: 1,
        borderColor: '#00000030',
        textAlign: 'center',
        paddingTop: "6%"
    },
    focusCell: {
        borderColor: '#000',
    },

    container: {
        padding: 20,
        backgroundColor:colors.white,
        height:"100%"
      },
      btn: {
        width: "95%",
        marginLeft: 10,
        marginBottom: 15,
        height:50,
        borderRadius:80,
        justifyContent:'center'
      },
      widthItem: {
        width: "100%",
      },
      textNumber: {
        fontWeight: "600",
        marginLeft: 14,
        marginBottom: 16,
      },

      TextEmailChange:{
        display:'flex',
        flexDirection:"row",
        alignItems:'center',
        marginTop:8
      },
    
      head: {
        backgroundColor: colors.primaryColor,
        height: 50,
      },
      headTilte: {
        color: colors.whiteColor,
      },
    
      circle: {
        borderRadius: 50,
        height: 100,
        width: 100,
        backgroundColor: colors.secondary,
        alignItems: "center",
        justifyContent: "center",
      },

      input: {
        fontSize: 16,
        height: 50,
        marginVertical: 5,
        backgroundColor: colors.desable,
        marginBottom:10
      },
}

export default styles;