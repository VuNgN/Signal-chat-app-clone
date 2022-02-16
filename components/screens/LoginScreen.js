import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Alert, ActivityIndicator } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StatusBar } from "expo-status-bar";
import { Button, Input, Image } from "react-native-elements";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const LoginScreen = ({ navigation }) => {
  const isMounted = useRef(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const login = () => {
    isMounted.current = true;
    if (isMounted.current) {
      setIsLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {})
        .catch(() => {
          Alert.alert(
            "Đăng nhập thất bại",
            "Tài khoản hoặc mật khẩu không chính xác",
            [
              {
                text: "OK",
                onPress: () => setIsLoading(false),
              },
            ]
          );
        });
    }
  };
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);
  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={styles.container}>
        <StatusBar style="light" />
        <Image
          source={require("../../assets/signal-logo.png")}
          style={{ width: 200, height: 200 }}
        />
        <View style={styles.inputContainer}>
          <Input
            placeholder="Email"
            type="Email"
            keyboardType="email-address"
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
            title={isLoading ? <ActivityIndicator color="white" /> : "Login"}
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
    </KeyboardAwareScrollView>
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
