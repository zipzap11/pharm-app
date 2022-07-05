import { StyleSheet, Image, View } from "react-native";
import React from "react";
import { COLORS } from "../../assets/design";

export default function LargeProductImage({ src }) {
  return (
    <View style={styles.imgContainer}>
      <Image
        style={styles.img}
        source={{
          uri: src,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imgContainer: {
    flexDirection: "row",
    borderBottomColor: COLORS.gray,
    borderBottomWidth: 0.3,
  },
  img: {
    flex: 1,
    resizeMode: "contain",
    // aspectRatio: 1.3,
    height: 300,
  },
});
