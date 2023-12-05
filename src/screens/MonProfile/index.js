import { Avatar, Box, View, VStack } from 'native-base'
import React from 'react'
import { Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { RadioButton, TextInput } from 'react-native-paper'
import Header from '../../components/Header'
import colors from '../../constants/colours'
import { styles } from './style'
import { connect } from 'react-redux'


const  MonProfile = ({userInfos}) => {
    return (
        <View style={styles.container}>
            <VStack style={styles.child1}>
                <Box style={{ height: 45 }}>
                    <Header title={"Mon profile"} />
                </Box>
                <View style={styles.child2of1}>
                    <View style={styles.avatarContainer}>
                        <Avatar bg={colors.primary}
                            width={"100%"}
                            height={"100%"}
                            source={{
                                uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                            }}></Avatar>
                    </View>
                </View>
            </VStack>
            <VStack style={styles.child2}>
                <View style={{
                    height: 31,
                    display: "flex",
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 15
                }}>
                    <View style={{
                        height: "100%",
                        backgroundColor: '#F0F0F0',
                        display: "flex",
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: "90%",
                        borderRadius: 10,
                        paddingLeft: 10
                    }}>
                        <Text style={{ fontSize: 11, fontWeight: "bold" }}>Détai de base</Text>
                    </View>
                </View>
                <View style={{ height: 253 }}>
                    <View style={{
                        height: "55%",
                        display: "flex",
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }}>
                        <VStack style={{ width: "90%" }}>
                            <View style={{ marginBottom: 15 }}>
                                <Text style={{ marginBottom: 5 }}>Nom(s) et prenom(s)</Text>
                                <TextInput
                                    isInvalid={true}
                                    style={{
                                        borderRadius: 5,
                                        backgroundColor: "white",
                                        borderWidth: 1,
                                        borderColor: "#F0F0F0",
                                        height: 45,
                                        fontSize: 15
                                    }}
                                    placeholder="Tiemani hapi christian"
                                    underlineColor="transparent"
                                    keyboardType="default"
                                    selectionColor={colors.primary}
                                    activeUnderlineColor="transparent"
                                    value={""}
                                />
                            </View>
                            <View>
                                <Text style={{ marginBottom: 5 }}>Date de naissance</Text>
                                <TextInput
                                    isInvalid={true}
                                    style={{
                                        borderRadius: 5,
                                        backgroundColor: "white",
                                        borderWidth: 1,
                                        borderColor: "#F0F0F0",
                                        height: 45,
                                        fontSize: 15
                                    }}
                                    placeholder="17 Décembre 2004"
                                    underlineColor="transparent"
                                    keyboardType="default"
                                    selectionColor={colors.primary}
                                    activeUnderlineColor="transparent"
                                    value={""}
                                />
                            </View>
                        </VStack>
                    </View>
                    <View style={{ height: 70, marginTop: 5, backgroundColor: "white", display: "flex", flexDirection: "row", justifyContent: "center" }}>
                        <View style={{ width: "90%", }}>
                            <Text style={{ marginBottom: 5 }}>Sexe</Text>
                            <View style={{
                                display: "flex",
                                justifyContent: "space-between",
                                flexDirection: "row",
                            }}>
                                <View style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: "center",
                                    borderWidth: 1,
                                    width: "40%",
                                    height: 45,
                                    padding: 5,
                                    borderRadius: 10,
                                    borderColor: "#F0F0F0"
                                }}>
                                    <RadioButton.Android
                                        style={{ height: 100 }}
                                        uncheckedColor={"#F0F0F0"}
                                        color={colors.primary}
                                        value="first"
                                        status={"checked"}
                                    />
                                    <Text style={{ fontSize: 15 }}>Homme</Text>
                                </View>
                                <View style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: "center",
                                    borderWidth: 1,
                                    width: "40%",
                                    height: 45,
                                    padding: 5,
                                    borderRadius: 10,
                                    borderColor: "#F0F0F0"
                                }}>
                                    <RadioButton.Android
                                        style={{ height: 100 }}
                                        uncheckedColor={"#F0F0F0"}
                                        color={colors.primary}
                                        value="first"
                                        status={"checked"}
                                    />
                                    <Text style={{ fontSize: 15 }}>Femme</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </VStack>
            <VStack style={styles.child3}>
                <View style={{ width: "90%", }}>
                    <View style={{
                        height: 31,
                        display: "flex",
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 15,
                        width: "100%"
                    }}>
                        <View style={{
                            height: "100%",
                            backgroundColor: '#F0F0F0',
                            display: "flex",
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: "100%",
                            borderRadius: 10,
                            paddingLeft: 10
                        }}>
                            <Text style={{ fontSize: 17, fontWeight: "bold" }}>Coordonnées</Text>
                        </View>
                    </View>
                    <View style={{ height: 170 }}>
                        <View style={{ display: "flex", flexDirection: "column", alignItems: 'center' }}>
                            <View style={{ marginBottom: 10, width: "100%" }}>
                                <Text style={{ marginBottom: 5 }}>Adresse mail</Text>
                                <TextInput
                                    isInvalid={true}
                                    style={{
                                        borderRadius: 5,
                                        backgroundColor: "white",
                                        borderWidth: 1,
                                        borderColor: "#F0F0F0",
                                        height: 45,
                                        fontSize: 15
                                    }}
                                    placeholder="tiemanirocket@gmail.com"
                                    underlineColor="transparent"
                                    keyboardType="default"
                                    selectionColor={colors.primary}
                                    activeUnderlineColor="transparent"
                                    value={""}
                                />
                            </View>
                            <View style={{ width: "100%" }}>
                                <Text style={{ marginBottom: 5 }}>Numéro de tétéphone</Text>
                                <TextInput
                                    isInvalid={true}
                                    style={{
                                        borderRadius: 5,
                                        backgroundColor: "white",
                                        borderWidth: 1,
                                        borderColor: "#F0F0F0",
                                        height: 45,
                                        fontSize: 15
                                    }}
                                    placeholder="658686162"
                                    underlineColor="transparent"
                                    keyboardType="default"
                                    selectionColor={colors.primary}
                                    activeUnderlineColor="transparent"
                                    value={""}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </VStack>
            <VStack style={styles.child4}>
                <View style={{
                    display: "flex",
                    width: "90%",
                    borderRadius: 10,
                    height: "70%",
                    marginBottom: 15,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: colors.primary
                }}>
                    <TouchableOpacity>
                        <Text style={{ fontSize: 17, color: "white" }}>Enregistrer</Text>
                    </TouchableOpacity>
                </View>
            </VStack>
        </View>
    )
}

const mapStateToProps = ({ UserReducer }) => ({
    userInfos: UserReducer.userInfos,
  })
export default connect(mapStateToProps)(MonProfile)
