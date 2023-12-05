import React, { useEffect } from "react";
import {ActivityIndicator} from "react-native-paper";
import { useState } from "react";
import {
  Image,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Text,
  View,
  ScrollView,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RadioButton , Avatar} from "react-native-paper";
import Header from "../../components/Header";
import colors from "../../constants/colours";
import DateTimePicker from "@react-native-community/datetimepicker";
import plus from "../../assets/img/edit.png";
import tick from "../../assets/img/tick.png";
import { LOGIN } from "../../constants/screens";
import { connect, useDispatch } from "react-redux";
import { isValidEmail } from "../../utils/helper";
import moment from "moment";
import { userInfoUpdate, userSetProfile } from "../../redux/User/action";
import { styles } from "./styles";
import * as ImagePicker from "expo-image-picker";
import { ArrowRight, ArrowRight2, Camera } from "iconsax-react-native";

const FAB = (props) => {
  return (
    <Pressable
      style={{
        ...styles.container,
        width: props.onBoarding ? "95%" : 60,
        right: props.onBoarding ? "2.5%" : 30,
        bottom: props.onBoarding ? 10 : 30,
        borderRadius: props.onBoarding ? 10 : 50,
        backgroundColor: props.onBoarding ? colors.primary : colors.primary,
        height: props.onBoarding ?50:60,
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <TouchableOpacity onPress={props.onPress}>
        {!props.onBoarding ? (
          <>
            {props.editeMode && props.loading ? (
              <ActivityIndicator size={14} animating={true} color={colors.white}/>
            ) : (
              <Image
                style={{ ...styles.title }}
                source={props.editeMode ? plus : tick}
              />
            )}
          </>
        ) : (
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate(LOGIN);
              props.onBegin();
            }}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent:'center',
              alignContent:'center',
              gap:15
            }}
          >
            <Text style={{ color: colors.white, fontSize: 20 }}>
              Commencez
            </Text>
            <ArrowRight style={{marginTop:3}} size={25} color={colors.white}/>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </Pressable>
  );
};

export const CustomeFab = (props) => {
  return (
    <FAB
      title="hey"
      navigation={props.navigation}
      onPress={props.action}
      onBegin={props.onBegin}
      onBoarding={props.onBoarding}
      editeMode={props.editeMode}
      loading={props.loading}
    />
  );
};

