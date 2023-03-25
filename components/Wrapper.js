import { SafeAreaView, StyleSheet } from "react-native";
import React from "react";

export default function Wrapper({ children }) {
  return <SafeAreaView style={styles.wrapper}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 12,
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
