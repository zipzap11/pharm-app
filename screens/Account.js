import { Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import Separator from "../components/Separator";
import { Image } from "react-native";
import Login from "../components/Account/Login";
import Register from "../components/Account/Register";
import Profile from "../components/Account/Profile";
import { UserContext } from "../context/UserContext";

export default function Account() {
  const [isLoginPage, setIsLoginPage] = useState(false);
  const { isLogin } = useContext(UserContext);

  const toRegisterPage = () => setIsLoginPage(false);
  const toLoginPage = () => setIsLoginPage(true);
  const showLogin = !isLogin && isLoginPage;

  return (
    <View style={styles.container}>
      {isLogin && <Profile />}
      {!isLogin && (
        <>
          <Separator
            size={Platform.OS === "android" ? StatusBar.currentHeight + 40 : 0}
          />
          <View style={styles.imgContain}>
            <Image style={styles.img} source={require("../assets/icon.png")} />
          </View>
        </>
      )}
      {!isLogin ? (
        isLoginPage ? (
          <Login toRegister={toRegisterPage} />
        ) : (
          <Register toLogin={toLoginPage} />
        )
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  img: {
    // flex: 1,
    // aspectRatio: 1,
    width: 130,
    height: 130,
  },
  imgContain: {
    alignItems: "center",
    marginBottom: 10,
  },
});
