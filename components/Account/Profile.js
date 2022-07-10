import { ActivityIndicator, Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Avatar, Button } from "@rneui/themed";
import { COLORS } from "../../assets/design";
import Separator from "../Separator";
import DataSection from "./DataSection";
import { deviceStorage } from "../../storage/deviceStorage";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import { showToast } from "../../screens/util";

export default function Profile() {
  const userCtx = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true)
  const [profile, setProfile] = useState({})
  const logoutHandler = async () => {
    await deviceStorage.deleteItem("refresh_token");
    await deviceStorage.deleteItem("access_token");
    userCtx.setIslogin(false);
    userCtx.user = {};
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const accessToken = await deviceStorage.getItem("access_token")
      const refreshToken = await deviceStorage.getItem("refresh_token")
      const headers = {Authorization: `bearer ${refreshToken}`} 
      const url = `${API_BASE_URL}/auth/current-user`
      try {
        const resp = await axios.get(url, {headers})
        console.log("resp.data", resp.data)
        setProfile(resp.data.data)
        setIsLoading(false)
      } catch (err) {
        console.log(err)
        showToast("gagal mengambil data profil")
        setIsLoading(false)
      }
    }
    fetchProfile()
  }, [])
  return (
    <View style={styles.container}>
      {isLoading ? <ActivityIndicator animating={true} size="large" color={COLORS.mainBlue} /> : <>
      <Avatar
        size={"xlarge"}
        rounded
        icon={{
          name: "user",
          type: "feather",
          color: COLORS.gray,
          size: 100,
        }}
        containerStyle={{
          borderWidth: 2,
          borderColor: COLORS.lightGray,
          alignSelf: "center",
        }}
      />
      <View style={styles.wrapper}>
        <DataSection label={"Nama"} value={profile.name} />
        <Separator size={20} />
        <DataSection label={"Email"} value={profile.email} />
        <Separator size={20} />
        <DataSection label={"No Handphone"} value={profile.phone} />
        <Separator size={40} />
        <Button
          title={"Ubah Profil"}
          icon={{
            name: "profile",
            type: "ant-design",
            color: "white",
          }}
          buttonStyle={{
            backgroundColor: COLORS.mainBlue,
            paddingVertical: 10,
          }}
        />
        <Separator size={20} />
        <Button
          onPress={logoutHandler}
          title={"Keluar"}
          icon={{
            name: "logout",
            type: "material-icons",
            color: "white",
          }}
          buttonStyle={{
            backgroundColor: "coral",
            paddingVertical: 10,
          }}
        />
      </View>
      </>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 30 : 0,
  },
  wrapper: {
    padding: 15,
    paddingHorizontal: 30,
  },
});
