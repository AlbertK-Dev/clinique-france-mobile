import { createStackNavigator } from "@react-navigation/stack";
import * as SCREENS from "../constants/screens";
import ContainerStack from "./ContainerStack";
import HomeStack from "./HomeStack";

const Stack = createStackNavigator();

const Navigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name={SCREENS.HOME_ROUTE} component={HomeStack} />
            <Stack.Screen name={SCREENS.HOME_CONTAINER_ROUTE} component={ContainerStack} />
        </Stack.Navigator>
    )
}

export default Navigator;