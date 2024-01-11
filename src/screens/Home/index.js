import { connect, useDispatch } from "react-redux";
import OnBoarding2 from "../../components/OnBoarding";
import { NORMAL_TEXT_SIZE } from "../../constants/size";
import { setApp } from "../../redux/commons/action";
import logo from "../../assets/img/cf.png";
import { useEffect, useState } from "react";
import { Image, View } from "react-native";
import { Text, ActivityIndicator } from "react-native-paper";
import { userLocalAuth } from "../../redux/User/action";
import colors from "../../constants/colours";
import { IS_BYPASS_ONBOARDING } from "../../constants/others";
import { getLocalStorageOnBoardingState } from "../../utils/helper";
import Login from "../Auth/Login";
import { useNavigation } from "@react-navigation/native";

const Home = ({ loadingLocalAuth, localAuth }) => {
  const dispatch = useDispatch();
  const [bypassOnboarding, setBypassOnboarding] = useState(false);
  const navigation = useNavigation();
  dispatch(setApp("initial step !"));

  useEffect(() => {
    getLocalStorageOnBoardingState(IS_BYPASS_ONBOARDING).then((res) => {
      if (JSON.parse(res)?.data) {
        setBypassOnboarding(JSON.parse(res)?.data);
      }
    });
    dispatch(userLocalAuth());
  }, []);

  const renderLogin = (truth) => {
    if (truth) {
      return <Login navigation={navigation} />;
    } else {
      return <OnBoarding2 />;
    }
  };

  return (
    <>
      {!loadingLocalAuth && !localAuth ? (
        //renderLogin(bypassOnboarding)
        <OnBoarding2 />
      ) : (
        <View style={{flex:1, alignItems:'center',justifyContent:'center', backgroundColor: "white"}}>
          <View space={2}>
            <Image style={{height:100, width:100}} source={logo} alt="logo" />
              <ActivityIndicator color={colors.primary}/>
              <Text style={{color:colors.text_grey_hint, textAlign:'center'}}>
                veillez Patienter ...
              </Text>
          </View>
        </View>
      )}
    </>
  );
};
const style = {
  container: {
    flex: 1,
  },
  text: {
    fontSize: NORMAL_TEXT_SIZE,
  },
};

const mapStateToProps = ({ UserReducer }) => ({
  loadingLocalAuth: UserReducer.loadingLocalAuth,
  localAuth: UserReducer.localAuth,
});

export default connect(mapStateToProps)(Home);
