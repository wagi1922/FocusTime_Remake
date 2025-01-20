// src/components/CardTugasGuru/EditTaskModal.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from './styles';

const EditTaskModal = ({ visible, classData, onClose, onSave }) => {
  const [taskTitle, setTaskTitle] = useState(classData.title);
  const [taskSubtitle, setTaskSubtitle] = useState(classData.subtitle);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [attachments, setAttachments] = useState([]);

  const resetInputs = () => {
    setTaskTitle(classData.title);
    setTaskSubtitle(classData.subtitle);
    setDate(new Date());
    setAttachments([]);
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
          <TouchableOpacity style={styles.backButton} onPress={handleClose}>
            <Text style={styles.modalTitle}>Edit Tugas</Text>
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

          <Text style={styles.label}>Lampiran</Text>
          <TouchableOpacity
            style={styles.addAttachmentButton}
            onPress={() =>
              setAttachments((prev) => [
                ...prev,
                `Lampiran_${prev.length + 1}.pdf`,
              ])
            }
          >
            <Text style={styles.addAttachmentText}>+ Tambahkan Lampiran</Text>
          </TouchableOpacity>
          {attachments.map((attachment, index) => (
            <View key={index} style={styles.attachmentRow}>
              <Text style={styles.attachmentText}>{attachment}</Text>
              <TouchableOpacity
                onPress={() =>
                  setAttachments((prev) =>
                    prev.filter((_, i) => i !== index)
                  )
                }
              >
                <Text style={styles.removeAttachment}>❌</Text>
              </TouchableOpacity>
            </View>
          ))}

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Simpan</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default EditTaskModal;