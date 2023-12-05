import { StyleSheet } from "react-native";
import colors from "../../constants/colours";

const styles = StyleSheet.create({

  medCard: {
    borderRadius: 10,
    padding: 10,
    display:"flex",
    flexDirection:"row",
    backgroundColor:colors.white,
    gap:10,
    marginBottom:2,
    borderLeftWidth:1,
    borderColor:colors.primary
  },
  medPic: {
    height: 65,
    width: 65,
    backgroundColor: colors.bg_grey,
    borderRadius: 15,
  },

  hStack:{
    display:'flex',
    flexDirection:'row'
  },

  infos: {
    fontSize: 12,
    color: colors.text_grey_hint,
  },
});

export default styles;
