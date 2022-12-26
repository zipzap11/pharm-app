import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useState } from "react";
import LabelInput from "../LabelInput";
import Separator from "../Separator";
import Button from "../Button";
import { COLORS } from "../../assets/design";
import { API_BASE_URL } from "../../config";
import axios from "axios";
import { deviceStorage } from "../../storage/deviceStorage";
import { UserContext } from "../../context/UserContext";

export default function Login({ toRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const userCtx = useContext(UserContext);

  const submitHandler = () => {
    setIsLoading(true);
    axios
      .post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      })
      .then((res) => {
        setIsLoading(false);
        deviceStorage.saveItem("access_token", res.data.data.access_token);
        deviceStorage.saveItem("refresh_token", res.data.data.refresh_token);
        userCtx.setIslogin(true);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selamat Datang kembali</Text>
      <Text>Masukkan email dan password untuk login</Text>
      <Separator size={20} />
      <LabelInput
        value={email}
        setValue={setEmail}
        label={"Email"}
        placeholder={"xxx@mail.com"}
      />
      <Separator size={10} />
      <LabelInput
        value={password}
        setValue={setPassword}
        label={"Password"}
        type={"password"}
        placeholder={"password yang kuat"}
      />
      <Separator size={25} />
      {error.length != 0 && <Text style={styles.error}>{error}</Text>}
      {!isLoading ? (
        <Button onPress={submitHandler} title={"Login"} />
      ) : (
        <Button disabled={true} title={"loading"} />
      )}
      <View style={styles.bottomTxtCont}>
        <Text style={styles.bottomTxt}>belum punya akun?</Text>
        <TouchableOpacity onPress={toRegister}>
          <Text style={styles.loginLink}>daftar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontWeight: "700",
    fontSize: 20,
    marginBottom: 4,
  },
  bottomTxtCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  loginLink: {
    color: COLORS.mainBlue,
    marginLeft: 6,
  },
  bottomTxt: {
    color: COLORS.gray,
  },
  error: {
    color: "red",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 7,
  },
});
