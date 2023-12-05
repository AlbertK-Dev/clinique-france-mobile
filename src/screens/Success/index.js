import {
  View,
  Text,
  Button,
  VStack,
  Icon,
  HStack,
  Divider,
  Center,
} from "native-base";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import * as SCREENS from "../../constants/screens";
import { AntDesign } from "@expo/vector-icons";
import colors from "../../constants/colours";
import { useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { BackHandler } from "react-native";

function Success({ route }) {
  const navigation = useNavigation();
  //const [recapRdv, setRecapRDV] = useState({});
  const rdv = useSelector((state) => state.RdvForm.recapRDVId);
  console.log(rdv);
  //const id = route?.params?.id;

  // useEffect(() => {
  //   for (let i = 0; i < rdvs?.length; i++) {
  //     if (rdvs[i]?._id == id) {
  //       console.log(rdvs[i]);
  //       setRecapRDV(rdvs[i]);
  //       break;
  //     }
  //   }
  // }, []);

  useEffect(() => {
    const goBackAction = () => {
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      goBackAction
    );
    return () => backHandler.remove();
  }, []);

  return (
    <LinearGradient
      colors={["#04C96A", "#00C78E", "#00C3AB", "#00BEBF", "#04B7C9"]}
      start={[0, 0]}
      end={[1, 1]}
      style={{ flex: 1 }}
    >
      <Center style={{ ...styles.contenair }}>
        <VStack space={5} style={styles.box1}>
          <View
            rounded={50}
            justifyContent={"center"}
            alignItems={"center"}
            height={100}
            backgroundColor={colors.white}
            width={100}
          >
            <AntDesign name="check" size={50} color={"#04C96A"} />
          </View>
          <Text style={styles.texte1}>Rendez-vous pris avec success</Text>
          <Text style={styles.texte2}>
            la confirmation du rendez-vous a été envoyée à votre adresse e-mail
          </Text>
        </VStack>
        <VStack space={3} style={styles.box2} mt={20}>
          <HStack style={styles.box3}>
            <Text style={styles.texte3}>Docteur</Text>
            <Text style={{ ...styles.texte3, fontWeight: 500 }}>
              {rdv?.practitioner?.name + " " + rdv?.practitioner?.surname}
            </Text>
          </HStack>
          <Divider style={{ opacity: 0.4 }} />
          <HStack style={styles.box3}>
            <Text style={styles.texte3}>Spécialité</Text>
            <Text style={{ ...styles.texte3, fontWeight: 500 }}>
              {rdv?.practitioner?.job?.title}
            </Text>
          </HStack>
          <Divider style={{ opacity: 0.4 }} />
          <HStack style={styles.box3}>
            <Text style={styles.texte3} flex={1}>
              Motif
            </Text>
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              flex={1}
              style={{ ...styles.texte3, fontWeight: 500 }}
            >
              {rdv?.motif?.label}
            </Text>
          </HStack>
          <Divider style={{ opacity: 0.4 }} />
          <HStack style={styles.box3}>
            <Text flex={1} style={styles.texte3}>
              Date heure
            </Text>
            <Text
              flex={1}
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{ ...styles.texte3, fontWeight: 500 }}
            >
              {rdv?.date_long}
            </Text>
          </HStack>
          <Divider style={{ opacity: 0.4 }} />
          <HStack style={styles.box3}>
            <Text style={styles.texte3}>Montant</Text>
            <Text style={{ ...styles.texte3, fontWeight: 500 }}>5000 XAF</Text>
          </HStack>
        </VStack>
        <Button
          mt={10}
          _text={{ color: colors.primary, fontSize: 16, fontWeight: 500 }}
          style={styles.btn}
          onPress={() => navigation.navigate(SCREENS.RDV_CONTAINER)}
        >
          Voir mes rendez-vous
        </Button>
      </Center>
    </LinearGradient>
  );
}

export default Success;
