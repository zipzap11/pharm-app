import { Image, StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Search from "../screens/Search";
import CartIcon from "../components/Cart";
import Detail from "../screens/Detail";
import Cart from "../screens/Cart";
import Checkout from "../screens/Checkout";
import Address from "../screens/Address";
import AddAddress from "../screens/AddAddress";

const Stack = createNativeStackNavigator();
export default function HomeStackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          //   headerShown: true,
          headerTitle: (props) => (
            <Image source={require("../assets/icon.png")} style={styles.logo} />
          ),
          headerRight: () => <CartIcon />,
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
          headerRight: () => <CartIcon />,
        }}
        name="Detail"
        component={Detail}
      />
      <Stack.Screen
        name="Cart"
        options={{
          title: "Keranjang",
        }}
        component={Cart}
      />
      <Stack.Screen
        name="Checkout"
        options={{
          title: "Pengiriman / Pembayaran",
        }}
        component={Checkout}
      />
      <Stack.Screen
        name="Address"
        options={{
          title: "Pilih Alamat",
        }}
        component={Address}
      />
      <Stack.Screen
        name="AddAddress"
        options={{
          title: "Tambah Alamat",
        }}
        component={AddAddress}
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
