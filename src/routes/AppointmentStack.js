import { createStackNavigator } from "@react-navigation/stack";
import * as SCREENS from "../constants/screens";
import MesRdv from "../screens/MesRdv";
import AppointmentDetails from "../screens/AppointmentDetails";
import { ReportRDV } from "../screens/ReportRDV";

const Stack = createStackNavigator();

const AppointmentStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={SCREENS.RDV}>
            <Stack.Screen name={SCREENS.RDV} component={MesRdv} />
            <Stack.Screen name={SCREENS.APPOINTMENT_DETAILS_SCREEN} component={AppointmentDetails} />
            <Stack.Screen name={SCREENS.APPOINTMENT_REPORT_SCREEN} component={ReportRDV} />
        </Stack.Navigator>
    )
}

export default AppointmentStack;