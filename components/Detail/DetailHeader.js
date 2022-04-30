import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../assets/design";

export default function DetailHeader() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>QV Gentle Wash Pump 500gr</Text>
      <Text style={styles.price}>Rp 35.000</Text>
      <Text style={styles.stock}>Stok 50</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomColor: COLORS.gray,
    borderBottomWidth: 0.5,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 4,
  },
  price: {
    color: COLORS.mainBlue,
    // fontWeight: "bold",
    fontSize: 18,
    marginBottom: 4,
  },
  stock: {
    color: COLORS.gray,
    fontSize: 14,
    marginBottom: 5,
  },
});
