import { Badge } from "@rneui/themed";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { COLORS } from "../assets/design";

export default function Cart() {
  return (
    <TouchableOpacity>
      <Badge
        value={3}
        status="error"
        containerStyle={{
          width: 15,
          height: 15,
          position: "absolute",
          top: -4,
          right: 2,
          zIndex: 2,
        }}
        textStyle={{
          fontSize: 9,
        }}
      />
      <MaterialIcons style={styles.cartIcon} name="shopping-cart" size={25} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cartIcon: {
    marginRight: 10,
    color: COLORS.dark,
  },
});
