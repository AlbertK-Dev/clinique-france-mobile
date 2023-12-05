import React from "react";
import styles from "./style";
import colors from "../../constants/colours";
import { ArrowDown2, ArrowUp2 } from "iconsax-react-native";
import { Pressable, View } from "react-native";
import { Divider, Text } from "react-native-paper";

const Accordion = ({title, description}) => {
  const [reveal, setReveal] = React.useState(false);

  const handleReveal = () => {
    setReveal(!reveal);
  };

  return (
    <View  style={styles.container}>
      <Pressable onPress={handleReveal}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          {reveal ? <ArrowUp2 color={colors.primary}  size={26}/> : <ArrowDown2  color={colors.black}/>}
        </View>
        {reveal && <Divider mb={3} />}
        {reveal && (
          <View style={styles.contentBox}>
            <Text style={styles.description}>{description}</Text>
          </View>
        )}
      </Pressable>
    </View>
  );
};

export default Accordion;
