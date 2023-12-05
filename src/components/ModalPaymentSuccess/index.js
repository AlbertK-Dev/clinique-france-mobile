import React from "react";
import { Modal, View, Text, ActivityIndicator } from "react-native";
import { Center, } from "native-base";
import colors from "../../constants/colours";
import { AntDesign } from "@expo/vector-icons";
import styles from "./styles";
import { Divider } from "react-native-paper";

const ModalPaySuccess = ({ isVisible, onClose, isLoader, title }) => {
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <View
          style={{
            backgroundColor: colors.primary,
            padding: 15,
            borderRadius: 8,
            width: "80%",
          }}
        >
          <Center marginBottom={5}>
            <AntDesign name="checkcircle" size={60} color={colors.yellow} />
          </Center>
          <Text
            style={{
              color: colors.white,
              fontSize: 28,
              textAlign: "center",
              fontWeight: "600",
              marginBottom: 20,
            }}
          >
            {title}
          </Text>

          {/*{isLoader && (
          <View style={{ alignItems: 'center' }}>
            <ActivityIndicator  size="small" color={colors.white} />
          </View>
          )}*/}
        </View>
      </View>
    </Modal>
  );
};

export default ModalPaySuccess;
