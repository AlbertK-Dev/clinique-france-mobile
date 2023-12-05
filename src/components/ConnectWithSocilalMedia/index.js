import React from "react";
import { Text, HStack, Pressable, View, Center, Icon } from "native-base";
import { MaterialIcons, Ionicons, FontAwesome } from "@expo/vector-icons";
import styles from "./styles";

const SocialMedia = () => {
  return (
    <View>
      <Center>
        <Text style={styles.connectWith}>Connectez-vous avec </Text>
        <HStack mb={4} mt={2} flex={1} space={8}>
          <Pressable rounded={50} style={styles.boxIcon} shadow={2}>
            <Center>
              <Icon
                size={5}
                color={"blue.300"}
                as={<FontAwesome name="facebook" />}
              />
            </Center>
          </Pressable>
          <Pressable shadow={1} rounded={50} style={styles.boxGoogle}>
            <Icon
              size={5}
              color={"red.800"}
              as={<FontAwesome name="google" />}
            />
          </Pressable>
          <Pressable shadow={1} rounded={50} style={styles.boxTwitter}>
            <Icon
              size={6}
              color={"blue.300"}
              as={<Ionicons name="md-logo-twitter" />}
            />
          </Pressable>
        </HStack>
      </Center>
    </View>
  );
};
export default SocialMedia;
