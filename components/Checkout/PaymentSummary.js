import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { parseNumToMoney } from "../../screens/util";

export default function PaymentSummary({ price, shippingPrice }) {
  return (
    <View>
      <Text style={styles.title}>Payment Summary</Text>
      <View style={styles.flexCont}>
        <Text>Total harga barang</Text>
        <Text>Rp {parseNumToMoney(price)}</Text>
      </View>
      <View style={styles.flexCont}>
        <Text>Ongkos kirim</Text>
        <Text>Rp {parseNumToMoney(shippingPrice)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    marginBottom: 6,
  },
  flexCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
});
