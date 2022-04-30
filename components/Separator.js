import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function Separator({ size, horizontal = false }) {
  const styles = StyleSheet.create({
    v: { marginTop: size },
    h: { marginRight: size },
  });
  return <View style={horizontal ? styles.h : styles.v}></View>;
}
