import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function PurchaseDetail({ items }) {
  return (
    <View>
      <Text style={styles.title}>Purchase Detail</Text>
      {items.map((item, i) => (
        <Product key={i} name={item.product.name} total={item.quantity} />
      ))}
    </View>
  );
}

const Product = ({ name, total }) => (
  <View style={styles.productCont}>
    <Text>{`\u2022 ${name}`}</Text>
    <Text>{total}</Text>
  </View>
);

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    marginBottom: 6,
  },
  productCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
});
