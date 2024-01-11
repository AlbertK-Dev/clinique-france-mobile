import React, { useEffect, useState } from "react";
import { Text, Divider, Button } from "react-native-paper";
import { View, ScrollView, Pressable } from "react-native";
import colors from "../../constants/colours";
import CardInfo from "../../components/CardInfo";
import moment from "moment";
//import DateTimePickerModal from "react-native-modal-datetime-picker"
import styles from "./style";
import {
  ajouterDuree,
  calculerEcartEnMinutes,
  creneauxOfDay,
  dayOfWeek,
  generateKeyTab,
  generateValuesTab,
  goFromDayToNumber,
  jourDeLaSemaine,
} from "../../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { getDispo, putRDV } from "../../redux/RDV/actions";
import DispoLoader from "./dispoLoader";
import { CLEAR_ERR_SUCC } from "../../redux/RDV/types";
import { ArrowCircleLeft, ArrowCircleRight, Filter, InfoCircle } from "iconsax-react-native";
import { Alert } from "react-native";
import * as SCREENS from "../../constants/screens";
import { Platform } from "react-native";
import SelectDropdown from "react-native-select-dropdown";

export const ReportRDV = ({ route, navigation }) => {
  const [showDate, setShowDate] = useState(false);
  const dispos = useSelector((state) => state.RdvForm.dispo);
  const updatedRDV = useSelector((state) => state.RdvForm.updatedRDV);
  const errorOnPut = useSelector((state) => state.RdvForm.putingError);
  const successOnPut = useSelector((state) => state.RdvForm.putingSuccess);
  const [selectedDay, setSelectedDay] = useState("");
  const [longDate, setLongDate] = useState("");
  const [selectedHour, setSelectedHour] = useState("");
  const [selectedHours, setSelectedHours] = useState([]);
  const dispoLoading = useSelector((state) => state.RdvForm.dispoLoading);
  const putingErrorMsg = useSelector((state) => state.RdvForm.putingErrorMsg);
  const userInfo = useSelector((state) => state.UserReducer.userInfos);
  const putingRdv = useSelector((state) => state.RdvForm.putingRdv);
  const scrollViewRef = React.useRef();
  const [shouldScroll, setShouldScroll] = useState(false);
  const dispatch = useDispatch();
  const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [repordDate, setReportDate] = useState();
  const [day, setDay] = useState(
    goFromDayToNumber(jourDeLaSemaine(moment(new Date()).format("YYYY-MM-DD")))
  );
  const [creneau, setCreneau] = useState();
  const { params } = route;
  const { appointment } = params;

  const handleSelectDay = (day) => {
    setSelectedDay(day);
    setShouldScroll(true);
    setSelectedHours(generateValuesTab(day, dispos));
    setTimeout(() => {
      setShouldScroll(false);
    }, 3000);
  };

  const handleOpenDatePicker = () => {
    setShowDate(true);
  };

  useEffect(() => {
    setSelectedDay("");
    setSelectedHour("");
    setSelectedHours([]);
    setLongDate("");
    dispatch(
      getDispo({
        idCentre: appointment?.lieu?.idCentre || appointment?.patient?.idCentre,
        idp: appointment?.resourceId,
        creneau: creneau,
        date: date,
        day: day,
      })
    );
    return () => {
      dispatch({ type: CLEAR_ERR_SUCC });
    };
  }, [date, day, creneau]);

  const handlePutRdv = () => {
    dispatch(
      putRDV({
        id: appointment?._id,
        idCentre: appointment?.patient?.idCentre,
        startTime: selectedHour,
        endTime: ajouterDuree(
          selectedHour,
          calculerEcartEnMinutes(appointment?.timeStart, appointment?.timeEnd)
        ),
        date: repordDate,
        idUser: userInfo?.user?._id,
        date_long: longDate,
      })
    );
  };

  React.useEffect(() => {
    if (errorOnPut) {
      Alert.alert(
        Platform.OS === "ios" ? "ERREUR" : "Oops!",
        putingErrorMsg || "Une erreur est survenue !"
      );
    }
    if (successOnPut) {
      Alert.alert(
        Platform.OS === "ios" ? "RENDEZ-VOUS" : "Rendez-vous",
        updatedRDV?.displayedDate
          ? "Votre rende-vous a été reporté au " + updatedRDV?.displayedDate
          : "Votre rende-vous a été reporté",
        [
          {
            text: "OK",
            onPress: () => {
              dispatch({ type: "CLEAR_ALL_DISPO" });
              navigation.navigate(SCREENS.RDV);
            },
          },
        ],
        {
          messageStyle: styles.alertText,
        }
      );
    }
  }, [errorOnPut, successOnPut]);

  return (
    <View flex={1}>
      <ScrollView
        ref={scrollViewRef}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={(contentWidth, contentHeight) => {
          shouldScroll &&
            scrollViewRef.current?.scrollTo({
              y: contentHeight,
              animated: true,
            });
        }}
        style={{ padding: 8 }}
      >
        <View style={{ gap: 8 }}>
          <CardInfo
            lieu={appointment?.lieu?.label}
            patient={
              appointment?.patient?.name + " " + appointment?.patient?.surname
            }
            motif={appointment?.motif}
            infos={"23 ans, 85Kg, Homme"}
            status={appointment?.status}
            date={appointment?.displayedDate}
          />
          <View style={{ ...styles.secondCard, gap: 6, padding: 10 }}>
            <View style={{ ...styles.secondCardSection1 }}>
              <View style={{ ...styles.masquerBox }}>
                <View style={{ ...styles.boxFilter }}>
                  <Filter color={colors.white} size={18} />
                </View>
                <Text>Masquer</Text>
              </View>
              <Text
                style={{
                  color: colors.yellow,
                }}
              >
                Choisir un autre centre
              </Text>
            </View>
            <View style={{ ...styles.secondCardSection2 }}>
              <View
                style={{
                  width: "33%",
                }}
              >
                <Text>A partir du:</Text>
                <Pressable onPress={handleOpenDatePicker}>
                  <View style={{ ...styles.datePicker }}>
                    <Text style={{ fontSize: 15 }}>{date}</Text>
                  </View>
                </Pressable>
                {/**showDate && (
                  <DateTimePickerModal
                    testID="DateTimePickerModal"
                    value={new Date()}
                    mode="date"
                    display="default"
                    collapsable
                    onChange={(e, s) => {
                      setShowDate(false);
                      setDate(moment(s).format("YYYY-MM-DD"));
                    }}
                    accentColor={colors.primary}
                    style={{ backgroundColor: colors.primary }}
                  />
                  )*/}
              </View>
              <View
                style={{
                  width: "30%",
                }}
              >
                <Text>Tous les:</Text>
                <SelectDropdown
                  data={dayOfWeek}
                  onSelect={(selectedItem, index) => {
                    setCreneau(selectedItem);
                    console.log(selectedItem, index);
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item;
                  }}
                  buttonStyle={{
                    borderRadius: 10,
                    height: 30,
                    width:"100%",
                    borderColor: colors.text_grey_hint,
                    borderWidth: 1,
                    backgroundColor:colors.white
                  }}
                />
              </View>
              <View
                style={{
                  width: "30%",
                }}
              >
                <Text>Créneau:</Text>
                <SelectDropdown
                  data={creneauxOfDay}
                  onSelect={(selectedItem, index) => {
                    setCreneau(selectedItem);
                    console.log(selectedItem, index);
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item;
                  }}
                  buttonStyle={{
                    borderRadius: 10,
                    height: 30,
                    width:"100%",
                    borderColor: colors.text_grey_hint,
                    borderWidth: 1,
                    backgroundColor:colors.white
                  }}
                />
              </View>
            </View>
            <Divider
              style={{ borderColor: "red", marginTop: 2, width: "100%" }}
            />
            <Text style={{ ...styles.nextDispoLabel }}>
              Prochaines disponibilités
            </Text>
            <Text style={{ ...styles.rdvDayLabel }}>jour du rendez-vous</Text>
            {!dispoLoading ? (
              <View>
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  mb={4}
                >
                  <View style={styles.hstackBox}>
                    {generateKeyTab(dispos)?.map((d, index) => (
                      <Pressable
                        key={index}
                        onPress={() => {
                          handleSelectDay(d);
                        }}
                      >
                        <View
                          ml={index !== 0 ? 2 : 0}
                          style={{
                            ...styles.jourRdvBox,
                            borderColor:
                              selectedDay === d
                                ? colors.trans_primary
                                : colors.text_grey_hint,
                            backgroundColor:
                              selectedDay === d
                                ? colors.trans_primary
                                : "transparent",
                          }}
                        >
                          <Text style={{ color: colors.black, fontSize: 15 }}>
                            {jourDeLaSemaine(d) + ", " + d.split("-")[2]}
                          </Text>
                        </View>
                      </Pressable>
                    ))}
                  </View>
                </ScrollView>
                <Text style={{ ...styles.rdvHoureLabel }}>
                  Heure du rendez-vous
                </Text>
                {selectedHours?.length > 0 ? (
                  <View style={styles.hstackBox}>
                    <View mr={1.5} style={{ ...styles.arrowScrollView }}>
                      <ArrowCircleLeft variant="Bold" color={colors.primary}/>
                    </View>
                    <ScrollView
                      showsHorizontalScrollIndicator={false}
                      horizontal={true}
                    >
                      <View style={styles.hstackBox}>
                        {selectedHours?.map((d, index) => (
                          <Pressable
                            key={index}
                            onPress={() =>
                              setSelectedHour(() => {
                                setLongDate(d?.date_long);
                                setReportDate(d?.date);
                                return d?.start;
                              })
                            }
                          >
                            <View
                              ml={index !== 0 ? 2 : 0}
                              style={{
                                ...styles.hourRdvBox,
                                borderColor:
                                  selectedHour === d?.start
                                    ? colors.trans_primary
                                    : colors.text_grey_hint,
                                backgroundColor:
                                  selectedHour === d?.start
                                    ? colors.trans_primary
                                    : "transparent",
                              }}
                            >
                              <Text
                                style={{
                                  color:
                                    selectedHour === d?.start
                                      ? colors.primary
                                      : colors.black,
                                }}
                              >
                                {d?.start}
                              </Text>
                            </View>
                          </Pressable>
                        ))}
                      </View>
                    </ScrollView>
                    <View ml={1.5} style={{ ...styles.arrowScrollView }}>
                      <ArrowCircleRight variant="Bold" color={colors.primary}/>
                    </View>
                  </View>
                ) : (
                  <View style={{ ...styles.BoxSelectDayInfo }}>
                    <InfoCircle variant="Bold" color={colors.primary} />
                    <Text
                      style={{
                        color: selectedDay ? "red" : colors.primary,
                        marginLeft: 2,
                      }}
                    >
                      {selectedDay
                        ? "Aucun creneau libre pour ce jour"
                        : "Choisissez un jour pour votre rdv"}
                    </Text>
                  </View>
                )}
              </View>
            ) : (
              <DispoLoader />
            )}
          </View>
        </View>
        <View style={styles.btnContainer}>
          <Button
            onPress={handlePutRdv}
            isLoading={putingRdv}
            disabled={putingRdv || !selectedDay || !selectedHour || !repordDate}
            style={{
              ...styles.btnSubmitPut,
              backgroundColor: colors.primary,
            }}
          >
            <Text
              color={colors.white}
              style={styles.btnSubmitText}
            >
              {putingRdv ? "chargement..." : "Reporter le rendez-vous"}
            </Text>
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};
