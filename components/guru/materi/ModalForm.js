import API_URL from "@/config/config";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { 
  Animated, 
  Text, 
  Image, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert 
} from "react-native";

const ModalForm = ({
  modalY,
  onClose,
  onSave,
  editedMateri,
  setEditedMateri,
  editedInstruksi,
  setEditedInstruksi,
  editedLampiran,
  setEditedLampiran,
  isEditMode, // Menentukan apakah mode edit atau tambah
}) => {
  // Fungsi untuk menambahkan materi baru
  const addMateri = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const classId = await AsyncStorage.getItem("classId");

      if (!token) throw new Error("Token tidak ditemukan. Silakan login kembali.");
      if (!classId) throw new Error("ID kelas tidak ditemukan. Silakan login kembali.");

      const response = await fetch(`${API_URL}/api/materials/${classId}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: editedMateri,
          description: editedInstruksi,
          documentLink: editedLampiran,
        }),
      });

      if (response.ok) {
        Alert.alert("Sukses", "Materi berhasil ditambahkan!");
        onSave(); // Perbarui daftar materi
        onClose(); // Tutup modal setelah menambahkan materi
      } else {
        const errorText = await response.text();
        Alert.alert("Error", `Gagal menambahkan materi: ${errorText}`);
      }
    } catch (error) {
      Alert.alert("Error", error.message || "Terjadi kesalahan saat menambahkan materi.");
    }
  };

  // Fungsi untuk mengedit materi
  const editMateri = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const selectedItemId = await AsyncStorage.getItem("selectedItemId");
      if (!token) throw new Error("Token tidak ditemukan. Silakan login kembali.");
      if (!selectedItemId) throw new Error("ID materi tidak ditemukan. Pilih materi untuk diedit.");

      const response = await fetch(`${API_URL}/api/materials/${selectedItemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: editedMateri,
          description: editedInstruksi,
          documentLink: editedLampiran,
        }),
      });

      if (response.ok) {
        Alert.alert("Sukses", "Materi berhasil diperbarui!");
        onSave(); // Perbarui daftar materi
        onClose(); // Tutup modal setelah memperbarui materi
      } else {
        const errorText = await response.text();
        Alert.alert("Error", `Gagal memperbarui materi: ${errorText}`);
      }
    } catch (error) {
      Alert.alert("Error", error.message || "Terjadi kesalahan saat memperbarui materi.");
    }
  };

  // Validasi tombol simpan
  const isSaveDisabled = !editedMateri || !editedInstruksi || !editedLampiran;

  return (
    <Animated.View
      style={[styles.modalContent, { transform: [{ translateY: modalY }] }]}
    >
      <TouchableOpacity onPress={onClose} style={styles.modalheader}>
        <Image
          source={require("../../../assets/images/corner.png")}
          style={styles.modalheaderimg}
        />
        <Text style={styles.modalTitle}>
          {isEditMode ? "Edit Materi" : "Tambah Materi Baru" }
        </Text>
      </TouchableOpacity>

      <Text>Nama Materi</Text>
      <TextInput
        style={styles.input}
        value={editedMateri}
        onChangeText={setEditedMateri}
        placeholder="Masukkan nama materi"
      />

      <Text>Instruksi</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={editedInstruksi}
        onChangeText={setEditedInstruksi}
        placeholder="Masukkan instruksi"
        multiline
      />

      <Text>Link Lampiran</Text>
      <TextInput
        style={styles.input}
        value={editedLampiran}
        onChangeText={setEditedLampiran}
        placeholder="Masukkan link lampiran"
      />

      <TouchableOpacity
        style={[
          styles.saveButtonCustom,
          isSaveDisabled && styles.disabledButton,
        ]}
        onPress={isEditMode ? editMateri : addMateri}
        disabled={isSaveDisabled}
      >
        <Text style={styles.saveButtonText}>
          {isEditMode ? "Simpan Perubahan" : "Simpan"}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};


const styles = StyleSheet.create({
  modalContent: {
    position: "absolute",
    bottom: "-5%",
    left: "-5%",
    right: "-5%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalheader: {
    flexDirection: "row",
  },
  modalheaderimg: {
    marginRight: 10,
    marginTop: 2,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    width: "100%",
  },
  saveButtonCustom: {
    backgroundColor: "#000080",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
    width: "70%",
    alignSelf: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#aaa", // Warna tombol saat dinonaktifkan
  },
});

export default ModalForm;
