import React from "react";
import { TouchableOpacity, Image, Platform, Linking, View, ScrollView } from "react-native";
import Header from "../../components/Header";
import styles from "./styles";
import * as SCREENS from "../../constants/screens";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import ItemAboutUs from "../../components/ItemAboutUs";
import logo from "../../assets/img/hospi-rdv__9_-removebg-preview.png"
import { TableDocument, Star1, Profile2User, Share } from 'iconsax-react-native'
import colors from "../../constants/colours";


function AboutUs() {
  const translate = useTranslation().t;
  const navigation = useNavigation();


  const openAppStoreOrPlayStore = () => {
    const storeURL = Platform.OS === "ios"
      ? "https://apps.apple.com/us/app/facebook/id284882215"
      : "https://play.google.com/store/apps/details?id=com.facebook.katana&hl=en&gl=US";

    Linking.openURL(storeURL);
  };

  const shareApp = () => {
    // Share.share({
    //   message: "Découvrez cette superbe application de prise de rendez-vous médical!",
    //   url: "https://link-to-your-app",
    //   title: "GatewaysDoc Healty",
    // });
  };

  const openTelegram = () => {
    Linking.openURL("https://t.me/+N2wclwqKJTZIOGY0");
  };
  return (
    <View style={{ ...styles.contenair }}>
      <Header title={"A Propos"} />
      <ScrollView height={'100%'} showsVerticalScrollIndicator={false}>
        <View style={{ ...styles.section1 }}>
          <View alignItems={"center"} justifyItems={'center'} justifyContent={'center'} width={'100%'}>
            {<Image style={{ height: 150, width: 150 }} source={logo} />}
          </View>
        </View>
        <View style={styles.section2}>
          <TouchableOpacity style={styles.item}>
            <ItemAboutUs
              icon={<TableDocument  color={colors.primary}/>}
              tilte={translate("TEXT_APP_NAME")}
              description={
                "Prenez votre rendez-vous, à tout moment et en tout lieu, en toute simplicité"
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={openAppStoreOrPlayStore}
          >
            <ItemAboutUs
              icon={<Star1 color={colors.primary}/>}
              tilte={translate("TEXT_RATING")}
              description={"Vous aimez cette application ? dites-nous comment nous pouvons l'améliorer"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={shareApp}
          >
            <ItemAboutUs
              icon={<Share color={colors.primary}/>}
              tilte={translate("TEXT_SHARE")}
              description={"Partager application avec vos amis et votre famille"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={openTelegram}
          >
            <ItemAboutUs
              icon={<Profile2User color={colors.primary} />}
              tilte={translate("TEXT_CREW")}
              description={"Chattez avec notre équipe en rejoignant le canal télégram"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate(SCREENS.CGU)}
            style={styles.item}
          >
            <ItemAboutUs
              icon={<TableDocument color={colors.primary} />}
              tilte={translate("TEXT.CGU")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate(SCREENS.POLICY)}
            style={styles.item}
          >
            <ItemAboutUs
              icon={<TableDocument color={colors.primary}/>}
              tilte={translate("TEXT.CONFIDENTIAL_TEXT")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate(SCREENS.LICENSES)}
            style={styles.item}
          >
            <ItemAboutUs
              icon={<TableDocument color={colors.primary}/>}
              tilte={translate("Licenses et remerciements")}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

export default AboutUs;
