import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import { COLORS } from "../../assets/design";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import { deviceStorage } from "../../storage/deviceStorage";
import { showToast } from "../../screens/util";

export default function CartItem({
  name,
  price,
  total,
  img,
  id,
  actionTrigger,
}) {
  const [error, setError] = useState("");

  const deleteItem = async () => {
    const token = await deviceStorage.getItem("refresh_token");
    axios
      .delete(`${API_BASE_URL}/carts?item=${id}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((res) => {
        showToast("berhasil menghapus barang");
        actionTrigger();
      })
      .catch((err) => {
        setError(err);
      });
  };

  const addItemToCart = async () => {
    const token = await deviceStorage.getItem("refresh_token");
    axios
      .put(
        `${API_BASE_URL}/carts?item=${id}`,
        {
          item_id: id,
          type: "ADD",
        },
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      )
      .then((res) => {
        showToast("berhasil menambah jumlah barang");
        actionTrigger();
      })
      .catch((err) => {
        setError(err);
      });
  };

  const subtractItemFromCart = async () => {
    const token = await deviceStorage.getItem("refresh_token");
    axios
      .put(
        `${API_BASE_URL}/carts?item=${id}`,
        {
          item_id: id,
          type: "SUBTRACT",
        },
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      )
      .then((res) => {
        showToast("berhasil mengurangi jumlah barang");
        actionTrigger();
      })
      .catch((err) => {
        setError(err);
        showToast("gagal mengurangi jumlah barang");
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image
          style={styles.img}
          source={{
            uri: img,
            height: 100,
            width: 100,
          }}
        />
      </View>
      <View style={styles.innerContainer}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{name}</Text>
        </View>
        <Text style={styles.price}>Rp {price}</Text>
        <View style={styles.actionContainer}>
          <View style={styles.leftAction}>
            <TouchableOpacity
              onPress={subtractItemFromCart}
              style={styles.minusContainer}
            >
              {/* <Text style={styles.minus}>-</Text> */}
              <FontAwesome5 name="minus" size={15} />
            </TouchableOpacity>
            <Text style={styles.total}>{total}</Text>
            <TouchableOpacity
              onPress={addItemToCart}
              style={styles.plusContainer}
            >
              {/* <Text style={styles.plus}>+</Text> */}
              <FontAwesome5 name="plus" size={15} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={deleteItem}>
            <MaterialIcons name="delete" size={20} color="gray" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    marginBottom: 10,
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: "lightgray",
  },
  imgContainer: {
    // alignSelf: "",
    height: "100%",
    marginRight: 7,
  },
  img: {
    // flex: 1,
    resizeMode: "contain",
  },
  innerContainer: {
    flex: 1,
  },
  name: {
    fontWeight: "700",
    fontSize: 14,
    flexWrap: "wrap",
    flex: 1,
  },
  nameContainer: {
    flexDirection: "row",
    marginBottom: 4,
  },
  price: {
    color: COLORS.mainBlue,
    fontWeight: "700",
    marginBottom: 10,
  },
  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftAction: {
    flexDirection: "row",
    alignItems: "center",
  },
  minusContainer: {
    marginRight: 12,
  },
  plusContainer: {
    marginLeft: 12,
  },
  minus: {
    fontSize: 30,
  },
  plus: {
    fontSize: 30,
  },
  total: {
    fontSize: 18,
    fontWeight: "700",
  },
});
