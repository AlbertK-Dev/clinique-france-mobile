import { Eye, EyeSlash, Lock, User, Warning2 } from "iconsax-react-native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, Pressable, View, ScrollView, Text } from "react-native";
import { useValidation } from "react-native-form-validator";
import { connect, useDispatch, useSelector } from "react-redux";
import logo from "../../../assets/img/cf.png";
import colors from "../../../constants/colours";
import * as SCREENS from "../../../constants/screens";
import { reinitialize, userLogin } from "../../../redux/User/action";
import { isEmailValid } from "../../../utils/helper";
import styles from "./styles";
import { Checkbox, TextInput, Button } from "react-native-paper";
import { Alert } from "react-native";

const Login = ({ navigation, error, loading, errorMsg, success }) => {
  const [errEmail, setErrMail] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const errorCodeVerif = useSelector(
    (state) => state.UserReducer.errorCodeVerif
  );
  const translate = useTranslation().t;
  const dispatch = useDispatch();
  const [show, setShow] = React.useState(false);
  const { isFieldInError } = useValidation({ state: formData });

  const [formData, setformData] = React.useState({
    email: "",
    password: "",
    saveCredentials: false,
  });

  const handleInputChange = (field, value) => {
    setformData((ancValue) => {
      return {
        ...ancValue,
        [field]: value,
      };
    });
  };

  const formValidator = () => {
    return (
      formData.email.trim() === "" ||
      formData.password === "" ||
      formData.password.length < 1 ||
      formData.email.length < 4
    );
  };
  const isFieldsEmpty = formValidator();

  const handleSubmit = () => {
    dispatch(reinitialize());
    dispatch(userLogin(formData));
  };

  React.useEffect(() => {
    if ((error && errorMsg !== "") || errorCodeVerif || errEmail) {
      Alert.alert(
        Platform.OS === "ios" ? "ECHEC DE CONNEXION" : "Echec de connexion",
        errorMsg,
        [
          {
            text: "Reesayer",
            onPress: () => {
              // navigation.navigate(SCREENS.LOGIN);
              // dispatch({ type: REINITIALIZE });
            },
          },
        ]
      );
    }
    setErrMail(null);
  }, [error, success, errorCodeVerif, errEmail]);

  return (
    <ScrollView style={styles.container}>
      <View flex={1}>
        <View style={styles.logoBox}>
          <Image style={styles.image} source={logo} alt="logo" />
          <Text style={styles.text1}>{translate("TEXT.LOGIN_TITRE")}</Text>
        </View>
        <View space={4} style={styles.formContent}>
          <View style={styles.viewInput}>
            <View style={styles.viewBoxIcon}>
              <User color={colors.primary} size={24} name="person" />
            </View>
            <TextInput
              outlineStyle={{ borderRadius: 50, borderColor: colors.desable }}
              mode="outlined"
              keyboardType="default"
              style={styles.input}
              outlineColor="white"
              placeholder={translate("TEXT.EMAIL_FIELD")}
              isInvalid={isFieldInError("email")}
              onChangeText={(value) => handleInputChange("email", value.trim())}
              value={formData.email}
            />
          </View>
          {isEmpty && formData.email === "" ? (
            <View
              rounded={5}
              p={1}
              backgroundColor={colors.transp_warning}
              space={1}
            >
              <Warning2 color={colors.warning} size={15} />
              <Text
                style={{
                  fontSize: 12,
                  color: colors.warning,
                }}
              >
                Veillez saisir votre email a fin de recevoir le code de
                vérification
              </Text>
            </View>
          ) : (
            formData.email !== "" &&
            !isEmailValid(formData.email) && (
              <View style={styles.warninBox}>
                <Warning2 color={colors.danger} size={15} />
                <Text
                  style={{
                    fontSize: 12,
                    color: colors.danger,
                    marginLeft:5
                  }}
                >
                  Mauvais format d'e-mail
                </Text>
              </View>
            )
          )}

          <View style={styles.viewInput}>
            <View style={styles.viewBoxIcon}>
              <Lock color={colors.primary} size={24} name="person" />
            </View>
            <TextInput
              outlineStyle={{ borderRadius: 50, borderColor: colors.desable }}
              mode="outlined"
              keyboardType="default"
              style={styles.input}
              outlineColor="white"
              placeholder="Mot de passe"
              onChangeText={(value) => handleInputChange("password", value)}
              value={formData.password}
              secureTextEntry={show ? false : true}
            />
            <Pressable onPress={() => setShow(!show)}>
              {show ? (
                <Eye color={colors.primary} size={24} name="person" />
              ) : (
                <EyeSlash color={colors.primary} size={24} />
              )}
            </Pressable>
          </View>
          <View style={styles.cguBox}>
            <Checkbox
              aria-label="cgu"
              status={formData.saveCredentials ? "checked" : "unchecked"}
              onPress={(v) => {
                handleInputChange("saveCredentials", !formData.saveCredentials);
              }}
              color={colors.primary}
            />
            <Text
              onPress={(v) => {
                handleInputChange("saveCredentials", !formData.saveCredentials);
              }}
              style={{
                fontWeight: "400",
                fontSize: 14,
                color: "#5C5C5C",
                fontStyle: "normal",
              }}
            >
              Se souvenir de moi
            </Text>
          </View>
        </View>

        <Pressable style={{marginTop:15, marginBottom:15}}>
          <Text
            onPress={() =>
              navigation.navigate(SCREENS.PHONE_CONFIRMATION_SCREEN)
            }
            style={styles.forgetPassword}
            mt={5}
          >
            Mot de passe oublié ?
          </Text>
        </Pressable>
        <View>
          <Button
            children={
              loading
                ? translate("TEXT.BUTTON_LOGIN_LOADER")
                : translate("TEXT.BUTTON_LOGIN")
            }
            labelStyle={{
              color: "white",
              fontSize: 18,
            }}
            loading={loading}
            mode="contained"
            style={{
              ...styles.submitBtnText,
              backgroundColor:
                isFieldsEmpty || loading
                  ? colors.trans_primary
                  : colors.primary,
            }}
            onPress={!loading && handleSubmit}
            disabled={isFieldsEmpty || loading}
          />
        </View>
        <View
          style={{
            ...styles.cguBox,
            marginTop:15,
            justifyContent: "center",
            alignContent: "center",
            width: "100%",
          }}
        >
          <Text style={styles.labelText}>Pas encore de compte? </Text>
          <Text
            style={[styles.forgetPassword, styles.registerText]}
            onPress={() => {
              dispatch(reinitialize());
              navigation.navigate(SCREENS.SIGNUP);
            }}
          >
            Inscrivez-vous!
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = ({ UserReducer }) => ({
  loading: UserReducer.loading,
  error: UserReducer.error,
  errorMsg: UserReducer.errorMsg,
  success: UserReducer.successLogin,
});

export default connect(mapStateToProps)(Login);
