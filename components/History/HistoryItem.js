import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { parseNumToMoney } from "../../screens/util";
import { COLORS } from "../../assets/design";
import { useNavigation } from "@react-navigation/native";

export default function HistoryItem({ date, status, list, price, paymentUrl }) {
  const navigation = useNavigation();
  const handlePayment = () => navigation.navigate("Payment", { paymentUrl });
  console.log('list = ', list)
  return (
    <View style={styles.container}>
      <ItemHeader date={date} status={status} />
      <Products list={list} />
      <View style={styles.bottomCont}>
        <Text style={styles.priceCont}>
          Total Harga:{" "}
          <Text style={styles.price}>Rp {parseNumToMoney(price)}</Text>
        </Text>
        {status === "PENDING" && (
          <TouchableOpacity onPress={handlePayment} style={styles.btn}>
            <Text style={styles.btnTxt}>Bayar</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const ItemHeader = ({ date, status }) => {
  let statusStyle, statusStr;
  if (status === "SUCCESS") {
    statusStyle = styles.txtGreen;
    statusStr = "Sukses";
  } else if (status === "FAILED") {
    statusStyle = styles.txtRed;
    statusStr = "Gagal";
  } else if (status === "PENDING") {
    statusStyle = styles.txtYellow;
    statusStr = "Pending";
  }
  return (
    <View style={styles.headerCont}>
      <Text style={styles.date}>{date}</Text>
      <Text style={statusStyle}>{statusStr}</Text>
    </View>
  );
};

const Products = ({ list }) => {
  return (
    <>
      {list.map((item, i) => (
        <View style={styles.productsCont} key={i}>
          <Text style={styles.name}>{item.product.name}</Text>
          <Text style={styles.quantity}>jumlah: {item.quantity}</Text>
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 11,
    marginBottom: 10,
    borderRadius: 8,
  },
  headerCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  date: {
    color: "gray",
  },
  txtGreen: {
    color: "green",
  },
  txtRed: {
    color: "red",
  },
  txtYellow: {
    color: "#F8CB2E",
  },
  productsCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  name: {
    // fontWeight: "700",
    fontSize: 13,
    flex: 4,
    color: COLORS.dark,
  },
  quantity: {
    flex: 1,
    textAlign: "right",
    fontSize: 13,
    color: COLORS.gray,
  },
  priceCont: {
    marginTop: 6,
  },
  price: {
    fontWeight: "bold",
  },
  bottomCont: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btn: {
    backgroundColor: COLORS.mainBlue,
    minWidth: 70,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    borderRadius: 4,
  },
  btnTxt: {
    color: "white",
    fontSize: 13,
  },
});
