import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal,Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from './styles';

const AddTaskModal = ({ visible, onClose, onAdd }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskSubtitle, setTaskSubtitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const [linkTitle, setLinkTitle] = useState(''); // New state for link input

  const resetInputs = () => {
    setTaskTitle('');
    setTaskSubtitle('');
    setDate(new Date());
    setAttachments([]);
    setLinkTitle(''); // Reset link input
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

  const handleAdd = () => {
    if (taskTitle.trim() && taskSubtitle.trim()) {
      onAdd({
        title: taskTitle.toUpperCase(),
        subtitle: taskSubtitle.toUpperCase(),
        dueDate: date,
        link: linkTitle, // Include link in the added task
      });
      handleClose();
    }
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
            placeholder="Masukkan nama tugas"
          />

          <Text style={styles.label}>Instruksi</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={taskSubtitle}
            onChangeText={setTaskSubtitle}
            placeholder="Masukkan materi"
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

          <TouchableOpacity 
            style={[
              styles.saveButton,
              (!taskTitle.trim() || !taskSubtitle.trim() || !linkTitle.trim()) && { opacity: 0.5 }
            ]} 
            onPress={handleAdd}
            disabled={!taskTitle.trim() || !taskSubtitle.trim() || !linkTitle.trim()}
          >
            <Text style={styles.saveButtonText}>Tambah</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AddTaskModal;
