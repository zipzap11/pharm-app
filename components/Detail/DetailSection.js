import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../assets/design";

export default function DetailSection({ title, section }) {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.section}>{section}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  section: {
    fontSize: 14,
    color: COLORS.gray,
    lineHeight: 20,
  },
});
