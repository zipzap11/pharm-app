import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React from "react";
import SearchingBar from "../SearchingBar";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { COLORS } from "../../assets/design";

export default function Header({ onSubmit, onBack, value, setValue }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBack}>
        <MaterialIcons style={styles.backIcon} name="arrow-back" size={25} />
      </TouchableOpacity>
      <SearchingBar
        setValue={setValue}
        value={value}
        onSubmit={onSubmit}
        bgColor={COLORS.lightGray}
        flex={1}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 5 : 0,
    paddingBottom: 7,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  backIcon: {
    marginRight: 8,
  },
});
