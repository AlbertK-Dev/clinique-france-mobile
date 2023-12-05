import { StyleSheet } from 'react-native';
import colors from '../../constants/colours';
import { DEFAULT_FONT_FAMILY_BOLD } from '../../constants/others';
const styles = StyleSheet.create({
  connectWith: {
    color: "#858585"
  },

  boxIcon: {
    justifyContent: 'center',
    width: 40,
    height: 40,
    paddingLeft: 8,
    paddingTop: 8,
    backgroundColor: 'white'

  },

  boxGoogle: {
    justifyContent: 'center',
    width: 28,
    height: 28,
    paddingLeft: 0,
    paddingTop: 0,
    backgroundColor: colors.primary

  },
  noRDV: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  empty: {
    color: colors.text_grey_hint,
    fontSize: 16,
    marginTop: 10
  },

  flatList: {
    flex: 1,
    marginHorizontal: 15
  },

  filterBtn: {
    paddingVertical: 15,
    width: '50%',
    borderColor: "#c2c2c2",
  },

  btnLeftItem: {
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderRightWidth: 0
  },

  btnRightItem: {
    borderWidth: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },

  sortBtn: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderColor: "#c2c2c2",
  },

  label: {
    textAlign: 'center'
  },

  title: {
    marginBottom: 10,
    fontSize: 16,
  },

  btnItem: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
  },

  sectionTitle: {
    fontWeight: 600,
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold'
  },

  display: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 15,
  },

  tabView: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    marginBottom: 15
  },

  card: {
    width: '100%',
    flex: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 1,
  },

  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  filter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },

  tab: {
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    height: "100%",
    backgroundColor: "#EEEFF3",
    borderRadius: 10,
  }
});


export default styles;
