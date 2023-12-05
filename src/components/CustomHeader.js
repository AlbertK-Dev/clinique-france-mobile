import { Pressable, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar, Text, Surface } from "react-native-paper";
import * as SCREENS from "../constants/screens";
import colors from "../constants/colours";
import { connect } from "react-redux";
import { AddCircle } from "iconsax-react-native";
import { useEffect, useState } from "react";
import { troncate } from "../utils/helper";
import { View } from "react-native";

const styles = StyleSheet.create({
  boxGoogle: {
    justifyContent: "center",
    width: 28,
    height: 28,
    paddingLeft: 0,
    paddingTop: 0,
    backgroundColor: colors.primary,
  },
});

const CustomHeader = ({ navigation, mb, userInfos, screen }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (userInfos?.user) setUser(userInfos.user);
  }, [userInfos]);

  return (
    <Surface
      style={{
        justifyContent: "space-between",
        paddingHorizontal: 8,
        paddingVertical: 2,
        alignItems: "center",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "row",
      }}
      elevation={2}
    >
      <View
        style={{
          justifyContent: "space-between",
          padding: 6,
          alignItems: "center",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Pressable onPress={() => navigation.navigate(screen)}>
          <Avatar.Image
            source={{ uri: user?.photo ?? null }}
            size={45}
            style={{ backgroundColor: colors.primary }}
          />
        </Pressable>
        <Text style={{ marginLeft: 15, fontSize: 18 }}>
          {troncate(user?.name)}
        </Text>
      </View>
      <AddCircle
        onPress={() => navigation.navigate(SCREENS.MAKE_APPOINTMENT_SCREEN)}
        variant="Bold"
        size={40}
        color={colors.primary}
      />
    </Surface>
  );
};

const mapStateToProps = ({ UserReducer }) => ({
  userInfos: UserReducer.userInfos,
});

export default connect(mapStateToProps)(CustomHeader);
