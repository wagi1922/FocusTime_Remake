import API_URL from "@/config/config";
import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Animated,
  Dimensions,
  StyleSheet,
  Alert,
} from "react-native";
import Card from "./Card";
import ModalForm from "./ModalForm";
import { Ionicons } from "@expo/vector-icons";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenHeight = Dimensions.get("window").height;

const CardMateriGuru = () => {
  const [editedMateri, setEditedMateri] = useState("");
  const [editedInstruksi, setEditedInstruksi] = useState("");
  const [editedLampiran, setEditedLampiran] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalY] = useState(new Animated.Value(screenHeight));
  const [activeCardIndex, setActiveCardIndex] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetchClasses();
  }, []);

  // Fetch data dari API
  const fetchClasses = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const classId = await AsyncStorage.getItem("classId");

      if (!token || !classId) {
        throw new Error("Token atau ID kelas tidak ditemukan. Silakan login kembali.");
      }

      const response = await fetch(`${API_URL}/api/materials/${classId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const result = await response.json();
        if (Array.isArray(result.data)) {
          setCards(result.data.map((item) => ({
            id: item._id,
            materi: item.title,
            instruksi: item.description,
            lampiran: item.documentLink,
          })));
        } else {
          setCards([]);
        }
      } else {
        const errorText = await response.text();
        Alert.alert("Error", `Gagal memuat data: ${errorText}`);
      }
    } catch (error) {
      Alert.alert("Error", error.message || "Terjadi kesalahan.");
    }
  };

  // Modal handler
  const handleOpenModal = (index = null) => {
    setActiveCardIndex(index);
    if (index !== null) {
      const card = cards[index];
      setEditedMateri(card.materi);
      setEditedInstruksi(card.instruksi);
      setEditedLampiran(card.lampiran);
    } else {
      setEditedMateri("");
      setEditedInstruksi("");
      setEditedLampiran("");
    }
    setModalVisible(true);
    Animated.timing(modalY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleCloseModal = () => {
    Animated.timing(modalY, {
      toValue: screenHeight,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  const handleSave = async () => {
    if (activeCardIndex !== null) {
      // Edit mode
      const updatedCards = [...cards];
      updatedCards[activeCardIndex] = {
        ...updatedCards[activeCardIndex],
        materi: editedMateri,
        instruksi: editedInstruksi,
        lampiran: editedLampiran,
      };
      setCards(updatedCards);
    } else {
      // Add new card
      const newCard = {
        id: cards.length + 1,
        materi: editedMateri,
        instruksi: editedInstruksi,
        lampiran: editedLampiran,
      };
      setCards([...cards, newCard]);
    }
    handleCloseModal();
  };

  // Fungsi untuk menghapus materi dari backend
  const deleteMateri = async (id) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        throw new Error("Token tidak ditemukan. Silakan login kembali.");
      }

      const response = await fetch(`${API_URL}/api/materials/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        Alert.alert("Berhasil", "Materi berhasil dihapus.");
        // Perbarui daftar materi setelah berhasil menghapus
        fetchClasses();
      } else {
        const errorText = await response.text();
        Alert.alert("Gagal", `Gagal menghapus materi: ${errorText}`);
      }
    } catch (error) {
      Alert.alert("Error", error.message || "Terjadi kesalahan.");
    }
  };

  const handleDeleteCard = async () => {
    if (activeCardIndex !== null) {
      const selectedCard = cards[activeCardIndex];
      await deleteMateri(selectedCard.id); // Hapus data dari backend
      setDeleteModalVisible(false);
    }
  };
  

  return (
    <View style={styles.container}>
      <FlatList
        data={cards}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <Card
            title={item.materi}
            description={item.instruksi}
            lampiran={item.lampiran}
            onEditPress={() => handleOpenModal(index)}
            onDeletePress={() => {
              setActiveCardIndex(index);
              setDeleteModalVisible(true);
            }}
          />
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => handleOpenModal(null)}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
      <ModalForm
        visible={modalVisible}
        modalY={modalY}
        onClose={handleCloseModal}
        onSave={handleSave}
        editedMateri={editedMateri}
        setEditedMateri={setEditedMateri}
        editedInstruksi={editedInstruksi}
        setEditedInstruksi={setEditedInstruksi}
        editedLampiran={editedLampiran}
        setEditedLampiran={setEditedLampiran}
        isEditMode={activeCardIndex !== null}
      />
      <DeleteConfirmationModal
        visible={deleteModalVisible}
        onCancel={() => setDeleteModalVisible(false)}
        onConfirm={handleDeleteCard}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#000080",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CardMateriGuru;
