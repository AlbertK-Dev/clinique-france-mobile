import React, { useState } from "react";
import * as SCREENS from "../../constants/screens";
import {
  Box,
  Button,
  HStack,
  Icon,
  ScrollView,
  Text,
  VStack,
  View,
  useToast,
} from "native-base";
import styles from "./style";
import colors from "../../constants/colours";
import { Foundation, MaterialIcons } from "@expo/vector-icons";
import CardInfo from "../../components/CardInfo";
import { useRoute } from "@react-navigation/native";
import { connect, useDispatch, useSelector } from "react-redux";
import { cancelRDV } from "../../redux/RDV/actions";
import CustomToast from "../../components/CustomToast";
import { CLEAR_ERR_SUCC } from "../../redux/RDV/types";
import { Danger } from "iconsax-react-native";
import { Alert } from "react-native";
import { useTranslation } from "react-i18next";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import { Platform } from "react-native";

const AppointmentDetails = ({ navigation, appointments }) => {
  const cancellLoading = useSelector(
    (state) => state.RdvForm.cancellingLoading
  );
  const cancellSuccess = useSelector(
    (state) => state.RdvForm.cancellingSuccess
  );
  const cancellingError = useSelector((state) => state.RdvForm.errorMsg);
  const userInfo = useSelector((state) => state.UserReducer.userInfos);
  const [dispSuprrMod, setDisplSuppMod] = useState(false);
  const route = useRoute();
  const toast = useToast();
  const dispatch = useDispatch();
  const { _id } = route.params;
  const [appointment, setAppointment] = React.useState({});
  const [showPaiementInfo, setShowPaimentInfo] = useState(true);
  const translate = useTranslation().t;

  if (dispSuprrMod) {
    Alert.alert(
      Platform.OS === "ios"
        ? translate("TEXT_ABORT_RDV_TITLE")
        : translate("TEXT_ABORT_RDV_TITLE_MINUSC"),
      translate("TEXT_ABORT_RDV"),
      [
        {
          text: translate("TEXT_CONTINUE"),
          style: "destructive",
          onPress: () => {
            handleCancel();
          },
        },
        {
          text: translate("TEXT_ABORT"),
          onPress: () => setDisplSuppMod(false),
        },
      ],
      {
        titleStyle: {
          fontSize: 18,
          color: "red",
        },
      }
    );
  }

  React.useEffect(() => {
    const apt = appointments.find((apt) => apt._id === _id);
    setAppointment(apt);

    return () => {
      dispatch({ type: CLEAR_ERR_SUCC });
    };
  }, []);

  const handleCancel = () => {
    dispatch(
      cancelRDV({
        id: appointment?._id,
        idCentre: appointment?.patient?.idCentre,
        status: "Annulé",
        idUser: userInfo?.user?._id,
      })
    );
  };

  React.useEffect(() => {
    setDisplSuppMod(false);
    if (cancellingError) {
      toast.show({
        render: () => {
          return (
            <CustomToast
              message={putingErrorMsg ?? "Une erreur est survenue !"}
              color={colors.danger}
              bgColor={"red.100"}
              icon={<Foundation name="alert" size={24} />}
              iconColor={colors.danger}
            />
          );
        },
        placement: "top",
        duration: 3000,
      });
    }

    if (cancellSuccess) {
      Alert.alert(
        Platform.OS === "ios"
          ? translate("TEXT_ABORT_RDV_TITLE_SUCCESS")
          : translate("TEXT_ABORT_RDV_TITLE_SUCCESS_MINUSC"),
        translate("TEXT_ABORT_RDV_SUCCESS"),
        [
          {
            text: "OK",
            onPress: () => navigation.navigate(SCREENS.RDV),
          },
        ]
      );
    }
  }, [cancellingError, cancellSuccess]);

  return (
    <View flex={1}>
      <ScrollView
        p={3}
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
      >
        <VStack space={5}>
          <VStack space={2}>
            <Text style={styles.sectionTitle}>Le medecin</Text>
            <HStack alignItems={"center"} space={4} style={styles.medCard}>
              <Box style={styles.profile}></Box>
              <VStack>
                <Text style={styles.medName}>
                  Dr {appointment?.name} {appointment?.surname}
                </Text>
                <Text style={styles.label}>{appointment?.profession}</Text>
                <Text style={styles.label}>4,5/5 (388 avis)</Text>
              </VStack>
            </HStack>
            {appointment?.status == "Annulé" ? (
              <HStack
                mt={2}
                space={2}
                style={{
                  ...styles.alert,
                  backgroundColor: colors.transp_danger,
                }}
              >
                <Danger color={colors.danger} size={22} />
                <Text color={colors.danger} fontWeight={500}>
                  Ce rendez-vous est annulé !
                </Text>
              </HStack>
            ) : (
              <HStack space={4} mt={2}>
                <PrimaryButton
                  title={
                    <Text color={colors.danger} fontWeight={500}>
                      Annuler
                    </Text>
                  }
                  isLoadingText={""}
                  isLoading={cancellLoading}
                  style={{
                    ...styles.button,
                    backgroundColor: colors.transp_danger,
                  }}
                  color={colors.primary}
                  onPress={() => setDisplSuppMod(true)}
                  minWidth="1/4"
                />
                <Button
                  style={styles.button}
                  onPress={() =>
                    navigation.navigate(SCREENS.APPOINTMENT_REPORT_SCREEN, {
                      navigation: navigation,
                      appointment: appointment,
                    })
                  }
                  backgroundColor={colors.primary}
                >
                  <Text color={colors.white} fontWeight={500}>
                    Reporter
                  </Text>
                </Button>
              </HStack>
            )}
          </VStack>

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

          <VStack space={2}>
            <HStack
              justifyContent={"space-between"}
              mb={!showPaiementInfo ? 5 : undefined}
            >
              <Text style={styles.sectionTitle}>
                Informations sur le paiement
              </Text>
              <Icon
                as={MaterialIcons}
                name={
                  showPaiementInfo ? "keyboard-arrow-up" : "keyboard-arrow-down"
                }
                color={colors.black}
                size="lg"
                onPress={() => setShowPaimentInfo((v) => !v)}
              />
            </HStack>
            {showPaiementInfo && (
              <VStack style={{ ...styles.paiementContainer }}>
                <HStack space={2} style={styles.alert}>
                  <Danger color={colors.warning} size={22} />
                  <Text color={colors.warning} fontWeight={500}>
                    Votre paiement est incomplet.
                  </Text>
                </HStack>
                <VStack space={2} style={styles.appoinmentsBox} mb={6}>
                  <HStack justifyContent={"space-between"}>
                    <Text style={styles.label}>Honoraires du medecin</Text>
                    <Text>XAF 10.000,00</Text>
                  </HStack>
                  <HStack justifyContent={"space-between"}>
                    <Text style={styles.label}>Frais système</Text>
                    <Text>XAF 10.000,00</Text>
                  </HStack>
                  <HStack justifyContent={"space-between"}>
                    <Text style={styles.label}>Remise</Text>
                    <Text>XAF 10.000,00</Text>
                  </HStack>
                  <HStack justifyContent={"space-between"}>
                    <Text style={styles.label}>Total à payer</Text>
                    <Text>XAF 10.000,00</Text>
                  </HStack>
                  <HStack justifyContent={"space-between"}>
                    <Text style={styles.label}>Total payé</Text>
                    <Text>XAF 10.000,00</Text>
                  </HStack>
                  <HStack justifyContent={"space-between"}>
                    <Text style={styles.label}>Paiement dû</Text>
                    <Text>XAF 10.000,00</Text>
                  </HStack>
                </VStack>
              </VStack>
            )}
          </VStack>
        </VStack>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = ({ RdvForm }) => ({
  appointments: RdvForm.myRdv,
});

export default connect(mapStateToProps)(AppointmentDetails);
