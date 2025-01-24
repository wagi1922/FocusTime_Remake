import API_URL from "@/config/config";
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Linking,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Komponen MateriCard hanya menerima props
const MateriCard = ({ title, description, fileName, isOpened, onOpenLink }) => {
  return (
    <View style={styles.card}>
      {/* Bagian Atas */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/Buku1.png")}
          style={styles.icon}
        />

        <View style={styles.textColumnLeft}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>

        {/* Kata "sudah" atau "belum" */}
        <View
          style={[
            styles.textColumnRight,
            { backgroundColor: isOpened ? "#B4FF9D" : "#FF0000" },
          ]}
        >
          <Text style={styles.sudaText}>{isOpened ? "sudah" : "Belum"}</Text>
        </View>
      </View>

      {/* Bagian Bawah */}
      <View style={styles.body}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onOpenLink(fileName)}
        >
          <Text style={styles.buttonText}>Buka</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const App = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetchClasses();
  }, []);

  // Fungsi untuk mengambil data kelas
  const fetchClasses = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const classId = await AsyncStorage.getItem("classId");
      if (!token) throw new Error("Token tidak ditemukan. Silakan login kembali.");
      if (!classId)
        throw new Error("ID kelas tidak ditemukan. Silakan login kembali.");

      const response = await fetch(`${API_URL}/api/materials/${classId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const result = await response.json();
        const { data } = result;

        if (Array.isArray(data)) {
          setCards(
            data.map((item) => ({
              id: item._id,
              title: item.title,
              description: item.description,
              fileName: item.documentLink,
              isOpened: false, // Tambahkan status apakah sudah dibuka
            }))
          );
        } else {
          console.error("Data dari API tidak berbentuk array:", result);
          setCards([]);
        }
      } else {
        const errorText = await response.text();
        console.error("Error dari API:", errorText);
        Alert.alert("Error", "Gagal mengambil data kelas");
      }
    } catch (error) {
      console.error("Kesalahan saat mengambil data kelas:", error);
      Alert.alert("Error", error.message || "Terjadi kesalahan saat mengambil data kelas");
    }
  };

  const handleOpenLink = async (url, id) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.id === id ? { ...card, isOpened: true } : card
          )
        );
      } else {
        Alert.alert("Link tidak valid", "Tidak dapat membuka link yang diberikan.");
      }
    } catch (error) {
      Alert.alert("Terjadi kesalahan", "Gagal membuka link.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={cards}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MateriCard
            title={item.title}
            description={item.description}
            fileName={item.fileName}
            isOpened={item.isOpened}
            onOpenLink={(url) => handleOpenLink(url, item.id)}
          />
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    bottom: 5,
  },
  card: {
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 8,
    elevation: 10,
    marginBottom: 15,
    
  },
  header: {
    backgroundColor: "#98DED9",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  icon: {
    width: 67,
    height: 67,
  },
  textColumnLeft: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000000",
  },
  author: {
    fontSize: 12,
    fontWeight: "400",
    color: "#000000",
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#000000",
  },
  sudaText: {
    fontSize: 14,
    fontWeight: "700",
  },
  body: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  description: {
    fontSize: 14,
    fontWeight: "400",
    color: "#000000",
  },
  fileSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  fileInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  fileIcon: {
    width: 17,
    height: 17,
    marginRight: 5,
  },
  fileName: {
    fontSize: 14,
    color: "#000000",
  },
  button: {
    width: 320,
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: "#161D6F",
    padding: 5,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 14,
    color: "#FFFFFF",
    margin: 2,
  },
  textColumnRight: {
    width: 55,
    height: 23,
    alignItems: "center",
    padding: 2,
    borderRadius: 5,
    marginBottom:30
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});

export default App;
