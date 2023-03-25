import React from "react";
import { TouchableOpacity, View, TextInput, StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { COLORS } from "../assets/design";
import { useState } from "react";

const SearchingBar = ({
  value, 
  setValue,
  onSubmit,
  bgColor = "white",
  flex = 0,
}) => {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    onSubmit(input);
  };
  return (
    <View style={{ ...styles.container, backgroundColor: bgColor, flex: flex }}>
      <TextInput
        onChangeText={(v) => setValue ? setValue(v) : setInput(v)}
        value={value || input}
        style={styles.input}
        placeholder="cari barang..."
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
    elevation: 1,
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
