import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../assets/design";

export default function Banner() {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    height: 150,
    backgroundColor: COLORS.mainBlue,
    borderRadius: 15,
  },
});
