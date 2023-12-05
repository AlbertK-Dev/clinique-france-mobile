import React from "react";
import { Text, View } from "react-native";
import Header from "../../components/Header";
import { useTranslation } from "react-i18next";
import { styles } from "./styles";
import TitreAndText from "./titreAndText";
import { privacySections } from "../../utils/helper";
import { ScrollView, VStack } from "native-base";

const Policy = () => {
  const translate = useTranslation().t;
  return (
    <View>
      <Header bg={"white"} title={translate("TEXT.CONFIDENTIAL_TEXT")} />
      <ScrollView>
      <View style={styles.constainer}>
        <Text style={styles.title}>Dernière mise à jour: 25 Août 2023</Text>
        <VStack mb={3} mt={5} space={2}>
          <Text>Bienvenue sur GatewayDoc Healty !</Text>
          <Text style={{ textAlign: "justify" }}>
            En utilisant l'application GatewayDoc Healty, vous acceptez notre
             politique de confidentialité Veuillez le lire attentivement avant d'utiliser
            l'application.
          </Text>
        </VStack>
        <VStack>
        {privacySections.map((section, index) => (
        <TitreAndText key={index} titre={section.title} describe={section.content}/>
      ))}
        </VStack>
      </View>
      </ScrollView>
    </View>
  );
};

export default Policy;
