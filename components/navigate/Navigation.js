import React, { useEffect, useState } from "react";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import { auth } from "../../firebase";
import AddChatScreen from "../screens/AddChatScreen";
import ChatScreen from "../screens/ChatScreen";
import { StatusBar } from "expo-status-bar";
import { Image } from "react-native-elements";
import { View } from "react-native";

const Stack = createStackNavigator();
export default function Navigation() {
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const globalScreenOptions = {
    headerStyle: { backgroundColor: "#2C6BED" },
    headerTitleStyle: { color: "#fff" },
    headerTintColor: "#fff",
  };
  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setIsLogged(true);
        setIsLoading(false);
      } else {
        setIsLogged(false);
        setIsLoading(false);
      }
    });
    return unsubscribe;
  }, []);
  return isLoading ? (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <StatusBar style="light" />
      <Image
        source={require("../../assets/signal-logo.png")}
        style={{ width: 200, height: 200 }}
      />
    </View>
  ) : (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalScreenOptions}>
        {isLogged ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="AddChatScreen" component={AddChatScreen} />
            <Stack.Screen name="ChatScreen" component={ChatScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
