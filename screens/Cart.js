import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import CartItem from "../components/Cart/CartItem";
import Wrapper from "../components/Wrapper";
import FooterPrice from "../components/Cart/FooterPrice";
import axios from "axios";
import { deviceStorage } from "../storage/deviceStorage";
import { API_BASE_URL } from "../config";
import { CartContext } from "../context/CartContext";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../assets/design";
import { showToast } from "./util";
import NotLogin from "../components/NotLogin";
import { UserContext } from "../context/UserContext";

export default function Cart() {
  const [cart, setCart] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [refetch, setRefetch] = useState(false);
  const navigation = useNavigation();

  const cartCtx = useContext(CartContext);
  const {isLogin} = useContext(UserContext);


  const triggerAction = () => setRefetch((prev) => !prev);
  const buyClickHandler = () => {
    if (cart.items.length === 0) {
      showToast("Keranjang kosong!");
      return;
    }
    navigation.navigate("Checkout");
  };

  useEffect(() => {
    const getCart = async () => {
      const token = await deviceStorage.getItem("refresh_token");
      axios
        .get(`${API_BASE_URL}/carts`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        })
        .then((res) => {
          setCart(res.data.data);
          cartCtx.setCart(res.data.data);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err);
        });
    };
    getCart();
  }, [refetch]);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Wrapper>
        {!isLogin && <NotLogin />}
        {!isLoading ? (
          isLogin && cart.items.length === 0 ? (
            <Text style={styles.emptyCart}>keranjang mu kosong...</Text>
          ) : (isLogin &&
            cart.items.map((item, i) => (
              <CartItem
                key={i}
                id={item.id}
                img={item.product.image_url}
                name={item.product.name}
                price={item.product.price}
                total={item.quantity}
                actionTrigger={triggerAction}
              />
            ))
          )
        ) : (
          isLogin &&
          <ActivityIndicator
            animating={true}
            size="large"
            color={COLORS.mainBlue}
            style={{
              marginTop: 7,
            }}
          />
        )}
      </Wrapper>
      <FooterPrice price={cart.total_price} onPress={buyClickHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  emptyCart: {
    alignSelf: "center",
  },
});
