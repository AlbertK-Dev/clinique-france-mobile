import React, { useEffect } from "react";
import Header from "../../components/Header";
import colors from "../../constants/colours";
import { useState } from "react";
import { Button, Surface, Text , Divider} from "react-native-paper";
import { ScrollView, View , Pressable, FlatList} from "react-native";
import MedItem from "../../components/MedItem";
import { useDispatch, useSelector } from "react-redux";
import { getDispo, getMotifs, saveExtPRData } from "../../redux/RDV/actions";
import {
  generateKeyTab,
  generateValuesTab,
  jourDeLaSemaine,
  troncate,
} from "../../utils/helper";
import { Danger, InfoCircle } from "iconsax-react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LoadingMotifs } from "./loadingMotifSkeleton";
import { LoadingDispo } from "./LoadingClinicSkeleton";
import * as SCREENS from "../../constants/screens";
import { useNavigation } from "@react-navigation/native";

const _spacing = 3;

export const DetailsPraticien = ({ route, navigation }) => {
  const actualPraticien = route.params.praticien;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.UserReducer.userInfos);
  const [actualCreaneau, setActualCreaneau] = useState([]);
  const motifs = useSelector((state) => state.RdvForm.motifs);
  const [itemSelected, setItemSelected] = useState(motifs[0]);
  const dispo = useSelector((state) => state.RdvForm.dispo);
  const scrollViewRef = React.useRef();
  const [shouldScroll, setShouldScroll] = useState(false);
  const successPostRdv = useSelector((state) => state.RdvForm.successPostRdv);
  const errorMsgPostRDV = useSelector((state) => state.RdvForm.errorMsgPostRDV);
  const loadingPostRdv = useSelector((state) => state.RdvForm.loadingPostRdv);
  const dispoLoading = useSelector((state) => state.RdvForm.dispoLoading);
  const motifsLoading = useSelector((state) => state.RdvForm.motifsLoading);
  const [selectedDat, setSelectedDay] = useState(generateKeyTab(dispo)[0]);
  const [selectedCreneau, setSelectedCreneau] = useState(
    generateValuesTab(generateKeyTab(dispo)[0], dispo)
  );
  const [selectedCreaneauWhole, setSelectedCreneauWhole] = useState({});
  const [selectedClinic, setSelectedClinic] = useState(
    actualPraticien?.affectation[0]
  );

  useEffect(() => {
    dispatch(
      getDispo({
        idCentre: actualPraticien?.idCentre,
        idp: actualPraticien?._id,
      })
    );
    dispatch(getMotifs({ id: actualPraticien?.job?._id, forSpec: true }));
    setTimeout(() => {
      setSelectedClinic(actualPraticien?.affectation[0]);
      setSelectedDay(generateKeyTab(dispo)[0]);
      setActualCreaneau(generateValuesTab(generateKeyTab(dispo)[0], dispo));
      setItemSelected(motifs[0]);
    }, 3000);
  }, []);

  const scrollToBottom = () => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  };

  const allFieldFilled = () => {
    return (
      selectedClinic?._id &&
      actualPraticien?._id &&
      selectedCreneau &&
      selectedDat &&
      itemSelected?.default_time &&
      selectedCreaneauWhole?.date_long
    );
  };

  const handlePostRdv = () => {
    const data1 = {
      idCentre: actualPraticien?.idCentre,
      lieu: selectedClinic?._id,
      praticien: actualPraticien?._id,
      motif: itemSelected?._id,
      period: {
        time: selectedCreneau,
        day: selectedDat,
      },
      duration_rdv: itemSelected?.default_time,
      date_long: selectedCreaneauWhole?.date_long,
    };
    const data = { ...data1, ...user };
    dispatch(saveExtPRData(data));
    navigation.navigate(SCREENS.PAYMENT, { ext: true });
  };

  return (
    <View style={{ backgroundColor: colors.white, height: "100%" }}>
      <Header title={"Détails praticien"} />
      <View style={{ gap: 10, margin: 5 }}>
        <View
          style={{
            backgroundColor: colors.white,
            padding: 10,
            borderRadius: 10,
            alignItems: "center",
            paddingHorizontal: 5,
            gap: 10,
            display: "flex",
            flexDirection: "row",
            paddingHorizontal:5
          }}
        >
          <View
            style={{
              height: 70,
              width: 70,
              borderRadius: 10,
              backgroundColor: colors.text_grey_hint,
            }}
          ></View>
          <View>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: colors.black,
              }}
            >
              Dr {actualPraticien?.name + " " + actualPraticien?.surname}
            </Text>
            <Text style={{ color: colors.text_grey_hint }}>
              {actualPraticien?.job?.label}
            </Text>
            <Text style={{ color: colors.text_grey_hint }}>
              4,5/5 (388 avis)
            </Text>
          </View>
        </View>
        <View
          style={{
            justifyContent: "space-around",
            display: "flex",
            flexDirection: "row",
            paddingHorizontal: 5,
          }}
        >
          <View justifyContent={"center"} alignItems={"center"}>
            <Text style={{ color: colors.yellow }}>542+</Text>
            <Text>Patients</Text>
          </View>
          <View justifyContent={"center"} alignItems={"center"}>
            <Text style={{ color: colors.yellow }}>11 years</Text>
            <Text>Experience+</Text>
          </View>
          <View justifyContent={"center"} alignItems={"center"}>
            <Text style={{ color: colors.yellow }}>4.79</Text>
            <Text>Rating</Text>
          </View>
        </View>
          <Divider width={"100%"} />
        <View
          style={{
            width: "80%",
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            padding: 10,
            gap: 10,
          }}
        >
          <InfoCircle variant="Bold" color={colors.primary} />
          <Text style={{color:colors.primary, fontWeight:500}}>
            {`Parametrez un rendez-vous avec Dr ${
              actualPraticien?.name + " " + actualPraticien?.surname
            } !`}
          </Text>
        </View>
        <ScrollView
          style={{ height: "38%" }}
          showsVerticalScrollIndicator={true}
        >
          <View style={{ padding: 10, gap:15 }}>
            <View style={{gap:10}}>
              <Text style={{fontSize:16}}>Motifs Traitables</Text>
              {motifs?.length > 0 && !motifsLoading && !dispoLoading ? (
                <FlatList
                  data={motifs}
                  keyExtractor={(v) => v?._id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  scrollEnabled={true}
                  renderItem={({ item, index }) => {
                    return (
                      <Pressable
                        py={_spacing}
                        ml={_spacing - 1}
                        key={index}
                        onPress={() => {
                          setItemSelected(item);
                        }}
                      >
                        <Surface
                          elevation={1}
                          style={[
                            {
                              paddingHorizontal: 20,
                              paddingVertical: 10,
                              borderRadius: 20,
                            },

                            {
                              backgroundColor:
                                itemSelected?.label === item?.label
                                  ? colors.primary
                                  : "white",
                              borderWidth: 1,
                              borderColor:
                                itemSelected?.label === item?.label
                                  ? colors.primary
                                  : colors.normal_gray,
                            },
                          ]}
                        >
                          <Text
                            color={
                              itemSelected?.label === item?.label
                                ? "white"
                                : colors.text_grey_hint
                            }
                          >
                            {troncate(item?.label)}
                          </Text>
                        </Surface>
                      </Pressable>
                    );
                  }}
                />
              ) : motifs?.length == 0 && (motifsLoading || dispoLoading) ? (
                <LoadingMotifs />
              ) : (
                <LoadingMotifs />
              )}
            </View>
            {/*{actualPraticien?.affectation?.length > 0 ? (
              <VStack px={5} space={_spacing}>
                <Text>Clinique affectées</Text>
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                >
                  {actualPraticien?.affectation?.map((p, index) => {
                    return (
                      <MedItem
                        key={index}
                        value={selectedClinic?._id}
                        handleChange={() => setSelectedClinic(p)}
                        infosClinique={p}
                        index={index}
                      />
                    );
                  })}
                </ScrollView>
              </VStack>
            ) : (
              <Stack px={5}>
                <HStack
                  mt={2}
                  space={2}
                  style={{
                    borderRadius: 10,
                    padding: 10,
                    alignItems: "center",
                    marginBottom: 10,
                    backgroundColor: colors.transp_danger,
                  }}
                >
                  <Danger color={colors.danger} size={22} />
                  <Text color={colors.danger} fontWeight={500}>
                    Affecté a aucune clinique
                  </Text>
                </HStack>
              </Stack>
                )}*/}
            <View style={{ gap: 10 }}>
              <Text style={{fontSize:16}}>Periode de travail</Text>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                mb={4}
              >
                <View
                  style={{ gap: 10, display: "flex", flexDirection: "row" }}
                >
                  {dispo?.length > 0 && !dispoLoading ? (
                    generateKeyTab(dispo).map((d, index) => {
                      return (
                        <Pressable
                          key={index}
                          onPress={() => {
                            setSelectedDay(() => {
                              setActualCreaneau(generateValuesTab(d, dispo));
                              return d;
                            });
                            //scrollToBottom();
                            setShouldScroll(true);
                            setTimeout(() => {
                              setShouldScroll(false);
                            }, 500);
                          }}
                        >
                          <View
                            style={{
                              padding: 10,
                              borderRadius: 10,
                              borderColor: colors.text_grey_hint,
                              borderWidth: 0.5,
                              backgroundColor: "transparent",
                              borderColor:
                                selectedDat === d
                                  ? colors.trans_primary
                                  : colors.text_grey_hint,
                              backgroundColor:
                                selectedDat === d
                                  ? colors.trans_primary
                                  : "transparent",
                            }}
                          >
                            <Text style={{ color: colors.black }}>
                              {jourDeLaSemaine(d) + ", " + d.split("-")[2]}
                            </Text>
                          </View>
                        </Pressable>
                      );
                    })
                  ) : (
                    <LoadingDispo />
                  )}
                </View>
              </ScrollView>
            </View>
            <View
              style={{
                gap: 5,
                padding: 8,
                display: "flex",
                flexDirection: "row",
              }}
            >
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal={true}
              >
                <View style={{ gap:10, display: "flex", flexDirection: "row" }}>
                  {actualCreaneau?.map((d, index) => (
                    <Pressable
                      onPress={() => {
                        setSelectedCreneau(() => {
                          return d?.start;
                        });
                        setSelectedCreneauWhole(d);
                      }}
                      key={index}
                    >
                      <View
                        style={{
                          padding: 10,
                          borderRadius: 10,
                          borderColor: colors.text_grey_hint,
                          borderWidth: 0.5,
                          borderColor:
                            selectedCreneau === d?.start
                              ? colors.trans_primary
                              : colors.text_grey_hint,
                          backgroundColor:
                            selectedCreneau === d?.start
                              ? colors.trans_primary
                              : "transparent",
                        }}
                      >
                        <Text
                          style={{
                            color:
                              selectedCreneau === d?.start
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
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={{ padding: 10, marginTop: 10 }}>
        <Button
          loading={loadingPostRdv}
          onPress={handlePostRdv}
          width={"100%"}
          disabled={!allFieldFilled()}
          height={45}
          style={{
            backgroundColor: allFieldFilled()
              ? colors.primary
              : colors.trans_primary,
            justifyContent: "center",
          }}
          contentStyle={{
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
          children={"PRENDRE UN  RDV"}
          labelStyle={{
            color: "white",
            fontSize: 18,
          }}
        />
      </View>
    </View>
  );
};
