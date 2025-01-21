// src/components/CardTugasGuru/EditTaskModal.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal,Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from './styles';

const EditTaskModal = ({ visible, classData, onClose, onSave }) => {
  const [taskTitle, setTaskTitle] = useState(classData.title);
  const [taskSubtitle, setTaskSubtitle] = useState(classData.subtitle);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [attachments, setAttachments] = useState([]);
    const [linkTitle, setLinkTitle] = useState(classData.link); // New state for link input

  const resetInputs = () => {
    setTaskTitle(classData.title);
    setTaskSubtitle(classData.subtitle);
    setDate(new Date());
    setAttachments([]);
    setLinkTitle(classData.link); // Reset link input
  };

  const handleClose = () => {
    resetInputs();
    onClose();
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleSave = () => {
    onSave({
      ...classData,
      title: taskTitle,
      subtitle: taskSubtitle,
      link: linkTitle, // Include link in the added task
    });
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={handleClose} style={styles.modalheader}>
              <Image source={require('../../../assets/images/corner.png')} style={styles.modalheaderimg} />
              <Text style={styles.modalTitle}>Tambah Tugas Baru</Text>
          </TouchableOpacity>

          <Text style={styles.label}>Nama Tugas</Text>
          <TextInput
            style={styles.input}
            value={taskTitle}
            onChangeText={setTaskTitle}
            placeholder="Nama Tugas"
          />

          <Text style={styles.label}>Instruksi</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={taskSubtitle}
            onChangeText={setTaskSubtitle}
            placeholder="Instruksi"
            multiline
          />
          

          <Text style={styles.label}>Tenggat</Text>
          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateText}>
              {date.toISOString().split('T')[0]}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onChangeDate}
            />
          )}

          {/* New Link Input Section */}
          <Text style={[styles.label,{color:'#4756FF'}]}>Link Lampiran</Text>
          <TextInput
            style={styles.input}
            value={linkTitle}
            onChangeText={setLinkTitle}
            placeholder="Masukkan link drive"
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Simpan</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default EditTaskModal;