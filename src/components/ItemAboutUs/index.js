import { View, Text } from "react-native";
import React from "react";
import { styles } from "./style";

export default function ItemAboutUs({ tilte, description, icon }) {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer} space={2}>
        {icon}
        <View style={{width:"92%", marginLeft:8}}>
          <Text style={styles.label}>{tilte}</Text>
          {description && <Text style={styles.description}>{description}</Text>}
        </View>
      </View>
    </View>
  );
}
