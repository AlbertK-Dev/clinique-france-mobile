import React, { useEffect, useState } from "react";
import { Pressable, SafeAreaView, View, Text } from "react-native";
import { Button, TextInput, ActivityIndicator } from "react-native-paper";
import { connect, useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { Warning2, ArrowLeft, LockCircle } from "iconsax-react-native";
import { processVerifCode, userRegistration } from "../../../redux/User/action";
import styles from "./style";
import { resettingPassword } from "../../../redux/User/action";
import colors from "../../../constants/colours";
import * as SCREENS from "../../../constants/screens";
import { Alert } from "react-native";

const CELL_COUNT = 5;
const init_count = 60;

const ResetPassWord = ({
  navigation,
  codeVerifLoading,
  codeVerifSuccess,
  errorCodeVerif,
  route,
  loadingReg,
}) => {
  const [borderCol, setBorderCol] = useState(colors.danger);
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  let messages = [];
  const codeVerif = useSelector((state) => state.UserReducer.codeVerif);
  const settingPWLoading = useSelector(
    (state) => state.UserReducer.settingPWLoading
  );

  const dispatch = useDispatch();
  const { email } = route?.params;
  const { register } = route?.params;
  const [newPw, setNewPw] = useState("");
  const [cnfPw, setCnfPw] = useState("");
  const [loading, setLoading] = useState(false);
  const [caracters, setCaracters] = useState([]);
  const [canResetPw, setCanResetPw] = useState(false);
  let verificationCond = caracters == codeVerif?.codeVerif?.split("");
  caracters[1] == codeVerif?.codeVerif?.split("")[1] &&
    caracters[2] == codeVerif?.codeVerif?.split("")[2] &&
    caracters[3] == codeVerif?.codeVerif?.split("")[3] &&
    caracters[4] == codeVerif?.codeVerif?.split("")[4];

  const navigateback = useNavigation();

  useEffect(() => {
    if (codeVerifSuccess) {
      Alert.alert(
        "Code de vérification",
        "Un code de vérification a été envoyé a votre adresse mail"
      );
    }
  }, [codeVerifSuccess, errorCodeVerif]);

  const resetPassword = () => {
    dispatch(processVerifCode({ email: email }));
  };

  const isPasswordWeak = (password) => {
    const uppercaseRegex = /[A-Z]/;
    const digitRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\\-="']/;

    if (!uppercaseRegex.test(password) && !password.match(/[a-z]/)) {
      messages.push("Une lettre majuscule ou minuscule est requise.");
    }

    if (password.length < 8) {
      messages.push("Longueur minimale de 8 caractères.");
    }

    if (!specialCharRegex.test(password)) {
      messages.push("Au moins un caractère spécial parmi @$!%*#?&.");
    }

    if (!digitRegex.test(password)) {
      messages.push("Le mot de passe doit contenir au moins un chiffre.");
    }

    return messages;
  };

  const isTrong = isPasswordWeak(newPw);

  const handleCheck = () => {
    if (value == codeVerif?.codeVerif) {
      setBorderCol(colors.success);
      !register && setCanResetPw(true);
      register &&
        dispatch(
          userRegistration({ ...route?.params?.formData, active: true })
        );
    }
  };

  const handleChangeMp = () => {
    dispatch(resettingPassword({ id: codeVerif?.id, password: newPw }));
  };

  useEffect(() => {
    setBorderCol(
      value == codeVerif?.codeVerif ? colors.success : colors.danger
    );
  }, [canResetPw, value, codeVerif]);

  return (
    <View style={styles.container}>
      <ArrowLeft
        onPress={() => navigateback.goBack()}
        style={{ marginBottom: 10 }}
        size={25}
        color={colors.black}
      />
      <View alignItems={"center"} mb={15}>
        <View style={styles.circle}>
          <LockCircle size="50" color={colors.white} />
        </View>
        <Text style={styles.title}>
          {register ? "Vérification de mail" : "Mot de passe oublié"}
        </Text>
      </View>
      <View>
        <View alignItems={"center"} mb={7}>
          {canResetPw ? (
            ""
          ) : (
            <Text style={styles.message}>
              Nous avons envoyé le code de vérification à votre adresse mail,
              veillez le saisir ici
            </Text>
          )}

          {!canResetPw && (
            <SafeAreaView style={styles.root}>
              <CodeField
                ref={ref}
                {...props}
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                keyboardType="ascii-capable"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                  <Text
                    key={index}
                    style={[
                      { ...styles.cell, borderColor: value && borderCol },
                      isFocused && {
                        ...styles.focusCell,
                        borderColor: value && borderCol,
                      },
                      { marginRight: 10 },
                    ]}
                    onLayout={getCellOnLayoutHandler(index)}
                  >
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                )}
              />
            </SafeAreaView>
          )}
          {!canResetPw && (
            <View style={styles.TextEmailChange}>
              <Text style={styles.phoneNumber}>{email ?? ""} </Text>
              {!register && (
                <Pressable
                  onPress={() => {
                    navigateback.navigate(SCREENS.PHONE_CONFIRMATION_SCREEN);
                  }}
                >
                  <Text style={{ ...styles.phoneNumber, color: colors.yellow }}>
                    /changer ?
                  </Text>
                </Pressable>
              )}
            </View>
          )}
          {canResetPw && (
            <View style={{ width: "95%", marginBottom: 20, marginTop: 20 }}>
              <TextInput
                mode="outlined"
                outlineStyle={{ borderRadius: 50, borderColor: colors.desable }}
                value={newPw}
                onChangeText={(t) => setNewPw(t)}
                placeholder="Nouveau mot de passe"
                style={{ ...styles.input }}
              />

              {newPw !== "" && messages.length > 0 && (
                <View
                  style={{
                    backgroundColor: colors.transp_warning,
                    borderRadius: 5,
                    padding: 8,
                  }}
                >
                  <View space={1} alignItems={"center"}>
                    <Warning2 color={colors.danger} size={15} />
                    <Text
                      style={{
                        fontSize: 12,
                        color: colors.danger,
                      }}
                    >
                      Le mot de passe ne rempli pas le(s) critère(s)
                    </Text>
                  </View>
                  {messages?.map((message, index) => (
                    <Text
                      style={{ color: colors.black, fontSize: 12 }}
                      key={index}
                    >
                      {index + 1}. {message}
                    </Text>
                  ))}
                </View>
              )}

              <TextInput
                mode="outlined"
                outlineStyle={{ borderRadius: 50, borderColor: colors.desable }}
                value={cnfPw}
                onChangeText={(t) => setCnfPw(t)}
                placeholder="Confirmer le nouveau mot de passe"
                style={{ ...styles.input }}
              />

              {cnfPw !== "" && cnfPw !== newPw && (
                <View
                  style={{
                    backgroundColor: colors.transp_warning,
                    borderRadius: 5,
                    padding: 8,
                  }}
                >
                  <View space={1} alignItems={"center"}>
                    <Warning2 color={colors.danger} size={15} />
                    <Text
                      style={{
                        fontSize: 12,
                        color: colors.danger,
                      }}
                    >
                      Les mot de passe ne correspondent pas !
                    </Text>
                  </View>
                </View>
              )}
            </View>
          )}
        </View>
        <Button
          style={{
            ...styles.btn,
            marginBottom: 20,
            borderWidth: canResetPw ? 0 : 1.5,
            borderColor: !canResetPw && colors.primary,
            backgroundColor: canResetPw && colors.primary,
          }}
          loading={settingPWLoading}
          textColor={canResetPw ? colors.white : colors.primary}
          mode={canResetPw ? "contained" : "outlined"}
          onPress={() => {
            if (canResetPw && messages.length <= 0 && cnfPw === newPw) {
              handleChangeMp();
            } else {
              resetPassword();
            }
          }}
        >
          {canResetPw ? (
            <Text style={styles.btnLabel}>Envoyer</Text>
          ) : codeVerifLoading ? (
            <ActivityIndicator
              size={20}
              color={colors.primary}
            />
          ) : (
            <Text style={styles.btnLabel}>Renvoyer le code</Text>
          )}
        </Button>
        {!canResetPw && (
          <Button
            loading={loading || loadingReg}
            style={styles.btn}
            mode="contained"
            buttonColor={colors.primary}
            onPress={() => handleCheck()}
          >
            <Text style={styles.btnLabel}>Soumettre</Text>
          </Button>
        )}
      </View>
    </View>
  );
};

const mapStateToProps = ({ UserReducer }) => ({
  codeVerifLoading: UserReducer.codeVerifLoading,
  errorCodeVerif: UserReducer.errorCodeVerif,
  codeVerifSuccess: UserReducer.codeVerifSuccess,
  loadingReg: UserReducer.loading,
});

export default connect(mapStateToProps)(ResetPassWord);
