import { Image, StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Search from "../screens/Search";
import Cart from "../components/Cart";
import Detail from "../screens/Detail";

const Stack = createNativeStackNavigator();
export default function HomeStackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          //   headerShown: true,
          headerTitle: (props) => (
            <Image
              source={require("../../assets/icon.png")}
              style={styles.logo}
            />
          ),
          headerRight: () => <Cart />,
        }}
        name="a"
        component={Home}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          tabBarStyle: {
            display: "none",
          },
        }}
        name="Search"
        component={Search}
      />
      <Stack.Screen
        options={{
          title: "Detail Produk",
          headerRight: () => <Cart />,
        }}
        name="Detail"
        component={Detail}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 45,
    height: 45,
    resizeMode: "contain",
  },
});
