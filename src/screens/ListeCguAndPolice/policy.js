import React from "react";
import { Text, View , ScrollView} from "react-native";
import Header from "../../components/Header";
import { useTranslation } from "react-i18next";
import { styles } from "./styles";
import TitreAndText from "./titreAndText";
import { privacySections } from "../../utils/helper";

const Policy = () => {
  const translate = useTranslation().t;
  return (
    <View>
      <Header bg={"white"} title={translate("TEXT.CONFIDENTIAL_TEXT")} />
      <ScrollView>
      <View style={styles.constainer}>
        <Text style={styles.title}>Dernière mise à jour: 25 Août 2023</Text>
        <View style={{marginBottom:5, marginTop:5, gap:5}}>
          <Text>Bienvenue sur GatewayDoc Healty !</Text>
          <Text style={{ textAlign: "justify" }}>
            En utilisant l'application GatewayDoc Healty, vous acceptez notre
             politique de confidentialité Veuillez le lire attentivement avant d'utiliser
            l'application.
          </Text>
        </View>
        <View>
        {privacySections.map((section, index) => (
        <TitreAndText key={index} titre={section.title} describe={section.content}/>
      ))}
        </View>
      </View>
      </ScrollView>
    </View>
  );
};

export default Policy;
