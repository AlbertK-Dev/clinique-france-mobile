import React, { useEffect, useState } from "react";
import styles from "./style";
import { Button, Text } from "react-native-paper";
import { Dimensions } from "react-native";
import { View, ScrollView } from "react-native";
import colors from "../../constants/colours";
import {
  ArrowLeft,
  CloseCircle,
  SearchNormal1,
} from "iconsax-react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import MedItem from "../../components/MedItem";
import {
  generateKeyTab,
  generateValuesTab,
  jourDeLaSemaine,
} from "../../utils/helper";
import * as SCREENS from "../../constants/screens";
import { SelectList } from "react-native-dropdown-select-list";
import ModaleChoixProfession from "../../components/ModaleChoixSpecialite";
import { useDispatch, useSelector } from "react-redux";
import { setShouldSeeBehind } from "../../redux/commons/action";
import {
  getClinique,
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
    <View>
      <View style={styles.titleBox}>
        <View mr={2} style={styles.number}>
          <Text style={styles.numberLabel}>{number}</Text>
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text
        style={{
          ...styles.hintText,
          color: error ? "red" : colors.text_grey_hint,
          marginBottom: 3,
        }}
      >
        {hintText}
      </Text>
    </View>
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
    return setShouldSeeBehindToFalse;
  }, [navigation]);

  return (
    <View bgColor={colors.white} flex={1} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nouveau rendez-vous</Text>
        <CloseCircle
          onPress={() => {
            navigation.goBack();
            dispatch(setShouldSeeBehind(false));
          }}
          size={26}
          color={colors.black}
        />
      </View>
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
          <View mt={5} style={styles.card}>
            {specialityLoading ? (
              <LoadingSelectComponent />
            ) : (
              <View>
                <HeaderBox
                  number={1}
                  title={"Spécialité du rendez-vous"}
                  hintText={
                    "Sélectionnez une specialité pour votre rendez-vous"
                  }
                />
                <View style={styles.inputBox}>
                  <View>
                    <SelectList
                      setSelected={(val) => {
                        handleChange("speciality", val);
                      }}
                      data={specialities?.map((e) => {
                        return { key: e._id, value: e.label };
                      })}
                      save="key"
                      placeholder="choisir une specialité"
                      boxStyles={{
                        borderRadius: 10,
                        backgroundColor: colors.desable,
                        borderWidth: 0,
                      }}
                      dropdownStyles={{
                        borderRadius: 10,
                        marginTop: 3,
                        borderWidth: 0.6,
                      }}
                      notFoundText={"Aucune specialité trouvée"}
                      searchPlaceholder={"Recherche"}
                      searchicon={<SearchNormal1 color={colors.primary} />}
                    />
                  </View>
                </View>
              </View>
            )}
          </View>
        )}

        {shouldSeeBehind &&
          ((isProfession === true && formData.speciality) ||
            isProfession === false) && (
            <View mt={5} style={styles.card}>
              {motifsLoading ? (
                <LoadingSelectComponent />
              ) : (
                <View>
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
                  <View style={styles.inputBox}>
                    <View>
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
                          boxStyles={{
                            borderRadius: 10,
                            borderWidth: 0,
                            backgroundColor: colors.desable,
                          }}
                          dropdownStyles={{
                            borderRadius: 10,
                            marginTop: 3,
                            borderWidth: 0.6,
                          }}
                          notFoundText={"Aucun motif trouvé"}
                          searchPlaceholder={"Recherche"}
                          searchicon={<SearchNormal1 color={colors.primary} />}
                        />
                      )}
                    </View>
                  </View>
                </View>
              )}
            </View>
          )}

        {/*
        {(isProfession === true && formData.motif) ||
          (isProfession === false && formData.motif && (
            <View>
              <View mt={5} style={styles.card}>
                {clinicLoading ? (
                  <LoadingItemsComponents />
                ) : (
                  <View>
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
                    <View style={styles.inputBox}>
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
                    </View>
                  </View>
                )}
              </View>
            </View>
                      ))} */}

        {(isProfession === true && formData.lieu) ||
          (isProfession === false && formData.lieu && (
            <View>
              <View mt={5} style={styles.card}>
                {praticiensLoading ? (
                  <LoadingItemsComponents />
                ) : (
                  <View>
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
                    <View style={{ ...styles.inputBox }}>
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
                    </View>
                  </View>
                )}
              </View>
            </View>
          ))}

        {formData.praticien && (
          <View>
            <View mt={5} style={styles.card}>
              {dispoLoading ? (
                <LoadingDispoComponent />
              ) : (
                <View>
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
                  <View style={styles.inputBox}>
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
                            <View
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
                            </View>
                          </Pressable>
                        );
                      })}
                    </ScrollView>
                    {formData.period.day && (
                      <View>
                        <View
                          style={{
                            ...styles.hstackBox,
                            marginBottom: 5,
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <View style={styles.prev}>
                            <ArrowLeft color={colors.primary} />
                          </View>
                          <ScrollView
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                          >
                            <View
                              style={styles.hstackBox}
                              alignItems={"center"}
                            >
                              {actualDayCreneaux.map((d, index) => {
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
                                    <View
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
                                    </View>
                                  </Pressable>
                                );
                              })}
                            </View>
                          </ScrollView>
                          <View ml={1.5} style={styles.prev}>
                            <ArrowLeft color={colors.primary} />
                          </View>
                        </View>
                      </View>
                    )}
                  </View>
                </View>
              )}
            </View>
          </View>
        )}
      </ScrollView>
      <Button
        disabled={!formData.period.time}
        style={{
          ...styles.btn,
          backgroundColor: formData.period.time
            ? colors.primary
            : colors.trans_primary,
        }}
        mode="contained"
        onPress={handlePress}
      >
        <Text style={{ color: colors.white, fontSize: 18 }}>Valider</Text>
      </Button>
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
