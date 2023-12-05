import React from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";


const TitreAndText = ({titre, describe}) => {
    return(
    <View>
        <View style={{marginBottom:5, gap:5}}>
        <Text style={styles.title}>{titre}</Text>
        <Text style={styles.describe}>{describe}</Text>
        </View>
    </View>
    )
}

export default TitreAndText