import { View, StyleSheet, useWindowDimensions, Image } from "react-native";
import React from "react";
import colors from "../../../constants/colours";
import { Text } from "react-native-paper";

export default function OnBoardingItem({ item, scrollX, ...props }) {
  const { width } = useWindowDimensions();

  return (
    <View style={{ width, padding: 10}}>
      <View style={{padding:15, marginTop:15}}>
      <Text style={styles.greetfr}>{props.titre}</Text>
      </View>
      <View style={styles.second}>
        <Image
          source={props.image}
          resizeMode="center"
          style={{ width: "100%", height: 230 }}
        />
      </View>
      <View>
        <Text tex style={{ ...styles.greetEn, fontSize: 20 }}>{props.title}</Text>
        <Text style={styles.description}>
          {props.description}
        </Text>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  second: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  greetfr: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.yellow,
  },
  greetEn: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.black_gray,
    textAlign: 'center'
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    color: colors.black_gray,
    marginTop: 10
  }
});
