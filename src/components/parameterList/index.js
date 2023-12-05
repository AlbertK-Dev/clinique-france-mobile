import { Text } from 'react-native-paper'
import { View } from 'react-native'
import React from 'react'
import { styles } from './style'
import colors from '../../constants/colours'
import { ArrowRight2 } from 'iconsax-react-native'
import {
    User,
    Setting2,
    TableDocument,
    Messages3,
    InfoCircle,
    Logout,
  } from "iconsax-react-native";

export default function ParameterList({ label, icon }) {
    return (
        <View style={styles.container}>
            <View space={3} style={styles.subContainer}>
                {label==="Mon profile"?<User size={26} color={colors.primary} /> : 
                label==="Parametres"?<Setting2 size={26} color={colors.primary} />:
                label==="Historique de transaction"?<TableDocument size={26} color={colors.primary} />:
                label==="FAQ et Assistance"?<Messages3 size={26} color={colors.primary} />:
                label==="A propos"?<InfoCircle size={26} color={colors.primary}  />:<Logout size={26} color={colors.primary}/>}
                <Text style={{ ...styles.label }}>{label}</Text>
            </View>
            <ArrowRight2 size={26} color={colors.primary}/>
        </View>
    )
}
