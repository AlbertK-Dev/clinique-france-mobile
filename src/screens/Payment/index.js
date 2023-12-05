import {
  Foundation
} from "@expo/vector-icons";
import { Warning2 } from "iconsax-react-native";
import {
  Box,
  Center,
  HStack,
  Image,
  ScrollView,
  Text,
  useToast,
  VStack
} from "native-base";
import React, { useState } from "react";
import MaskInput from "react-native-mask-input";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { useDispatch, useSelector } from "react-redux";
import MtnLogo from "../../assets/img/mobile_money.jpg";
import OrangeLOgo from "../../assets/img/orange_money.jpg";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import CustomToast from "../../components/CustomToast";
import Header from "../../components/Header";
import colors from "../../constants/colours";
import { setShouldSeeBehind } from "../../redux/commons/action";
import { postRDV } from "../../redux/RDV/actions";
import styles from "./style";

const description =
  "Votre compte sera débité d’un montant de 5000 Fcfa. Le dit montant fait office de frais de rendez-vous et est non-remboursable.";
const creditCardMask = [
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  " ",
  [/\d/],
  [/\d/],
  [/\d/],
  [/\d/],
  " ",
  [/\d/],
  [/\d/],
  [/\d/],
  [/\d/],
  " ",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];
const expirationMask = [/\d/, /\d/, "/", /\d/, /\d/];

const telMask = [
  /\d/,
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
  /\d/,
];

