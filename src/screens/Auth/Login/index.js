import { Foundation } from "@expo/vector-icons";
import { Eye, EyeSlash, Lock, User, Warning2 } from "iconsax-react-native";
import {
  Center,
  HStack,
  Icon,
  Input,
  ScrollView,
  Text,
  VStack,
  useToast,
} from "native-base";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, Pressable, View } from "react-native";
import { useValidation } from "react-native-form-validator";
import { connect, useDispatch, useSelector } from "react-redux";
import logo from "../../../assets/img/hospi-rdv__9_-removebg-preview.png";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import CustomToast from "../../../components/CustomToast";
import colors from "../../../constants/colours";
import * as SCREENS from "../../../constants/screens";
import {
  processVerifCode,
  reinitialize,
  userLogin,
} from "../../../redux/User/action";
import { isEmailValid } from "../../../utils/helper";
import styles from "./styles";
import { Checkbox } from "react-native-paper";

const Login = ({ navigation, error, loading, errorMsg, success }) => {
  const toast = useToast();
  const [errEmail, setErrMail] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const errorCodeVerif = useSelector(
    (state) => state.UserReducer.errorCodeVerif
  );
  const codeVerifLoading = useSelector(
    (state) => state.UserReducer.codeVerifLoading
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

  const resetPassword = () => {
    setIsEmpty(true);
    dispatch(processVerifCode({ email: formData?.email }));
  };

  React.useEffect(() => {
    if ((error && errorMsg !== "") || errorCodeVerif || errEmail) {
      toast.show({
        render: () => {
          return (
            <CustomToast
              message={errorMsg || errorCodeVerif || errEmail}
              color={colors.danger}
              bgColor={"red.100"}
              icon={<Foundation name="alert" size={24} />}
              iconColor={colors.danger}
            />
          );
        },
        placement: "top",
        duration: 3000,
      });
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
        <VStack space={4} style={styles.formContent}>
          <Input
            h={50}
            rounded={50}
            borderWidth={isEmpty && formData.email === "" ? 1 : 0}
            borderColor={isEmpty ? colors.danger : ""}
            fontSize={14}
            bg={colors.desable}
            InputLeftElement={
              <VStack
                alignItems={"center"}
                justifyContent={"center"}
                style={styles.leftElement}
              >
                <Icon as={<User />} size={5} color={"primary.500"} />
              </VStack>
            }
            placeholder={translate("TEXT.EMAIL_FIELD")}
            keyboardType="default"
            isInvalid={isFieldInError("email")}
            onChangeText={(value) => handleInputChange("email", value.trim())}
            value={formData.email}
          />
          {isEmpty && formData.email === "" ? (
            <HStack
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
            </HStack>
          ) : (
            formData.email !== "" &&
            !isEmailValid(formData.email) && (
              <HStack
                alignItems={"center"}
                padding={2}
                rounded={5}
                p={1}
                backgroundColor={colors.transp_warning}
                space={1}
              >
                <Warning2 color={colors.danger} size={15} />
                <Text
                  style={{
                    fontSize: 12,
                    color: colors.danger,
                  }}
                >
                  Mauvais format d'e-mail
                </Text>
              </HStack>
            )
          )}
          <Input
            rounded={50}
            h={50}
            borderWidth={0}
            fontSize={14}
            bg={colors.desable}
            w={{ base: "100%", md: "100%" }}
            InputLeftElement={
              <VStack
                alignItems={"center"}
                justifyContent={"center"}
                style={styles.leftElement}
              >
                <Icon as={<Lock />} size={5} color={"primary.500"} />
              </VStack>
            }
            InputRightElement={
              <Pressable onPress={() => setShow(!show)}>
                <Icon
                  as={show ? <Eye /> : <EyeSlash />}
                  size={5}
                  mr="4"
                  color={colors.primary}
                />
              </Pressable>
            }
            type={show ? "text" : "password"}
            placeholder="Entrer votre mot de passe"
            onChangeText={(value) => handleInputChange("password", value)}
            value={formData.password}
          />

          {/* {(isFieldInError("email") || isFieldInError("password")) && (
            <Text style={styles.errorMsg}>Remplissez bien les champs !</Text>
          )} */}

          <HStack space={2} mt={1} alignItems={"center"}>
            <Checkbox
              aria-label="cgu"
              // isChecked={formData.saveCredentials}
              status={formData.saveCredentials ? "checked" : "unchecked"}
              onPress={(v) => {
                handleInputChange("saveCredentials", !formData.saveCredentials);
              }}
              // onPress={() =>
              //
              // }
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
          </HStack>
        </VStack>

        <Pressable
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"center"}
        >
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

        <Center mt={2}>
          <PrimaryButton
            title={translate("TEXT.BUTTON_LOGIN")}
            isLoadingText={translate("TEXT.BUTTON_LOGIN_LOADER")}
            isLoading={loading}
            style={{
              ...styles.submitBtnText,
              backgroundColor: isFieldsEmpty
                ? colors.trans_primary
                : colors.primary,
            }}
            color={colors.primary}
            onPress={handleSubmit}
            disabled={isFieldsEmpty}
          />
        </Center>
        <Center>
          <HStack mt={5}>
            <Text style={styles.labelText}>Pas encore de compte?</Text>
            <Text
              style={[styles.forgetPassword, styles.registerText]}
              onPress={() => {
                dispatch(reinitialize());
                navigation.navigate(SCREENS.SIGNUP);
              }}
              ml={1}
            >
              Inscrivez-vous !
            </Text>
          </HStack>
        </Center>
        {/*<SocialMedia/>*/}
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
