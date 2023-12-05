import React from "react";
import { Box, Input, ScrollView, View, HStack, Text, VStack, Icon, Avatar } from 'native-base'
import colors from "../../constants/colours";
import { Feather } from '@expo/vector-icons';

export const PraticiensForSearch = ({ data }) => {
    return (
        <View px={4} backgroundColor={colors.white}>
            <HStack px={5} alignItems={'center'} space={4} style={{
                backgroundColor: colors.white,
                padding: 10,
                borderRadius: 10
            }}>
                <Box style={{
                    height: 60,
                    width: 60,
                    borderRadius: 10,
                    backgroundColor: colors.text_grey_hint
                }}></Box>
                <VStack>
                    <Text style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: colors.black
                    }}>Dr {data?.name ?? ""}</Text>
                    <Text style={{ color: colors.text_grey_hint }}>{"Genicologue"}</Text>
                    <Text style={{ color: colors.text_grey_hint }}>4,5/5 (388 avis)</Text>
                </VStack>
            </HStack>
        </View>
    )
}