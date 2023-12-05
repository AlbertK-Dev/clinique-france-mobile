
import React from "react";
import { Box, HStack, Icon, Pressable, Text } from "native-base";
import { FontAwesome, Fontisto, Entypo } from '@expo/vector-icons';
import styles from './style';
import colors from "../../constants/colours";
import { useDispatch, useSelector } from "react-redux";
import { setRDVForm } from "../../redux/RDV/actions";
import { setIdCentre } from "../../redux/commons/action";

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
            <Box
                ml={index != 0 ? 3 : 0}
                style={{
                    ...styles.medBox,
                    backgroundColor: isSelected ? colors.trans_primary : 'transparent',
                    borderColor: isSelected ? colors.trans_primary : colors.text_grey_hint,
                }}>
                <HStack alignItems={'center'}>
                    <Icon color={colors.primary} as={Fontisto} name='doctor' />
                    <Text ml={1} style={styles.medName}>{infosPraticien ? "Dr " + infosPraticien.name : infosClinique.label}</Text>
                </HStack>
                <HStack mt={1} alignItems={'center'}>
                    <Icon color={colors.primary} as={FontAwesome} name='hospital-o' />
                    <Text ml={1} style={styles.medCenter}>{infosPraticien ? infosPraticien.email : infosClinique.ville + " - " + infosClinique?.region}</Text>
                </HStack>
                <HStack mt={1} alignItems={'center'}>
                    <Icon color={colors.secondary} as={Entypo} name='wallet' />
                    <Text ml={1} style={styles.medTax}>{infosPraticien ? infosPraticien.telephone : "5000 fcfa"}</Text>
                </HStack>
            </Box>
        </Pressable >
    )
}

export default MedItem;