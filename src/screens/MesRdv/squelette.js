import React from "react";
import { ActivityIndicator, Text } from "react-native-paper";
import colors from "../../constants/colours";
import { View } from "react-native";

export const Skelette = () => {
  return (
    <View style={{display:"flex",gap:5}}>
      <ActivityIndicator size={30} color={colors.primary} animating={true}/>
      <Text>Veuillez patienter</Text>
    </View>
  )
};
