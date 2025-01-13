import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image } from "react-native";

const ChatScreen=()=> {
  const [message, setMessage] = useState(""); // Pesan yang sedang diketik
  const [messages, setMessages] = useState([
    { id: "1", text: "Hi Rizki, mengapa kamu tidak mengerjakan tugas?", sender: "guru" },
    { id: "2", text: "Hi pak, Rizki lagi sakit maaf", sender: "user" },
    { id: "3", text: "Oh, baiklah semoga cepat sembuh ya Rizki", sender: "guru" },
    { id: "4", text: "Baik, Terimakasih pak", sender: "user" },
  ]); // Pesan awal

  // Fungsi untuk mengirim pesan
  const handleSend = () => {
    if (message.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now().toString(), text: message, sender: "user" },
      ]);
      setMessage(""); // Reset input setelah mengirim pesan
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: "https://via.placeholder.com/50" }} // Gambar profil
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.profileName}>Wagi Artono</Text>
          <Text style={styles.profileRole}>Guru</Text>
        </View>
      </View>

      {/* Daftar Pesan */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageRow,
              item.sender === "user" ? styles.userRow : styles.guruRow,
            ]}
          >
            {item.sender === "guru" && (
              <Image
                source={{ uri: "https://via.placeholder.com/40" }} // Gambar profil untuk guru
                style={styles.chatProfileImage}
              />
            )}
            <View
              style={[
                styles.messageContainer,
                item.sender === "user" ? styles.userMessage : styles.guruMessage,
              ]}
            >
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.messageList}
      />

      {/* Input Pesan */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Masukkan pesan Anda"
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Image source={require('../../assets/images/kirim.png')}/>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 60,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 30,
    backgroundColor: "#B2EBF2",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    paddingVertical: 30,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  profileRole: {
    fontSize: 14,
    color: "#555",
  },
  messageList: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "flex-start", // Membuat gambar sejajar di atas
    marginVertical: 5,
  },
  guruRow: {
    alignSelf: "flex-start",
  },
  userRow: {
    alignSelf: "flex-end",
    flexDirection: "row-reverse",
  },
  chatProfileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    marginTop:1,
   // Memberikan jarak agar gambar lebih ke atas
  },
  messageContainer: {
    padding: 10,
    borderRadius: 10,
    maxWidth: "70%",
  },
  userMessage: {
    backgroundColor: "#C8E6C9",
  },
  guruMessage: {
    backgroundColor: "#C7FFD8",
  },
  messageText: {
    fontSize: 16,
    color: "#000",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    
    
  },
  input: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
    height: 40,
  },
  sendButton: {
    backgroundColor: "#161D6F",
    borderRadius: 30,
    padding: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default ChatScreen;