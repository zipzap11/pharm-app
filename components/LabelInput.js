import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { COLORS } from "../assets/design";

export default function LabelInput({
  value,
  setValue,
  label,
  placeholder,
  type,
  editable = true,
}) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        textContentType={type}
        secureTextEntry={type === "password" ? true : false}
        placeholder={placeholder}
        style={styles.input}
        value={value}
        onChangeText={setValue}
        editable={editable}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: COLORS.lightGray,
    fontSize: 16,
    paddingHorizontal: 9,
    paddingVertical: 7,
    borderRadius: 8,
  },
  label: {
    marginBottom: 4,
    marginLeft: 1,
    color: COLORS.gray,
  },
});
