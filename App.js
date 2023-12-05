import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import Navigator from "./src/routes";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "./src/constants/colours";
import { enableScreens } from "react-native-screens";
import { Provider } from "react-redux";
import store from "./src/redux/setups/store";
import { navigationRef } from "./src/routes/rootNavigation";
import { useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";
import NetInfo from "@react-native-community/netinfo";
import { Alert } from "react-native";
import theme from "./src/theme";
import { useFonts } from "expo-font";
import { SocketProvider } from "./src/socket";

enableScreens();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [fontsLoaded] = useFonts({
    "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Thin": require("./assets/fonts/Poppins-Thin.ttf"),
    "Poppins-LightItalic": require("./assets/fonts/Poppins-LightItalic.ttf"),
    "Poppins-Italic": require("./assets/fonts/Poppins-Italic.ttf"),
    "Poppins-MediumItalic": require("./assets/fonts/Poppins-MediumItalic.ttf"),
    "Poppins-SemiBoldItalic": require("./assets/fonts/Poppins-SemiBoldItalic.ttf"),
    "Poppins-BoldItalic": require("./assets/fonts/Poppins-BoldItalic.ttf"),
    "Poppins-ThinItalic": require("./assets/fonts/Poppins-ThinItalic.ttf"),
  });

  const notificationListener = useRef();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        Alert.alert(
          "Pas de connexion internet",
          "Vérifiez que vous êtes connecté à Internet."
        );
      }
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        Alert.alert("Notification recu", notification, [{ text: "Fermer" }]);
      });

    return () => {
      unsubscribe();
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
    };
  }, []);

  if (!fontsLoaded) return null;

  return (
    <Provider store={store}>
      <SocketProvider>
        <NavigationContainer ref={navigationRef}>
          <SafeAreaView>
            <StatusBar backgroundColor={colors.primary} />
          </SafeAreaView>
          <Navigator />
        </NavigationContainer>
      </SocketProvider>
    </Provider>
  );
}
