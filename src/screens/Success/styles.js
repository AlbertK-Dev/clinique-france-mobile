import { StyleSheet } from "react-native";

import colors from "../../constants/colours";

const styles = StyleSheet.create({
  contenair: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal:15,
    justifyContent:"center",
    backgroundColor:colors.white
  },

  box1: {
    justifyContent: "center",
    alignItems: "center",
    gap:15
  },

  box2: {
    width: "100%",
    marginTop:50,
    marginBottom:30,
    gap:8
  },
  texte1: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    color: colors.white,
  },
  texte2: {
    fontSize: 14,
    textAlign: "center",
    color: colors.white,
  },

  texte3: {
    fontSize: 14,
    color: colors.white,
  },

  box3: {
    width:"100%",
    justifyContent:'space-between',
    display:"flex",
    flexDirection:"row"
  },
  btn: { backgroundColor: colors.white, borderRadius: 10, marginBottom: 10, width: "100%", height: 50, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }
});

export default styles;
