import {
  Box,
  HStack,
  Icon,
  Input,
  Stack,
  Text,
  VStack,
  View,
} from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../constants/colours";
import { SharedElement } from "react-navigation-shared-element";
import { Feather } from "@expo/vector-icons";
import { PraticiensForSearch } from "../../components/PraticiensForSearch";
import { useDispatch, useSelector } from "react-redux";
import { searchPratByKey } from "../../redux/Praticiens/actions";
import { PratSearchSkeleton } from "./skeleton";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as SCREENS from "../../constants/screens";
import DoctorCard from "../../components/DoctorCard/DoctorCard";
import { getDispo, getMotifs } from "../../redux/RDV/actions";
import { ScrollView } from "react-native";

export const GlobalSearch = ({ navigation }) => {
  const dispatch = useDispatch();
  const searchedPrats = useSelector((state) => state.Praticiens.searchedPrats);
  const motifsLoading = useSelector((state) => state.RdvForm.motifsLoading);
  const loadingSearch = useSelector(
    (state) => state.Praticiens.loadingSearchPrats
  );
  const InputRef = useRef();
  const handleSearch = (key) => {
    dispatch(searchPratByKey(key));
  };

  useEffect(() => {
    setTimeout(() => InputRef.current.focus(), 100);
  }, []);

  return (
    <Box flex={1} style={{ backgroundColor: colors.white }}>
      <HStack marginLeft={1} width={"100%"} alignItems={"center"}>
        <Stack width={"10%"} justifyContent={"center"} alignItems={"center"}>
          <Feather
            onPress={() => navigation.goBack()}
            name="arrow-left"
            size={24}
            color={colors.primary}
          />
        </Stack>
        <Input
          ref={InputRef}
          width={"80%"}
          borderWidth={0}
          rounded={12}
          paddingLeft={5}
          onChangeText={(text) => handleSearch(text)}
          fontSize={14}
          margin={3}
          bg={colors.white}
          placeholder="Rechercher un spécialiste"
        />
      </HStack>
      <ScrollView>
        <VStack space={3}>
          {!loadingSearch && searchedPrats?.length > 0 ? (
            searchedPrats?.map((p, i) => {
              return (
                p?.affectation?.length > 0 &&
                p?.job?._id && (
                  <TouchableOpacity
                    key={i}
                    onPress={() => {
                      dispatch(
                        getDispo({
                          idCentre: p?.idCentre,
                          idp: p?._id,
                        })
                      );
                      dispatch(getMotifs({ id: p?.job?._id, forSpec: true }));
                      navigation.navigate(SCREENS.DETAILS_PRATICIEN, {
                        praticien: p,
                      });
                    }}
                  >
                    <DoctorCard
                      nom_complet={p?.name + " " + p?.surname}
                      clinique={
                        p?.affectation.length !== 0
                          ? p?.affectation[0].label
                          : ""
                      }
                      speciality={p?.job?.label}
                    />
                  </TouchableOpacity>
                )
              );
            })
          ) : !loadingSearch && searchedPrats?.length == 0 ? (
            <VStack
              style={{
                height: 100,
                alignItems: 'center',
                justifyContent: "center"
              }}
            >
              <Text style={{color: colors.text_grey_hint}}>Aucune données </Text>
            </VStack>
          ) : (
            <VStack>
              <DoctorCard isEmpty={true} />
              <DoctorCard isEmpty={true} />
            </VStack>
          )}
        </VStack>
      </ScrollView>
    </Box>
  );
};
