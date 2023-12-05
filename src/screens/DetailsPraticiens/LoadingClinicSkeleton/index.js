import { Skeleton, View } from "native-base";
import React from "react";

export const LoadingDispo = () => {
    return (
        <View style={{ height: 40, display: 'flex', flexDirection: 'row' }} px={2} width={"100%"}>
            <Skeleton h={"100%"} w={"100px"} borderRadius={10} />
            <Skeleton h={"100%"} w={"100px"} borderRadius={10} ml={3} />
            <Skeleton h={"100%"} w={"100px"} borderRadius={10} ml={3} />
        </View>
    )
}