const MonProfile2 = ({ userInfos, loading, ImageLoading }) => {
  const [user, setUser] = useState(null);
  const [gender, setGender] = useState(1);
  const [editeMode, setEditeMode] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [image, setImage] = useState(null);

  const [formData, setFormData] = useState({
    name: user?.name,
    email: user?.email,
    surname: user?.surname,
    telephone: user?.telephone,
    birthdate: moment(user?.birthdate).format("YYYY-MM-DD"),
  });

  const [errors, setErrors] = useState({
    email: isValidEmail(formData.email),
  });

  const handleInputChange = (field, value) => {
    let newErrors = { ...errors };
    if (field === "email") {
      newErrors.email = isValidEmail(value);
    }

    setErrors(newErrors);
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleGenderChange = (newGender) => {
    setGender(newGender);
  };
  const dispatch = useDispatch();

  const hasFormDataChanged = () => {
    return (
      formData.name !== user?.name ||
      formData.email !== user?.email ||
      formData.surname !== user?.surname ||
      formData.telephone !== user?.telephone ||
      formData.birthdate !== moment(user?.birthdate).format("YYYY-MM-DD")
    );
  };

  const UpdateInfo = () => {
    if (!editeMode && hasFormDataChanged()) {
      dispatch(userInfoUpdate(formData, user._id));
    }
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const hideDatePickerModal = () => {
    setShowDatePicker(false);
  };

  const handleDateChange = (event, selectedDate) => {
    hideDatePickerModal();
    if (selectedDate) {
      handleInputChange("birthdate", moment(selectedDate).format("YYYY-MM-DD"));
    }
  };

  useEffect(() => {
    if (userInfos?.user) {
      setUser(userInfos.user);
      setFormData({
        name: userInfos.user.name,
        surname: userInfos.user.surname,
        email: userInfos.user.email,
        telephone: userInfos.user.telephone,
        birthdate: moment(userInfos.user.birthdate).format("YYYY-MM-DD"),
      });
    }
  }, [userInfos]);

  const selectImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      dispatch(userSetProfile(result.assets[0], user._id));
    }
  };

  return (
    <KeyboardAvoidingView
      //behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View flex={1} style={{ backgroundColor: "white" }}>
        <View height={50}>
          <Header title={"Vos informations"} />
        </View>
        <ScrollView
          style={{ padding: 10 }}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <TouchableOpacity onPress={selectImage}>
              <View style={styles.viewStyle}>
                <Avatar.Image size={95} source={{uri:ImageLoading ? image : user?.photo ?? image}} />
                <View style={styles.iconCam}>
                  {ImageLoading ? (
                    <ActivityIndicator color={colors.primary} size={14}/>
                  ) : (
                    <Camera color={colors.primary} variant="Bold" size={12}/>
                  )}
                </View>
              </View>
            </TouchableOpacity>

            <View style={styles.viewStyle2}>
              <Text
                style={{
                  fontSize: 16,
                }}
              >
                Détails de base
              </Text>
            </View>
            <View style={styles.box1}>
              <View width={"100%"} mb={5}>
                <Text style={styles.textLabel}>Nom</Text>
                <TextInput
                  style={{
                    ...styles.input,
                    borderWidth: !editeMode ? 1 : 2,
                    backgroundColor: !editeMode && colors.desable,
                    borderRadius: !editeMode ? 50 : 15,
                    borderColor: !editeMode ? colors.desable : "#F0F0F0",
                    color: !editeMode ? colors.text_grey_hint : colors.black,
                  }}
                  placeholder="Modifier votre nom"
                  keyboardType="default"
                  onChangeText={(value) => handleInputChange("name", value)}
                  value={formData.name}
                  editable={!editeMode}
                />
                {formData.name === "" && (
                  <Text style={styles.fieldError}>
                    ce champs est obligatoire
                  </Text>
                )}
              </View>
              <View width={"100%"} mb={5}>
                <Text style={styles.textLabel}>Prénom</Text>
                <TextInput
                  style={{
                    ...styles.input,
                    borderWidth: !editeMode ? 1 : 2,
                    backgroundColor: !editeMode && colors.desable,
                    borderRadius: !editeMode ? 50 : 15,
                    borderColor: !editeMode ? colors.desable : "#F0F0F0",
                    color: !editeMode ? colors.text_grey_hint : colors.black,
                  }}
                  onChangeText={(value) => handleInputChange("surname", value)}
                  value={formData.surname}
                  editable={!editeMode}
                />
              </View>
              <View width={"100%"} mb={4}>
                <Text
                  style={{ marginBottom: 5, fontSize: 14, color: "#626262" }}
                >
                  Date de naissance
                </Text>
                {editeMode ? (
                  <TextInput
                    isInvalid={true}
                    placeholderTextColor={colors.text_grey_hint}
                    style={{
                      ...styles.input,
                      borderWidth: !editeMode ? 1 : 2,
                      backgroundColor: !editeMode && colors.desable,
                      borderRadius: !editeMode ? 50 : 15,
                      borderColor: !editeMode ? colors.desable : "#F0F0F0",
                      color: !editeMode ? colors.text_grey_hint : colors.black,
                    }}
                    placeholder="17 Decembre 2004"
                    underlineColor="transparent"
                    keyboardType="default"
                    selectionColor={colors.primary}
                    activeUnderlineColor="transparent"
                    onChangeText={(value) =>
                      handleInputChange("birthdate", value)
                    }
                    value={formData.birthdate}
                    editable={!editeMode}
                  />
                ) : (
                  <TouchableOpacity  onPress={showDatePickerModal}>
                    <Text
                      style={{
                        ...styles.textInput,
                        color: !editeMode
                          ? colors.text_grey_hint
                          : colors.black,
                      }}
                    >
                      {moment(formData.birthdate).format("YYYY-MM-DD")}
                    </Text>
                  </TouchableOpacity>
                )}

                {showDatePicker && (
                  <DateTimePicker
                    accentColor={colors.primary}
                    value={moment(formData.birthdate).toDate()} // Convertir en objet Date
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                  />
                )}
              </View>

              <View
                width={"100%"}
                mt={2}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <View style={{ width: "100%" }}>
                  <Text style={{ marginBottom: 8, color: "#626262" }}>
                    Sexe
                  </Text>
                  <View
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexDirection: "row",
                    }}
                  >
                    <View
                      style={{
                        ...styles.boxRadio,
                        borderWidth: !editeMode ? 1 : 2,
                        backgroundColor: !editeMode && colors.desable,
                        borderRadius: !editeMode ? 50 : 15,
                        borderColor: !editeMode ? colors.desable : "#F0F0F0",
                      }}
                    >
                      <RadioButton.Android
                        style={{ height: 100 }}
                        uncheckedColor={"#F0F0F0"}
                        color={colors.primary}
                        value="first"
                        status={gender === 1 ? "checked" : "unchecked"}
                        onPress={() => handleGenderChange(1)}
                        disabled={editeMode}
                      />
                      <Text onPress={()=>handleGenderChange(1)} style={{ fontSize: 16, color: "#343434" }}>
                        Homme
                      </Text>
                    </View>
                    <View
                      style={{
                        ...styles.boxRadio,
                        borderWidth: !editeMode ? 1 : 2,
                        backgroundColor: !editeMode && colors.desable,
                        borderRadius: !editeMode ? 50 : 15,
                        borderColor: !editeMode ? colors.desable : "#F0F0F0",
                      }}
                    >
                      <RadioButton.Android
                        style={{ height: 100 }}
                        uncheckedColor={"#F0F0F0"}
                        color={colors.primary}
                        value="first"
                        status={gender === 0 ? "checked" : "unchecked"}
                        onPress={() => handleGenderChange(0)}
                        disabled={editeMode}
                      />
                      <Text onPress={()=>handleGenderChange(0)} style={{ fontSize: 16, color: "#343434" }}>
                        Femme
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.viewStyle2}>
              <Text style={styles.textCoord}>Coordonnées</Text>
            </View>

            <View style={{ marginTop: 8 }}>
              <View style={styles.viewStyle3}>
                <View width={"100%"} mb={5}>
                  <Text
                    style={{ marginBottom: 5, fontSize: 14, color: "#626262" }}
                  >
                    Adresse mail
                  </Text>
                  <TextInput
                    style={{
                      ...styles.input,
                      borderWidth: !editeMode ? 1 : 2,
                      backgroundColor: !editeMode && colors.desable,
                      borderRadius: !editeMode ? 50 : 15,
                      borderColor: !editeMode ? colors.desable : "#F0F0F0",
                      color: !editeMode ? colors.text_grey_hint : colors.black,
                    }}
                    onChangeText={(value) => handleInputChange("email", value)}
                    value={formData.email}
                    editable={!editeMode}
                  />
                </View>
                <View width={"100%"}>
                  <Text
                    style={{ marginBottom: 5, fontSize: 14, color: "#626262" }}
                  >
                    Numero de telephone
                  </Text>
                  <TextInput
                    style={{
                      ...styles.input,
                      borderWidth: !editeMode ? 1 : 2,
                      backgroundColor: !editeMode && colors.desable,
                      borderRadius: !editeMode ? 50 : 15,
                      borderColor: !editeMode ? colors.desable : "#F0F0F0",
                      color: !editeMode ? colors.text_grey_hint : colors.black,
                    }}
                    placeholder="+237658686162"
                    underlineColor="transparent"
                    keyboardType="default"
                    selectionColor={colors.primary}
                    activeUnderlineColor="transparent"
                    onChangeText={(value) =>
                      handleInputChange("telephone", value)
                    }
                    value={formData.telephone}
                    editable={!editeMode}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <CustomeFab
          editeMode={editeMode}
          action={() => {
            setEditeMode(!editeMode);
            UpdateInfo();
          }}
          loading={loading}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = ({ UserReducer }) => ({
  userInfos: UserReducer.userInfos,
  loading: UserReducer.loading,
  ImageLoading: UserReducer.ImageLoading,
});

export default connect(mapStateToProps)(MonProfile2);
