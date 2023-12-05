import { StyleSheet } from "react-native";

import colors from "../../constants/colours";

const styles = StyleSheet.create({
  contenair: {
    flex: 1,
    flexDirection: "column",
    height: "100%",
    paddingHorizontal:20,
  },

  box1: {
    justifyContent: "center",
    alignItems: "center",
  },
  box2: {
    width: "100%",
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
    justifyContent:'space-between'
  },
  btn: { backgroundColor: colors.white, borderRadius: 10, marginBottom: 10, width: "100%" }
});

export default styles;
