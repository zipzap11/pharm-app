import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS } from "../assets/design";

export default function Button({ title, onPress, disabled }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      style={styles.container}
    >
      <Text style={styles.txt}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.mainBlue,
    padding: 10,
    alignItems: "center",
    borderRadius: 8,
  },
  txt: {
    color: "white",
    fontWeight: "700",
    fontSize: 18,
  },
});
