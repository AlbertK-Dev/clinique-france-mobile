import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Platform,
  Alert,
  ScrollView,
  TouchableOpacity,
  Text,
  Pressable,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import logo from "../../../assets/img/hospi-rdv__9_-removebg-preview.png";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import colors from "../../../constants/colours";
import styles from "./styles";
import moment from "moment";
import * as SCREENS from "../../../constants/screens";
import { useDispatch, connect } from "react-redux";
import { reinitialize, processVerifCode } from "../../../redux/User/action";
import { isValidEmail } from "../../../utils/helper";
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
import { Checkbox, TextInput, Icon, Button } from "react-native-paper";
import { Image } from "react-native";
const Signup = ({ navigation, error, successRegister, codeVerifLoading }) => {
  const navigateCgu = useNavigation();
  const dispatch = useDispatch();
  const [focusFiels, setFocusFields] = useState(false);
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
    if (
      !isFieldsEmpty &&
      isValidEmail(formData.email) &&
      isPasswordWeak(formData?.password)
    ) {
      const emailPayload = { email: formData?.email, register: true };
      const payload = { ...formData, active: true, ...emailPayload };
      dispatch(
        processVerifCode({
          email: formData?.email,
          register: true,
          formData: payload,
        })
      );
    } else {
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
    return true;
  };

  const buttonDesable = getButtonDesable(formData, isFieldsEmpty, isTrong);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1,
        backgroundColor: "white",
        padding: 15,
      }}
    >
      <View style={styles.logoBox}>
        <Image style={styles.image} source={logo} alt="logo" />
        <Text style={styles.intitule}>
          Veuillez entrer votre mail et votre mot de passe pour l'inscription
        </Text>
      </View>
      <View style={styles.contentForm}>
        {
          <View style={{ display: "flex" }}>
            <View style={styles.viewInput}>
              <View style={styles.viewBoxIcon}>
                <User color={colors.primary} size={24} name="person" />
              </View>
              <TextInput
                outlineStyle={{ borderRadius: 50, borderColor: colors.desable }}
                mode="outlined"
                keyboardType="default"
                placeholder="Nom"
                style={styles.input}
                outlineColor="white"
                onChangeText={(value) => handleInputChange("name", value)}
                value={formData.name}
              />
            </View>
            <View style={styles.viewInput}>
              <View style={styles.viewBoxIcon}>
                <User color={colors.primary} size={24} name="person" />
              </View>
              <TextInput
                outlineStyle={{ borderRadius: 50, borderColor: colors.desable }}
                mode="outlined"
                keyboardType="default"
                placeholder="Prénom"
                style={styles.input}
                outlineColor="white"
                onChangeText={(value) => handleInputChange("surname", value)}
                value={formData.surname}
              />
            </View>
            <View style={styles.viewInput}>
              <View style={styles.viewBoxIcon}>
                <MessageText1 color={colors.primary} size={24} name="person" />
              </View>
              <TextInput
                outlineStyle={{ borderRadius: 50, borderColor: colors.desable }}
                mode="outlined"
                keyboardType="default"
                style={styles.input}
                outlineColor="white"
                selectionColor="blue"
                placeholder="Adresse mail"
                onChangeText={(value) => handleInputChange("email", value)}
                value={formData.email}
              />
            </View>
            {!errors.email && formData.email !== "" && (
              <View
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
              </View>
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
            {formData.password !== "" && messages.length > 0 && (
              <View
                style={{
                  backgroundColor: colors.transp_warning,
                  borderRadius: 5,
                  padding: 8,
                }}
              >
                <View style={styles.warninBox}>
                  <Warning2 color={colors.danger} size={15} />
                  <Text style={styles.warningText}>
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
            <View style={styles.viewInput}>
              <View style={styles.viewBoxIcon}>
                <Lock color={colors.primary} name="person" />
              </View>
              <TextInput
                outlineStyle={{ borderRadius: 50, borderColor: colors.desable }}
                mode="outlined"
                keyboardType="default"
                style={styles.input}
                outlineColor="white"
                placeholder="Confirmer votre mot de passe"
                onChangeText={(value) => setConfirmPassword(value)}
                value={confPassword}
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
            {confPassword !== "" && formData.password !== confPassword && (
              <View style={styles.warninBox}>
                <Warning2 color={colors.danger} size={15} />
                <Text style={styles.warningText}>
                  Les mots de passe ne correspondent pas !
                </Text>
              </View>
            )}
            <View style={styles.viewInput}>
              <View style={styles.viewBoxIcon}>
                <Call color={colors.primary} />
              </View>
              <MaskInput
                style={{
                  width: "85%",
                  height: 50,
                  borderRadius: 50,
                  marginLeft: 15,
                  color: colors.black,
                  fontSize: 16,
                }}
                value={formData.telephone}
                onChangeText={(value) => handleInputChange("telephone", value)}
                mask={["6", /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
                placeholder="Téléphone , ex: 658559995"
                keyboardType="numeric"
              />
            </View>
            {formData.telephone.length < 9 && formData.telephone !== "" && (
              <View style={styles.warninBox}>
                <Warning2 color={colors.danger} size={15} />
                <Text style={styles.warningText}>
                  Ce numéro est invalide selon la nome Camerounaise
                </Text>
              </View>
            )}

            <View>
              <TouchableOpacity onPress={showDatepicker}>
                <View
                  style={{
                    ...styles.datePick,
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <View
                    alignItems={"center"}
                    justifyContent={"center"}
                    style={styles.leftElement}
                  >
                    <Calendar color={colors.primary} />
                  </View>
                  <Text
                    style={{
                      left: 16,
                      fontSize: 16,
                      color: textDate ? "gray" : colors.black,
                    }}
                  >
                    {textDate ? "Date de naissance" : formattedDate}
                  </Text>
                </View>
              </TouchableOpacity>
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
            </View>
            <View style={styles.cguBox}>
              <Checkbox
                aria-label="cgu"
                status={isCkeck ? "checked" : "unchecked"}
                onPress={handleCheck}
                color={colors.primary}
              />
              <View style={styles.cguBox}>
                <Text onPress={handleCheck}>J'accepte les</Text>
                <TouchableOpacity
                  onPress={() => {
                    navigateCgu.navigate(SCREENS.CGU);
                  }}
                >
                  <Text style={styles.cguText}>
                    Conditions génétales d'utilisations
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        }
        <View style={styles.btnPrim}>
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
        </View>
        <View
          style={{
            ...styles.cguBox,
            marginBottom: 35,
            justifyContent: "center",
            alignContent: "center",
            width: "100%",
          }}
        >
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
        </View>
      </View>
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
