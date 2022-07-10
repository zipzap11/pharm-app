import { createNativeStackNavigator } from "@react-navigation/native-stack";
import History from "../screens/History";
import WebView from "../screens/WebView";

const Stack = createNativeStackNavigator();
export default function TransactionStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="index">
      <Stack.Screen
        name="index"
        component={History}
        options={{
          title: "Riwayat Transaksi",
        }}
      />
      <Stack.Screen name="Payment" component={WebView} />
    </Stack.Navigator>
  );
}
