import React, { useState } from "react";
import {View, TouchableOpacity, Alert } from "react-native";
import Header from "../../components/Header";
import ParameterList from "../../components/parameterList/";
import UserAvatar from "../../components/UserAvatar";
import styles from "./styles";
import * as SCREENS from "../../constants/screens";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../redux/User/action";
import { useTranslation } from "react-i18next";
import { Platform } from "react-native";

function Profile() {
  const [tryLogout, setTryLogout] = useState();
  const translate = useTranslation().t;
  const user = useSelector((state) => state.UserReducer.userInfos);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  if (tryLogout) {
    Alert.alert(
      Platform.OS === "ios"
        ? translate("TEXT_LOGOUT_TITLE")
        : translate("TEXT_LOGOUT_TITLE_MINUSC"),
      translate("TEXT_TRYNG_LOGOUT"),
      [
        {
          text: translate("TEXT_CONTINUE"),
          style: "destructive",
          onPress: () => {
            dispatch(userLogout());
            setTryLogout(false);
          },
        },
        { text: translate("TEXT_ABORT"), onPress: () => setTryLogout(false) },
      ]
    );
  }

  return (
    <View style={{ ...styles.contenair }}>
      <Header title={"Mon compte"} />
      <View style={{ ...styles.section1 }}>
        <View style={{ ...styles.section2of1 }}>
          <UserAvatar
            uri={user?.user?.photo || "https://www.ucf.edu/wp-content/blogs.dir/19/files/2019/12/Hospitality-Professional-At-Work-web.jpg"}
            name={user?.user?.name ?? ""}
            email={user?.user?.email ?? ""}
          />
        </View>
      </View>
      <View style={styles.section2}>
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate(SCREENS.MON_PROFILE)}
        >
          <ParameterList  label={translate("TEXT.MY_PROFILE")} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(SCREENS.SETTINGS)}
          style={styles.item}
        >
          <ParameterList
            label={"Parametres"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate(SCREENS.TrANSACTION)}
        >
          <ParameterList
            label={"Historique de transaction"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate(SCREENS.FAQ_SCREEN)}
        >
          <ParameterList  label={"FAQ et Assistance"} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(SCREENS.ABOUT_US)}
          style={styles.item}
        >
          <ParameterList  label={"A propos"} />
        </TouchableOpacity>
      </View>
      <View style={styles.section3}>
        <TouchableOpacity
          onPress={() => setTryLogout(true)}
          style={{ ...styles.item, height: "50%" }}
        >
          <ParameterList  label={"Se déconnecter"} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Profile;
