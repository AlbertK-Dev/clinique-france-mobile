import React from "react";
import styles from './style';
import colors from "../../constants/colours";
import { View, Pressable } from "react-native";
import { Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { setRDVForm } from "../../redux/RDV/actions";
import { setIdCentre } from "../../redux/commons/action";
import { Hospital, Location, MoneySend } from "iconsax-react-native";

const MedItem = ({ value, infosPraticien, handleChange, index, trigger, infosClinique }) => {
    const dispatch = useDispatch()
    const RDVForm = useSelector(state => state.RdvForm.rdvForm)
    let isSelected = infosPraticien && (value == infosPraticien?._id) || infosClinique && (value == infosClinique?._id);

    const handlePress = () => {
        if (infosPraticien) {
            dispatch(setIdCentre(infosPraticien.idCentre))
            handleChange(trigger, { id: infosPraticien._id, idc: infosPraticien.idCentre })
        } else {
            handleChange(trigger, infosClinique._id)
            dispatch(setRDVForm({
                ...RDVForm,
                lieu: infosClinique?._id,
            }))
        }
    }


    return (
        <Pressable onPress={handlePress}>
            <View
                style={{
                    ...styles.medBox,
                    backgroundColor: isSelected ? colors.trans_primary : 'transparent',
                    borderColor: isSelected ? colors.trans_primary : colors.primary, gap:5
                }}>
                <View style={styles.hStack}>
                    <Hospital size={17} color={colors.primary} />
                    <Text ml={1} style={{...styles.medName, color: colors.primary}}>{infosPraticien ? "Dr " + infosPraticien.name : infosClinique.label}</Text>
                </View>
                <View style={styles.hStack}>
                <Location size={17} color={colors.black} />
                    <Text ml={1} style={styles.medCenter}>{infosPraticien ? infosPraticien.email : infosClinique.ville + " - " + infosClinique?.region}</Text>
                </View>
                <View style={styles.hStack}>
                <MoneySend size={17} color={colors.yellow}/>
                    <Text ml={1} style={styles.medTax}>{infosPraticien ? infosPraticien.telephone : "500000 fcfa"}</Text>
                </View>
            </View>
        </Pressable >
    )
}

export default MedItem;