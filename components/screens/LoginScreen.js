import React, { useEffect, useRef, useState } from "react";
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
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const LoginScreen = ({ navigation }) => {
  const isMounted = useRef(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = () => {
    if (isMounted.current)
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {})
        .catch(() => {
          Alert.alert(
            "Đăng nhập thất bại",
            "Tài khoản hoặc mật khẩu không chính xác",
            [
              {
                text: "OK",
                onPress: () => console.log("ok pressed"),
              },
            ]
          );
          setIsLoading(false);
        });
  };
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);
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
              onSubmitEditing={login}
            />
            <Button
              containerStyle={styles.button}
              title="Login"
              onPress={login}
            />
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
