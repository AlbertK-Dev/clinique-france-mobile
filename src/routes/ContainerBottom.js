import Acceuil from "../screens/Acceuil";
import * as SCREENS from "../constants/screens";
import Notifications from "../screens/Notifications";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import colors from "../constants/colours";
import { Home3, Notification, FolderOpen } from 'iconsax-react-native';
import CustomHeader from "../components/CustomHeader";
import AppointmentStack from "./AppointmentStack";


const Bottom = createBottomTabNavigator();

const setScreenOption = ({ route }) => ({
    headerShown: true,
    header: ({ navigation, route, options }) => {
        return <CustomHeader navigation={navigation} screen={SCREENS.PROFILE} />;
    },
    tabBarIcon: ({ focused }) => {
        if (route.name === SCREENS.ACCEUIL)
            return <Home3 color={focused ? colors.primary : "#706e6e"} variant={focused ? "Bold" : "Linear"} />
        if (route.name === SCREENS.RDV_CONTAINER)
            return <FolderOpen color={focused ? colors.primary : "#706e6e"} variant={focused ? "Bold" : "Linear"} />
        if (route.name === SCREENS.NOTIFICATIONS)
            return <Notification color={focused ? colors.primary : "#706e6e"} variant={focused ? "Bold" : "Linear"} />
    },
    tabBarStyle: {
        backgroundColor: colors.bg_grey,
        paddingBottom: 2,
        paddingTop: 5
    },
    tabBarLabelStyle: {
        fontSize: 12,
    },
    tabBarShowLabel: true,
    tabBarInactiveTintColor: "#706e6e",
    tabBarActiveTintColor: colors.primary,
})

const ContainerBottom = () => {
    return (
        <Bottom.Navigator
            initialRouteName={SCREENS.ACCEUIL}
            screenOptions={setScreenOption}
        >
            <Bottom.Screen name={SCREENS.ACCEUIL} component={Acceuil} />
            <Bottom.Screen options={{tabBarLabel: "Rendez-vous"}} name={SCREENS.RDV_CONTAINER} component={AppointmentStack} />
            <Bottom.Screen name={SCREENS.NOTIFICATIONS} component={Notifications} />
        </Bottom.Navigator>
    )
}

export default ContainerBottom;