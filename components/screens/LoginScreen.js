import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, Input, Image } from "react-native-elements";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <StatusBar style="light" />
          <Image
            source={{
              uri: "https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png",
            }}
            style={{ width: 200, height: 200 }}
          />
          <View style={styles.inputContainer}>
            <Input
              placeholder="Email"
              autoFocus
              type="Email"
              onChangeText={(text) => setEmail(text)}
            />
            <Input
              placeholder="Password"
              secureTextEntry
              type="Password"
              onChangeText={(text) => setPassword(text)}
            />
            <Button containerStyle={styles.button} title="Login" />
            <Button
              containerStyle={styles.button}
              title="Register"
              type="outline"
              onPress={() => navigation.navigate("Register")}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  inputContainer: {
    width: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});
