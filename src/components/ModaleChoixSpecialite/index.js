import { View, Pressable } from "react-native";
import React, { useState } from "react";
import { Dialog, RadioButton , Button, Text} from "react-native-paper";
import styles from "./style";
import colors from "../../constants/colours";
import { CloseCircle } from "iconsax-react-native";
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
    >
      <Dialog.Content style={{ ...styles.dialogContent }}>
          <View style={{alignItems:"flex-end", marginTop:-10, marginBottom:8, marginRight:-16}}>
            <CloseCircle
              onPress={() => {
                navigation.goBack();
                onClose();
              }}
              size={26}
              color={colors.black}
            />
          </View>
        <Text
          variant="bodyMedium"
          textAlign={"center"}
          fontSize={15}
          fontWeight={"bold"}
        >
          Choisissez une profession pour votre RDV
        </Text>
        <View marginBottom={10}>
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
        </View>
        <View>
          <Button
            mode="contained"
            disabled={professionLoading}
            buttonColor={colors.primary}
            style={{marginTop:15}}
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
              Continuer
          </Button>
        </View>
      </Dialog.Content>
    </Dialog>
  );
}
