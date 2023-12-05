import React, { useEffect, useState } from "react";
import {
  Input,
  ScrollView,
  View,
  HStack,
  Text,
  VStack,
  Icon,
  Pressable,
  FlatList,
  Skeleton,
} from "native-base";
import styles from "./style";
import { specialites, practiciens } from "../../utils/helper";
import colors from "../../constants/colours";
import { connect, useDispatch, useSelector } from "react-redux";
import { getProfession } from "../../redux/professions/actions";
import { clearCache, getMotifs } from "../../redux/RDV/actions";
import * as Notifications from "expo-notifications";
import { sendExpoToken, getAdressesFromCoords } from "../../redux/User/action";
import * as SCREENS from "../../constants/screens";
import { SharedElement } from "react-navigation-shared-element";
import { getAllPrats } from "../../redux/Praticiens/actions";
import { Location, SearchNormal1 } from "iconsax-react-native";
import { useTranslation } from "react-i18next";
import * as ExpoLocation from "expo-location";
import NextAppointment from "../../components/NextAppointment";
import { getAppSpecialties, setShouldSeeBehind } from "../../redux/commons/action";
import DoctorCard from "../../components/DoctorCard/DoctorCard";
import { Alert } from "react-native";
import messaging from "@react-native-firebase/messaging";

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
    dispatch(setShouldSeeBehind(false))
    dispatch(getProfession());
    dispatch(clearCache());
    dispatch(getAllPrats());
    dispatch(getAppSpecialties());
  }, []);

  useEffect(() => {
    const { user } = userInfos;
    const requestPermissions = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        // console.log('Authorization status:', authStatus);
      }
    };

    if (requestPermissions()) {
      messaging()
        .getToken()
        .then(async (token) => {
          //  console.log(token)
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
    // Get user coords (lat and long)
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
        // stickyHeaderIndices={[1]}
        showsVerticalScrollIndicator={false}
        paddingBottom={_spacing}
        keyboardShouldPersistTaps="never"
      >
        <VStack bg="white" space={_spacing}>
          <HStack mx={_spacing} py={_spacing} space={1} alignItems={"baseline"}>
            <Icon as={<Location />} color="primary.500" />
            <VStack>
              <Text color={colors.text_grey_hint}>
                {translate("TEXT_EMPLACEMENT")}
              </Text>
              {!load_address && address ? (
                <Text isTruncated maxWidth={80} fontWeight="600">
                  {address.address.road + " " + address.address.city}
                </Text>
              ) : (
                <Skeleton.Text h={1} py={2.5} />
              )}
            </VStack>
          </HStack>
        </VStack>
        <VStack bg="white" py={_spacing}>
          <Input
            mx={_spacing}
            showSoftInputOnFocus={false}
            h={45}
            rounded={22}
            borderWidth={0}
            fontSize={14}
            bg={colors.bg_grey}
            placeholder={translate("TEXT_SEARCH_PLACEHOLDER")}
            InputLeftElement={
              <SearchNormal1
                style={{ marginLeft: 10 }}
                size={20}
                color={colors.primary}
              />
            }
            onPressIn={() => navigation.navigate(SCREENS.GLOBAL_SEARCH)}
            onChangeText={(text) => setSearchText(text)}
            onSubmitEditing={handleSearch}
          />
        </VStack>
        {/* Prochain rendez-vous */}
        <VStack
          bg="white"
          borderBottomRadius={_spacing * 6}
          py={_spacing}
          flex={1}
          space={_spacing}
        >
          <HStack mx={_spacing} justifyContent={"space-between"}>
            <Text fontWeight={600}>{translate("TEXT_NEXT_APPOINTMENT")}</Text>
            <Pressable
              onPress={() => {
                navigation.navigate(SCREENS.RDV_CONTAINER);
              }}
            >
              <Text color="primary.500">{translate("TEXT.SEE_ALL")}</Text>
            </Pressable>
          </HStack>

          <VStack flex={1}>
            <NextAppointment />
          </VStack>
        </VStack>

        <VStack mt={_spacing}>
          <HStack mx={_spacing} justifyContent={"space-between"}>
            <Text fontWeight={600}>{translate("TEXT.SPEC")}</Text>
            {/* <Pressable onPress={() => {}}>
              <Text color="primary.500">{translate("TEXT.SEE_ALL")}</Text>
            </Pressable> */}
          </HStack>
          <FlatList
            data={props.specialties}
            keyExtractor={({ value, _id }) => _id.toString()}
            horizontal
            scrollEnabled
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <Pressable
                  mr={index === props.specialties.length - 1 ? _spacing : 0}
                  py={_spacing}
                  ml={_spacing}
                  onPress={() => {}}
                >
                  <View bg={"white"} style={[styles.filter, styles.shadow]}>
                    <Text color={colors.black}>{item.nom || item.label}</Text>
                  </View>
                </Pressable>
              );
            }}
          />
          {!props.specialties && (
            <HStack>
              {datas.map((d) => (
                <View key={d.key} paddingY={_spacing} marginLeft={_spacing - 1}>
                  <Skeleton h={10} width={150} rounded="full" />
                </View>
              ))}
            </HStack>
          )}
        </VStack>

        <VStack my={_spacing}>
          <HStack mx={_spacing} justifyContent={"space-between"}>
            <Text fontWeight={600}>{translate("TEXT.POPULAR_DOC")}</Text>
            <Pressable
              onPress={() => {
                navigation.navigate(SCREENS.GLOBAL_SEARCH);
              }}
            >
              <Text color="primary.500">{translate("TEXT.SEARCH_SHORT")}</Text>
            </Pressable>
          </HStack>
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
        </VStack>
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
