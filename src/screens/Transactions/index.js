import { StyleSheet, Text } from 'react-native'
import React from 'react'
import { View, VStack } from 'native-base'
import Header from '../../components/Header'
import { ScrollView } from 'react-native-gesture-handler'
import TransactionComp from '../../components/TransactionComp'
import colors from '../../constants/colours'

export default function Transaction() {
    return (
        <View flex={1} style={styles.container}>
            <View height={30}>
                <Header title={"Vos transactions"} />
            </View>
            <View mt={5}>
                <Text style={{ fontSize: 20, margin: 20 }}>Historiques</Text>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                overScrollMode='never'
            >
                <VStack alignItems={'center'}>
                    {[1, 2, 3, 4, 5, 6, 7].map((_e, i) => {
                        return (
                            <View
                                key={i}
                                height={102}
                                width={340}
                                backgroundColor={'white'}
                                borderRadius={10}
                                mb={3}
                                style={{
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 1,
                                    },
                                    shadowOpacity: 0.1,
                                    shadowRadius: 3.84,
                                    elevation: 1
                                }}
                            >
                                <TransactionComp />
                            </View>
                        )
                    })}
                </VStack>
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
    }
})