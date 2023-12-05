import {
  Box,
  Button,
  Divider,
  FlatList,
  HStack,
  Icon,
  Pressable,
  ScrollView,
  Stack,
  Text,
  VStack,
  View,
  useToast,
} from "native-base";
import React, { useEffect } from "react";
import Header from "../../components/Header";
import colors from "../../constants/colours";
import { useState } from "react";
import MedItem from "../../components/MedItem";
import { useDispatch, useSelector } from "react-redux";
import {
  getDispo,
  getMotifs,
  postRDV,
  saveExtPRData,
} from "../../redux/RDV/actions";
import {
  generateKeyTab,
  generateValuesTab,
  jourDeLaSemaine,
  troncate,
} from "../../utils/helper";
import { Danger, Data } from "iconsax-react-native";
import CustomToast from "../../components/CustomToast";
import {
  MaterialIcons,
  Ionicons,
  AntDesign,
  Foundation,
} from "@expo/vector-icons";
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
  const toast = useToast();

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
    <Box flex={1} style={{ backgroundColor: colors.white }}>
      <Header title={"Détails praticien"} bg={colors.white} />
      <VStack space={4} height={"82%"}>
        <HStack
          px={5}
          alignItems={"center"}
          space={4}
          style={{
            backgroundColor: colors.white,
            padding: 10,
            borderRadius: 10,
          }}
        >
          <Box
            style={{
              height: 70,
              width: 70,
              borderRadius: 10,
              backgroundColor: colors.text_grey_hint,
            }}
          ></Box>
          <VStack>
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
          </VStack>
        </HStack>
        <HStack justifyContent={"space-around"} px={8}>
          <VStack justifyContent={"center"} alignItems={"center"}>
            <Text style={{ color: colors.yellow }}>542+</Text>
            <Text>Patients</Text>
          </VStack>
          <VStack justifyContent={"center"} alignItems={"center"}>
            <Text style={{ color: colors.yellow }}>11 years</Text>
            <Text>Experience+</Text>
          </VStack>
          <VStack justifyContent={"center"} alignItems={"center"}>
            <Text style={{ color: colors.yellow }}>4.79</Text>
            <Text>Rating</Text>
          </VStack>
        </HStack>
        <HStack justifyContent={"center"}>
          <Divider width={"80%"} />
        </HStack>
        <HStack
          mt={2}
          m={2}
          marginLeft={5}
          space={2}
          style={{
            width: "80%",
            alignItems: "center",
          }}
        >
          {/* <Danger color={colors.danger} size={22} /> */}
          <Icon
            as={<MaterialIcons />}
            marginRight={2}
            name="info"
            size={"md"}
            color={"primary.500"}
          />
          <Text color={colors.primary} fontWeight={500} width={"95%"}>
            {`Parametrez un rendez-vous avec Dr ${
              actualPraticien?.name + " " + actualPraticien?.surname
            } !`}
          </Text>
        </HStack>
        <ScrollView
          height={"53%"}
          nestedScrollEnabled={true}
          ref={scrollViewRef}
          onContentSizeChange={(contentWidth, contentHeight) => {
            shouldScroll &&
              scrollViewRef.current?.scrollTo({
                y: contentHeight,
                animated: true,
              });
          }}
          showsVerticalScrollIndicator={true}
        >
          <VStack space={_spacing}>
            <VStack px={5}>
              <Text>Motifs Traitables</Text>
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
                        <View
                          bg={
                            itemSelected?.label === item?.label
                              ? "primary.500"
                              : "white"
                          }
                          borderWidth={1}
                          borderColor={
                            itemSelected?.label === item?.label
                              ? "primary.500"
                              : colors.normal_gray
                          }
                          style={[
                            {
                              paddingHorizontal: 20,
                              paddingVertical: 10,
                              borderRadius: 20,
                            },
                            {
                              shadowColor: "#000",
                              shadowOffset: {
                                width: 0,
                                height: 3,
                              },
                              shadowOpacity: 0.01,
                              shadowRadius: 3.84,
                              elevation: 0.1,
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
                        </View>
                      </Pressable>
                    );
                  }}
                />
              ) : motifs?.length == 0 && (motifsLoading || dispoLoading) ? (
                <LoadingMotifs />
              ) : (
                <LoadingMotifs />
              )}
            </VStack>
            {actualPraticien?.affectation?.length > 0 ? (
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
            )}
            <VStack px={5} space={_spacing}>
              <Text>Periode de travail</Text>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                mb={4}
              >
                <HStack alignItems={"center"}>
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
                            scrollToBottom();
                            setShouldScroll(true);
                            setTimeout(() => {
                              setShouldScroll(false);
                            }, 500);
                          }}
                        >
                          <Box
                            ml={index !== 0 ? 2 : 0}
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
                          </Box>
                        </Pressable>
                      );
                      // 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
                    })
                  ) : (
                    <LoadingDispo />
                  )}
                </HStack>
              </ScrollView>
            </VStack>
            <HStack px={5}>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal={true}
              >
                <HStack alignItems={"center"}>
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
                      <Box
                        ml={index !== 0 ? 2 : 0}
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
                      </Box>
                    </Pressable>
                  ))}
                </HStack>
              </ScrollView>
            </HStack>
          </VStack>
        </ScrollView>
      </VStack>
      <HStack
        justifyContent={"center"}
        alignItems={"center"}
        px={5}
        width={"100%"}
        height={"10%"}
        //</Box> marginTop={5}
      >
        <Button
          isLoading={loadingPostRdv}
          onPress={handlePostRdv}
          width={"100%"}
          disabled={!allFieldFilled()}
          height={"60%"}
          style={{
            backgroundColor: allFieldFilled()
              ? colors.primary
              : colors.trans_primary,
          }}
          borderRadius={20}
        >
          <Text color={colors.white}>PRENDRE UN RDV</Text>
        </Button>
      </HStack>
    </Box>
  );
};
