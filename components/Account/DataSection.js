import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { COLORS } from "../../assets/design";

export default function DataSection({ label, value }) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput selectTextOnFocus={false} editable={false} style={styles.input} value={value} />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    marginLeft: 4,
    marginBottom: 7,
  },
  input: {
    borderWidth: 0.5,
    borderColor: COLORS.gray,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    fontSize: 18,
    color: COLORS.gray,
  },
});
