import React, { useState } from "react";
import {
  Box,
  Divider,
  HStack,
  Icon,
  Text,
  View,
  Switch,
  VStack,
  Image
} from "native-base";
import {
  MaterialCommunityIcons,
  AntDesign,
  Foundation,
  Entypo,
  MaterialIcons,
} from "@expo/vector-icons";
import styles from "./styles"; // Assurez-vous d'importer le style correctement
import colors from "../../constants/colours";
import Header from "../../components/Header";
import SelectDropdown from "react-native-select-dropdown";
import { useTranslation } from "react-i18next";
import "../../i18n";
import En from '../../assets/img/flagEng.png';
import Fr from '../../assets/img/flagFr.png';


const Parametres = () => {
  const { i18n } = useTranslation();
  const translate = useTranslation().t;

  const countries = [
    { value: "Fr", label: "Fr" },
    { value: "En", label: "En" },
  ];
  const [selectedLang, setSelectedLang] = useState(countries[0].label);

  const IconItem = (props) => {
    const SelectLang = () => {
      const handleLangChange = (item) => {
        i18n
          .changeLanguage(item)
          .then(() => {
            setSelectedLang(item);
          })
          .catch((err) => { });
      };

      return (
        <HStack rounded={25} padding={0} backgroundColor={'white'}>
          <Image h={5} width={5} source={selectedLang === countries[0].label ? Fr : En} alt="flag" />
          <SelectDropdown
            defaultValue={selectedLang}
            data={countries}
            onSelect={(selectedItem, index) => {
              handleLangChange(selectedItem.value);
            }}
            buttonTextAfterSelection={(item, index) => {
              return item.value;
            }}
            rowTextForSelection={(item, index) => {
              return item.label;
            }}
            defaultButtonText={selectedLang}
            buttonTextStyle={{
              color: colors.primary,
              fontSize: 16,
              fontWeight: "600",
              textAlign: 'left'
            }}
            buttonStyle={{
              width: 50,
              height: 20,
              backgroundColor: "white",
            }}
          />
        </HStack>
      );
    };

    return (
      <HStack space={6} style={styles.headerItem}>
        <HStack paddingX={3} space={2} flex={1} alignItems={"center"}>
          <Icon
            as={props.iconType}
            name={props.iconName}
            color={colors.primary}
            size="6"
          />
          <Text style={styles.textBox}>{props.text}</Text>
        </HStack>
        <HStack>
          {props.text === translate("TEXT_CHOISE_LANGUAGE") ? (
            <SelectLang />
          ) : (
            <Switch size="sm" />
          )}
        </HStack>
      </HStack>
    );
  };

  return (
    <View flex={1} style={styles.container}>
      <Header bg={"white"} title={"Paramètres"} />
      <VStack marginTop={30} style={styles.headerItemGroup}>
        <Box>
          <IconItem
            iconName="web"
            iconType={MaterialCommunityIcons}
            text={translate("TEXT_CHOISE_LANGUAGE")}
          />
          <Divider mb={2} />
          <IconItem
            iconName="megaphone"
            iconType={Foundation}
            text={translate("TEXT_RECIVE_FEDBACK")}
          />
          <IconItem
            iconName="newsletter"
            iconType={Entypo}
            text="Recevoir les newsletters"
          />
          <IconItem
            iconName="swap"
            iconType={AntDesign}
            text="Partager mes informations entre mes centres"
          />
          <IconItem
            iconName="notifications"
            iconType={MaterialIcons}
            text="Recevoir des notifications des tiers partenaires des centres"
          />
        </Box>
      </VStack>
    </View>
  );
};

export default Parametres;
