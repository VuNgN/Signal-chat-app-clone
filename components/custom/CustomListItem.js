import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ListItem, Avatar } from "react-native-elements";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { auth, db } from "../../firebase";

const CustomListItem = ({ id, chatName, enterChat }) => {
  const [chatMessages, setChatMessages] = useState([]);
  useEffect(() => {
    const chatCollection = doc(db, "chats", id);
    const unsubscribe = onSnapshot(
      query(
        collection(chatCollection, "messages"),
        orderBy("timestamp", "desc")
      ),
      (docSnap) => {
        setChatMessages(docSnap.docs.map((doc) => doc.data()));
      }
    );
    return unsubscribe;
  }, []);
  return (
    <ListItem key={id} bottomDivider onPress={() => enterChat(id, chatName)}>
      <Avatar
        rounded
        source={{
          uri: chatMessages[0]
            ? chatMessages?.[0]?.photoURL
            : auth.currentUser.photoURL,
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={styles.listItemTitle}>{chatName}</ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {chatMessages[0]
            ? `${chatMessages?.[0]?.displayName} : ${chatMessages?.[0]?.message}`
            : "New chat room"}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({
  listItemTitle: {
    fontWeight: "800",
  },
});
