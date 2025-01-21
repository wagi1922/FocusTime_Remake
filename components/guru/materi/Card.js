import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Linking, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Card = ({ title, description, lampiran, onEditPress, onDeletePress }) => {
  // Fungsi untuk membuka link
  const handleOpenLink = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Link tidak valid", "Tidak dapat membuka link yang diberikan.");
      }
    } catch (error) {
      Alert.alert("Terjadi kesalahan", "Gagal membuka link.");
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity onPress={onEditPress} style={styles.iconButton}>
            <Ionicons name="create-outline" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDeletePress} style={styles.iconButton}>
            <Ionicons name="trash-outline" size={20} color="red" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ borderBottomWidth: 1, marginBottom: 2 }} />
      <Text style={styles.description}>{description}</Text>
      {lampiran && (
        <TouchableOpacity
          style={styles.lampiranButton}
          onPress={() => handleOpenLink(lampiran)}
        >
          <Text style={styles.lampiranButtonText}>Buka Lampiran</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ECECEC",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    width: "90%",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  description: {
    fontSize: 14,
    color: "#555",
  },
  lampiranButton: {
    marginTop: 10,
    backgroundColor: "#161D6F",
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
  },
  lampiranButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginLeft: 10,
  },
});

export default Card;
