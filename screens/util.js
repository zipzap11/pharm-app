import { ToastAndroid } from "react-native";

export const showToast = (message) => {
  ToastAndroid.showWithGravityAndOffset(
    message,
    ToastAndroid.SHORT,
    ToastAndroid.TOP,
    0,
    100
  );
};

export const parseNumToMoney = (num) => {
  if (!num && num !== 0) return "";
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
