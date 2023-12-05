import React, { useState } from "react";
import { Divider, Text, Switch} from "react-native-paper";
import { Image, View } from "react-native";
import styles from "./styles"; // Assurez-vous d'importer le style correctement
import colors from "../../constants/colours";
import Header from "../../components/Header";
import SelectDropdown from "react-native-select-dropdown";
import { useTranslation } from "react-i18next";
import "../../i18n";
import En from '../../assets/img/flagEng.png';
import Fr from '../../assets/img/flagFr.png';
import {Aave, ArrowSwapHorizontal, DocumentText, Global, Notification, VolumeHigh} from 'iconsax-react-native'


const Parametres = () => {
  const { i18n } = useTranslation();
  const translate = useTranslation().t;

  const countries = [
    { value: "Fr", label: "Fr" },
    { value: "En", label: "En" },
  ];
  const [selectedLang, setSelectedLang] = useState(countries[0].label);

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
      <View style={styles.lng}>
        <Image style={{height:25, width:25}} source={selectedLang === countries[0].label ? Fr : En} alt="flag" />
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
      </View>
    );
  };

  const IconItem = (props) => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
    return (
      <View space={6} style={styles.headerItem}>
        <View style={styles.item1}>
          {props.iconType}
          <Text style={styles.textBox}>{props.text}</Text>
        </View>
        <View>
          {props.text === translate("TEXT_CHOISE_LANGUAGE") ? (
            <SelectLang />
          ) : (
            <Switch value={isSwitchOn} onValueChange={onToggleSwitch} color={colors.primary}  />
          )}
        </View>
      </View>
    );
  };

  return (
    <View flex={1} style={styles.container}>
      <Header bg={"white"} title={"Paramètres"} />
      <View style={styles.headerItemGroup}>
        <IconItem
          iconType={<Global size="22" color={colors.primary}/>}
          text={translate("TEXT_CHOISE_LANGUAGE")}
        />
        <Divider style={{ borderWidth: 0.5, marginBottom: 15 }} />
        <IconItem
          iconType={<VolumeHigh size="22" color={colors.primary}/>}
          text={translate("TEXT_RECIVE_FEDBACK")}
        />
        <IconItem
          iconType={<DocumentText size="22" color={colors.primary}/>}
          text="Recevoir les newsletters"
        />
       <IconItem
          iconType={<ArrowSwapHorizontal size="22" color={colors.primary}/>}
          text="Partager mes informations entre mes centres"
        />
        <IconItem
          iconType={<Notification size="22" color={colors.primary}/>}
          text="Recevoir des notifications des tiers partenaires des centres"
        />
      </View>
    </View>
  );
};

export default Parametres;
