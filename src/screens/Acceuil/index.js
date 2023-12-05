import React, { useEffect, useState } from "react";
import styles from "./style";
import { specialites, practiciens } from "../../utils/helper";
import colors from "../../constants/colours";
import { connect, useDispatch, useSelector } from "react-redux";
import { getProfession } from "../../redux/professions/actions";
import { clearCache } from "../../redux/RDV/actions";
import { sendExpoToken, getAdressesFromCoords } from "../../redux/User/action";
import * as SCREENS from "../../constants/screens";
import { getAllPrats } from "../../redux/Praticiens/actions";
import { Location, SearchNormal1 } from "iconsax-react-native";
import { useTranslation } from "react-i18next";
import * as ExpoLocation from "expo-location";
import NextAppointment from "../../components/NextAppointment";
import {
  getAppSpecialties,
  setShouldSeeBehind,
} from "../../redux/commons/action";
import DoctorCard from "../../components/DoctorCard/DoctorCard";
import {
  Alert,
  View,
  FlatList,
  Text,
  ScrollView,
  Pressable,
} from "react-native";
import messaging from "@react-native-firebase/messaging";
import { setNotificationCardinal } from "../../redux/notifications/actions";
import { Surface, TextInput, ActivityIndicator } from "react-native-paper";

const _spacing = 3;
const datas = [
  { key: 1, value: "Tout" },
  { key: 2, value: "Meilleurs notes" },
  { key: 3, value: "Populaires" },
];

