import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../assets/design";

export default function Item({
  onPress,
  name,
  province,
  state,
  postalCode,
  details,
}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.cont}>
      <View style={styles.nameCont}>
        <Text style={styles.name}>{name}</Text>
      </View>
      <View style={styles.line}></View>
      <View style={styles.contentCont}>
        <Text style={styles.gutterBottom}>
          {province} - {state} ({postalCode})
        </Text>
        <Text>{details}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cont: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    marginBottom: 15,
    borderRadius: 4,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.dark,
  },
  nameCont: {
    padding: 10,
  },
  name: {
    fontWeight: "bold",
    fontSize: 14,
  },
  contentCont: {
    padding: 10,
    paddingTop: 7,
  },
  gutterBottom: {
    marginBottom: 3,
  },
});
