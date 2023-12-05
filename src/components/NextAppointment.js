import {
  Calendar,
  Clock,
  DocumentText,
  Hospital,
  Map1,
} from "iconsax-react-native";
import {StyleSheet} from "react-native";
import colors from "../constants/colours";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { Pressable } from "react-native";

const _spacing = 3;

const NextAppointment = (props) => {
  return (
    <View
      style={{
        backgroundColor: colors.primary,
        marginHorizontal: 10,
        padding: 8,
        gap: 10,
        borderRadius: 10,
      }}
    >
      <View style={{ ...styles.hStack, gap: 8, alignItems: "center" }}>
        <View style={styles.medPic}></View>
        <View
          style={{
            ...styles.hStack,
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <View>
            <Text style={{ ...styles.text }}>Dr Shana Khan</Text>
            <Text style={styles.text}>Cardiologue</Text>
          </View>
          <Pressable style={styles.mapBox}>
            <Map1 size={26} color={colors.primary} variant="Bold" />
          </Pressable>
        </View>
      </View>
      <View style={styles.detailBox} borderRadius={10} bg="#00A3B4" p={_spacing} space={_spacing}>
        <View style={{...styles.horiWidth, padding:5, justifyContent:'space-between'}}>
          <View style={styles.horiWidth}>
            <DocumentText color="white" />
            <Text style={{...styles.text}}>
              Consultation ophta
            </Text>
          </View>
          <View style={styles.horiWidth}>
            <Hospital color="white" />
            <Text style={{...styles.text}} numberOfLines={1} ellipsizeMode="tail">
              Centre pasteur
            </Text>
          </View>
        </View>
        <View style={{...styles.horiWidth, padding:5, justifyContent:'space-between'}}>
          <View style={styles.horiWidth}>
            <Calendar color="white" />
            <Text style={{...styles.text}} >
              Lun, 28 aout 2023
            </Text>
          </View>
          <View style={styles.horiWidth}>
            <Clock  color="white" />
            <Text style={{...styles.text}}>
              14:30
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  medPic: {
    height: 45,
    width: 45,
    borderRadius: 5,
    backgroundColor: colors.bg_grey,
  },

  hStack: {
    display: "flex",
    flexDirection: "row",
    width: "85%",
  },

  horiWidth: {
    display: "flex",
    flexDirection: "row",
    gap:5
  },

  vStack: {
    display: "flex",
    flexDirection: "column",
  },

  mapBox:{
    width:40,
    height:40,
    backgroundColor:colors.white,
    borderRadius:50,
    alignItems:"center",
    justifyContent:'center'
  },

  text: {
    color: colors.white,
  },

  detailBox:{
   backgroundColor:"#00A3B4",
   padding:5,
   gap:8,
   borderRadius:15
  }
});

export default NextAppointment;
