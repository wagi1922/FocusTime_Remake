import API_URL from "@/config/config";
import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Animated,
  Dimensions,
  StyleSheet,
} from "react-native";
import Card from "./Card";
import ModalForm from "./ModalForm";
import { Ionicons } from "@expo/vector-icons";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenHeight = Dimensions.get("window").height;

const CardMateriGuru = () => {
  const [editedMateri, setEditedMateri] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [editedLampiran, setEditedLampiran] = useState("");
  const [editedInstruksi, setEditedInstruksi] = useState("");
  const [modalY] = useState(new Animated.Value(screenHeight));
  const [activeCardIndex, setActiveCardIndex] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetchClasses();
  }, []);

  // Fungsi untuk mengambil data kelas
  const fetchClasses = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const classId = await AsyncStorage.getItem('classId');
      if (!token) throw new Error('Token tidak ditemukan. Silakan login kembali.');
      if (!classId) throw new Error('ID kelas tidak ditemukan. Silakan login kembali.');
  
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
              materi: item.title,
              instruksi: item.description,
              lampiran: item.documentLink,
            }))
          );
        } else {
          console.error("Data dari API tidak berbentuk array:", result);
          setCards([]);
        }
      } else {
        const errorText = await response.text();
        console.error("Error dari API:", errorText);
        Alert.alert('Error', 'Gagal mengambil data kelas');
      }
    } catch (error) {
      console.error('Kesalahan saat mengambil data kelas:', error);
      Alert.alert('Error', error.message || 'Terjadi kesalahan saat mengambil data kelas');
    }
  };

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

  const handleSave = () => {
    if (activeCardIndex !== null) {
      const updatedCards = [...cards];
      updatedCards[activeCardIndex] = {
        ...updatedCards[activeCardIndex],
        materi: editedMateri,
        instruksi: editedInstruksi,
        lampiran: editedLampiran,
      };
      setCards(updatedCards);
    } else {
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

  const handleDeleteCard = () => {
    if (activeCardIndex !== null) {
      const updatedCards = cards.filter((_, i) => i !== activeCardIndex);
      setCards(updatedCards);
    }
    setDeleteModalVisible(false);
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
        />)}
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
        setEditedInstruksi={setEditedInstruksi} // Pastikan diteruskan
        editedLampiran={editedLampiran}
        setEditedLampiran={setEditedLampiran}
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default CardMateriGuru;
