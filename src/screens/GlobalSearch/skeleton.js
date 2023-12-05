import { HStack, Skeleton, VStack, View } from "native-base";
import React from "react";

export const PratSearchSkeleton = () => {
    return (
        <VStack space={3}>
            <HStack px={9} space={4}>
                <Skeleton h={"60px"} w={"60px"} borderRadius={10} />
                <VStack justifyContent={"space-around"}>
                    <Skeleton h={"15px"} w={"150px"} borderRadius={10} />
                    <Skeleton h={"15px"} w={"100px"} borderRadius={10} />
                    <Skeleton h={"15px"} w={"120px"} borderRadius={10} />
                </VStack>
            </HStack>
            <HStack px={9} space={4}>
                <Skeleton h={"60px"} w={"60px"} borderRadius={10} />
                <VStack justifyContent={"space-around"}>
                    <Skeleton h={"15px"} w={"150px"} borderRadius={10} />
                    <Skeleton h={"15px"} w={"100px"} borderRadius={10} />
                    <Skeleton h={"15px"} w={"120px"} borderRadius={10} />
                </VStack>
            </HStack>
            <HStack px={9} space={4}>
                <Skeleton h={"60px"} w={"60px"} borderRadius={10} />
                <VStack justifyContent={"space-around"}>
                    <Skeleton h={"15px"} w={"150px"} borderRadius={10} />
                    <Skeleton h={"15px"} w={"100px"} borderRadius={10} />
                    <Skeleton h={"15px"} w={"120px"} borderRadius={10} />
                </VStack>
            </HStack>
        </VStack>
    )
}