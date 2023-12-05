import { InfoCircle } from "iconsax-react-native";
import styles from "./style";
import { Text } from "react-native-paper";
import colors from "../../constants/colours";
import { View } from "react-native";

const CardInfo = (props) => {
  return (
    <View style={{ padding: 2 }}>
      <Text style={styles.sectionTitle}>Informations sur le rendez-vous</Text>
      <View style={styles.appoinmentsBox}>
        <View style={styles.hStackView}>
          <Text style={styles.textColor}>{props.lieu}</Text>
          <Text style={styles.textColor}>{props.status}</Text>
        </View>

        <View style={{ marginTop: 3 }}>
          <Text style={styles.medName}>{props.patient}</Text>
          <Text style={styles.label}>{props.infos}</Text>
        </View>

        <View style={{ marginTop: 5 }}>
          <Text style={styles.label}>Motif du rendez-vous:</Text>
          <Text style={styles.label}>{props.motif}</Text>
        </View>

        <View style={styles.consignes}>
          <View style={styles.iconTextConsigne}>
            <InfoCircle color={colors.primary} size={20} />
            <Text style={{...styles.textColor}}>
              Consignes
            </Text>
          </View>
          <View style={{padding:2, gap:5}}>
            <Text>- Lorem ipsum dolor sit amet</Text>
            <Text>- Lorem ipsum dolor sit amet</Text>
            <Text>- Lorem ipsum dolor sit amet</Text>
          </View>
        </View>

        <View style={{marginTop:5}}>
          <Text style={styles.message}>Rendez-vous fixé au {props.date}</Text>
          <Text style={{...styles.textColor, textAlign:'center', marginTop:5}}>
            Vous serez prévenu 30 minutes à l'avance.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CardInfo;
