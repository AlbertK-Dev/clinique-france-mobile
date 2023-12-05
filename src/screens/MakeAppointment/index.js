import React, { useEffect, useState } from "react";
import styles from "./style";
import { Dimensions } from "react-native";
import {
  View,
  Text,
  VStack,
  HStack,
  Box,
  Select,
  Icon,
  ScrollView,
  Button,
  PresenceTransition,
} from "native-base";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import colors from "../../constants/colours";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import MedItem from "../../components/MedItem";
import {
  practiciens,
  disponibilites,
  appointmentDate,
  motifs,
  generateKeyTab,
  generateValuesTab,
  jourDeLaSemaine,
} from "../../utils/helper";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { MAKE_APPOINTMENT_SCREEN } from "../../constants/screens";
import * as SCREENS from "../../constants/screens";
import { useNavigation } from "@react-navigation/native";
import { SelectList } from "react-native-dropdown-select-list";
import { Dialog, RadioButton } from "react-native-paper";
import ModaleChoixProfession from "../../components/ModaleChoixSpecialite";
import { useDispatch, useSelector } from "react-redux";
import {
  setProfessionForRdv,
  setShouldSeeBehind,
} from "../../redux/commons/action";
import {
  getClinique,
  getCliniqueOfSelectedPrat,
  getDispo,
  getMotifs,
  getPraticiens,
  setMotifDuration,
  setRDVForm,
} from "../../redux/RDV/actions";
import LoadingSelectComponent from "./LoadingComponentForSelect";
import LoadingItemsComponents from "./LoadingItemsComponent";
import LoadingDispoComponent from "./LoadingDispoComponent";

const HeaderBox = ({ number, title, hintText, error }) => {
  return (
    <VStack>
      <HStack mb={2} style={styles.titleBox}>
        <Box mr={2} style={styles.number}>
          <Text style={styles.numberLabel}>{number}</Text>
        </Box>
        <Text style={styles.title}>{title}</Text>
      </HStack>
      <Text
        mb={2}
        style={{
          ...styles.hintText,
          color: error ? "red" : colors.text_grey_hint,
        }}
      >
        {hintText}
      </Text>
    </VStack>
  );
};

