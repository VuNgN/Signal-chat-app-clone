import { ActivityIndicator, Alert, StyleSheet, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, Input, Text } from "react-native-elements";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const RegisterScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errorPassLessThan6, setErrorPassLessThan6] = useState(false);
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);
  const [nameEmpty, setNameEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back to Login",
    });
  }, [navigation]);
  const errorHandler = (text) => {
    if (text.length < 6) {
      setErrorPassLessThan6(true);
    } else {
      setErrorPassLessThan6("");
    }
  };
  const valiEmailHandler = (val) => {
    let regEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regEmail.test(val)) {
      return true;
    } else {
      return false;
    }
  };

  const register = () => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        updateProfile(authUser.user, {
          displayName: fullName,
          photoURL:
            imageUrl ||
            "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg",
        });
      })
      .catch(() =>
        Alert.alert(
          "Có gì đó sai sai",
          "Email đã được đăng ký. Vui lòng thử lại",
          [
            {
              text: "Xem lại",
              onPress: () => {
                setIsLoading(false);
              },
            },
          ]
        )
      );
  };
  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
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
            errorStyle={{ color: "red" }}
            errorMessage={nameEmpty ? "What's your name?" : ""}
            value={fullName}
            onChangeText={(text) => setFullName(text)}
            onEndEditing={() =>
              !fullName ? setNameEmpty(true) : setNameEmpty(false)
            }
          />
          <Input
            containerStyle={styles.inputContainer}
            placeholder="Email"
            type="email"
            keyboardType="email-address"
            errorStyle={{ color: "red" }}
            errorMessage={isInvalidEmail ? "Invalid email" : ""}
            value={email}
            onChangeText={(text) => setEmail(text)}
            onEndEditing={() => {
              setIsInvalidEmail(valiEmailHandler(email));
            }}
          />
          <Input
            containerStyle={styles.inputContainer}
            placeholder="Password"
            type="password"
            secureTextEntry
            errorStyle={{ color: "red" }}
            errorMessage={
              errorPassLessThan6
                ? "Password must be more than 6 characters"
                : ""
            }
            onEndEditing={(e) => {
              errorHandler(e.nativeEvent.text);
            }}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <Input
            containerStyle={styles.inputContainer}
            placeholder="Profile picture URL (optional)"
            type="text"
            keyboardType="url"
            value={imageUrl}
            onChangeText={(text) => setImageUrl(text)}
            onSubmitEditing={register}
          />
        </View>
        <Button
          containerStyle={styles.button}
          raised
          disabled={
            errorPassLessThan6 ||
            isInvalidEmail ||
            !email ||
            !password ||
            !fullName
          }
          onPress={register}
          title={isLoading ? <ActivityIndicator color="white" /> : "Register"}
        />
      </View>
    </KeyboardAwareScrollView>
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
