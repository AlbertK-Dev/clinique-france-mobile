import Acceuil from "../screens/Acceuil";
import * as SCREENS from "../constants/screens";
import Notifications from "../screens/Notifications";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import colors from "../constants/colours";
import { Home3, Notification, FolderOpen } from "iconsax-react-native";
import CustomHeader from "../components/CustomHeader";
import AppointmentStack from "./AppointmentStack";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Pressable } from "react-native";
import { markAsReaded } from "../redux/notifications/actions";

const Bottom = createBottomTabNavigator();

const setScreenOption = ({ route }) => ({
  headerShown: true,
  header: ({ navigation, route, options }) => {
    return <CustomHeader navigation={navigation} screen={SCREENS.PROFILE} />;
  },
  tabBarIcon: ({ focused }) => {
    if (route.name === SCREENS.ACCEUIL)
      return (
        <Home3
          color={focused ? colors.primary : "#706e6e"}
          variant={focused ? "Bold" : "Linear"}
        />
      );
    if (route.name === SCREENS.RDV_CONTAINER)
      return (
        <FolderOpen
          color={focused ? colors.primary : "#706e6e"}
          variant={focused ? "Bold" : "Linear"}
        />
      );
    if (route.name === SCREENS.NOTIFICATIONS)
      return (
        <Notification
          color={focused ? colors.primary : "#706e6e"}
          variant={focused ? "Bold" : "Linear"}
        />
      );
  },
  tabBarStyle: {
    backgroundColor: colors.bg_grey,
    paddingBottom: 2,
    paddingTop: 5,
  },
  tabBarLabelStyle: {
    fontSize: 12,
  },
  tabBarShowLabel: true,
  tabBarInactiveTintColor: "#706e6e",
  tabBarActiveTintColor: colors.primary,
});

const ContainerBottom = () => {
  const unreaded = useSelector((state) => state.Notifications.unreaded);
  const dispatch = useDispatch();
  return (
    <Bottom.Navigator
      initialRouteName={SCREENS.ACCEUIL}
      screenOptions={setScreenOption}
    >
      <Bottom.Screen name={SCREENS.ACCEUIL} component={Acceuil} />
      <Bottom.Screen
        options={{ tabBarLabel: "Rendez-vous" }}
        name={SCREENS.RDV_CONTAINER}
        component={AppointmentStack}
      />
      <Bottom.Screen
        listeners={{
          tabPress: (e) => {
            dispatch(markAsReaded());
          },
        }}
        options={{
          ...setScreenOption,
          lazy: true,
          tabBarBadge: unreaded === 0 ? null : unreaded,
        }}
        name={SCREENS.NOTIFICATIONS}
        component={Notifications}
      />
    </Bottom.Navigator>
  );
};

export default ContainerBottom;
