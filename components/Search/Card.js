import {
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  View,
  Dimensions,
} from "react-native";
import React from "react";
import { COLORS } from "../../assets/design";
import { useNavigation } from "@react-navigation/native";

export default function Card() {
  const nav = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => nav.navigate("Detail")}
      activeOpacity={0.6}
      style={styles.container}
    >
      {/* <View style={styles.container}> */}
      <View style={{ backgroundColor: "black" }}>
        <Image
          style={styles.image}
          source={require("../../assets/product.png")}
        />
      </View>
      <Description />
    </TouchableOpacity>
  );
}

const Description = () => (
  <View style={styles.descContainer}>
    <Text style={{ marginBottom: 7, fontSize: 12, fontWeight: "600" }}>
      QV Gentle Wash Pump 500gr
    </Text>
    <Text style={{ fontWeight: "700", fontSize: 12 }}>Rp 35.000</Text>
  </View>
);
const width = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    // borderWidth: 0.2,
    // borderColor: COLORS.gray,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: COLORS.gray,
    shadowOpacity: 1,
    shadowOffset: {
      height: 10,
      width: 7,
    },
    elevation: 5,
    shadowRadius: 7,
    width: width / 2 - 15,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 130,
    // resizeMode: "contain",
  },
  descContainer: {
    padding: 10,
    paddingTop: 3,
  },
});
