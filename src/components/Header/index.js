import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import React from "react";
import { styles } from "./style";
import colors from "../../constants/colours";
import { ArrowLeft } from "iconsax-react-native";
import { Surface, Text } from "react-native-paper";

export default function Header({ title, bg }) {
  const navigation = useNavigation();
  return (
    <Surface elevation={3} style={{ ...styles.constainer, backgroundColor: bg ?? colors.white, marginTop: 20 }}>
        <ArrowLeft size={25} color={colors.primary} onPress={()=>navigation.goBack()}/>
      <View
        justifyContent={"center"}
        alignItems={"center"}
        alignContent={"center"}
        width={"80%"}
      >
        <Text style={styles.title}>{title}</Text>
      </View>
    </Surface>
  );
}
