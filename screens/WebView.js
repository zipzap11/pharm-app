import { Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import React from "react";

export default function MyWebView({ route }) {
  const param = route.params;
  return (
    // <View style={{ flex: 1, backgroundColor: "purple" }}>
    <WebView
    
      // style={styles.top}
      // containerStyle={styles.top}
      source={{
        uri: param.paymentUrl,
      }}
      // androidHardwareAccelerationDisabled={false}
      // scalesPageToFit={true}
      // allowsLinkPreview={true}
      //   style={{ height: "100%", width: "100%", backgroundColor: "pink" }}
      //   androidHardwareAccelerationDisabled={true}
    />
    // </View>
  );
}

const styles = StyleSheet.create({
  // top: {
  //   paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  // },
});
