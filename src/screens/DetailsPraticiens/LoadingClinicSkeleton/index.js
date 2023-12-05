import React from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import colors from "../../../constants/colours";

export const LoadingDispo = () => {
  return (
    <View
      style={{ height: 40, display: "flex", flexDirection: "row" }}
    >
      <ActivityIndicator size={15} color={colors.primary} />
    </View>
  );
};
