import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import {
  Avatar,
  Circle,
  HStack,
  VStack,
  Skeleton,
  Divider,
  Center,
} from "native-base";
import colors from "../../constants/colours";

export const SkeletteNotif = ({ last }) => {
  return (
    <Skeleton
      style={{
        height: last ? 100 : 180,
        width: "100%",
        padding: 3,
        marginTop: 0,
        borderRadius: 30,
        alignItems: "center",
      }}
    />
  );
};
