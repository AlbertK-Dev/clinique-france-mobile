import React from "react";
import { Text, View } from "react-native";
import Header from "../../components/Header";
import { useTranslation } from "react-i18next";
import { styles } from "./styles";
import TitreAndText from "./titreAndText";
import { cguSections } from "../../utils/helper";
import { ScrollView, VStack } from "native-base";

const CGU = () => {
  const translate = useTranslation().t;
  return (
    <View>
      <Header bg={"white"} title={translate("TEXT.GENERAL_TERMS")} />
      <ScrollView>
      <View style={styles.constainer}>
        <Text style={styles.title}>Dernière mise à jour: 25 Août 2023</Text>
        <VStack mb={3} mt={5} space={2}>
          <Text>Bienvenue sur GatewayDoc Healty !</Text>
          <Text style={{ textAlign: "justify" }}>
            En utilisant l'application [Nom de l'application], vous acceptez les
            présentes Conditions Générales d'Utilisation (ci-après désignées par
            "CGU"). Veuillez les lire attentivement avant d'utiliser
            l'application.
          </Text>
        </VStack>
        <VStack>
        {cguSections.map((section, index) => (
        <TitreAndText key={index} titre={section.title} describe={section.content}/>
      ))}
        </VStack>
      </View>
      </ScrollView>
    </View>
  );
};

export default CGU;
