import ModalChat from "./ButtonChat";
import API_URL from "@/config/config";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity, Text, StyleSheet, View, Image, FlatList, Alert } from "react-native";


const UserItem = ({ title, img, role }) => {
  const navigation = useNavigation();

  const profileImage = img
    ? { uri: img }
    : role === "guru"
    ? require("../../assets/images/avatar4.png")
    : require("../../assets/images/avatar2.png");

  return (
    <View style={styles.userItem}>
      <View style={styles.leftContent}>
        <Image source={profileImage} style={styles.profileImage} />
        <View>
          <Text style={styles.userName}>{title}</Text>
        </View>
      </View>
      {(role === "siswa" || role === "guru") && (
        <TouchableOpacity>
          <ModalChat navigation={navigation} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const SiswaNama = () => {
  const [teacher, setTeacher] = useState(null);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const classId = await AsyncStorage.getItem("classId");

      if (!token) throw new Error("Token tidak ditemukan. Silakan login kembali.");
      if (!classId) throw new Error("ID kelas tidak ditemukan. Silakan login kembali.");

      const response = await fetch(`${API_URL}/api/classes/${classId}/members`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const result = await response.json();

        // Menyimpan data guru
        if (result.teacher) {
          setTeacher({
            id: result.teacher._id,
            username: result.teacher.username,
            img: result.teacher.img || null
          });
        } else {
          console.error("Teacher data tidak ditemukan.");
        }

        // Menyimpan data siswa
        if (Array.isArray(result.student)) {
          setStudents(
            result.student.map((item) => ({
              id: item._id,
              username: item.username,
              img: item.img || null, // Gambar opsional
            }))
          );
        } else {
          console.error("Student data tidak berbentuk array.");
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

  const renderHeader = () => (
    <View>
      <Text style={styles.sectionTitle}>Guru</Text>
      <View style={styles.divider} />
      {teacher ? (
        <UserItem title={teacher.username} img={teacher.img} role="guru" />
      ) : (
        <Text>Data guru tidak tersedia</Text>
      )}
      <Text style={styles.sectionTitle}>Siswa</Text>
      <View style={styles.divider} />
    </View>
  );

  return (
    <FlatList
      data={students}
      renderItem={({ item }) => <UserItem title={item.username} img={item.img} role="siswa" />}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={renderHeader}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default SiswaNama;

// Gaya khusus untuk elemen UI
const styles = StyleSheet.create({
  contentContainer: {
    padding: 10,
    paddingBottom: 80,
  },
  sectionTitle: {
    fontSize: 23,
    fontWeight: "bold",
    marginTop: 10,
  },
  divider: {
    borderBottomWidth: 1,
    marginVertical: 10,
    borderColor: "#E0E0E0",
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: "500",
  },
});
