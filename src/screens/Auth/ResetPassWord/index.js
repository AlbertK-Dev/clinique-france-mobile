import React, { useEffect, useState } from "react";
import {
  Box,
  Icon,
  View,
  Text,
  HStack,
  Button,
  VStack,
  Input,
  Spinner,
} from "native-base";
import { EvilIcons } from "@expo/vector-icons";
import { Pressable, SafeAreaView } from "react-native";
import { useToast } from "native-base";
import { connect, useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { Warning2, ArrowLeft } from "iconsax-react-native";
import { processVerifCode, userRegistration } from "../../../redux/User/action";
import CustomToast from "../../../components/CustomToast";
import styles from "./style";
import { resettingPassword } from "../../../redux/User/action";
import colors from "../../../constants/colours";
import * as SCREENS from "../../../constants/screens";

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
  const [count, setCount] = useState(init_count);
  const [loading, setLoading] = useState(false);
  const [caracters, setCaracters] = useState([]);
  const [canResetPw, setCanResetPw] = useState(false);
  let verificationCond = caracters == codeVerif?.codeVerif?.split("");
  caracters[1] == codeVerif?.codeVerif?.split("")[1] &&
    caracters[2] == codeVerif?.codeVerif?.split("")[2] &&
    caracters[3] == codeVerif?.codeVerif?.split("")[3] &&
    caracters[4] == codeVerif?.codeVerif?.split("")[4];

  const navigateback = useNavigation();

  const toast = useToast();
  useEffect(() => {
    // let interv = setInterval(() => {
    //   setCount((c) => {
    //     if (c >= 1) {
    //       return c - 1;
    //     }
    //     return c;
    //   });
    // }, 15);
    if (codeVerifSuccess) {
      toast.show({
        render: () => {
          return (
            <CustomToast
              message={"Un code à été envoyer a votre mail"}
              color={colors.success}
              bgColor={"red.100"}
              icon={<Warning2 />}
              iconColor={colors.success}
            />
          );
        },
        placement: "top",
        duration: 3000,
      });
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
      console.log(route.params);
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
    <View bg={colors.white} flex={1} p={5}>
      <ArrowLeft
        onPress={() => navigateback.goBack()}
        style={{ marginBottom: 10 }}
        size={25}
        color={colors.black}
      />
      <VStack alignItems={"center"} mb={15}>
        <Box mb={10}>
          <Box style={styles.circle}>
            <Icon as={EvilIcons} name="lock" color={colors.white} size={90} />
          </Box>
        </Box>
        <Text
          mb={5}
          style={{
            paddingTop: 5,
            fontSize: 25,
            fontWeight: 700,
            height: 30,
          }}
        >
          {register ? "Vérification de mail" : "Mot de passe oublié"}
        </Text>
      </VStack>
      <Box alignItems={"center"} bg={colors.white} width={"100%"}>
        <VStack alignItems={"center"} mb={7}>
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
                rootStyle={styles.codeFiledRoot}
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
            <HStack space={1}>
              <Text style={styles.phoneNumber}>{email ?? ""}</Text>
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
            </HStack>
          )}
          {canResetPw && (
            <VStack space={5}>
              <Input
                mx="3"
                value={newPw}
                onChangeText={(t) => setNewPw(t)}
                fontSize={15}
                placeholder="Nouveau mot de passe"
                w="90%"
                borderRadius={25}
                paddingLeft={5}
                paddingRight={5}
                height={45}
              />

              {newPw !== "" && messages.length > 0 && (
                <VStack
                  style={{
                    backgroundColor: colors.transp_warning,
                    borderRadius: 5,
                    padding: 8,
                  }}
                >
                  <HStack space={1} alignItems={"center"}>
                    <Warning2 color={colors.danger} size={15} />
                    <Text
                      style={{
                        fontSize: 12,
                        color: colors.danger,
                      }}
                    >
                      Le mot de passe ne rempli pas le(s) critère(s)
                    </Text>
                  </HStack>
                  {messages?.map((message, index) => (
                    <Text
                      style={{ color: colors.black, fontSize: 12 }}
                      key={index}
                    >
                      {index + 1}. {message}
                    </Text>
                  ))}
                </VStack>
              )}

              <Input
                mx="3"
                value={cnfPw}
                onChangeText={(t) => setCnfPw(t)}
                fontSize={15}
                placeholder="Confirmer le nouveau mot de passe"
                w="90%"
                borderRadius={25}
                paddingLeft={5}
                paddingRight={5}
                height={45}
              />

              {cnfPw !== "" && cnfPw !== newPw && (
                <VStack
                  style={{
                    backgroundColor: colors.transp_warning,
                    borderRadius: 5,
                    padding: 8,
                  }}
                >
                  <HStack space={1} alignItems={"center"}>
                    <Warning2 color={colors.danger} size={15} />
                    <Text
                      style={{
                        fontSize: 12,
                        color: colors.danger,
                      }}
                    >
                      Les mot de passe ne correspondent pas !
                    </Text>
                  </HStack>
                </VStack>
              )}
            </VStack>
          )}
        </VStack>
        <Button
          mb={4}
          style={styles.btn}
          isLoading={settingPWLoading}
          variant={canResetPw ? "solid" : "outline"}
          borderWidth={canResetPw ? 0 : 2}
          onPress={() => {
            if (canResetPw && messages.length <= 0 && cnfPw === newPw) {
              handleChangeMp();
            } else {
              resetPassword();
            }
          }}
        >
          {canResetPw ? (
            <Text color={colors.white} style={styles.btnLabel}>
              Envoyer
            </Text>
          ) : codeVerifLoading ? (
            <Spinner
              accessibilityLabel="loading"
              size="sm"
              color={colors.primary}
            />
          ) : (
            <Text color={colors.primary} style={styles.btnLabel}>
              Renvoyer le code 
            </Text>
          )}
        </Button>
        {!canResetPw && (
          <Button
            //borderWidth={2}
            isLoading={loading || loadingReg}
            style={styles.btn}
            //variant={"outline"}
            onPress={() => handleCheck()}
          >
            <Text color={colors.white} style={styles.btnLabel}>
              Soumettre
            </Text>
          </Button>
        )}
      </Box>
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
