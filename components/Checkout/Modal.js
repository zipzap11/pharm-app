import { StyleSheet, Text, View, Modal, Pressable } from "react-native";
import React from "react";

export default function CustomModal({ isVisible, onClose, children }) {
  return (
    <Pressable onPress={onClose}>
      <Modal
        visible={isVisible}
        transparent={true}
        onRequestClose={() => onClose()}
        animationType="slide"
        style={styles.modal}
      >
        <View style={styles.modalView}>{children}</View>
      </Modal>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  modalView: {
    height: "80%",
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 15,
  },
});
