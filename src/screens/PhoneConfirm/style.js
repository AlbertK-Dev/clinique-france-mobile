import colors from "../../constants/colours";

const styles = {
  container: {
    padding: 15,
    backgroundColor: colors.white,
    height: "100%",
  },

  circle: {
    borderRadius: 50,
    height: 100,
    width: 100,
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    padding: 2,
  },

  input: {
    fontSize: 16,
    width: "92%",
    height: 50,
    marginVertical: 5,
    marginTop: 15,
    marginBottom: 10,
    backgroundColor: colors.desable,
    borderRadius: 80,
    paddingLeft: 20,
  },

  message: {
    textAlign: "center",
    color: colors.text_grey_hint,
    marginBottom: 5,
  },

  phoneNumber: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "600",
  },

  btn: {
    height: 45,
    width: "90%",
    fontSize: 14,
    borderRadius: 25,
    marginBottom: 20,
    marginTop: 10,
    borderColor: colors.primary,
  },

  btnLabel: {
    fontSize: 16,
  },
  root: { marginBottom: 10 },
  title: { textAlign: "center", fontSize: 30 },
  // codeFiledRoot: { marginTop: 20 },
  cell: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 50,
    // lineHeight: 38,
    fontSize: 24,
    borderWidth: 1,
    borderColor: "#00000030",
    textAlign: "center",
    paddingTop: "6%",
  },
  focusCell: {
    borderColor: "#000",
  },

  viewWar: {
    backgroundColor: colors.transp_warning,
    width: "85%",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    height:30,
    paddingLeft:8
  },
};

export default styles;
