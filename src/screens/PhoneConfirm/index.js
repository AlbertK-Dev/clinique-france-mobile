import { Warning2, LockCircle } from "iconsax-react-native";
import React, { useState } from "react";
import { TextInput, Text, View, Alert, Platform } from "react-native";
import { connect, useDispatch, useSelector } from "react-redux";
import { Button } from "react-native-paper";
import colors from "../../constants/colours";
import { processVerifCode } from "../../redux/User/action";
import { isEmailValid } from "../../utils/helper";
import styles from "./style";
import { REINITIALIZE } from "../../redux/User/types";

const CELL_COUNT = 5;

const PhoneConfirm = ({
  navigation,
  codeVerifLoading,
  codeVerifSuccess,
  errorCodeVerif,
}) => {
  const codeVerif = useSelector((state) => state.UserReducer.codeVerif);
  const settingPWLoading = useSelector(
    (state) => state.UserReducer.settingPWLoading
  );

  const dispatch = useDispatch();
  const [email1, setEmail] = useState("");
  const [caracters, setCaracters] = useState([]);
  caracters[1] == codeVerif?.codeVerif?.split("")[1] &&
    caracters[2] == codeVerif?.codeVerif?.split("")[2] &&
    caracters[3] == codeVerif?.codeVerif?.split("")[3] &&
    caracters[4] == codeVerif?.codeVerif?.split("")[4];
  const [isEmpty, setIsEmpty] = useState(false);
  const emailValide = isEmailValid(email1.trim());


  const resetPassword = () => {
    setIsEmpty(true);
    if (email1 !== "") {
      dispatch(processVerifCode({ email: email1 }));
    }
    if (errorCodeVerif) {
      Alert.alert(
        Platform.OS === "ios"
          ? "ADRESSE E-MAIL INVALID"
          : "Adresse e-mail invalide",
        "Un problème est survenue lors de la vérification de votre mail, Il semble qu'elle n'est pas liée à votre compte",
        [
          {
            text: "Recommencer",
            onPress: () => {
              console.log("Cancel");
              dispatch({ type: REINITIALIZE });
            },
          },
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", marginTop: 35 }}>
        <View style={styles.circle}>
          <LockCircle size="50" color={colors.white} />
        </View>
        <Text
          style={{
            paddingTop: 20,
            marginBottom: 30,
            fontSize: 25,
            fontWeight: 700,
          }}
        >
          Mot de passe oublié
        </Text>
      </View>
      <View
        justifyItems={"center"}
        justifyContent={"center"}
        alignItems={"center"}
        w={"100%"}
      >
        <Text style={styles.message}>
          Veuillez entrer l'adresse e-mail liée à votre compte afin de recevoir
          le code de vérification.
        </Text>
        <TextInput
          style={styles.input}
          value={email1}
          fontSize={15}
          placeholder="Entrez votre adresse mail"
          onChangeText={(e) => setEmail(e)}
        />

        {!emailValide && email1 !== "" && (
          <View style={styles.viewWar}>
            <Warning2 color={colors.danger} size={15} />
            <Text
              style={{
                fontSize: 12,
                color: colors.danger,
                marginLeft: 8,
              }}
            >
              Mauvais format d'e-mail !
            </Text>
          </View>
        )}
        <Button
          style={styles.btn}
          loading={codeVerifLoading}
          disabled={!emailValide}
          buttonColor={colors.primary}
          mode="contained"
          onPress={() => {
            resetPassword();
          }}
        >
          {codeVerifLoading ? (
            ""
          ) : (
            <Text style={{ color: colors.white, fontSize: 16 }}>Envoyer</Text>
          )}
        </Button>
      </View>
      <Button
        style={{ marginTop: 50 }}
        textColor={colors.primary}
        onPress={() => navigation.goBack()}
      >
        <Text color={colors.primary} style={styles.btnLabel}>
          Fermer
        </Text>
      </Button>
    </View>
  );
};

const mapStateToProps = ({ UserReducer }) => ({
  codeVerifLoading: UserReducer.codeVerifLoading,
  errorCodeVerif: UserReducer.errorCodeVerif,
  codeVerifSuccess: UserReducer.codeVerifSuccess,
});
export default connect(mapStateToProps)(PhoneConfirm);
