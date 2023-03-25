import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute, NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Octicons from "react-native-vector-icons/Octicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HomeStackNavigation from "./Navigation/HomeStackNavigation";
import Account from "./screens/Account";
import "react-native-get-random-values";
import { UserContextProvider } from "./context/UserContext";
import { CartContextProvider } from "./context/CartContext";
import TransactionStackNavigator from "./Navigation/TransactionStackNavigation";

const Tab = createBottomTabNavigator();

export default function App() {
  const getHomeTabBarStyle = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (
      routeName?.includes("Search") ||
      routeName?.includes("Detail") ||
      routeName?.includes("Cart") ||
      routeName?.includes("Checkout") ||
      routeName?.includes("Address")
    ) {
      return { display: "none" };
    }
    return null;
  };

  return (
    <UserContextProvider>
      <CartContextProvider>
        <NavigationContainer>
          <Tab.Navigator
            detachInactiveScreens={true}
            screenOptions={({ route }) => {
              return {
                tabBarIcon: ({ color }) => {
                  const { name } = route;
                  const props = { color: color, size: 20 };
                  if (name === "Home")
                    return <Ionicons name="home" {...props} />;
                  if (name === "History")
                    return <MaterialIcons name="history" {...props} />;
                  if (name === "Account")
                    return <MaterialIcons name="account-box" {...props} />;
                },
                tabBarHideOnKeyboard: true,
              };
            }}
          >
            <Tab.Screen
              name="Home"
              component={HomeStackNavigation}
              options={({ route }) => {
                return {
                  headerShown: false,
                  tabBarStyle: getHomeTabBarStyle(route),
                };
              }}
            />
            <Tab.Screen
              name="Transactions"
              options={{
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => (
                  <Octicons name="list-unordered" size={size} color={color} />
                ),
              }}
              component={TransactionStackNavigator}
            />
            <Tab.Screen
              name="Akun"
              options={{
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => (
                  <MaterialCommunityIcons
                    name="account"
                    size={size}
                    color={color}
                  />
                ),
              }}
              component={Account}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </CartContextProvider>
    </UserContextProvider>
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
