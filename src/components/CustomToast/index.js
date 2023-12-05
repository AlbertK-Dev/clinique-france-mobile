import React from "react";
import { Text, Box, HStack, Icon, } from "native-base";

const CustomToast = ({ message, bgColor, iconColor, icon }) => {
  return (
    <Box
      bg={bgColor}
      px={4}
      py={3}
      rounded="md"
      shadow={3}
      _text={{ color: "white" }}
      w="100%"
    >
      <HStack space={2} flex={1} alignItems={"center"}>
        <Icon
          as={icon}
          size={5}
          color={iconColor}
        />
        <Text>{message}</Text>
      </HStack>
    </Box>
  );
};
export default CustomToast;
