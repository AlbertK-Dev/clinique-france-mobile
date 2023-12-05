import { StyleSheet } from "react-native";
import colors from "../../constants/colours";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:'100%',
    padding:10,
    marginTop:10
  },

  
  textCoord: {
    fontSize: 16,
  },

  title: {
    fontSize:20,
    color:colors.black,
    fontWeight:'600'
  },

  empty:{
    justifyContent:"center",
    alignContent:"center",
    alignItems:"center",
    marginTop:'40%'

},

  astuceTilte: {
    fontSize:14,
    color:colors.primary,
  },

  boxSection: {
    borderRadius:10,
    alignItems:"center",
    padding:2,
    paddingLeft:10
  },

  boxText: {
    backgroundColor:colors.trans_primary,
    borderRadius:10,
    padding:2
  },

  
});
