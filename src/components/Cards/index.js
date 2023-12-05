import {Box, Center, Pressable, View, HStack, Text} from 'native-base';
import React from 'react';
import styles from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import colors from '../../constants/colours';

const Cards = () => {
  return (
    <Box>
      <Center marginBottom={5}>
        <HStack space={5}>
          <Box style={styles.iconIcon}>
            <Fontisto size={20} name="facebook" color={'#1877F2'} />
          </Box>
          <Box style={styles.iconIcon}>
            <MaterialCommunityIcons size={20} color={'red'} name="google" />
          </Box>
          <Box style={styles.iconIcon}>
            <MaterialCommunityIcons
              size={20}
              color={'#1DA1F2'}
              name="twitter"
            />
          </Box>
        </HStack>
      </Center>
    </Box>
  );
};

export default Cards;