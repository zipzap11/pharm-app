import {
  ScrollView,
  StyleSheet,
  Image,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { Button, Skeleton } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import LargeProductImage from "../components/Detail/LargeProductImage";
import DetailHeader from "../components/Detail/DetailHeader";
import Separator from "../components/Separator";
import DetailSection from "../components/Detail/DetailSection";
import Wrapper from "../components/Wrapper";
import DetailSectionList from "../components/Detail/DetailSectionList";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { COLORS } from "../assets/design";
import { LinearGradient } from "expo-linear-gradient";
import { deviceStorage } from "../storage/deviceStorage";
import { showToast } from "./util";

const detail = [
  {
    title: "Deskripsi",
    section: `QV Gentle Wash Pump 500 gr adalah pembersih tanpa sabun dari QV yang diformulasikan khusus untuk kulit kering atau sensitif. Pembersih ini diformulasikan tanpa tambahan pewangi dan pewarna, serta telah diuji oleh dermatologis sehingga aman digunakan sehari-hari. Selain membantu membersihkan tubuh dari kotoran dan debu, pembersih ini juga dapat membantu menghidrasi kulit sehingga kulit terasa bersih dan lembut. Pembersih ini sangat cocok digunakan pada konsisi kulit kering. Gunakan QV Gentle Wash Pump 500 gr untuk perawatan kulit kering sekaligus sensitif agar tetap lembap, halus, dan sehat. Komposisi:
        Aqua (Water), Glycerin, Sodium Lauroyl Sarcosinate, Disodium Cocoamphodiacetate, Lauryl Betaine, Sodium Cocoyl Isethionate, Acrylates/C10-30 Alkyl Acrylate Crosspolymer, Styrene/Acrylates Copolymer, Aminomethyl Propanol, Methylparaben, Propylparaben.`,
  },
  {
    title: "Indikasi",
    list: [
      "Membersihkan kulit dari debu dan kotoran tanpa membuat kulit kering",
      "Menjadikan kulit terasa halus dan lembut",
      "Membuat kulit lebih lembab dan terhidrasi",
    ],
  },
];

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
    const token = await deviceStorage.getItem("refresh_token");
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
              <DetailHeader name={data.name} price={data.price} />
              <Separator size={10} />
              <DetailSection title={"Deskripsi"} section={data.description} />
              <Separator size={10} />
              {/* <DetailSectionList
                title={detail[1].title}
                list={detail[1].list}
              /> */}
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
            // width={"90%"}
            height={300}
            animation="pulse"
            style={{
              alignSelf: "center",
            }}
            // LinearGradientComponent={() => (
            // <LinearGradient colors={[COLORS.lightGray, COLORS.gray]}  />
            // )}
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
    // position: "absolute",
    // bottom: "0",
    backgroundColor: "black",
  },
  btnContainer: {
    width: "100%",
    paddingHorizontal: 13,
    paddingVertical: 7,
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    // alignContent: "center",
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
