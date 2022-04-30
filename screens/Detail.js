import { ScrollView, StyleSheet, Image, Text, View } from "react-native";
import { Button } from "@rneui/themed";
import React from "react";
import LargeProductImage from "../components/Detail/LargeProductImage";
import DetailHeader from "../components/Detail/DetailHeader";
import Separator from "../components/Separator";
import DetailSection from "../components/Detail/DetailSection";
import Wrapper from "../components/Wrapper";
import DetailSectionList from "../components/Detail/DetailSectionList";

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

export default function Detail() {
  return (
    <>
      <ScrollView style={{ backgroundColor: "white" }}>
        <LargeProductImage src={require("../assets/product-large.png")} />
        <Wrapper>
          <DetailHeader />
          <Separator size={10} />
          <DetailSection title={detail[0].title} section={detail[0].section} />
          <Separator size={10} />
          <DetailSectionList title={detail[1].title} list={detail[1].list} />
          <Separator size={40} />
        </Wrapper>
      </ScrollView>
      <View style={styles.btnContainer}>
        <Button
          onPress={() => console.log("nice")}
          title={"Tambah ke Keranjang"}
          style={styles.btn}
        />
      </View>
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
});
