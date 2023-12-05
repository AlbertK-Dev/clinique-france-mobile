import React, { useEffect } from "react";
import * as SCREENS from "../constants/screens";
import FAQ from "../screens/FAQ";
import Notifications from "../screens/Notifications";
import Profile from "../screens/Profile";
import MonProfile2 from "../screens/MonProfile/index2";
import MakeAppointment from "../screens/MakeAppointment";
import ContainerBottom from "./ContainerBottom";
import Transaction from "../screens/Transactions";
import Payment from "../screens/Payment";
import Parametres from "../screens/Parametres";
import AboutUs from "../screens/AboutUs";
import RoadMap from "../screens/GoogleMap";
import { GlobalSearch } from "../screens/GlobalSearch";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import Policy from "../screens/ListeCguAndPolice/policy";
import CGU from "../screens/ListeCguAndPolice/cgu";
import Licenses from "../screens/ListeCguAndPolice/licenses";
import Success from "../screens/Success";
import { DetailsPraticien } from "../screens/DetailsPraticiens";
import { useSocket } from "../socket";
import { useDispatch, useSelector } from "react-redux";
import { saveSocketNotifications } from "../redux/notifications/actions";

const Stack = createSharedElementStackNavigator();

const ContainerStack = () => {
  const dispatch = useDispatch();
  const userInfos = useSelector((state) => state.UserReducer.userInfos);
  const socket = useSocket();
  useEffect(() => {
    const { user } = userInfos;
    socket.on("connected", (data) => {
      socket.emit("setUserId", user._id);
    });
    socket.on("notification", (notification) => {
      dispatch(saveSocketNotifications(notification));
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <Stack.Navigator
      initialRouteName={SCREENS.ACCEUIL}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={SCREENS.ACCEUIL_CONTAINER}
        component={ContainerBottom}
      />
      <Stack.Screen name={SCREENS.FAQ_SCREEN} component={FAQ} />
      <Stack.Screen
        name={SCREENS.NOTIFICATIONS_SCREEN}
        component={Notifications}
      />
      <Stack.Screen name={SCREENS.PROFILE} component={Profile} />
      <Stack.Screen name={SCREENS.MON_PROFILE} component={MonProfile2} />
      <Stack.Screen
        options={{ animationEnabled: true }}
        name={SCREENS.MAKE_APPOINTMENT_SCREEN}
        component={MakeAppointment}
      />
      <Stack.Screen name={SCREENS.TrANSACTION} component={Transaction} />
      <Stack.Screen name={SCREENS.PAYMENT} component={Payment} />
      <Stack.Screen name={SCREENS.SETTINGS} component={Parametres} />
      <Stack.Screen name={SCREENS.GLOBAL_SEARCH} component={GlobalSearch} />
      <Stack.Screen name={SCREENS.ABOUT_US} component={AboutUs} />
      <Stack.Screen name={SCREENS.GOOGLE_MAP} component={RoadMap} />
      <Stack.Screen name={SCREENS.CGU} component={CGU} />
      <Stack.Screen name={SCREENS.POLICY} component={Policy} />
      <Stack.Screen name={SCREENS.SUCCESS} component={Success} />
      <Stack.Screen name={SCREENS.LICENSES} component={Licenses} />
      <Stack.Screen
        name={SCREENS.DETAILS_PRATICIEN}
        component={DetailsPraticien}
      />
    </Stack.Navigator>
  );
};

export default ContainerStack;
