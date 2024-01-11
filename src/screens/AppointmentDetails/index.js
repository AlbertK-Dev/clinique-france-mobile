import React, { useState } from "react";
import * as SCREENS from "../../constants/screens";
import styles from "./style";
import colors from "../../constants/colours";
import CardInfo from "../../components/CardInfo";
import { useRoute } from "@react-navigation/native";
import { connect, useDispatch, useSelector } from "react-redux";
import { cancelRDV } from "../../redux/RDV/actions";
import { CLEAR_ERR_SUCC } from "../../redux/RDV/types";
import { Danger, ArrowUp2, ArrowDown2 } from "iconsax-react-native";
import { Alert, View, Text, ScrollView, Pressable } from "react-native";
import { useTranslation } from "react-i18next";
import { Platform } from "react-native";
import { Button } from "react-native-paper";

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
      Alert.alert(
        Platform.OS === "ios"
          ? "ERREUR DE CONNEXION"
          :"Erreur de connexion" ,
        translate("TEXT_ABORT_RDV"),
        [
          {
            text: translate("TEXT_CONTINUE"),
            style: "destructive",
           // onPress: () => {
           //   handleCancel();
           // },
          },
          {
            text: translate("TEXT_ABORT"),
           // onPress: () => setDisplSuppMod(false),
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
      <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 15 }}>
        <View>
          <View>
            <Text style={styles.sectionTitle}>Le medecin</Text>
            <View style={{ ...styles.medCard, marginBottom: 10 }}>
              <View style={styles.profile}></View>
              <View style={{ marginLeft: 15 }}>
                <Text style={styles.medName}>
                  Dr {appointment?.name} {appointment?.surname}
                </Text>
                <Text style={styles.label}>{appointment?.profession}</Text>
                <Text style={styles.label}>4,5/5 (388 avis)</Text>
              </View>
            </View>
            {appointment?.status == "Annulé" ? (
              <View
                style={{
                  ...styles.alert,
                  backgroundColor: colors.transp_danger,
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Danger color={colors.danger} size={22} />
                <Text style={styles.textCancelRdv}>
                  Ce rendez-vous est annulé !
                </Text>
              </View>
            ) : (
              <View style={{ ...styles.hStack }}>
                <Button
                  textColor={colors.black}
                  loading={cancellLoading}
                  style={{
                    ...styles.button,
                    backgroundColor: colors.transp_danger,
                    marginRight: 15,
                  }}
                  onPress={() => setDisplSuppMod(true)}
                >
                  <Text color={colors.danger}>
                    Annuler
                  </Text>
                </Button>
                <Button
                  style={{
                    ...styles.button,
                    backgroundColor: colors.primary,
                  }}
                  textColor={colors.white}
                  onPress={() =>
                    navigation.navigate(SCREENS.APPOINTMENT_REPORT_SCREEN, {
                      navigation: navigation,
                      appointment: appointment,
                    })
                  }
                  backgroundColor={colors.primary}
                >
                  <Text color={colors.white}>
                    Reporter
                  </Text>
                </Button>
              </View>
            )}
          </View>

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

          <View space={2}>
            <View
              style={{ ...styles.hStack, paddingVertical: 15 }}
              justifyContent={"space-between"}
              mb={!showPaiementInfo ? 5 : undefined}
            >
              <Text style={styles.sectionTitle}>
                Informations sur le paiement
              </Text>
              <Pressable
                onPress={() => setShowPaimentInfo((v) => !v)}
              >
                {showPaiementInfo ? <ArrowUp2 size={26} color={colors.primary}/> : <ArrowDown2 size={26} color={colors.primary}/>}

              </Pressable>
            </View>
            {showPaiementInfo && (
              <View style={{ ...styles.paiementContainer }}>
                <View style={styles.alert}>
                  <Danger color={colors.warning} size={22} />
                  <Text style={{color:colors.warning, marginLeft:10,}}>
                    Votre paiement est incomplet.
                  </Text>
                </View>
                <View style={{...styles.appoinmentsBox, marginBottom:25}}>
                  <View style={styles.hStackPay}>
                    <Text style={styles.label}>Honoraires du medecin</Text>
                    <Text>XAF 10.000,00</Text>
                  </View>
                  <View style={styles.hStackPay}>
                    <Text style={styles.label}>Frais système</Text>
                    <Text>XAF 10.000,00</Text>
                  </View>
                  <View style={styles.hStackPay}>
                    <Text style={styles.label}>Remise</Text>
                    <Text>XAF 10.000,00</Text>
                  </View>
                  <View style={styles.hStackPay}>
                    <Text style={styles.label}>Total à payer</Text>
                    <Text>XAF 10.000,00</Text>
                  </View>
                  <View style={styles.hStackPay}>
                    <Text style={styles.label}>Total payé</Text>
                    <Text>XAF 10.000,00</Text>
                  </View>
                  <View style={styles.hStackPay}>
                    <Text style={styles.label}>Paiement dû</Text>
                    <Text>XAF 10.000,00</Text>
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = ({ RdvForm }) => ({
  appointments: RdvForm.myRdv,
});

export default connect(mapStateToProps)(AppointmentDetails);
