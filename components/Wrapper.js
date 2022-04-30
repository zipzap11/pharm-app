import { SafeAreaView, StyleSheet, StatusBar, Platform } from "react-native";
import React from "react";
import { COLORS } from "../assets/design";

export default function Wrapper({ children }) {
  return <SafeAreaView style={styles.wrapper}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 12,
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
