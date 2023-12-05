import React, { useState } from "react";
import {
  Input,
  ScrollView,
  View,
  Text,
  VStack,
  Icon,
} from "native-base";
import styles from "./style";
import colors from "../../constants/colours";
import { connect, useDispatch, useSelector } from "react-redux";
import { TouchableOpacity} from "react-native";
import { useTranslation } from "react-i18next";
import { getMotifs, getDispo } from "../../redux/RDV/actions";
import * as SCREENS from "../../constants/screens"
import DoctorCard from "../../components/DoctorCard/DoctorCard";
import Header from "../Header";

const _spacing = 3;

const AllPraticiens = ({
  navigation,
  ...props
}) => {
  const translate = useTranslation().t;
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState(props.praticiens);
  const dispatch = useDispatch();
  const praticiens = useSelector((state) => state.Praticiens.praticiens);
  
  const handleSearch = () => {
    if (searchText === "") {
      setSearchResults(praticiens);
    } else {
      const results = praticiens.filter((item) =>
        item?.name?.toLowerCase()?.includes(searchText?.toLowerCase())
      );
      setSearchResults(results);
      console.log(searchResults, "mmmmmmmmmm")
    }
  };
  

  return (
    <View flex={1}>
      <ScrollView
        // stickyHeaderIndices={[1]}
        showsVerticalScrollIndicator={false}
        paddingBottom={_spacing}
        keyboardShouldPersistTaps="never"
      >
        <Header bg={colors.white} title={translate("Tous les medécins")} />

        <VStack my={_spacing}>
          <Input
            //ref={InputRef}
            width={"94%"}
            borderWidth={0}
            rounded={12}
            paddingLeft={5}
            onChangeText={(text) => {
                setSearchText(text); 
                handleSearch();
              }}
            fontSize={14}
            margin={3}
            bg={colors.white}
            placeholder="Rechercher un médecin"
          />
          {searchResults?.length > 0 ? (
            <>
              {searchResults?.map((item, index) => {
                return item?.affectation?.length > 0 && item?.job?._id && (
                    <TouchableOpacity key={index} onPress={() => {
                        dispatch(getDispo({
                            idCentre: item?.idCentre,
                            idp: item?._id,
                        }))
                    dispatch(getMotifs({ id: item?.job?._id, forSpec: true }))
                        navigation.navigate(SCREENS.DETAILS_PRATICIEN, { praticien: item })
                        console.log('iiiiiiiiiiiiiidddddddd',item?.idCentere)

                    }}>
                        <DoctorCard
                            nom_complet={item?.name + " " + item?.surname}
                            clinique={item?.affectation.length !== 0 ? item?.affectation[0].label : ""}
                            speciality={item?.job?.label}
                        />
                    </TouchableOpacity>
                );
              })}
            </>
          ) : (
            <>
              <Text textAlign={"center"}>Aucun medécin trouvé !</Text>
            </>
          )}
        </VStack>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = ({ UserReducer, RdvForm, Common, Praticiens }) => ({
  userInfos: UserReducer.userInfos,
  address: UserReducer.address,
  load_address: UserReducer.load_address,
  myRdv: RdvForm.myRdv,
  loading: Common.loading,
  specialties: Common.specialties,
  praticiens: Praticiens.praticiens,
});

export default connect(mapStateToProps)(AllPraticiens);
