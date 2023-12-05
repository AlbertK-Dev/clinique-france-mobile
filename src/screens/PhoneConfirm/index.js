import React, { useEffect, useState } from "react";
import {
  Box,
  Icon,
  View,
  Text,
  HStack,
  Button,
  VStack,
  Input,
  Spinner,
  useToast,
} from "native-base";
import { EvilIcons } from "@expo/vector-icons";
import { Pressable, SafeAreaView } from "react-native";
import styles from "./style";
import colors from "../../constants/colours";
import { TouchableOpacity } from "react-native";
import { connect, useDispatch, useSelector } from "react-redux";
import { Warning2 } from "iconsax-react-native";
import { processVerifCode } from "../../redux/User/action";
import CustomToast from "../../components/CustomToast";
import { isEmailValid } from "../../utils/helper";

const CELL_COUNT = 5;

const PhoneConfirm = ({
  navigation,
  codeVerifLoading,
  codeVerifSuccess,
  errorCodeVerif,
}) => {
  const codeVerif = useSelector((state) => state.UserReducer.codeVerif);
  const settingPWLoading = useSelector(
    (state) => state.UserReducer.settingPWLoading
  );

  const dispatch = useDispatch();
  const [email1, setEmail] = useState("");
  const [caracters, setCaracters] = useState([]);
  caracters[1] == codeVerif?.codeVerif?.split("")[1] &&
    caracters[2] == codeVerif?.codeVerif?.split("")[2] &&
    caracters[3] == codeVerif?.codeVerif?.split("")[3] &&
    caracters[4] == codeVerif?.codeVerif?.split("")[4];
  const [isEmpty, setIsEmpty] = useState(false);
  const emailValide = isEmailValid(email1);

  console.log("eamil valide", emailValide);

  const toast = useToast();

  const resetPassword = () => {
    setIsEmpty(true);
    if (email1 !== "") {
      dispatch(processVerifCode({ email: email1 }));
    }
    if (errorCodeVerif) {
      toast.show({
        render: () => {
          return (
            <CustomToast
              message={errorCodeVerif ? errorCodeVerif : "le compte n'existe pas"}
              color={colors.danger}
              bgColor={"red.100"}
              icon={<Warning2 />}
              iconColor={colors.danger}
            />
          );
        },
        placement: "top",
        duration: 3000,
      });
    }
  };

  return (
    <View alignItems={"center"} bg={colors.white} flex={1} p={5}>
      <VStack alignItems={"center"} mt={10} mb={15}>
        <Box mb={10}>
          <Box style={styles.circle}>
            <Icon as={EvilIcons} name="lock" color={colors.white} size={90} />
          </Box>
        </Box>
        <Text
          mb={5}
          style={{
            paddingTop: 5,
            fontSize: 25,
            fontWeight: 700,
            height: 30,
          }}
        >
          Mot de passe oublié
        </Text>
      </VStack>

      {/*section 1 */}
      <VStack
        justifyItems={"center"}
        justifyContent={"center"}
        alignItems={"center"}
        w={"100%"}
      >
        <Text style={styles.message}>
          Veillez entre l'adresse mail lié à votre compte afin de recevoir le
          code de vérification
        </Text>
        <Input
          mx="3"
          value={email1}
          fontSize={15}
          placeholder="Entrez votre adresse mail"
          w="90%"
          borderRadius={25}
          paddingLeft={5}
          borderColor={
            isEmpty && email1 === "" ? colors.danger : colors.text_grey_hint
          }
          paddingRight={5}
          onChangeText={(e) => setEmail(e)}
          height={45}
          mt={5}
          mb={3}
        />

        {!emailValide && email1 !== "" && (
          <HStack
            rounded={5}
            p={2}
            backgroundColor={colors.transp_warning}
            space={1}
            width={"85%"}
            alignItems={"center"}
          >
            <Warning2 color={colors.danger} size={15} />
            <Text
              style={{
                fontSize: 12,
                color: colors.danger,
              }}
            >
              Mauvais format d'e-mail !
            </Text>
          </HStack>
        )}
        <Button
          mt={2}
          style={styles.btn}
          isLoading={settingPWLoading}
          isDisabled={!emailValide}
          onPress={() => {
            resetPassword();
          }}
        >
          {codeVerifLoading ? (
            <Spinner accessibilityLabel="loading" size="sm" color={"white"} />
          ) : (
            <Text color={colors.white}>Envoyer</Text>
          )}
        </Button>
      </VStack>
      <Button textDecorationLine={"underline"} mt={"20%"} variant={"unstyled"}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text color={colors.primary} style={styles.btnLabel}>
            Fermer
          </Text>
        </TouchableOpacity>
      </Button>
    </View>
  );
};

const mapStateToProps = ({ UserReducer }) => ({
  codeVerifLoading: UserReducer.codeVerifLoading,
  errorCodeVerif: UserReducer.errorCodeVerif,
  codeVerifSuccess: UserReducer.codeVerifSuccess,
});
export default connect(mapStateToProps)(PhoneConfirm);
