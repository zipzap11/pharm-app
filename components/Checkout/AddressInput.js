import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { COLORS } from "../../assets/design";

export default function AddressInput({ value, setValue }) {
  return (
    <View>
      <Text style={styles.title}>Detail Alamat</Text>
      <Text>
        Masukkan detail alamat seperti kecamatan, nama/no jalan, kode pos, no
        rumah, dll{" "}
      </Text>
      <TextInput
        multiline={true}
        numberOfLines={4}
        style={styles.input}
        value={value}
        onChangeText={setValue}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: COLORS.gray,
    marginTop: 10,
    textAlignVertical: "top",
    padding: 8,
    paddingHorizontal: 5,
  },
});
