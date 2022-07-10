import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import LabelInput from "../LabelInput";
import Separator from "../Separator";
import Button from "../Button";
import { COLORS } from "../../assets/design";
import { API_BASE_URL } from "../../config";
import axios from "axios";

export default function Register({ toLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [phone, setPhone] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const submitHandler = () => {
    if (password !== passwordConfirm) {
      alert("password harus sama");
      return;
    }
    setIsLoading(true);
    axios
      .post(`${API_BASE_URL}/users`, {
        name,
        email,
        password,
        // passwordConfirm,
      })
      .then((res) => {
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selamat Datang di Apotek Klinik Pharmacy</Text>
      <Text style={styles.lineHeight}>
        Silahkan mendaftar untuk melakukan pembelian produk kami :)
      </Text>
      <Separator size={15} />
      <LabelInput
        label={"Nama"}
        value={name}
        setValue={setName}
        placeholder={"nama anda"}
      />
      <Separator size={10} />
      <LabelInput
        label={"Email"}
        value={email}
        setValue={setEmail}
        placeholder={"xxx@mail.com"}
      />
      <Separator size={10} />
      <LabelInput
        label={"Password"}
        type={"password"}
        placeholder={"password yang kuat"}
        value={password}
        setValue={setPassword}
      />
      <Separator size={10} />
      <LabelInput
        label={"Confirm-Password"}
        placeholder={"masukkan ulang password"}
        type={"password"}
        value={passwordConfirm}
        setValue={setPasswordConfirm}
      />
      <Separator size={25} />
      {error.length != 0 && <Text style={styles.error}>{error}</Text>}
      {!isLoading ? (
        <Button onPress={submitHandler} title={"Daftar"} />
      ) : (
        <Button disabled title={"Loading"} />
      )}
      <View style={styles.bottomTxtCont}>
        <Text style={styles.bottomTxt}>sudah punya akun?</Text>
        <TouchableOpacity onPress={toLogin}>
          <Text style={styles.loginLink}>login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 10,
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
  lineHeight: {
    lineHeight: 20,
    color: COLORS.gray,
  },
  error: {
    color: "red",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 7,
  },
});
