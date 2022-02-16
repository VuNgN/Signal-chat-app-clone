import { Keyboard, Platform, StyleSheet, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, Input, Text } from "react-native-elements";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const RegisterScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back to Login",
    });
  }, [navigation]);

  const register = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        updateProfile(authUser.user, {
          displayName: fullName,
          photoURL:
            imageUrl ||
            "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg",
        });
      })
      .catch((error) => alert(error.message));
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <StatusBar style="light" />
          <Text h3 style={{ marginBottom: 50 }}>
            Create a Signal account
          </Text>
          <View>
            <Input
              containerStyle={styles.inputContainer}
              placeholder="Full Name"
              autoFocus
              type="text"
              value={fullName}
              onChangeText={(text) => setFullName(text)}
            />
            <Input
              containerStyle={styles.inputContainer}
              placeholder="Email"
              type="email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <Input
              containerStyle={styles.inputContainer}
              placeholder="Password"
              type="password"
              secureTextEntry
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <Input
              containerStyle={styles.inputContainer}
              placeholder="Profile picture URL (optional)"
              type="text"
              value={imageUrl}
              onChangeText={(text) => setImageUrl(text)}
              onSubmitEditing={register}
            />
          </View>
          <Button
            containerStyle={styles.button}
            raised
            onPress={register}
            title="Register"
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  inputContainer: {
    width: 300 /*  */,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});
