import { Animated, StyleSheet, useWindowDimensions, Text } from "react-native";
import React, { useRef, useState } from "react";
import { FlatList, Pressable } from "react-native";
import OnBoardingItem from "./OnBoardingItem";
import { useNavigation } from "@react-navigation/native";
import colors from "../../constants/colours";
import Paginator from "./Paginator";
import consultation from "../../assets/img/consultation.png";
import priseRdv from "../../assets/img/reservation.png";
import payment from "../../assets/img/paiement.png";

import { CustomeFab } from "../../screens/MonProfile/index2";
import * as SCREENS from "../../constants/screens";
import { setBypassOnboarding } from "../../utils/helper";
import { View } from "react-native";

const data = [
  {
    id: "s85dd4s54ds5d4",
    title:
    "Vous avez accès à des centres hospitaliers de référence selon votre localisation",
    description:
    "Nous mettons à votre disposition des médecin généralistes et spécialistes compétents qui exercent partout sur le territoire." ,
    image: priseRdv,
    titre: "Prise de rendez-vous",
  },
  {
    id: "s85d4s54dmdds5d4",
    title:
      "Effectuez votre paiement en toute sécurité pour confirmer votre rendez-vous.",
    description:
      "Optez pour le mode de paiement de votre préférence, que ce soit par carte bancaire ou paiement mobile.",
    image: payment,
    titre: "Mode de paiement",
  },
  {
    id: "s85d4s5kqsj4ds5d4",
    title:
      "N'omettez plus vos rendez-vous médicaux, et assurez-vous d'être toujours à l'heure!",
    description:
      "Recevez des notifications pour être prévenu de vos différents rendez-vous.",
    image: consultation,
    titre: "Consultation",
  },
];

export default function OnBoarding2() {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { width } = useWindowDimensions();
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentIndex(currentIndex);
  };

  return (
    <View flex={1} style={{backgroundColor: "white"}}>
      {currentIndex === 2 && (
        <CustomeFab
          navigation={navigation}
          onBoarding={true}
          editeMode={false}
          onBegin={() => setBypassOnboarding()}
          action={() => {}}
        />
      )}
      <View flex={1}>
        <View>
          <FlatList
            overScrollMode="never"
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              {
                useNativeDriver: false,
              }
            )}
            viewabilityConfig={viewConfig}
            keyExtractor={(item) => item.id}
            pagingEnabled
            bounces={true}
            onMomentumScrollEnd={updateCurrentSlideIndex}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data}
            ref={slidesRef}
            renderItem={({ item }) => (
              <OnBoardingItem key={item.id} scrollX={scrollX} {...item} />
            )}
          />
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paginator data={data} scrollX={scrollX} />
        </View>

        {currentIndex === 0 && (
          <Pressable
            w={"100%"}
            onPress={() => {
              navigation.navigate(SCREENS.LOGIN);
              setBypassOnboarding();
            }}
          >
            <Text
              style={{
                color: colors.primary,
                marginTop: 40,
                textAlign: "center",
                fontSize: 18,
              }}
            >
              Ignorer
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  greetfr: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.yellow,
  },
  fourth: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },

  nextIgnor: {
    justifyContent: "space-between",
    marginTop: 30,
    paddingHorizontal: 20,
  },

  ignorBtn: {
    height: 40,
    backgroundColor: colors.white,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    borderRadius: 50,
  },

  fourthChild: {
    borderColor: "white",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    borderRadius: 10,
    fontSize: 24,
    backgroundColor: "white",
  },
});
