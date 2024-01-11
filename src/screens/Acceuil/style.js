import { StyleSheet } from "react-native";
import colors from "../../constants/colours";

const styles = StyleSheet.create({
  filter: {
    paddingHorizontal: 20,
    margin:5,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor:colors.white
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.01,
    shadowRadius: 3.84,
    elevation: 0.1,
  },
  medCard: {
    borderRadius: 10,
    padding: 10,
  },
  medPic: {
    height: 65,
    width: 65,
    backgroundColor: colors.bg_grey,
    borderRadius: 15,
  },
  infos: {
    fontSize: 12,
    color: colors.text_grey_hint,
  },
  viewBoxIcon: {
    display: "flex",
    alignItems: "center",
    justifyItems: "center",
    justifyContent: "center",
    height: 35,
    width: 35,
    backgroundColor: colors.white,
    borderRadius: 50,
  },

  viewInput: {
    display: "flex",
    flexDirection: "row",
    paddingLeft: 10,
    alignItems: "center",
    justifyItems: "center",
    backgroundColor: colors.white,
    borderRadius:50,
    marginTop:10,
    marginBottom:10
  },

  input: {
    fontSize: 16,
    width: "80%",
    height: 35,
    marginVertical: 5,
    backgroundColor: colors.white,
    borderTopRightRadius: 80,
  },

  viewBoxFirstRdv:{
    display: "flex",
    alignItems: "center",
    justifyItems: "center",
    justifyContent: "center",
    flexDirection:"column",
    paddingVertical:10,
    marginHorizontal: -5,
    backgroundColor: colors.white,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius:15,
    borderBottomRightRadius:15
  },

  viewBoxTextFirstRdv:{
    display: "flex",
    flexDirection:"row",
    justifyContent: "space-between",
    width:"100%",
    paddingHorizontal:15,
    marginBottom:10
  },
  textBold:{
    fontWeight:"600",
    fontSize:16,
  },
  viewBoxEmplacment:{
    display: "flex",
    flexDirection:"row",
    width:"100%",
    backgroundColor:colors.white,
    padding:10
  },

  textEmplacment:{
    display: "flex",
    flexDirection:"column",
    width:"100%",
    backgroundColor:colors.white,
    padding:10
  },


});

export default styles;
