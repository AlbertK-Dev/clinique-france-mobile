import * as React from "react";
import { Dimensions, Text, View, Pressable, Image } from "react-native";
import Carousel, { Pagination } from "react-native-reanimated-carousel";

import colors from "../../constants/colours";
import { VStack } from "native-base";
import styles from "./styles";

function CarouselPub() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const width = Dimensions.get("window").width;

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
        pagingEnabled={true}
        mode="parallax"
        loop
        width={width}
        height={160}
        autoPlay={false}
        data={[]}
        scrollAnimationDuration={4000}
        onSnapToItem={(index) => {}}
        renderItem={({ item }) => (
          <VStack
            style={{
              flex: 1,
              borderWidth: 0,
              width: "100%",
              justifyContent: 'center',
              padding: 10,
            }}
          >
            <Image resizeMode="cover" source={item.image} style={{ width: 250, height: 150, marginBottom: 10 }} />
          </VStack>
        )}
        panGestureHandlerProps={
          {
            activeOffsetX: [-10, 10],
          }
        }
      />
    </View>
  );
}

export default CarouselPub;
