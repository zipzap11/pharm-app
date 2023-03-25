import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../assets/design";
import { parseNumToMoney } from "../../screens/util";

export default function DetailHeader({ name, price, stock }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.price}>Rp {parseNumToMoney(price)}</Text>
      <Text style={styles.stock}>Stok {stock}</Text>
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
