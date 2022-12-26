import { StyleSheet, Text } from "react-native";
import React from "react";
import { Dialog } from "@rneui/themed";

export default function MyOverlay({ isVisible, onClose, isError, toPayment, isLoading }) {
  return (
    <Dialog isVisible={isVisible} onBackdropPress={onClose}>
      {isLoading && <Dialog.Loading />}
      {!isLoading &&
        (isError ? (
          <FailedOverlayContent onClose={onClose} />
        ) : (
          <SuccessOverlayContent onGotoPayment={toPayment} onClose={onClose} />
        ))}
    </Dialog>
  );
}

const FailedOverlayContent = ({ onClose }) => (
  <>
    <Dialog.Title title="Gagal Membuat Order, Coba lagi" />
    <Dialog.Actions>
      <Dialog.Button title={"tutup"} onPress={onClose} />
    </Dialog.Actions>
  </>
);

const SuccessOverlayContent = ({ onGotoPayment, onClose }) => (
  <>
    <Dialog.Title title="Order Berhasil Dibuat" />
    <Text>
      Anda bisa melakukan pembayaran pada laman transaksi. Ke-halaman transaksi
      ?
    </Text>
    <Dialog.Actions>
      <Dialog.Button title={"Ya"} onPress={onGotoPayment} />
      <Dialog.Button title={"Tidak"} onPress={onClose} />
    </Dialog.Actions>
  </>
);

const styles = StyleSheet.create({});
