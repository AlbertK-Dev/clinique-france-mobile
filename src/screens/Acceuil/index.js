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
  Animated,
} from "react-native";
import messaging from "@react-native-firebase/messaging";
import { getUserNotifications, setNotificationCardinal } from "../../redux/notifications/actions";
import { Surface, TextInput, ActivityIndicator } from "react-native-paper";
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import LinearGradient from 'react-native-linear-gradient';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)


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
  const notifications = useSelector((state) => state.Notifications.notifications);


  useEffect(() => {
    dispatch(setShouldSeeBehind(false));
    dispatch(getProfession());
    if(notifications.length == 0) dispatch(getUserNotifications(userInfos?.user?._id))
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
      console.log(coords)
      if (!address) dispatch(getAdressesFromCoords(coords));
    };

    requestLocationPermission();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        paddingBottom={_spacing}
        keyboardShouldPersistTaps="never"
      >
        <View style={styles.viewBoxEmplacment}>
          <Location color={colors.primary} />
          <View style={{ width: "100%", marginLeft: 10 }}>
            <Text style={{ color: colors.text_grey_hint, marginBottom: 5 }}>
              {translate("TEXT_EMPLACEMENT")}
            </Text>
            {(!load_address && address) ? (
              <Text fontWeight="600">
                {address.address.road + " " + address.address.city}
              </Text>

            ) : <ShimmerPlaceholder
              style={{ borderRadius: 10 }}
              stopAutoRun
            />}
          </View>
        </View>
        <View style={{ margin: 10 }}>
          <View style={styles.viewInput}>
            <SearchNormal1 color={colors.primary} name="person" />
            <TextInput
              outlineStyle={{ borderRadius: 50 }}
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
                        index === props?.specialties?.length - 1 ? 5 : 0,
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
            {!props.specialties.length > 0 && (
              <View style={{ display: "flex", flexDirection: "row" }}>
                {datas.map((d) => (
                  <View
                    key={d.key}
                    paddingY={_spacing}
                    marginLeft={_spacing - 1}
                  >
                    <ShimmerPlaceholder
                      style={{ borderRadius: 20, width: 150, height: 40 }}
                      stopAutoRun
                    />
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
            {props.praticiens?.length !== 0 ? (
              <>
                {props.praticiens.slice(0, 5).map((item, index) => {
                  return (
                    <Pressable key={item._id}>
                      <DoctorCard
                        speciality={item?.job?.title}
                        nom_complet={item.name + " " + item.surname}
                        clinique={
                          item.telephone
                        }
                      />
                    </Pressable>
                  );
                })}
              </>
            ) : (
              <View style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                {[1, 2, 3].map((c) => (<ShimmerPlaceholder
                  key={c}
                  style={{ borderRadius: 10, width: "95%", height: 80, marginBottom: 10 }}
                  stopAutoRun
                />))}
              </View>
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
