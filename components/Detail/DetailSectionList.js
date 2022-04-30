import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../assets/design";

export default function DetailSectionList({ title, list }) {
  return (
    <View>
      <Text style={styles.title}>DetailSectionList</Text>
      {list.map((item) => (
        <Text key={item} style={styles.item}>- {item}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  item: {
    lineHeight: 20,
    fontSize: 14,
    color: COLORS.gray,
  },
});
