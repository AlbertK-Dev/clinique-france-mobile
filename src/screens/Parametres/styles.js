import colors from "../../constants/colours";

const styles = {
  container: {
    backgroundColor: colors.bg_grey,
  },

  headerItemGroup: {
    padding: 20,
  },

  headerText: {
    color: colors.text_grey_hint,
  },

  headerItem: {
    marginBottom: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"space-between",
    gap: 10,
  },

  item1:{
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },

  textBox: {
    fontSize: 14,
    flex: 1,
  },

  lng: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
};

export default styles;
