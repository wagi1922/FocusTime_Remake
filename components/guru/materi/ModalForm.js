import React from "react";
import { Animated, Text,Image, TextInput, TouchableOpacity, StyleSheet } from "react-native";

const ModalForm = ({
  visible,
  modalY,
  onClose,
  onSave,
  editedMateri,
  setEditedMateri,
  editedInstruksi,
  setEditedInstruksi,
  editedLampiran,
  setEditedLampiran,
}) => {
  // Fungsi untuk memeriksa apakah semua input telah diisi
  const isSaveDisabled = !editedMateri || !editedInstruksi || !editedLampiran;

  return (
    <Animated.View
      style={[styles.modalContent, { transform: [{ translateY: modalY }] }]}
    >
      <TouchableOpacity onPress={onClose} style={styles.modalheader}>
        <Image source={require('../../../assets/images/corner.png')} style={styles.modalheaderimg} />
        <Text style={styles.modalTitle}>Tambah Materi Baru</Text>
      </TouchableOpacity>

      <Text>Nama Materi</Text>
      <TextInput
        style={styles.input}
        value={editedMateri}
        onChangeText={(text) => setEditedMateri(text)}
        placeholder="Masukkan nama materi"
      />
      <Text>Instruksi</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={editedInstruksi}
        onChangeText={(text) => setEditedInstruksi(text)}
        placeholder="Masukkan instruksi"
        multiline
      />
      <Text>Link Lampiran</Text>
      <TextInput
        style={styles.input}
        value={editedLampiran}
        onChangeText={(text) => setEditedLampiran(text)}
        placeholder="Masukkan link lampiran"
      />

        <TouchableOpacity
          style={[styles.saveButtonCustom, isSaveDisabled && styles.disabledButton]}
          onPress={onSave}
          disabled={isSaveDisabled} // Nonaktifkan tombol jika input kosong
        >
          <Text style={styles.saveButtonText}>Simpan</Text>
        </TouchableOpacity>

    </Animated.View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    position: "absolute",
    bottom: '-5%',
    left: '-5%',
    right: '-5%',
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
  modalheader:{
    flexDirection:'row'
  },
  modalheaderimg:{
    marginRight:10,
    marginTop:2
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
