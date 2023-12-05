import colors from "../../constants/colours";

const styles = {
  container: {
    backgroundColor: colors.white,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 8,
  },

  header: {
    height: 40,
    alignItems: "center",
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
  },

  contentBox: {
    transition: "1s",
    marginVertical:5
  },

  title: { fontWeight: "700", color: colors.black, fontSize: 16 },
  description: { fontWeight: "600", color: colors.black, fontSize: 14 },

};

export default styles;
