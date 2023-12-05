import { View, Text } from 'react-native'
import React from 'react'
import { styles } from './style'
import { Surface } from 'react-native-paper'

const TransactionComp = () => {
    return (
        <Surface elevation={1} style={styles.surface}>
            <View style={styles.hstackBox}>
                <Text style={{ fontSize: 16 }}>Paiement effectué</Text>
                <Text
                    style={{
                        color: "white",
                        backgroundColor: "orange",
                        borderRadius: 10,
                        padding: 3,
                        fontSize: 12
                    }}>Orange Money</Text>
            </View>
            <Text
                style={{
                    fontSize: 14,
                    color: "#7C7C7C"
                }}>
                Vous venez d’effectué un paiement d’un montant de 1500 Fcfa.
            </Text>
            <View style={styles.hstackBox}>
                <Text
                    style={{
                        color: "#04C96A",
                        fontSize: 12
                    }}
                >Succes</Text>
                <Text style={{ fontSize: 12, color: "#818181" }}>12 Fevrier 2023</Text>
            </View>
        </Surface>
    )
}

export default TransactionComp