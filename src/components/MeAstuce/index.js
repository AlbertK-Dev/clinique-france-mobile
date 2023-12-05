import * as React from "react";
import { Dimensions, Text, View, Pressable } from "react-native";
import Carousel, { Pagination } from "react-native-reanimated-carousel";

import colors from "../../constants/colours";
import { VStack } from "native-base";
import styles from "./styles";

function CarouselAstuce() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const width = Dimensions.get("window").width;

  // Votre tableau d'astuces de santé

  const healthTips = [
    {
      title: 'Hydratation',
      description: 'Buvez au moins 8 verres d\'eau par jour pour rester hydraté. L\'eau aide à éliminer les toxines du corps et maintient votre peau saine.',
    },
    {
      title: 'Alimentation équilibrée',
      description: 'Adoptez une alimentation équilibrée avec des fruits, légumes, protéines maigres et grains entiers. Cela fournit des nutriments essentiels à votre corps.',
    },
    {
      title: 'Activité physique',
      description: 'Faites de l\'exercice régulièrement pour maintenir votre santé physique et mentale. Marcher, courir ou faire du yoga sont de bonnes options.',
    },
    {
      title: 'Sommeil de qualité',
      description: 'Dormez au moins 7 à 8 heures par nuit pour permettre à votre corps de se reposer et se régénérer.',
    },
    {
      title: 'Gestion du stress',
      description: 'Pratiquez des techniques de gestion du stress comme la méditation, la respiration profonde ou le temps passé avec des amis et la famille.',
    },
  ];


  return (
    <View
      style={{
        flex: 1,
        marginTop: 12,
        borderRadius: 10,
        borderWidth: 0,
        backgroundColor: colors.trans_primary,
        marginBottom: 20,
      }}
    >
      <Carousel
        loop
        width={width}
        height={150}
        autoPlay={false}
        data={healthTips}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => {}}
        renderItem={({ item }) => (
          <VStack
            style={{
              flex: 1,
              borderWidth: 0,
              width: "100%",
              justifyContent: 'flex-start',
              paddingRight: 10,
              paddingLeft: 8,
            }}
          >
            <Text style={{
              fontWeight: '600',
              fontSize: 18,
              color: colors.yellow,
              padding: 3, marginRight: 5
            }}>
              {item.title}
            </Text>
            <Text style={{ paddingRight: 6, fontSize: 14, color: colors.black }}>
              {item.description}
            </Text>
            <Pressable style={styles.rdvBtn} >
              <Text style={{ color: colors.white, fontWeight: '600', textDecorationLine: 'underline' }}>En savoir plus</Text>
            </Pressable>
          </VStack>
        )}
      />
    </View>
  );
}

export default CarouselAstuce;
