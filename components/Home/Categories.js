import {
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import React from "react";
import { COLORS } from "../../assets/design";

const CATEGORIES = [
  {
    id: 1,
    name: "jantung",
    img: require("../../assets/jantung.png"),
  },
  {
    id: 2,
    name: "batuk & flu",
    img: require("../../assets/batuk_flu.png"),
  },
  {
    id: 3,
    name: "asma",
    img: require("../../assets/asma.png"),
  },
  {
    id: 4,
    name: "herbal",
    img: require("../../assets/herbal.png"),
  },
  {
    id: 5,
    name: "hewan",
    img: require("../../assets/hewan.png"),
  },
  {
    id: 6,
    name: "pria",
    img: require("../../assets/pria.png"),
  },
  {
    id: 7,
    name: "minyak",
    img: require("../../assets/minyak.png"),
  },
  {
    id: 8,
    name: "P3K",
    img: require("../../assets/p3k.png"),
  },
  {
    id: 9,
    name: "mulut & tenggorokan",
    img: require("../../assets/mulut_tenggorokan.png"),
  },
];

export default function Categories() {
  return (
    <View style={styles.contain}>
      <FlatList
        numColumns={3}
        data={CATEGORIES}
        keyExtractor={(item) => "_" + item.id}
        renderItem={({ item }) => (
          <Category id={item.id} img={item.img} name={item.name} />
        )}
        contentContainerstyle={styles.container}
      />
    </View>
  );
}

const Category = ({ id, name, img }) => {
  return (
    <TouchableOpacity activeOpacity={0.6} style={styles.item}>
      <Image style={styles.image} source={img} />
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.5,
    borderColor: COLORS.gray,
    borderRadius: 10,
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "black",
  },
  item: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    // borderWidth: 1,
  },
  image: {
    marginBottom: 5,
  },
  text: {
    fontSize: 11,
    color: COLORS.dark,
    textAlign: "center",
  },
  contain: {
    borderWidth: 0.5,
    borderColor: COLORS.lightGray,
    borderRadius: 10,
    paddingVertical: 8,
    backgroundColor: "white",
  },
});