const MakeAppointment = ({ navigation, route }) => {
  const scrollViewRef = React.useRef();
  const isProfession = useSelector((state) => state.Common.isProfession);
  const idCentre = useSelector((state) => state.Common.idc);
  const [actualDayCreneaux, setActualDayCreneau] = useState([]);
  const RDVForm = useSelector((state) => state.RdvForm.rdvForm);
  const specialityLoading = useSelector(
    (state) => state.RdvForm.specialityLoading
  );
  const motifsLoading = useSelector((state) => state.RdvForm.motifsLoading);
  const clinicLoading = useSelector((state) => state.RdvForm.clinicLoading);
  const praticiensLoading = useSelector(
    (state) => state.RdvForm.praticiensLoading
  );
  const dispoLoading = useSelector((state) => state.RdvForm.dispoLoading);
  const dispo = useSelector((state) => state.RdvForm.dispo);
  const motifs = useSelector((state) => state.RdvForm.motifs);
  const specialities = useSelector((state) => state.RdvForm.specialities);
  const cliniques = useSelector((state) => state.RdvForm.cliniques);
  const praticiens = useSelector((state) => state.RdvForm.praticiens);
  // const selectedProfession = isProfession ? professions.
  const shouldSeeBehind = useSelector((state) => state.Common.shouldSeeBehind);
  const screenWidth = Dimensions.get("screen").width;
  const dispatch = useDispatch();
  const [formData, setFormData] = React.useState({
    motif: null,
    praticien: null,
    speciality: null,
    profession: true,
    period: {
      day: null,
      time: null,
    },
  });

  const handleStepNumber = (n) => {
    if (isProfession === false) {
      return n - 1;
    } else {
      return n;
    }
  };

  const handleChange = (trigger, value) => {
    switch (trigger) {
      case "motif":
        setFormData({
          ...formData,
          motif: value,
          praticien: null,
          lieu: null,
          period: {
            day: null,
            time: null,
          },
        });
        dispatch(
          setRDVForm({
            ...RDVForm,
            motif: value,
          })
        );
        formData?.motif != value && dispatch(setMotifDuration(value));
        formData?.motif != value && dispatch(getClinique(value));
        break;
      case "praticien":
        setFormData({
          ...formData,
          praticien: value?.id,
          period: {
            day: null,
            time: null,
          },
        });
        dispatch(
          setRDVForm({
            ...RDVForm,
            praticien: value?.id,
            idCentre: idCentre || value?.idc,
          })
        );
        formData?.praticien != value?.id &&
          dispatch(
            getDispo({ idCentre: idCentre || value?.idc, idp: value?.id })
          );
        break;
      case "profession":
        setFormData({
          ...formData,
          profession: value,
        });
        dispatch(
          setRDVForm({
            ...RDVForm,
            profession: value,
          })
        );
        break;
      case "speciality":
        setFormData({
          ...formData,
          speciality: value,
          motif: null,
          lieu: null,
          praticien: null,
        });
        dispatch(
          setRDVForm({
            ...RDVForm,
            specialities: value,
          })
        );
        formData?.speciality != value &&
          dispatch(getMotifs({ id: value, forSpec: true }));
        break;
      case "lieu":
        formData?.lieu != value &&
          setFormData({
            ...formData,
            lieu: value,
            praticien: null,
          });
        formData?.lieu != value &&
          dispatch(
            setRDVForm({
              ...RDVForm,
              lieu: value,
            })
          );
        formData?.lieu != value &&
          dispatch(getPraticiens({ id: value, ids: RDVForm.specialities }));
        break;
      case "day":
        setFormData({
          ...formData,
          period: { time: null, day: value },
        });
        dispatch(
          setRDVForm({
            ...RDVForm,
            period: { time: null, day: value },
          })
        );
        setActualDayCreneau(generateValuesTab(value, dispo));
        break;
      case "time":
        setFormData({
          ...formData,
          period: { ...formData.period, time: value },
        });
        dispatch(
          setRDVForm({
            ...RDVForm,
            period: { ...formData.period, time: value },
          })
        );
        break;
      default:
        break;
    }
  };

  const handlePress = () => {
    navigation.navigate(SCREENS.PAYMENT, { ext: false });
  };

  useEffect(() => {
    const setShouldSeeBehindToFalse = navigation.addListener(
      "beforeRemove",
      () => {
        dispatch(setShouldSeeBehind(false));
      }
    );
    console.log(shouldSeeBehind, isProfession);
    return setShouldSeeBehindToFalse;
  }, [navigation]);

  return (
    <View bgColor={colors.white} flex={1} style={styles.container}>
      {/* Header */}
      <HStack style={styles.header}>
        <Text style={styles.headerTitle}>Nouveau rendez-vous</Text>
        <Box style={styles.closeBtn}>
          <Pressable
            onPress={() => {
              navigation.goBack();
              dispatch(setShouldSeeBehind(false));
            }}
          >
            <Icon
              as={AntDesign}
              name="close"
              size={"sm"}
              color={colors.black}
            />
          </Pressable>
        </Box>
      </HStack>
      <ScrollView
        ref={scrollViewRef}
        nestedScrollEnabled={true}
        onContentSizeChange={(contentWidth, contentHeight) => {
          formData.praticien &&
            scrollViewRef.current?.scrollTo({
              y: contentHeight,
              animated: true,
            });
        }}
        showsVerticalScrollIndicator={false}
        height={"80%"}
        borderColor={"red"}
        mb={2}
      >
        {shouldSeeBehind && isProfession === true && (
          <VStack mt={5} style={styles.card}>
            {specialityLoading ? (
              <LoadingSelectComponent />
            ) : (
              <Box>
                <HeaderBox
                  number={1}
                  title={"Spécialité du rendez-vous"}
                  hintText={
                    "Sélectionnez une specialité pour votre rendez-vous"
                  }
                />
                <VStack style={styles.inputBox}>
                  <Box>
                    <SelectList
                      setSelected={(val) => {
                        handleChange("speciality", val);
                      }}
                      data={specialities?.map((e) => {
                        return { key: e._id, value: e.label };
                      })}
                      save="key"
                      placeholder="choisir une specialité"
                      boxStyles={{ borderRadius: 5 }}
                      dropdownStyles={{
                        borderRadius: 5,
                        marginTop: 0,
                      }}
                      notFoundText={"Aucune specialité trouvée"}
                      searchPlaceholder={"Recherche"}
                      searchicon={
                        <Icon
                          as={MaterialIcons}
                          name="search"
                          mr={2}
                          size={"lg"}
                        />
                      }
                    />
                  </Box>
                </VStack>
              </Box>
            )}
          </VStack>
        )}
        {shouldSeeBehind &&
          ((isProfession === true && formData.speciality) ||
            isProfession === false) && (
            <VStack mt={5} style={styles.card}>
              {motifsLoading ? (
                <LoadingSelectComponent />
              ) : (
                <Box>
                  <HeaderBox
                    number={handleStepNumber(2)}
                    title={"Motif du rendez-vous"}
                    error={motifs?.length <= 0}
                    hintText={
                      motifs?.length > 0
                        ? "Sélectionnez un motif pour votre rendez-vous"
                        : "Aucun motif ne corresponds à vos choix"
                    }
                  />
                  <VStack style={styles.inputBox}>
                    <Box>
                      {motifs?.length > 0 && (
                        <SelectList
                          setSelected={(val) => {
                            handleChange("motif", val);
                          }}
                          placeholder="choisir un motif"
                          data={motifs?.map((e) => {
                            return { key: e._id, value: e.label };
                          })}
                          save="key"
                          boxStyles={{ borderRadius: 5 }}
                          dropdownStyles={{
                            borderRadius: 5,
                            marginTop: 0,
                          }}
                          notFoundText={"Aucun motif trouvé"}
                          searchPlaceholder={"Recherche"}
                          searchicon={
                            <Icon
                              as={MaterialIcons}
                              name="search"
                              mr={2}
                              size={"lg"}
                            />
                          }
                        />
                      )}
                    </Box>
                  </VStack>
                </Box>
              )}
            </VStack>
          )}

        {/*Medecin traitant*/}
        {
          <PresenceTransition
            visible={
              (isProfession === true && formData.motif) ||
              (isProfession === false && formData.motif)
            }
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: {
                duration: 250,
              },
            }}
          >
            <VStack mt={5} style={styles.card}>
              {clinicLoading ? (
                <LoadingItemsComponents />
              ) : (
                <Box>
                  <HeaderBox
                    number={handleStepNumber(3)}
                    title={"Choix clinique"}
                    error={cliniques?.length <= 0}
                    hintText={
                      cliniques?.length > 0
                        ? "Sélectionner une clinique pour votre rendez-vous"
                        : "Aucune clinique ne reponds a vos selections"
                    }
                  />
                  <VStack style={styles.inputBox}>
                    <ScrollView
                      showsHorizontalScrollIndicator={false}
                      horizontal={true}
                    >
                      {cliniques.map((p, index) => {
                        return (
                          <MedItem
                            key={p._id}
                            value={formData.lieu}
                            trigger={"lieu"}
                            handleChange={handleChange}
                            infosPraticien={null}
                            infosClinique={p}
                            index={index}
                          />
                        );
                      })}
                    </ScrollView>
                  </VStack>
                </Box>
              )}
            </VStack>
          </PresenceTransition>
        }

        {
          <PresenceTransition
            visible={
              (isProfession === true && formData.lieu) ||
              (isProfession === false && formData.lieu)
            }
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: {
                duration: 250,
              },
            }}
          >
            <VStack mt={5} style={styles.card}>
              {praticiensLoading ? (
                <LoadingItemsComponents />
              ) : (
                <Box>
                  <HeaderBox
                    number={handleStepNumber(4)}
                    title={"Médecin traitant"}
                    error={praticiens?.length <= 0}
                    hintText={
                      praticiens?.length > 0
                        ? "Sélectionner un praticien pour votre rendez-vous"
                        : "Aucun praticien dans cette clinique"
                    }
                  />
                  <VStack style={styles.inputBox}>
                    <ScrollView
                      showsHorizontalScrollIndicator={false}
                      horizontal={true}
                    >
                      {praticiens.map((p, index) => {
                        return (
                          <MedItem
                            key={p._id}
                            idCentre={p?.idCentre}
                            value={formData.praticien}
                            trigger={"praticien"}
                            handleChange={handleChange}
                            infosPraticien={p}
                            index={index}
                          />
                        );
                      })}
                    </ScrollView>
                  </VStack>
                </Box>
              )}
            </VStack>
          </PresenceTransition>
        }

        {/*Periode du rendez-vous*/}
        {
          <PresenceTransition
            visible={formData.praticien}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: {
                duration: 250,
              },
            }}
          >
            <VStack mt={5} style={styles.card}>
              {dispoLoading ? (
                <LoadingDispoComponent />
              ) : (
                <Box>
                  <HeaderBox
                    number={handleStepNumber(5)}
                    error={generateKeyTab(dispo)?.length <= 0}
                    title={"Période du rendez-vous"}
                    hintText={
                      generateKeyTab(dispo)?.length > 0
                        ? "Sélectionner une période pour votre rendez-vous"
                        : "Aucune disponibilité pour vos choix"
                    }
                  />
                  <VStack style={styles.inputBox}>
                    <ScrollView
                      showsHorizontalScrollIndicator={false}
                      horizontal={true}
                    >
                      {generateKeyTab(dispo).map((d, index) => {
                        return (
                          <Pressable
                            onPress={() => handleChange("day", d)}
                            key={d}
                          >
                            <Box
                              ml={index !== 0 ? 2 : 0}
                              style={{
                                ...styles.period,
                                borderColor:
                                  formData.period.day === d
                                    ? colors.trans_primary
                                    : colors.text_grey_hint,
                                backgroundColor:
                                  formData.period.day === d
                                    ? colors.trans_primary
                                    : "transparent",
                              }}
                            >
                              <Text
                                style={{
                                  ...styles.periodText,
                                  color:
                                    formData.period.day === d?.id
                                      ? colors.primary
                                      : colors.black,
                                }}
                              >
                                {jourDeLaSemaine(d) + ", " + d.split("-")[2]}
                              </Text>
                            </Box>
                          </Pressable>
                        );
                      })}
                    </ScrollView>

                    <PresenceTransition
                      visible={formData.period.day}
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                        transition: {
                          duration: 250,
                        },
                      }}
                    >
                      <HStack
                        mt={5}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        <Box mr={1.5} style={styles.prev}>
                          <Icon
                            as={MaterialIcons}
                            name="keyboard-arrow-left"
                            size={"lg"}
                          />
                        </Box>
                        <ScrollView
                          showsHorizontalScrollIndicator={false}
                          horizontal={true}
                        >
                          <HStack alignItems={"center"}>
                            {actualDayCreneaux.map((d, index) => {
                              console.log("logging days ....");
                              return (
                                <Pressable
                                  onPress={() => {
                                    handleChange("time", d?.start);
                                    dispatch(
                                      setRDVForm({
                                        ...RDVForm,
                                        date_long: d?.date_long,
                                        period: {
                                          ...formData.period,
                                          time: d?.start,
                                        },
                                      })
                                    );
                                  }}
                                  key={d.start}
                                >
                                  <Box
                                    ml={index !== 0 ? 2 : 0}
                                    style={{
                                      ...styles.period,
                                      borderColor:
                                        formData.period.time === d.start
                                          ? colors.trans_primary
                                          : colors.text_grey_hint,
                                      backgroundColor:
                                        formData.period.time === d.start
                                          ? colors.trans_primary
                                          : "transparent",
                                    }}
                                  >
                                    <Text
                                      style={{
                                        ...styles.periodText,
                                        color:
                                          formData.period.time === d.start
                                            ? colors.primary
                                            : colors.black,
                                      }}
                                    >
                                      {d.start}
                                    </Text>
                                  </Box>
                                </Pressable>
                              );
                            })}
                          </HStack>
                        </ScrollView>
                        <Box ml={1.5} style={styles.prev}>
                          <Icon
                            as={MaterialIcons}
                            name="keyboard-arrow-right"
                            size={"lg"}
                          />
                        </Box>
                      </HStack>
                    </PresenceTransition>
                  </VStack>
                </Box>
              )}
            </VStack>
          </PresenceTransition>
        }
      </ScrollView>
      <VStack width={screenWidth} flex={1} style={styles.btnBox}>
        <Button
          isDisabled={!formData.period.time}
          style={styles.btn}
          onPress={handlePress}
        >
          <Text color={colors.white} style={styles.btnLabel}>
            Valider
          </Text>
        </Button>
      </VStack>
      {
        <ModaleChoixProfession
          navigation={navigation}
          onClose={() => dispatch(setShouldSeeBehind(false))}
        />
      }
    </View>
  );
};

export default MakeAppointment;
