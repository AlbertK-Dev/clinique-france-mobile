import React from "react";
import { Box, HStack, Icon, Input, ScrollView, Text, View, VStack } from 'native-base'
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import styles from "./style";
import colors from '../../constants/colours';
import Accordion from "../../components/Accordion";
import Header from "../../components/Header";
import {Global, MessageText1, TableDocument} from 'iconsax-react-native'


const IconItem = (props) => {
    return (
        <HStack style={styles.headerItem}>
            <Box style={styles.iconBox}>
                <Icon
                    as={props.iconType}
                    color={colors.primary}
                    size='md'
                />
            </Box>
            <Text style={styles.textBox}>{props.text}</Text>
        </HStack>
    )
}

const FAQ = () => {
    const [searchedValue, setSearchedValue] = React.useState('');

    const handleChange = (text) => {
        setSearchedValue(text)
    }

    return (
        <View flex={1} style={styles.container}>
            <Header bg={'white'} title={'Contactez l\'Assistance'} />
            <VStack style={styles.headerItemGroup}>
                <Box mb={5}>
                    <Text style={styles.headerText}>Vous n'avez pas trouvé la réponse que vous cherchiez? Contactez notre centre d'assistance!</Text>
                </Box>
                <Box mb={2}>
                    <IconItem
                        iconName='web'
                        iconType={<Global />}
                        text='Aller sur notre site web' />
                    <IconItem
                        iconName='message1'
                        iconType={<MessageText1 />}
                        text='Envoyez-nous un e-mail' />
                    <IconItem
                        iconName='filetext1'
                        iconType={<TableDocument />}
                        text="Conditions d'utilisation" />
                </Box>

                <Box>
                    <Input
                        value={searchedValue}
                        size={'md'}
                        placeholder="Rechercher"
                        w="100%"
                        onChangeText={handleChange}
                        height={10}
                    />
                </Box>
            </VStack>
            <ScrollView showsVerticalScrollIndicator={false} p={5} flex={1}>
                <Accordion />
                <Accordion />
                <Accordion />
                <Accordion />
                <Accordion />
                <Accordion />
                <Accordion />
                <Accordion />
                <Accordion />
            </ScrollView>
        </View>
    )
}

export default FAQ;