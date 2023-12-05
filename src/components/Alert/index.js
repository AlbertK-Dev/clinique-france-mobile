import React from 'react';
import {Text, VStack, Alert, HStack, IconButton, CloseIcon} from 'native-base';
import styles from './styles';

const CustomAlert = ({status, message, toast}) => {
  return (
    <Alert alignSelf={'center'} w="100%" status={status} style={styles.alert}>
      <VStack space={2} flexShrink={1} w="100%">
        <HStack
          flexShrink={1}
          space={2}
          justifyContent="space-between"
          alignItems="center">
          <HStack space={2} flexShrink={1}>
            <Alert.Icon mt="1" />
            <Text fontSize="md" color="coolGray.800">
              {message}
            </Text>
          </HStack>
          <IconButton
            variant="unstyled"
            _focus={{
              borderWidth: 0,
            }}
            icon={<CloseIcon size="3" />}
            _icon={{
              color: 'coolGray.600',
            }}
            onPress={() => toast.closeAll()}
          />
        </HStack>
      </VStack>
    </Alert>
  );
};

export default CustomAlert;
