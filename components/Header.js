import React from "react";
import { StyleSheet, Image, Text, View, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS } from "../assets/design";
export default function Header({ nav }) {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/icon.png")} />
      <TouchableOpacity
        onPress={() => nav.navigate("Search")}
        activeOpacity={0.7}
      >
        <MaterialCommunityIcons name="cart" size={30} color={COLORS.gray} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 45,
    height: 45,
    resizeMode: "contain",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    alignItems: "center",
  },
});
