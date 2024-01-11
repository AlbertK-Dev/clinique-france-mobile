import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Animated,
} from "react-native";
import React from "react";
import colors from "../../../constants/colours";

export default function Paginator({ data, scrollX }) {
  const { width } = useWindowDimensions();
  return (
    <View style={{ flexDirection: "row", padding: 5, }}>
      {data.map((_e, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: "clamp",
        });
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 30, 10],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            key={i}
            style={[styles.dot, { width: dotWidth, opacity }]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  dot: {
    height: 3,
    borderRadius: 5,
    backgroundColor: colors.primary,
    marginHorizontal: 8,
    marginVertical:10
  },
});
