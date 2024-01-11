import { Pressable, View } from 'react-native'
import { Avatar, Button , Text} from 'react-native-paper'
import React, { memo } from 'react'
import colors from '../../constants/colours'
import styles from './style'
import * as SCREENS from '../../constants/screens'
import { Calendar, DocumentText, Location, Map1, Timer1 } from 'iconsax-react-native'
import { transfomeToSlashDate } from '../../utils/helper'

const Rdv = ({ _id, navigation, date, motif, startTime, praticien, status, localisation }) => {
    return (
        <View style={[styles.container]}>
            <View style={styles.topContainer}>
                <View>
                    <Text fontWeight={"bold"} fontSize={16}>{"Dr. " + praticien}</Text>
                    <Text color={colors.text_grey_hint}>{"Genicologue"}</Text>
                </View>
                <Avatar.Image
                    size={40}
                    source={{
                        uri: "https://www.ucf.edu/wp-content/blogs.dir/19/files/2019/12/Hospitality-Professional-At-Work-web.jpg"
                    }}></Avatar.Image>
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.infoView}>
                    <View style={styles.left} space={1}>
                        <DocumentText color={colors.text_grey_hint} size={22} />
                        <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.infoText}>{motif ?? ""}</Text>
                    </View>
                    <View style={styles.left}>
                        <Location color={colors.text_grey_hint} size={22} />
                        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.infoText}>{"Clinique FOUDA"}</Text>
                    </View>
                </View>
                <View style={styles.infoView}>
                    <View style={styles.left}>
                        <Calendar color={colors.text_grey_hint} size={22} />
                        <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.infoText}>{startTime.split(" à ")[0]}</Text>
                    </View>
                    <View style={styles.left}>
                        <Timer1 color={colors.text_grey_hint} size={22} />
                        <Text style={styles.infoText}>{startTime.split(" à ")[1]}</Text>
                    </View>
                </View>
                <View style={[styles.infoView, { justifyContent: 'space-between', gap: 10, marginTop: 15 }]}>
                    {localisation && <Pressable style={styles.mapBtn} onPress={() => navigation.navigate(SCREENS.GOOGLE_MAP, { localisation })}>
                        <Map1 color={colors.primary} />
                    </Pressable>}
                    <Button onPress={() => navigation.navigate(SCREENS.APPOINTMENT_DETAILS_SCREEN, { _id: _id })} textColor={colors.primary} style={styles.reportBtn}>
                        Afficher
                    </Button>
                </View>
            </View>
        </View >
    )
}

export default memo(Rdv)