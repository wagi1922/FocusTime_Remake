// src/components/CardTugasGuru/EditScoreModal.js
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import { styles } from './styles';

const EditScoreModal = ({ visible, student, newScore, setNewScore, onSave, onClose }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.scoreModalContainer}>
        <View style={styles.scoreModalContent}>
          <Text style={styles.modalTitle}>Edit Skor</Text>
          <Text style={styles.label}>Nama: {student?.name}</Text>
          <TextInput
            style={styles.input}
            value={newScore}
            onChangeText={setNewScore}
            placeholder="Masukkan skor baru"
            keyboardType="numeric"
          />
          <View style={styles.modalActions}>
            <TouchableOpacity
              style={[styles.saveButton, styles.modalButton]}
              onPress={onSave}
            >
              <Text style={styles.saveButtonText}>Simpan</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.cancelButton, styles.modalButton]}
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>Batal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditScoreModal;