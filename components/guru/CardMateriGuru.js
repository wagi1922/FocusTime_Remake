import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Animated,
  Dimensions,
  FlatList,
  PanResponder,
  Modal,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { Ionicons } from "@expo/vector-icons";

const screenHeight = Dimensions.get("window").height;

const Card = ({ title, description, fileName, onEditPress, onDeletePress }) => {
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
      {fileName && <Text style={styles.fileName}>Lampiran: {fileName}</Text>}
    </View>
  );
};

const CardMateriGuru = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(null);
  const [cards, setCards] = useState([
    {
      id: 1,
      materi: "Materi Trigonometry",
      instruksi: "Pertemuan 1\nmohon untuk di baca kembali",
      fileName: null,
    },
    {
      id: 2,
      materi: "Materi Geometri",
      instruksi: "Pertemuan 2\nlanjutkan ke latihan soal",
      fileName: null,
    },
  ]);

  const [editedMateri, setEditedMateri] = useState("");
  const [editedInstruksi, setEditedInstruksi] = useState("");
  const [editedFileName, setEditedFileName] = useState(null);
  const [modalY] = useState(new Animated.Value(screenHeight));

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      if (gestureState.dy > 50) {
        handleCloseModal();
      }
    },
  });

  const handleOpenModal = (index = null) => {
    setActiveCardIndex(index);

    if (index !== null) {
      const card = cards[index];
      setEditedMateri(card.materi);
      setEditedInstruksi(card.instruksi);
      setEditedFileName(card.fileName);
    } else {
      setEditedMateri("");
      setEditedInstruksi("");
      setEditedFileName(null);
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
        fileName: editedFileName,
      };
      setCards(updatedCards);
    } else {
      const newCard = {
        id: cards.length + 1,
        materi: editedMateri,
        instruksi: editedInstruksi,
        fileName: editedFileName,
      };
      setCards([...cards, newCard]);
    }
    handleCloseModal();
  };

  const handleFileUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });

      if (result.type === "success") {
        setEditedFileName(result.name);
      }
    } catch (error) {
      console.error("Error selecting file: ", error);
    }
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
            fileName={item.fileName}
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

      {modalVisible && (
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.modalContent,
            { transform: [{ translateY: modalY }] },
          ]}
        >
          <Text>Nama Materi</Text>
          <TextInput
            style={styles.input}
            value={editedMateri}
            onChangeText={(text) => setEditedMateri(text)}
          />

          <Text>Instruksi</Text>
          <TextInput
            style={[styles.input, { height: 100 }]}
            value={editedInstruksi}
            onChangeText={(text) => setEditedInstruksi(text)}
            multiline
          />

          <Text>Lampiran</Text>
          <TouchableOpacity style={styles.uploadButton} onPress={handleFileUpload}>
            <Text style={styles.uploadButtonText}>+ Tambahkan Lampiran</Text>
          </TouchableOpacity>
          {editedFileName && <Text style={styles.fileName}>File: {editedFileName}</Text>}

          <TouchableOpacity
            style={[styles.saveButtonCustom, { alignSelf: "center" }]}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>Simpan</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      {deleteModalVisible && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={deleteModalVisible}
          onRequestClose={() => setDeleteModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.deleteModalContainer}>
              <Text style={styles.deleteModalText}>Apakah Anda yakin ingin menghapus materi ini?</Text>
              <View style={styles.deleteModalButtons}>
                <TouchableOpacity
                  style={[styles.deleteModalButton, styles.cancelButton]}
                  onPress={() => setDeleteModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>Batal</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.deleteModalButton, styles.confirmButton]}
                  onPress={handleDeleteCard}
                >
                  <Text style={styles.confirmButtonText}>Hapus</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  card: {
    backgroundColor: "#ECECEC",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    width: "90%",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
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
  fileName: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginLeft: 10,
  },
  modalContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    width: "100%",
  },
  uploadButton: {
    backgroundColor: "#98DED9",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  uploadButtonText: {
    color: "#000000",
    fontSize: 14,
  },
  saveButtonCustom: {
    backgroundColor: "#000080",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
    width: "70%",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  deleteModalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  deleteModalText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  deleteModalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  deleteModalButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#ccc",
  },
  confirmButton: {
    backgroundColor: "#ff5c5c",
  },
  cancelButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
  confirmButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default CardMateriGuru;