const Acceuil = ({
  navigation,
  userInfos = {},
  load_address,
  address,
  ...props
}) => {
  const translate = useTranslation().t;
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const dispatch = useDispatch();
  const praticiens = useSelector((state) => state.Praticiens.praticiens);
  const handleSearch = () => {
    const filteredSpecialites = specialites.filter((specialite) =>
      specialite.value.includes(searchText)
    );
    const filteredPraticiens = practiciens.filter((praticien) =>
      praticien.name.includes(searchText)
    );
    const results = [...filteredSpecialites, ...filteredPraticiens];
    setSearchResults(results);
  };

  useEffect(() => {
    dispatch(setShouldSeeBehind(false));
    dispatch(getProfession());
    dispatch(clearCache());
    dispatch(getAllPrats());
    dispatch(getAppSpecialties());
    userInfos?.user?._id &&
      dispatch(setNotificationCardinal(userInfos?.user?._id));
  }, []);

  useEffect(() => {
    const { user } = userInfos;
    const requestPermissions = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
      }
    };

    if (requestPermissions()) {
      messaging()
        .getToken()
        .then(async (token) => {
          dispatch(sendExpoToken({ _id: user?._id, token: token }));
        });
    } else {
      console.log("failed token status ", authStatus);
    }

    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage) {
          console.log(remoteMessage.notification);
        }
      });

    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      console.log(remoteMessage.notification);
    });

    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Message handled in the background!", remoteMessage);
    });

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log(remoteMessage);
      Alert.alert(
        remoteMessage?.notification?.title,
        remoteMessage?.notification?.body
      );
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const requestLocationPermission = async () => {
      let { status } = await ExpoLocation.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let location = await ExpoLocation.getCurrentPositionAsync({});
      const { coords } = location;
      if (!address) dispatch(getAdressesFromCoords(coords));
    };

    requestLocationPermission();
  }, []);
  return (
    <View flex={1}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        paddingBottom={_spacing}
        keyboardShouldPersistTaps="never"
      >
        <View style={styles.viewBoxEmplacment}>
          <Location color={colors.primary} />
          <View style={{ width: "100%", marginLeft: 10 }}>
            <Text style={{ color: colors.text_grey_hint }}>
              {translate("TEXT_EMPLACEMENT")}
            </Text>
            {!load_address && address && (
              <ActivityIndicator color={colors.primary} size={14} animating={true}/>
            )}
          </View>
        </View>
        <View style={{ margin: 10 }}>
          <View style={styles.viewInput}>
            <SearchNormal1 color={colors.primary} name="person" />
            <TextInput
              outlineStyle={{ borderRadius: 50, borderColor: colors.desable }}
              mode="outlined"
              keyboardType="default"
              style={styles.input}
              outlineColor="white"
              placeholder="Recherher un praticien"
              onPressIn={() => navigation.navigate(SCREENS.GLOBAL_SEARCH)}
              onChangeText={(text) => setSearchText(text)}
              onSubmitEditing={handleSearch}
            />
          </View>
          {/* Prochain rendez-vous */}
          <View style={styles.viewBoxFirstRdv}>
            <View style={styles.viewBoxTextFirstRdv}>
              <Text style>{translate("TEXT_NEXT_APPOINTMENT")}</Text>
              <Pressable
                onPress={() => {
                  navigation.navigate(SCREENS.RDV_CONTAINER);
                }}
              >
                <Text style={{ color: colors.primary }}>
                  {translate("TEXT.SEE_ALL")}
                </Text>
              </Pressable>
            </View>

            <View>
              <NextAppointment />
            </View>
          </View>

          <View>
            <Text
              style={{
                ...styles.textBold,
                marginTop: 10,
                marginBottom: 10,
                marginLeft: 8,
              }}
            >
              {translate("TEXT.SPEC")}
            </Text>
            <FlatList
              data={props.specialties}
              keyExtractor={({ value, _id }) => _id.toString()}
              horizontal
              scrollEnabled
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <Pressable
                    style={{
                      marginRight:
                        index === props.specialties.length - 1 ? 5 : 0,
                      paddingVertical: 2,
                    }}
                  >
                    <Surface style={[styles.filter, styles.shadow]}>
                      <Text style={{ color: colors.black }}>
                        {item.nom || item.label}
                      </Text>
                    </Surface>
                  </Pressable>
                );
              }}
            />
            {!props.specialties && (
              <View>
                {datas.map((d) => (
                  <View
                    key={d.key}
                    paddingY={_spacing}
                    marginLeft={_spacing - 1}
                  >
                    <ActivityIndicator color={colors.primary} size={15} animating={true} />
                  </View>
                ))}
              </View>
            )}
          </View>

          <View my={_spacing}>
            <View
              style={{
                ...styles.viewBoxTextFirstRdv,
                paddingHorizontal: 5,
                marginTop: 10,
              }}
            >
              <Text style={{ ...styles.textBold }}>
                {translate("TEXT.POPULAR_DOC")}
              </Text>
              <Pressable
                onPress={() => {
                  navigation.navigate(SCREENS.GLOBAL_SEARCH);
                }}
              >
                <Text style={{ color: colors.primary }}>
                  {translate("TEXT.SEARCH_SHORT")}
                </Text>
              </Pressable>
            </View>
            {props.praticiens.length !== 0 ? (
              <>
                {props.praticiens.slice(0, 5).map((item, index) => {
                  return (
                    <Pressable key={item._id}>
                      <DoctorCard
                        speciality={item?.job?.label}
                        nom_complet={item.name + " " + item.surname}
                        clinique={
                          item.affectation.length !== 0
                            ? item?.affectation[0].label
                            : ""
                        }
                      />
                    </Pressable>
                  );
                })}
              </>
            ) : (
              <>
                <DoctorCard key={1} isEmpty={true} />
                <DoctorCard key={2} isEmpty={true} />
                <DoctorCard key={3} isEmpty={true} />
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = ({ UserReducer, RdvForm, Common, Praticiens }) => ({
  userInfos: UserReducer.userInfos,
  address: UserReducer.address,
  load_address: UserReducer.load_address,
  myRdv: RdvForm.myRdv,
  loading: Common.loading,
  specialties: Common.specialties,
  praticiens: Praticiens.praticiens,
});

export default connect(mapStateToProps)(Acceuil);
