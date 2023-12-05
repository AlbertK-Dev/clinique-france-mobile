import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import { ScrollView } from 'react-native-gesture-handler'
import TransactionComp from '../../components/TransactionComp'

export default function Transaction() {
    return (
        <View  style={styles.container}>
            <View>
                <Header title={"Vos transactions"} />
            </View>
            <View>
                <Text style={{ fontSize: 20, margin: 20 }}>Historiques</Text>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                overScrollMode='never'
            >
                <View alignItems={'center'}>
                    {[1, 2, 3, 4, 5, 6, 7].map((_e, i) => {
                        return (
                            
                                <TransactionComp />
                        )
                    })}
                </View>
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
    }
})