import React, { useState, useEffect, useCallback } from "react";
import { View, Pressable, Platform, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  HStack,
  Icon,
  Input,
  VStack,
  Center,
  Image,
  ScrollView,
  Text,
  Box,
  useToast,
  InfoIcon,
} from "native-base";
import { Foundation } from "@expo/vector-icons";
import logo from "../../../assets/img/hospi-rdv__9_-removebg-preview.png";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import colors from "../../../constants/colours";
import styles from "./styles";
import moment from "moment";
import * as SCREENS from "../../../constants/screens";
import { useDispatch, connect } from "react-redux";
import {
  userRegistration,
  reinitialize,
  processVerifCode,
} from "../../../redux/User/action";
import { isValidEmail } from "../../../utils/helper";
import CustomToast from "../../../components/CustomToast";
import {
  Calendar,
  Call,
  Eye,
  EyeSlash,
  Lock,
  MessageText1,
  User,
  Warning2,
} from "iconsax-react-native";
import { useNavigation } from "@react-navigation/native";
import MaskInput from "react-native-mask-input";
import { REINITIALIZE } from "../../../redux/User/types";
import { Checkbox } from "react-native-paper";
const Signup = ({
  navigation,
  error,
  loading,
  errorMsg,
  successRegister,
  codeVerifLoading,
}) => {
  const navigateCgu = useNavigation();
  const toast = useToast();
  const dispatch = useDispatch();
  const [date, setDate] = useState(moment().format("DD/MM/YYYY"));
  const [isCkeck, setIsCheck] = useState(false);
  const [show, setShow] = useState(false);
  const [confPassword, setConfirmPassword] = useState("");
  const [desable, setDesable] = useState(false);

  let messages = [];

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    telephone: "",
    birthdate: "",
  });

  const [errors, setErrors] = useState({
    email: isValidEmail(formData.email),
    password: null,
    birth: moment().format("DD/MM/YYYY"),
  });

  const [textDate, setTextDate] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = useCallback(
    (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShowDatePicker(Platform.OS === "ios");
      setDate(currentDate);

      const formattedDate = moment(currentDate).format("YYYY-MM-DD");
      setFormData({
        ...formData,
        birthdate: formattedDate,
      });
    },
    [date, formData]
  );

  const showDatepicker = useCallback(() => {
    setShowDatePicker(true);
  }, []);

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

  const isTrong = isPasswordWeak(formData.password);

  const handleInputChange = (field, value) => {
    let newErrors = { ...errors };
    if (field === "email") {
      newErrors.email = isValidEmail(value);
    } else if (field === "password") {
      newErrors.password = value.length < 8;
    }

    setErrors(newErrors);
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  useEffect(() => {
    const currentDate = moment().format("DD/MM/YYYY");
    setTextDate(date === currentDate);
  }, [date]);

  const formattedDate = moment(date, "DD/MM/YYYY").format("DD/MM/YYYY");

  const checkEmptyField = () => {
    return (
      formData.name === "" ||
      formData.surname === "" ||
      formData.email === "" ||
      formData.password === "" ||
      formData.telephone === "" ||
      formData.telephone.length < 9 ||
      formData.birthdate === "" ||
      isCkeck === false ||
      confPassword === ""
    );
  };

  const isFieldsEmpty = checkEmptyField();

  useEffect(() => {
    if (error && errorMsg !== "") {
      toast.show({
        render: () => {
          return (
            <CustomToast
              message={errorMsg}
              color={colors.danger}
              bgColor={"red.100"}
              icon={<Foundation name="alert" size={24} />}
              iconColor={colors.danger}
            />
          );
        },
        placement: "top",
        duration: 5000,
      });
    }

    if (successRegister) {
      Alert.alert(
        Platform.OS === "ios" ? "INSCRIPTION" : "Inscription",
        "Votre compte été crée avec succès.",
        [
          {
            text: "Connectez-vous",
            onPress: () => {
              navigation.navigate(SCREENS.LOGIN);
              dispatch({ type: REINITIALIZE });
            },
          },
        ]
      );
    }
  }, [error, successRegister]);

  const onSubmit = () => {
    console.log(!isPasswordWeak(formData?.password), formData.password);
    if (
      !isFieldsEmpty &&
      isValidEmail(formData.email) &&
      isPasswordWeak(formData?.password)
    ) {
      //dispatch(userRegistration({ ...formData, active: true }));
      const emailPayload = { email: formData?.email, register: true };
      const payload = { ...formData, active: true, ...emailPayload };
      dispatch(
        processVerifCode({
          email: formData?.email,
          register: true,
          formData: payload,
        })
      );
      // navigation.navigate(SCREENS.RESETPASSWORD, payload);
    } else {
      // toast.show({
      //   render: () => {
      //     return (
      //       <CustomToast
      //         message={"Veuillez remplir tous les champs"}
      //         color={colors.danger}
      //         bgColor={"red.100"}
      //         icon={<Foundation name="alert" size={24} />}
      //         iconColor={colors.danger}
      //       />
      //     );
      //   },
      //   placement: "top",
      //   duration: 5000,
      // });
    }
  };

  const handleCheck = () => {
    setIsCheck(!isCkeck);
  };

  const getButtonDesable = (formData, isFieldsEmpty, isTrong) => {
    const isValid = !isValidEmail(formData.email);
    if (
      isFieldsEmpty ||
      isTrong.length !== 0 ||
      isValid ||
      formData.password !== confPassword ||
      formData.telephone.length !== 9
    ) {
      return false;
    }
    return true; // Ajoutez un retour explicite pour le cas où aucune désactivation n'est nécessaire
  };

  const buttonDesable = getButtonDesable(formData, isFieldsEmpty, isTrong);
  console.log("desable", buttonDesable);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      flex={1}
      backgroundColor={"white"}
      paddingX={3}
    >
      <View style={styles.logoBox}>
        <Image style={styles.image} source={logo} alt="logo" />
        <Text style={styles.intitule}>
          Veuillez entrer votre mail et votre mot de passe pour l'inscription
        </Text>
      </View>
      <VStack space={5} mt={5} style={styles.contentForm}>
        <VStack space={4}>
          <Input
            h={50}
            rounded={50}
            borderWidth={0}
            fontSize={14}
            bg={colors.desable}
            InputLeftElement={
              <VStack
                alignItems={"center"}
                justifyContent={"center"}
                style={styles.leftElement}
              >
                <Icon
                  as={<User name="person" />}
                  size={5}
                  color={colors.text_grey_hint}
                />
              </VStack>
            }
            placeholder="Nom"
            onChangeText={(value) => handleInputChange("name", value)}
            value={formData.name}
          />
          <Input
            h={50}
            rounded={50}
            borderWidth={0}
            fontSize={14}
            bg={colors.desable}
            InputLeftElement={
              <VStack
                alignItems={"center"}
                justifyContent={"center"}
                style={styles.leftElement}
              >
                <Icon
                  as={<User name="person" />}
                  size={5}
                  color={colors.text_grey_hint}
                />
              </VStack>
            }
            placeholder="Prénom"
            onChangeText={(value) => handleInputChange("surname", value)}
            value={formData.surname}
          />
          <Input
            h={50}
            rounded={50}
            borderWidth={0}
            style={{ fontSize: 14 }}
            bg={colors.desable}
            InputLeftElement={
              <VStack
                alignItems={"center"}
                justifyContent={"center"}
                style={styles.leftElement}
              >
                <Icon
                  as={<MessageText1 name="person" />}
                  size={5}
                  color={colors.text_grey_hint}
                />
              </VStack>
            }
            placeholder="Adresse mail"
            onChangeText={(value) => handleInputChange("email", value)}
            value={formData.email}
          />
          {!errors.email && formData.email !== "" && (
            <HStack
              rounded={5}
              p={2}
              backgroundColor={colors.transp_warning}
              space={1}
              width={"100%"}
              alignItems={"center"}
            >
              <Warning2 color={colors.danger} size={15} />
              <Text
                style={{
                  fontSize: 12,
                  color: colors.danger,
                }}
              >
                Attention ! Veillez saisir une adresse email valide
              </Text>
            </HStack>
          )}

          <Input
            isInvalid={!isCkeck}
            h={50}
            rounded={50}
            borderWidth={0}
            style={{ fontSize: 14 }}
            bg={colors.desable}
            InputLeftElement={
              <VStack
                alignItems={"center"}
                justifyContent={"center"}
                style={styles.leftElement}
              >
                <Icon
                  as={<Lock name="person" />}
                  size={5}
                  color={colors.text_grey_hint}
                />
              </VStack>
            }
            InputRightElement={
              <Pressable onPress={() => setShow(!show)}>
                <Icon
                  as={show ? <Eye /> : <EyeSlash />}
                  size={5}
                  mr={4}
                  color={colors.primary}
                />
              </Pressable>
            }
            placeholder="Mot de passe"
            onChangeText={(value) => handleInputChange("password", value)}
            value={formData.password}
            type={show ? "text" : "password"}
          />
          {formData.password !== "" && messages.length > 0 && (
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
                <Text style={{ color: colors.black, fontSize: 12 }} key={index}>
                  {index + 1}. {message}
                </Text>
              ))}
            </VStack>
          )}
          <Input
            isInvalid={!isCkeck}
            h={50}
            rounded={50}
            borderWidth={0}
            style={{ fontSize: 14 }}
            bg={colors.desable}
            InputLeftElement={
              <VStack
                alignItems={"center"}
                justifyContent={"center"}
                style={styles.leftElement}
              >
                <Icon
                  as={<Lock name="person" />}
                  size={5}
                  color={colors.text_grey_hint}
                />
              </VStack>
            }
            InputRightElement={
              <Pressable onPress={() => setShow(!show)}>
                <Icon
                  as={show ? <Eye /> : <EyeSlash color={colors.primary} />}
                  size={5}
                  mr={4}
                  color={colors.primary}
                />
              </Pressable>
            }
            placeholder="Confirmez votre mot de passe"
            onChangeText={(value) => setConfirmPassword(value)}
            value={confPassword}
            type={show ? "text" : "password"}
          />

          {confPassword !== "" && formData.password !== confPassword && (
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
                  Les mots de passe ne correspondent pas !
                </Text>
              </HStack>
            </VStack>
          )}
          <HStack
            space={2}
            rounded={50}
            paddingLeft={2}
            alignItems={"center"}
            width={"100%"}
            bg={colors.desable}
          >
            <VStack
              rounded={50}
              justifyItems={"center"}
              justifyContent={"center"}
              w={9}
              alignItems={"center"}
              h={9}
              backgroundColor={colors.white}
            >
              <Icon
                as={<Call />}
                size={5}
                mr={2}
                ml={2}
                color={colors.text_grey_hint}
              />
            </VStack>
            <MaskInput
              style={{
                width: "90%",
                height: 50,
                borderRadius: 50,
              }}
              value={formData.telephone}
              onChangeText={(value) => handleInputChange("telephone", value)}
              mask={["6", /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
              placeholder="6xxxxxxxx"
              keyboardType="numeric"
            />
          </HStack>
          {formData.telephone.length < 9 && formData.telephone !== "" && (
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
                  Le numéro ne respecte pas les standards du Cameroun !
                </Text>
              </HStack>
            </VStack>
          )}

          <VStack>
            <Pressable onPress={showDatepicker}>
              <HStack style={styles.datePick} rounded={50} space={3}>
                <VStack
                  alignItems={"center"}
                  justifyContent={"center"}
                  style={styles.leftElement}
                >
                  <Icon as={<Calendar />} color={colors.text_grey_hint} />
                </VStack>
                <Text style={{ color: textDate ? "gray" : colors.black }}>
                  {textDate ? "Date de naissance" : formattedDate}
                </Text>
              </HStack>
            </Pressable>
            {showDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={moment(date, "DD/MM/YYYY").toDate()}
                mode="date"
                display="default"
                collapsable
                maximumDate={new Date()}
                accentColor={colors.primary}
                onChange={handleDateChange}
                style={{ backgroundColor: colors.primary }}
              />
            )}
          </VStack>
          <HStack alignItems={"center"} paddingLeft={2} mt={2} height={50}>
            {/* <Checkbox
              isChecked={isCkeck}
              borderColor={"gray.300"}
              borderWidth={2}
              aria-label="cgu"
              onPress={handleCheck}
              color={colors.primary}
            /> */}
            <Checkbox
              aria-label="cgu"
              // isChecked={formData.saveCredentials}
              status={isCkeck ? "checked" : "unchecked"}
              onPress={handleCheck}
              // onPress={() =>
              //
              // }
              color={colors.primary}
            />
            <HStack width={"85%"}>
              <Text onPress={handleCheck}>J'accepte les</Text>
              <Pressable
                onPress={() => {
                  navigateCgu.navigate(SCREENS.CGU);
                }}
              >
                <Text style={styles.cguText}>
                  Conditions génétales d'utilisations
                </Text>
              </Pressable>
            </HStack>
          </HStack>
        </VStack>

        <Center w={"100%"} mt={5}>
          <PrimaryButton
            title="Créez votre compte"
            isLoadingText="Veuillez patienter..."
            isLoading={codeVerifLoading}
            style={{
              ...styles.submitBtnText,
              backgroundColor: buttonDesable
                ? colors.primary
                : colors.trans_primary,
            }}
            color={colors.primary}
            disabled={!buttonDesable}
            onPress={onSubmit}
          />
        </Center>
        <Center mb={5}>
          <HStack mt={2}>
            <Text style={styles.labelText}>Vous avez déjà un compte?</Text>
            <Text
              style={[styles.forgetPassword, styles.registerText]}
              onPress={() => {
                dispatch(reinitialize());
                navigation.navigate(SCREENS.LOGIN);
              }}
            >
              Connectez-vous !
            </Text>
          </HStack>
        </Center>
      </VStack>
    </ScrollView>
  );
};

const mapStateToProps = ({ UserReducer }) => ({
  successRegister: UserReducer.successRegister,
  error: UserReducer.error,
  loading: UserReducer.loading,
  errorMsg: UserReducer.errorMsg,
  codeVerifLoading: UserReducer.codeVerifLoading,
});

export default connect(mapStateToProps)(Signup);
