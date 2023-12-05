import React from "react";
import { ActivityIndicator } from "react-native-paper";
import colors from "../../constants/colours";
import { View } from "react-native";

export const SkeletteNotif = ({ last }) => {
  return (
    <View>
      <ActivityIndicator size={15} animating={true} color={colors.primary}/>
    </View>
  );
};
