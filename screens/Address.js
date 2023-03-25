import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import Item from "../components/Address/Item";
import Wrapper from "../components/Wrapper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { COLORS } from "../assets/design";
import SearchBar from "../components/Address/SearchBar";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { showToast } from "./util";
import { deviceStorage } from "../storage/deviceStorage";

export default function Address() {
  const [addresses, setAddresses] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const focused = useIsFocused()
  
  const addAddressHandler = () => {
    navigation.navigate("AddAddress");
  };

  const pickAddressHandler = (id, name) => {
    navigation.navigate("Checkout", { id, name });
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const token = await deviceStorage.getItem("refresh_token");
      axios
        .get(`${API_BASE_URL}/addresses`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        })
        .then((res) => {
          setAddresses(res.data.data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
          showToast("Gagal mengambil data alamat, coba lagi!");
        });
    };
    fetchData();
  }, [focused]);

  return (
    <View style={styles.whiteBG}>
      <Wrapper>
        {loading ? (
          <ActivityIndicator
            animating={true}
            size="large"
            color={COLORS.mainBlue}
          />
        ) : (
          <>
            <View style={styles.flexWrapper}>
              <SearchBar />
              <AddAddressButton onClick={addAddressHandler} />
            </View>
            {addresses.length === 0 ? (
              <Text style={styles.empty}>Belum ada alamat...</Text>
            ) : (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={addresses}
                renderItem={({ item }) => (
                  <Item
                    onPress={() => pickAddressHandler(item.id, item.name)}
                    name={item.name}
                    postalCode={item.postal_code}
                    province={item.province.province}
                    state={item.state.city_name}
                    details={item.address_detail}
                  />
                )}
                keyExtractor={(item, index) => {
                  return index;
                }}
              />
            )}
          </>
        )}
      </Wrapper>
    </View>
  );
}

const AddAddressButton = ({ onClick }) => (
  <TouchableOpacity style={styles.btnCont} onPress={onClick}>
    <Text style={styles.btnTxt}>Alamat Baru</Text>
    <MaterialIcons
      name="playlist-add"
      size={24}
      color={"white"}
      style={styles.btnIcon}
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  whiteBG: {
    backgroundColor: "white",
    flex: 1,
  },
  btnCont: {
    flexDirection: "row",
    alignItems: "center",
    padding: 7,
    paddingHorizontal: 10,
    backgroundColor: COLORS.mainBlue,
    // width: "50%",
    borderRadius: 4,
    marginBottom: 10,
  },
  btnTxt: {
    color: "white",
    marginRight: 4,
  },
  flexWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  empty: {
    marginTop: 50,
    color: COLORS.gray,
    alignSelf: "center",
  },
});
