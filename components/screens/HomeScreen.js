import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { auth } from "../../firebase";
import { Button } from "react-native-elements";
import { signOut } from "firebase/auth";

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>{auth.currentUser.displayName}</Text>
      <Button
        title="log out"
        onPress={() => {
          signOut(auth);
        }}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
