import React from "react";
import { ActivityIndicator } from "react-native-paper";
import colors from "../../../constants/colours";
import { View } from "react-native";


export const LoadingMotifs = () => {
    return (
            <View style={{ height: 40, display: 'flex', flexDirection: 'row', marginTop: 10, marginLeft: 3 }}>
               <ActivityIndicator size={15} color={colors.primary}/>
            </View>
    )
}