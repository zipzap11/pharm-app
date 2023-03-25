import { FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Dialog } from "@rneui/themed";
import { COLORS } from "../assets/design";

export default function Picker({ data, onPick, label, Icon }) {
  const [isVisible, setIsVisible] = useState(false);
  const pickHandler = (item) => {
    setIsVisible(false);
    onPick(item);
  };
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.btn}
        onPress={() => setIsVisible(true)}
      >
        <Text style={styles.txtBtn}>{label}</Text>

        {Icon}
      </TouchableOpacity>
      <Dialog
        style={{ padding: 0 }}
        overlayStyle={{ padding: 0, maxHeight: "80%" }}
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible((prev) => setIsVisible(!prev))}
      >
        <FlatList
          data={data}
          keyExtractor={() => Math.random().toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.txtCont}
              onPress={() => pickHandler(item)}
              key={index}
            >
              <Text style={styles.txt}>{item.label}</Text>
            </TouchableOpacity>
          )}
        />
      </Dialog>
    </>
  );
}

const styles = StyleSheet.create({
  txt: {
    fontSize: 16,
  },
  txtCont: {
    padding: 10,
    borderBottomColor: COLORS.gray,
    borderBottomWidth: 1,
    alignItems: "center",
  },
  btn: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    paddingHorizontal: 10,
    paddingVertical: 13,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  txtBtn: {
    fontSize: 16,
    color: COLORS.gray,
  },
});
