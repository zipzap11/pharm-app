import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { COLORS } from "../../assets/design";
import { useNavigation } from "@react-navigation/native";
import { Skeleton } from "@rneui/themed";
import { parseNumToMoney } from "../../screens/util";

export default function FooterPrice({ price, isLoading, onPress }) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={{ marginBottom: 2 }}>Total Harga</Text>
        {isLoading ? (
          <Skeleton animation="pulse" height={20} />
        ) : (
          <Text style={styles.price}>Rp {parseNumToMoney(price)}</Text>
        )}
      </View>
      <TouchableOpacity
        disabled={isLoading}
        activeOpacity={0.6}
        onPress={onPress}
        style={styles.btn}
      >
        {isLoading ? (
          <ActivityIndicator
            style={styles.spinner}
            animating={true}
            color="white"
          />
        ) : (
          <Text style={styles.txt}>Beli</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    bottom: 0,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "lightgray",
    width: "100%",
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  btn: {
    backgroundColor: COLORS.mainBlue,
    paddingHorizontal: 10,
    paddingVertical: 7,
    width: "40%",
    alignItems: "center",
    borderRadius: 4,
    elevation: 5,
    shadowColor: COLORS.gray,
    shadowRadius: 10,
    shadowOpacity: 1,
  },
  txt: {
    color: "white",
    fontSize: 16,
  },
  price: {
    fontWeight: "bold",
  },
  spinner: {
    width: 30,
    height: 30,
  },
});
