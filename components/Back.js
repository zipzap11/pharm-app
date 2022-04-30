import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { COLORS } from "../assets/design";

export default function Back({ onBack }) {
  return (
    <TouchableOpacity style={{ marginLeft: 8 }} onPress={onBack}>
      <MaterialIcons name="arrow-back" size={25} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