const Payment = ({ route, navigation }) => {
  const ext = route.params.ext;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const userInfo = useSelector((state) => state.UserReducer.userInfos);
  const idCentre = useSelector((state) => state.Common.idc);
  const toast = useToast();
  const dispatch = useDispatch();
  const success = useSelector((state) => state.RdvForm.successPostRdv);
  const extPRData = useSelector((state) => state.RdvForm.extPRData);
  const error = useSelector((state) => state.RdvForm.errorMsgPostRDV);
  const loadingPostRdv = useSelector((state) => state.RdvForm.loadingPostRdv);
  const formRDV = useSelector((state) => state.RdvForm.rdvForm);
  const clientID = useSelector((state) => state.UserReducer.clientID);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("orange_money");
  const [showLoaderInModal, setShowLoaderInModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: null,
    cardNumber: null,
    expirationDate: null,
    securityCode: null,
  });

  const [formDataMobile, setFormDataMobile] = useState({
    phone: "",
    amount: '5000',
  });

  const handlePaymentMethodPress = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handleInputChange = (field, value) => {
    setFormDataMobile({
      ...formDataMobile,
      [field]: value,
    });
  };

  const onSubmitPayment = () => {
    let payload = { clientID };
    setIsLoading(true);
    payload = !ext ? { ...formRDV, ...userInfo } : { ...extPRData };
    dispatch(postRDV(payload));
  };

  const determineOperateur = (numero) => {
    
    const numeroNumerique = numero.replace(/\D/g, '');
  
    if (numeroNumerique.startsWith('6') && numeroNumerique.length >= 9) {
      const deuxiemeChiffre = numeroNumerique.charAt(1);
      if (deuxiemeChiffre === '5' && numeroNumerique.charAt(2) < '5') {
        return 'mtn_money';
      }
      if (deuxiemeChiffre === '8' || deuxiemeChiffre === '7') {
        return 'mtn_money';
      }
    }
  
    if (numeroNumerique.startsWith('6') && numeroNumerique.length >= 9) {
      const deuxiemeChiffre = numeroNumerique.charAt(1);
      if (((deuxiemeChiffre >= '5' && numeroNumerique.charAt(2) >='5' ) || deuxiemeChiffre === '9') && deuxiemeChiffre !=='6') {
        return 'orange_money';
      }
    }
  
    return 'inconnu';
  }
  const operateur = determineOperateur(formDataMobile.phone);

  React.useEffect(() => {
    dispatch(setShouldSeeBehind(false));
    if (error) {
      toast.show({
        render: () => {
          return (
            <CustomToast
              message={"Une erreur est survenue !"}
              color={colors.danger}
              bgColor={"red.100"}
              icon={<Foundation name="alert" size={24} />}
              iconColor={colors.danger}
            />
          );
        },
        placement: "top",
        duration: 2000,
      });
    }
  }, [error, success]);

  const renderPaymentForm = () => {
    if (
      selectedPaymentMethod === "orange_money" ||
      selectedPaymentMethod === "mtn_money"
    ) {
      return (
        <VStack style={styles.cardInfos}>
          <Box>
            <HStack paddingX={1} justifyContent={'space-between'}>
            <Text style={styles.inputLabel}>Numéro de téléphone</Text>
            {selectedPaymentMethod ==="orange_money"?
            <Text style={{...styles.inputLabel, color:colors.primary}}>ORANGE MONEY</Text>:
            <Text style={{...styles.inputLabel, color:colors.primary}}> MTN MONEY</Text>
            }
            </HStack>
            <MaskInput
              value={formDataMobile.phone}
              mask={telMask}
              showObfuscatedValue
              obfuscationCharacter="#"
              onChangeText={(value) => handleInputChange("phone", value)}
              style={{ ...styles.input, paddingLeft: 10, marginBottom:5}}
              height={50}
              keyboardType="number-pad"
              placeholder={selectedPaymentMethod==="orange_money"?"658 559 995":"672 408 106"}
            />
            {operateur !== selectedPaymentMethod && operateur !=='inconnu'?
            <HStack
            rounded={5}
            p={2}
            backgroundColor={colors.transp_warning}
            space={1}
            width={"100%"}
            alignItems={"center"}
          >
            <Warning2 color={colors.danger} size={15} />
            <Text
              style={{
                fontSize: 12,
                color: colors.danger,
              }}
            >
              Le numéro ne correspondent pas à l'opérateur choisi
            </Text>
          </HStack> : operateur === 'inconnu' && formDataMobile.phone !=="" && <HStack
            rounded={5}
            p={2}
            backgroundColor={colors.transp_warning}
            space={1}
            width={"100%"}
            alignItems={"center"}
          >
            <Warning2 color={colors.danger} size={15} />
            <Text
              style={{
                fontSize: 12,
                color: colors.danger,
              }}
            >
              Entrez un numéro de téléphone valide
            </Text>
          </HStack>

          }
          </Box>
        </VStack>
      );
    } else {
      return;
    }
  };

  const handleChange = (trigger, value) => {
    switch (trigger) {
      case "name":
        setFormData({
          ...formData,
          name: value,
        });
        break;
      case "cardNumber":
        setFormData({
          ...formData,
          cardNumber: value,
        });
        break;
      case "expiration":
        setFormData({
          ...formData,
          expirationDate: value,
        });
        break;
      case "securityCode":
        setFormData({
          ...formData,
          securityCode: value,
        });
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Header bg={"white"} title={"Terminez votre prise de rdv"} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        flex={1}
        style={styles.container}
        automaticallyAdjustKeyboardInsets={true}
      >
        <VStack style={styles.infoBox}>
          <Text style={styles.boxTitle}>Important</Text>
          <Text style={styles.descText}>{description}</Text>
          <Text style={styles.warningText}>
            Vous recevrez un message de confirmation à la fin de l’opération.
          </Text>
        </VStack>
        <VStack style={styles.paymentBox}>
          <Box style={styles.titleBox}>
            <Text style={styles.paymentTitle}>
              Choisir une méthode de paiement
            </Text>
            <Text style={styles.titleHelper}>
              Vous serez débité dès la validation de cette étape.
            </Text>
          </Box>
          <Box style={styles.paymentMethodBox}>
            <Center>
              <HStack
                style={styles.scrollView}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                space={3}
              >
                <Box
                  style={{
                    ...styles.paymentMethodSelect,
                    backgroundColor:
                      selectedPaymentMethod === "orange_money"
                        ? colors.trans_primary
                        : colors.white,
                  }}
                >
                  <Pressable
                    style={styles.paymentMethod}
                    onPress={() => handlePaymentMethodPress("orange_money")}
                  >
                    <Image
                      source={OrangeLOgo}
                      alt="orange"
                      rounded={50}
                      width={50}
                      height={50}
                    />
                  </Pressable>
                </Box>
                <Box
                  style={{
                    ...styles.paymentMethodSelect,
                    backgroundColor:
                      selectedPaymentMethod === "mtn_money"
                        ? colors.trans_primary
                        : colors.white,
                  }}
                >
                  <Center>
                    <Pressable
                      style={styles.paymentMethod}
                      onPress={() => handlePaymentMethodPress("mtn_money")}
                    >
                      <Image
                        rounded={50}
                        source={MtnLogo}
                        alt="mtn"
                        width={50}
                        height={50}
                      />
                    </Pressable>
                  </Center>
                </Box>
              </HStack>
              </Center>
          </Box>
          {renderPaymentForm()}
        </VStack>
        {renderPaymentForm() && (
          <VStack flex={1} style={styles.btnBox}>
            <PrimaryButton
              disabled={operateur === 'inconnu' || operateur !== selectedPaymentMethod}
              title={
                loadingPostRdv
                  ? "en cours de chargement..."
                  : "Confirmez et Continuez"
              }
              isLoadingText="en cours de chargement..."
              isLoading={loadingPostRdv}
              style={{...styles.submitBtnText, backgroundColor:(operateur === 'inconnu' || operateur !== selectedPaymentMethod)?colors.trans_primary : colors.primary}}
              onPress={onSubmitPayment}
            />
          </VStack>
        )}
      </ScrollView>
    </>
  );
};

export default Payment;
