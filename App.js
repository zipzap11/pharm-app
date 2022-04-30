import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import {
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { COLORS } from "./assets/design";
import Back from "./components/Back";
import Cart from "./components/Cart";
import HomeStackNavigation from "./components/Navigation/HomeStackNavigation";
import Account from "./screens/Account";
import Detail from "./screens/Detail";
import History from "./screens/History";
import Home from "./screens/Home";
import Search from "./screens/Search";

const Tab = createBottomTabNavigator();
export default function App() {
  const [showHomeTabBar, setShowHomeTabBar] = useState(true);
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => {
          return {
            tabBarIcon: ({ color }) => {
              const { name } = route;
              const props = { color: color, size: 20 };
              if (name === "Home") return <Ionicons name="home" {...props} />;
              if (name === "History")
                return <MaterialIcons name="history" {...props} />;
              if (name === "Account")
                return <MaterialIcons name="account-box" {...props} />;
            },
          };
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeStackNavigation}
          options={{
            headerShown: false,
            tabBarStyle: showHomeTabBar ? {} : { display: "none" },
          }}
        />
        <Tab.Screen name="History" component={History} />
        {/* <Tab.Screen
          options={({ navigation }) => {
            return {
              ...noTabBar,
              headerShown: false,
              tabBarStyle: {
                display: "none",
              },
            };
          }}
          name="Search"
          component={Search}
        /> */}
        <Tab.Screen name="Account" component={Account} />
        {/* <Tab.Screen
          name="Detail"
          component={Detail}
          options={({ navigation }) => {
            return {
              ...noTabBar,
              ...noBottomTabBar,
              headerLeft: () => <Back onBack={() => navigation.goBack()} />,
              headerTitle: "Detail Produk",
              headerRight: () => <Cart />,
            };
          }}
        /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const noTabBar = {
  tabBarItemStyle: {
    display: "none",
  },
};

const noBottomTabBar = {
  tabBarStyle: {
    display: "none",
  },
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    alignItems: "center",
  },

  backBtn: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
});
