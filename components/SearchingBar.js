import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { COLORS } from "../assets/design";
import { useState } from "react";

const SearchingBar = ({
  setValue,
  value,
  onSubmit,
  bgColor = "white",
  flex = 0,
}) => {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    onSubmit();
  };
  return (
    <View style={{ ...styles.container, backgroundColor: bgColor, flex: flex }}>
      <TextInput
        onChangeText={(v) => {
          console.log(v);
          setInput(v);
        }}
        value={input}
        style={styles.input}
        placeholder="search..."
        onSubmitEditing={handleSubmit}
      />
      <TouchableOpacity onPress={handleSubmit}>
        <MaterialIcons size={30} name="search" color={COLORS.dark} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 7,
    paddingHorizontal: 10,
    color: COLORS.dark,
  },
});

export default SearchingBar;
