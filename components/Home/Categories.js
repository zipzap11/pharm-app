import { TouchableOpacity, FlatList, StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "../../assets/design";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { API_BASE_URL } from "../../config";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/categories`)
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  const categoryClickHandler = (categoryID) => {
    navigation.navigate("Search", { categoryID: categoryID });
  };

  return (
    <View style={styles.contain}>
      <FlatList
        numColumns={3}
        data={categories}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }) => (
          <Category
            onPress={() => categoryClickHandler(item.id)}
            img={item.image_url}
            name={item.name}
          />
        )}
        contentContainerstyle={styles.container}
      />
    </View>
  );
}

const Category = ({ name, img, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.6} style={styles.item}>
      <Image
        style={styles.image}
        source={{
          uri: img,
          width: 40,
          height: 40,
        }}
      />
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
