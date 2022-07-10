import { StyleSheet, TextInput } from "react-native";
import React from "react";
import { COLORS } from "../assets/design";

export default function Input({ placeholder, value, setValue }) {
  return (
    <TextInput
      placeholder={placeholder}
      style={styles.input}
      value={value}
      onChangeText={setValue}
      textContentType="postalCode"
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.gray,
    padding: 10,
    fontSize: 16,
  },
});
