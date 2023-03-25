import { ScrollView, StyleSheet, Image, Text, View, ActivityIndicator } from "react-native";
import { Button, Skeleton } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import LargeProductImage from "../components/Detail/LargeProductImage";
import DetailHeader from "../components/Detail/DetailHeader";
import Separator from "../components/Separator";
import DetailSection from "../components/Detail/DetailSection";
import Wrapper from "../components/Wrapper";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { deviceStorage } from "../storage/deviceStorage";
import { showToast } from "./util";

export default function Detail({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingAdd, setIsLoadingAdd] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState({});
  const { id } = route.params;

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/products/${id}`)
      .then((res) => {
        setData(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  const addItemToCart = async () => {
    setIsLoadingAdd(true);
    console.log("mari")
    const token = await deviceStorage.getItem("refresh_token");
    console.log("token = ", token)
    if (token.length == 0) {
      console.log("sini")
      showToast("Silakan login untuk menambahkan produk...")
      setIsLoadingAdd(false);
      return;
    }
    axios
      .post(`${API_BASE_URL}/carts?product=${data.id}`, null, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((res) => {
        showToast("berhasil menambahkan barang ke keranjang");
        setIsLoadingAdd(false);
      })
      .catch((err) => {
        setError(err);
        showToast(`error: ${err}`);
        setIsLoadingAdd(false);
      });
  };

  return (
    <>
      {!isLoading ? (
        <>
          <ScrollView style={{ backgroundColor: "white" }}>
            <LargeProductImage src={data.image_url} />
            <Wrapper>
              <DetailHeader name={data.name} price={data.price} stock={data.stock} />
              <Separator size={10} />
              <DetailSection title={"Deskripsi"} section={data.description} />
              <Separator size={10} />
              <Separator size={40} />
            </Wrapper>
          </ScrollView>
          <View style={styles.btnContainer}>
            <Button
              disabled={isLoadingAdd}
              onPress={addItemToCart}
              title={
                isLoadingAdd ? (
                  <ActivityIndicator animating={true} color="white" />
                ) : (
                  "Tambah ke Keranjang"
                )
              }
              style={styles.btn}
            />
          </View>
        </>
      ) : (
        <>
          <Skeleton
            height={300}
            animation="pulse"
            style={{
              alignSelf: "center",
            }}
          />
          <Separator size={20} />
          <Skeleton animation="pulse" style={styles.titleSK} />
          <Separator size={10} />
          <Skeleton animation="pulse" style={styles.priceSK} />
          <Separator size={10} />
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(() => (
            <Skeleton animation="pulse" style={styles.descSK} />
          ))}
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "black",
  },
  btnContainer: {
    width: "100%",
    paddingHorizontal: 13,
    paddingVertical: 7,
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
  },
  center: {
    alignSelf: "center",
  },
  titleSK: {
    marginHorizontal: 15,
    width: "70%",
    height: 35,
  },
  priceSK: {
    marginHorizontal: 15,
    height: 30,
    width: "40%",
  },
  descSK: {
    marginHorizontal: 15,
    marginBottom: 7,
    width: "90%",
  },
});
