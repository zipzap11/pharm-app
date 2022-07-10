import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

export default function NotLogin() {
  const navigation = useNavigation();
  const toLoginHandler = () => {
    navigation.navigate("Akun");
  };
  return (
    <View style={styles.notLogin}>
      <Text style={styles.notLoginTxt}>
        Anda belum login, silakan login atau register terlebih dahulu..
      </Text>
      <Button onPress={toLoginHandler} title="Ke Halaman Login" />
    </View>
  );
}

const styles = StyleSheet.create({
  notLogin: {
    backgroundColor: "#fff",
    padding: 20,
    elevation: 3,
  },
  notLoginTxt: {
    fontSize: 16,
    marginBottom: 10,
  },
});
