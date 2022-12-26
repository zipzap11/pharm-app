import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import CustomModal from "./Modal";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Separator from "../Separator";
import { COLORS } from "../../assets/design";
import { parseNumToMoney } from "../../screens/util";


export default function ShippingModal({
  isVisible,
  setIsVisible,
  data,
  pickHandler,
  isLoading,
}) {
  return (
    <CustomModal isVisible={isVisible} onClose={() => setIsVisible(false)}>
      <Header onClose={() => setIsVisible(false)} />
      <Separator size={15} />
      {!isLoading ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={(item) => item.services}
          renderItem={({ item }) => (
            <Item onPress={() => pickHandler(item)} item={item} />
          )}
        />
      ) : (
        <ActivityIndicator
          animating={true}
          size="large"
          color={COLORS.mainBlue}
        />
      )}
    </CustomModal>
  );
}

const Item = ({ item, onPress }) => (
  <TouchableOpacity style={styles.itemCont} onPress={onPress}>
    <View>
      <Text style={styles.itemName}>
        {item.services} ({item.description})
      </Text>
      <Text style={styles.estimation}>Estimasi tiba {item.etd} hari</Text>
    </View>
    <Text>Rp {parseNumToMoney(item.price)}</Text>
  </TouchableOpacity>
);

const Header = ({ onClose }) => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerTxt}>Pilih Pengiriman</Text>
    <TouchableOpacity style={styles.iconCont} onPress={onClose}>
      <MaterialIcons name="close" size={25} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTxt: {
    fontWeight: "bold",
    fontSize: 16,
  },
  itemName: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  itemCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 17,
    borderBottomWidth: 0.7,
    borderBottomColor: COLORS.gray,
    paddingBottom: 9,
  },
  estimation: {
    color: COLORS.gray,
  },
  iconCont: {
    // borderWidth: 1,
    padding: 5,
  },
});
