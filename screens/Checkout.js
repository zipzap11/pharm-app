import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { COLORS } from "../assets/design";
import Separator from "../components/Separator";
import Picker from "../components/Picker";
import AddressInput from "../components/Checkout/AddressInput";
import PurchaseDetail from "../components/Checkout/PurchaseDetail";
import PaymentSummary from "../components/Checkout/PaymentSummary";
import FooterPrice from "../components/Cart/FooterPrice";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Modal from "../components/Checkout/Modal";
import ShippingModal from "../components/Checkout/ShippingModal";
import { StackActions, useNavigation } from "@react-navigation/native";
import { deviceStorage } from "../storage/deviceStorage";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { showToast } from "./util";
import { CartContext } from "../context/CartContext";
import MyOverlay from "../components/Checkout/Overlay";

export default function Checkout({ route }) {
  const [shippingPackages, setShippingPackages] = useState([]);
  const [shippingLabel, setShippingLabel] = useState("");
  const [shippingPackage, setShippingPackage] = useState();
  const [price, setPrice] = useState({});

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [shippingLoading, setShippingLoading] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [error, setError] = useState("");

  const navigation = useNavigation();
  const params = route.params;

  const cartCtx = useContext(CartContext);

  const openModalHandler = () => {
    setIsModalVisible(true);
  };
  const closeModalHandler = () => {
    setIsModalVisible(false);
  };

  const pickShippingPackageHandler = (pkg) => {
    setShippingPackage(pkg.services);
    setShippingLabel(`${pkg.services} (${pkg.description})`);
    closeModalHandler();
  };

  const createTransactionHandler = async () => {
    if (!params?.id) {
      showToast("Pilih alamat pengiriman");
      return;
    }
    if (!shippingPackage) {
      showToast("Pilih paket pengiriman");
      return;
    }
    setIsLoading(true);
    const token = await deviceStorage.getItem("refresh_token");
    const headers = {
      Authorization: `bearer ${token}`,
    };
    const body = {
      address_id: params.id,
      shipping_services: shippingPackage,
    };
    const url = `${API_BASE_URL}/transactions`;

    setShowOverlay(true);
    try {
      const resp = await axios.post(url, body, { headers });
      setIsLoading(false);
    } catch (err) {
      showToast("Gagal membuat transaksi, coba lagi");
      setError(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const cleanPackage = () => {
      setShippingPackage(null);
      setShippingLabel("");
      setPrice({});
    };
    const fetchShippingPackages = async () => {
      setShippingLoading(true);
      const token = await deviceStorage.getItem("refresh_token");
      const headers = {
        Authorization: `bearer ${token}`,
      };
      try {
        const resp = await axios.get(
          `${API_BASE_URL}/shippings?address=${params.id}`,
          { headers }
        );
        setShippingPackages(resp.data.data);
      } catch (err) {
        showToast("Gagal mengambil data paket pengiriman");
      }
      setShippingLoading(false);
    };
    cleanPackage();
    if (params) {
      fetchShippingPackages();
    }
  }, [params?.id]);

  useEffect(() => {
    const fetchTotalPrice = async () => {
      setIsLoading(true);
      const token = await deviceStorage.getItem("refresh_token");
      const headers = { Authorization: `bearer ${token}` };
      const url = `${API_BASE_URL}/prices?address=${params.id}&shipping=${shippingPackage}`;
      try {
        const resp = await axios.get(url, { headers });
        setPrice(resp.data.data);
        setIsLoading(false);
      } catch (err) {
        showToast("Gagal mengambil data harga: coba lagi!");
        setIsLoading(false);
      }
    };
    if (params && shippingPackage) {
      fetchTotalPrice();
    }
  }, [shippingPackage]);

  const toPaymentPage = () => {
    navigation.dispatch(StackActions.popToTop());
    navigation.navigate("Transactions");
  };

  return (
    <>
      <MyOverlay
        isVisible={showOverlay}
        onClose={() => setShowOverlay(false)}
        isError={error}
        toPayment={toPaymentPage}
        isLoading={isLoading}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Alamat Pengiriman</Text>
        <Separator size={10} />
        <SquareBtn
          text={params?.name || "Pilih Alamatmu"}
          icon={
            <MaterialIcons
              name="keyboard-arrow-right"
              size={20}
              color={COLORS.gray}
            />
          }
          onClick={() => navigation.navigate("Address")}
        />
        <Separator size={20} />
        <SquareBtn
          text={shippingLabel || "Pilih Paket Pengiriman"}
          icon={
            <MaterialIcons
              name="keyboard-arrow-up"
              size={20}
              color={COLORS.gray}
            />
          }
          onClick={openModalHandler}
        />
        <ShippingModal
          isLoading={shippingLoading}
          data={shippingPackages}
          isVisible={isModalVisible}
          setIsVisible={setIsModalVisible}
          pickHandler={pickShippingPackageHandler}
        />
        <Separator size={15} />
        <PurchaseDetail items={cartCtx.cart.items} />
        <Separator size={15} />
        <PaymentSummary
          price={price.price}
          isLoading={isLoading}
          shippingPrice={price.shipping_price}
        />
      </View>
      <FooterPrice
        price={price.total_price}
        isLoading={isLoading}
        onPress={createTransactionHandler}
      />
    </>
  );
}

const SquareBtn = ({ text, icon, onClick }) => (
  <TouchableOpacity style={styles.addressBtn} onPress={onClick}>
    <Text style={styles.addressBtnTxt}>{text}</Text>
    {icon}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
  },
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
    paddingHorizontal: 20,
  },
  addressBtn: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    paddingHorizontal: 10,
    paddingVertical: 13,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  addressBtnTxt: {
    color: COLORS.gray,
    fontSize: 16,
  },
  dropdownBtn: {
    width: "100%",
    backgroundColor: "#FFF",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.gray,
    elevation: 3,
    shadowColor: COLORS.gray,
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  dropdownBtnTxt: {
    textAlign: "left",
    color: COLORS.gray,
    fontSize: 16,
  },
  select: {
    backgroundColor: "black",
    fontSize: 20,
  },
});
