import React from "react";
import { Text, View } from "react-native";
import { HStack, VStack } from "native-base";
import { styles } from "./styles";


const TitreAndText = ({titre, describe}) => {
    return(
    <View>
        <VStack mb={3} space={3}>
        <Text style={styles.title}>{titre}</Text>
        <Text style={styles.describe}>{describe}</Text>
        </VStack>
    </View>
    )
}

export default TitreAndText