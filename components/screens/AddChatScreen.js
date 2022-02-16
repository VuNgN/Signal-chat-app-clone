import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";

const AddChatScreen = ({ navigation }) => {
  const [chatName, setChatName] = useState("");
  const createNewChat = async () => {
    await addDoc(collection(db, "chats"), {
      chatName: chatName,
    })
      .then(() => {
        navigation.goBack();
      })
      .catch((err) => alert(err));
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new Chat",
      headerBackTitle: "Chats",
    });
  }, [navigation]);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Input
            placeholder="Enter a chat name"
            value={chatName}
            onChangeText={(text) => setChatName(text)}
            leftIcon={
              <Icon
                name="wechat"
                type="antdesign"
                size={24}
                color="black"
                style={{ marginRight: 10 }}
              />
            }
            onSubmitEditing={createNewChat}
          />
          <Button onPress={createNewChat} title="Create new chat" />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default AddChatScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 30,
    height: "100%",
  },
});
