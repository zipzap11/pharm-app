import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Button } from "@rneui/themed";

export default function ButtonIcon({ title }) {
  return (
    // <TouchableOpacity>
    //   <>ButtonIcon</>
    // </TouchableOpacity>
    <Button
      title={title}
      icon={{
        name: "logout",
        type: "material-icons",
        color: "white",
      }}
      buttonStyle={{
        backgroundColor: "red",
      }}
    />
  );
}

const styles = StyleSheet.create({});
