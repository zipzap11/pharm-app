import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { COLORS } from "../../assets/design";

export default function SearchBar() {
  return (
    <View style={styles.cont}>
      <TextInput placeholder="cari berdasarkan nama" style={styles.input} />
      <TouchableOpacity>
        <MaterialIcons size={30} name="search" color={COLORS.dark} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cont: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: COLORS.gray,
    height: "80%",
    borderRadius: 4,
    flex: 1,
    marginRight: 3,
    justifyContent: "space-between",
    paddingLeft: 7,
  },
  input: {
    flex: 1,
  },
});
