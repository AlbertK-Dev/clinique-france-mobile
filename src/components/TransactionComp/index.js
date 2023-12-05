import { View, Text } from 'react-native'
import React from 'react'
import { HStack, VStack } from 'native-base'

const TransactionComp = () => {
    return (
        <VStack style={{ height: "100%", width: "100%", padding: 5 }} justifyContent={"space-around"}>
            <HStack justifyContent={"space-between"}>
                <Text style={{ fontSize: 16 }}>Paiement effectué</Text>
                <Text
                    style={{
                        color: "white",
                        backgroundColor: "orange",
                        borderRadius: 10,
                        padding: 3,
                        fontSize: 12
                    }}>Orange Money</Text>
            </HStack>
            <Text
                style={{
                    fontSize: 14,
                    color: "#7C7C7C"
                }}>
                Vous venez d’effectué un paiement d’un montant de 1500 Fcfa.
            </Text>
            <HStack justifyContent={"space-between"}>
                <Text
                    style={{
                        color: "#04C96A",
                        fontSize: 12
                    }}
                >Succes</Text>
                <Text style={{ fontSize: 12, color: "#818181" }}>12 Fevrier 2023</Text>
            </HStack>
        </VStack>
    )
}

export default TransactionComp