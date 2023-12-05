import { View, Pressable } from "react-native";
import React, { useState } from "react";
import { Dialog, RadioButton } from "react-native-paper";
import { Box, Button, Icon, Text } from "native-base";
import styles from "./style";
import { AntDesign } from "@expo/vector-icons";
import colors from "../../constants/colours";
import { useDispatch, useSelector } from "react-redux";
import {
  setProfessionForRdv,
  setShouldSeeBehind,
} from "../../redux/commons/action";
import {
  getMotifs,
  getSpecialities,
  setRDVForm,
} from "../../redux/RDV/actions";
import LoadingChoiceComponent from "./choiceItemsComponentLabel";
import LoadingCircle from "./choiceItemsComponentCircle";
import { searchByName } from "../../utils/helper";

export default function ModaleChoixProfession({ navigation, onClose }) {
  const professionLoading = useSelector((state) => state.Profession.loading);
  const [isSpecialiste, setIsSpecialiste] = useState(false);
  const [visible, setVisible] = React.useState(true);
  const professions = useSelector((state) => state.Profession.professions);
  const hideDialog = () => setVisible(false);
  const dispatch = useDispatch();

  return (
    <Dialog
      visible={visible}
      style={{
        ...styles.dialog,
        borderRadius: 5,
        backgroundColor: colors.white,
      }}
      // onDismiss={hideDialog}
    >
      <Dialog.Content style={{ ...styles.dialogContent }}>
        <Box style={{ ...styles.boxCloseIconDialogContainer }}>
          <Box></Box>
          <Box style={{ ...styles.boxCloseIconDialog }}>
            <Pressable
              onPress={() => {
                navigation.goBack();
                onClose();
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
        </Box>
        <Text
          variant="bodyMedium"
          textAlign={"center"}
          fontSize={"15"}
          fontWeight={"bold"}
        >
          Choisissez une profession pour votre RDV
        </Text>
        <Box marginBottom={10}>
          <View style={{ ...styles.radioContainer }}>
            <View style={{ width: "100%" }}>
              <View
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                }}
              >
                <View style={{ ...styles.radio }}>
                  {!professionLoading ? (
                    <RadioButton.Android
                      style={{ height: 100 }}
                      uncheckedColor={"#F0F0F0"}
                      color={colors.primary}
                      value="first"
                      status={isSpecialiste ? "checked" : "unchecked"}
                      onPress={() => setIsSpecialiste(true)}
                    />
                  ) : (
                    <LoadingCircle />
                  )}
                  {!professionLoading ? (
                    <Pressable onPress={() => setIsSpecialiste(true)}>
                      <Text style={{ fontSize: 15 }}>
                        {professions[0]?.name}
                      </Text>
                    </Pressable>
                  ) : (
                    <LoadingChoiceComponent />
                  )}
                </View>
                <View style={{ ...styles.radio }}>
                  {!professionLoading ? (
                    <RadioButton.Android
                      style={{ height: 100 }}
                      uncheckedColor={"#F0F0F0"}
                      color={colors.primary}
                      value="first"
                      status={isSpecialiste ? "unchecked" : "checked"}
                      onPress={() => setIsSpecialiste(false)}
                    />
                  ) : (
                    <LoadingCircle />
                  )}
                  {!professionLoading ? (
                    <Pressable onPress={() => setIsSpecialiste(false)}>
                      <Text style={{ fontSize: 15 }}>
                        {professions[1]?.name}
                      </Text>
                    </Pressable>
                  ) : (
                    <LoadingChoiceComponent />
                  )}
                </View>
              </View>
            </View>
          </View>
        </Box>
        <Box>
          <Button
            width={"100%"}
            disabled={professionLoading}
            onPress={() => {
              setVisible(false);
              dispatch(setProfessionForRdv(isSpecialiste));
              dispatch(setShouldSeeBehind(true));
              dispatch(
                setRDVForm({
                  motif: null,
                  praticien: null,
                  profession: isSpecialiste
                    ? searchByName(professions, "Specialiste")
                    : searchByName(professions, "Generaliste"),
                  period: {
                    day: null,
                    time: null,
                  },
                })
              );
              isSpecialiste &&
                dispatch(
                  getSpecialities(searchByName(professions, "Specialiste"))
                );
              !isSpecialiste &&
                dispatch(
                  getMotifs({ id: searchByName(professions, "Generaliste") })
                );
            }}
          >
            <Text color={colors.white} style={styles.btnLabel}>
              Continuer
            </Text>
          </Button>
        </Box>
      </Dialog.Content>
    </Dialog>
  );
}
