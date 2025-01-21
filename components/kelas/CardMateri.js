import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Linking,
  Alert
} from "react-native";

const MateriCard = ({ matpel, author, title, subtitle, description, fileName }) => {
  const [isOpened, setIsOpened] = useState(false); // State untuk menentukan apakah tombol "Buka" telah diklik

  // Fungsi untuk membuka link
  const handleOpenLink = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
        setIsOpened(true); // Mengubah state menjadi "sudah" setelah link dibuka
      } else {
        Alert.alert("Link tidak valid", "Tidak dapat membuka link yang diberikan.");
      }
    } catch (error) {
      Alert.alert("Terjadi kesalahan", "Gagal membuka link.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        {/* Bagian Atas */}
        <View style={styles.header}>
          <Image
            source={require("../../assets/images/Buku1.png")}
            style={styles.icon}
          />

          <View style={styles.textColumnLeft}>
            <Text style={styles.title}>{matpel}</Text>
            <Text style={styles.author}>{author}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>

          {/* Kata "sudah" atau "belum" */}
          <View style={[styles.textColumnRight, { backgroundColor: isOpened ? "#B4FF9D" : "#FF0000" }]}>
            <Text style={styles.sudaText}>{isOpened ? "sudah" : "Belum"}</Text>
          </View>
        </View>

        {/* Bagian Bawah */}
        <View style={styles.body}>
          <Text style={styles.description}>{description}</Text>

          <View style={styles.fileSection}>
            <TouchableOpacity
              style={styles.fileInfo}
              onPress={() => handleOpenLink(fileName)}
            >
              <Image
                source={require("../../assets/images/pdf.png")}
                style={styles.fileIcon}
              />
              <Text style={styles.fileName}>Buka</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleOpenLink(fileName)}
            >
              <Text style={styles.buttonText}>Buka</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const App = () => {
  const dummyData = [
    {
      id: "1",
      matpel: "Matematika",
      author: "Wagi Artono",
      title: "Materi 1",
      subtitle: "Tugas 1 | Trigonometri",
      description: "Berikut materi pertemuan 1 Trigonometri",
      fileName: "http://example.com/trigonometry",
    },
    {
      id: "2",
      matpel: "Fisika",
      author: "Budi Santoso",
      title: "Materi 2",
      subtitle: "Tugas 2 | Gaya dan Gerak",
      description: "Berikut materi pertemuan 2 Gaya dan Gerak",
      fileName: "http://example.com/trigonometry",
    },
    {
      id: "3",
      matpel: "Kimia",
      author: "Sri Wulandari",
      title: "Materi 3",
      subtitle: "Tugas 3 | Stoikiometri",
      description: "Berikut materi pertemuan 3 Stoikiometri",
      fileName: "http://example.com/trigonometry",
    },
  ];

  return (
    <FlatList
      data={dummyData}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <MateriCard
          matpel={item.matpel}
          author={item.author}
          title={item.title}
          subtitle={item.subtitle}
          description={item.description}
          fileName={item.fileName}
        />
      )}
      contentContainerStyle={styles.listContainer}
    />
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
    fontSize: 16,
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
    fontWeight: "700",
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
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#161D6F",
    padding: 5,
    borderRadius: 5,
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
