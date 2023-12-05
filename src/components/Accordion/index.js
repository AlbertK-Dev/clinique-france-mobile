import { HStack, Icon, Text, Box, Divider } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import styles from './style';
import colors from '../../constants/colours';
import { ArrowDown2, ArrowUp2 } from 'iconsax-react-native'
import { Pressable } from 'react-native';


const Accordion = () => {
    const [reveal, setReveal] = React.useState(false);

    const handleReveal = () => {
        setReveal(!reveal);
    }

    return (
        <Box mb={5} style={styles.container}>
            <Pressable onPress={handleReveal}>

                <HStack px={3} style={styles.header}>
                    <Text fontWeight={'bold'}>Comment changer mon mot de passe?</Text>
                    <Icon
                        as={reveal ? <ArrowUp2 /> : <ArrowDown2 />}
                        color={colors.black}
                        size='lg'
                    />
                </HStack>
                {reveal && <Divider mb={3} />}
                {reveal &&
                    <Box px={3} mb={3} style={styles.contentBox}>
                        Pour changer votre mot de passe, allez dans le menu et sélectionnez un profil. Retapez ensuite votre mot de passe actuel et confirmez.
                    </Box>
                }
            </Pressable>
        </Box>
    )
}

export default Accordion;