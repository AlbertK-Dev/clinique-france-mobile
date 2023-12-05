import { Skeleton, View } from "native-base";
import React from "react";


export const LoadingMotifs = () => {
    return (
            <View style={{ height: 40, display: 'flex', flexDirection: 'row', marginTop: 10, marginLeft: 3 }}>
                <Skeleton h={"100%"} w={"50%"} borderRadius={20} />
                <Skeleton h={"100%"} w={"30%"} borderRadius={20} ml={3} />
            </View>
    )
}