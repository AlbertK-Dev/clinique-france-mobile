import React from "react";
import { View, ScrollView } from "react-native";
import { Text, TextInput } from "react-native-paper";
import styles from "./style";
import colors from "../../constants/colours";
import Accordion from "../../components/Accordion";
import Header from "../../components/Header";
import { Global, MessageText1, TableDocument } from "iconsax-react-native";

const IconItem = (props) => {
  return (
    <View style={styles.headerItem}>
      <View style={styles.iconBox}>{props.iconType}</View>
      <Text style={styles.textBox}>{props.text}</Text>
    </View>
  );
};

const FAQ = () => {
  const [searchedValue, setSearchedValue] = React.useState("");

  const handleChange = (text) => {
    setSearchedValue(text);
  };

  return (
    <View flex={1} style={styles.container}>
      <Header bg={"white"} title={"Contactez l'Assistance"} />
      <View style={styles.headerItemGroup}>
        <View >
          <Text style={styles.headerText}>
            Vous n'avez pas trouvé la réponse que vous cherchiez? Contactez
            notre centre d'assistance!
          </Text>
        </View>
        <View mb={2}>
          <IconItem
            iconType={<Global color={colors.primary}/>}
            text="Aller sur notre site web"
          />
          <IconItem
            iconType={<MessageText1 color={colors.primary}/>}
            text="Envoyez-nous un e-mail"
          />
          <IconItem
            iconType={<TableDocument color={colors.primary}/>}
            text="Conditions d'utilisation"
          />
        </View>

          <TextInput
            value={searchedValue}
            placeholder="Rechercher"
            mode="outlined"
            outlineStyle={{borderRadius:15, borderWidth:0}}

            style={{height:45, backgroundColor:colors.desable}}
            onChangeText={handleChange}
          />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{padding:10}} flex={1}>
        <Accordion
          title={"Comment changer son mot de passe"}
          description={
            "Pour changer votre mot de passe , suivez les étape suivante : 1. Allez sur parametre > Modifier mode passe > rempliseer le formulaire"
          }
        />
        <Accordion title={"Comment modifer son profile"} />
        <Accordion title={"Comment reporter un Rendez-vous"} />
        <Accordion title={"Comment annuler un Rendez-vous"} />
        <Accordion title={"Comment recherher un spécialiste"} />
        <Accordion title={"Comment activer les notification"} />
      </ScrollView>
    </View>
  );
};

export default FAQ;
