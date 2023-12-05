import colors from "../../constants/colours";
import { Star1, Hospital } from "iconsax-react-native";
import { useSelector } from "react-redux";
import { ActivityIndicator, Surface, Text } from "react-native-paper";
import styles from "./style";
import { View, Pressable } from "react-native";

const _spacing = 3;
const DoctorCard = ({ isEmpty = false, ...props }) => {
  const motifsLoading = useSelector((state) => state.RdvForm.motifsLoading);

  return (
    <Pressable style={{ margin: 8 }} onPress={() => {}}>
      <Surface elevation={1} style={styles.medCard}>
        <View style={styles.medPic}>
        </View>
        <View style={{ gap: 5 }} flex={1}>
          <View style={styles.hStack}>
            {!isEmpty && (
              <>
                <Star1 size={15} color={colors.secondary} variant="Bold" />
                <Star1 size={15} color={colors.secondary} variant="Bold" />
                <Star1 size={15} color={colors.secondary} variant="Bold" />
                <Star1 size={15} color={colors.secondary} variant="Bold" />
                <Star1 size={15} color={colors.secondary} variant="Bold" />
              </>
            )}
          </View>
          {!isEmpty && (
            <Text style={styles.medName}>Dr. {props.nom_complet}</Text>
          )}
          <View style={{ ...styles.hStack, width: "100%" }}>
            <View style={{ ...styles.hStack, width: "50%", gap: 3 }}>
              <Text flex={1} isTruncated style={styles.infos}>
                {props.speciality ?? "..."}
              </Text>
            </View>
            <View style={{ ...styles.hStack, width: "50%", gap: 3 }}>
              {!isEmpty && (
                <>
                  <Hospital color={colors.text_grey_hint} size={18} />
                  <Text flex={1} isTruncated style={styles.infos}>
                    {props.clinique}
                  </Text>
                </>
              )}
            </View>
          </View>
        </View>
      </Surface>
    </Pressable>
  );
};

export default DoctorCard;
