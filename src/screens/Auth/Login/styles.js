import { StyleSheet } from 'react-native';
import colors from '../../../constants/colours';

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingHorizontal: 15
  },
  connexionText: {
    fontWeight: "700",
    fontSize: 24,
  },

  input: {
    fontSize: 16,
    width: "80%",
    height: 43,
    marginVertical: 5,
    backgroundColor: colors.desable,
    borderTopRightRadius: 80,
  },

  logoBox: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    marginTop: 10,
  },

  forgetPassword: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.yellow,
    textAlign: 'center',
    textDecorationLine: 'underline'
  },

  text1: {
    color: "#858585",
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center'
  },

  clor: {
    color: colors.secondaryColor,
    fontSize: 16,
    fontWeight: "400"
  },
  forgetpass: {
    fontWeight: "400",
    color: colors.secondaryColor,
    fontSize: 16,
    marginLeft: "auto",
    marginRight: 2,
    marginTop: 10,
    textDecorationLine: 'underline',
    textDecorationColor: colors.secondaryColor,
    textDecorationStyle: 'solid',
  },
  textT: {
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
    color: colors.blackffColor,
    textAlign: 'center',

  },
  clorS: {
    color: colors.secondaryColor,
    fontSize: 12,
    fontWeight: "400",
    textAlign: 'center',
  },
  submitBtnText: {
    marginBottom: 10,
    marginTop: 10,
    width: '100%',
    borderRadius: 25,
    //color: colors.black,
    alignItems: 'center',
    height: 48,
    justifyContent: 'center',
  },

  formContent: {
    justifyContent: "center",
    width: '100%',
  },
  formInput: {
    borderRadius: 25,
  },

  inputConex: {
    marginTop: 10,
    marginBottom: 7,
    borderRadius: 30,
    height: 25,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderColor: '#F5FAFF',
    backgroundColor: '#F5FAFF',
  },

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
  image: { width: 150, height: 150, marginTop: 30 },
  errorMsg: {
    color: "red",
    fontSize: 14,
    marginTop: 3,
    marginLeft: 8,
  },
  labelText: { color: "#858585"},

  registerText: {
    textDecorationLine: 'underline'
  },

  leftElement: {
    backgroundColor: "white",
    borderRadius: 50,
    height: 35,
    width: 35,
    marginLeft: 8
  },

  warninBox:{
    backgroundColor: colors.transp_warning,
    borderRadius: 5,
    padding: 8,
    display:'flex',
    flexDirection:"row",
    alignItems:'center'
  },

  warningText:{
    fontSize: 12,
    color: colors.danger,
    left:5
  },

  cguBox:{
    display:'flex',
    flexDirection:"row",
    alignItems:'center',
    marginTop:8
  },

  viewInput: {
    display: "flex",
    flexDirection: "row",
    paddingLeft: 10,
    alignItems: "center",
    justifyItems: "center",
    backgroundColor: colors.desable,
    borderRadius:50,
    marginTop:10,
    marginBottom:5
  },

  viewBoxIcon:{
    display:'flex',
    alignItems: "center",
    justifyItems: "center",
    justifyContent:'center',
    height:35,
    width:35,
    backgroundColor:colors.white,
    borderRadius:50
  },
});


export default styles;
