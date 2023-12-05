import { StyleSheet } from "react-native";
import colors from "../../../constants/colours";

const styles = StyleSheet.create({
  inputConex: {
    marginTop: 10,
    marginBottom: 7,
    borderRadius: 30,
    height: 50,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderColor: "#F5FAFF",
    backgroundColor: "#F5FAFF",
  },

  datePick: {
    backgroundColor: colors.desable,
    alignItems: "center",
    height: 50,
  },

  boxDatePick: {
    height: 30,
    width: 30,
    backgroundColor: colors.desable,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  inputConexJust: {
    marginTop: 10,
    borderRadius: 30,
    height: 50,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderColor: "#7C7C7C",
    backgroundColor: "#F5FAFF",
    justifyContent: "center",
  },

  submitBtnText: {
    width: "100%",
    borderRadius: 50,
    color: colors.secondaryColor,
    alignItems: "center",
    height: 48,
    justifyContent: "center",
  },

  contenair: {
    paddingHorizontal: 15,
    backgroundColor: "white",
  },
  contentForm: {
    justifyContent: "center",
  },

  // New

  logoBox: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  intitule: {
    color: "#858585",
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center'
  },

  image: { width: 200, height: 150, marginTop: 20 },

  labelText: { color: "#858585"},

  registerText: {
    textDecorationLine: 'underline',
    marginLeft: 5
  },

  forgetPassword: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.yellow,
    textAlign: 'center'
  },

  cgu: {
    fontWeight: "400",
    fontSize: 14,
    color: colors.text_grey_hint,
    fontStyle: "normal",
  },

  cguText: {
    color: colors.yellow,
    textDecorationLine: "underline",
    marginLeft: 3
  },

  leftElement: {
    backgroundColor: "white",
    borderRadius: 50,
    height: 35,
    width: 35,
    marginLeft: 8
  }

});

export default styles;
