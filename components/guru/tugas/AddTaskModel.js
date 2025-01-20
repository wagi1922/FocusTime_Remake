// src/components/CardTugasGuru/AddTaskModal.js
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Keyboard,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const AddTaskModal = ({ visible, onClose, onAdd }) => {
  const [formState, setFormState] = useState({
    title: '',
    subtitle: '',
    titleError: '',
    subtitleError: ''
  });
  const [slideAnim] = useState(new Animated.Value(Dimensions.get('window').height));

  React.useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        speed: 15,
        bounciness: 5,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: Dimensions.get('window').height,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const validateForm = useCallback(() => {
    let isValid = true;
    const newState = { ...formState };

    if (!formState.title.trim()) {
      newState.titleError = 'Nama tugas tidak boleh kosong';
      isValid = false;
    } else {
      newState.titleError = '';
    }

    if (!formState.subtitle.trim()) {
      newState.subtitleError = 'Materi tidak boleh kosong';
      isValid = false;
    } else {
      newState.subtitleError = '';
    }

    setFormState(newState);
    return isValid;
  }, [formState]);

  const handleInputChange = useCallback((field, value) => {
    setFormState(prev => ({
      ...prev,
      [field]: value,
      [`${field}Error`]: ''  // Clear error when user types
    }));
  }, []);

  const handleAdd = useCallback(() => {
    if (validateForm()) {
      onAdd({
        title: formState.title.toUpperCase(),
        subtitle: formState.subtitle.toUpperCase(),
      });
      setFormState({
        title: '',
        subtitle: '',
        titleError: '',
        subtitleError: ''
      });
      onClose();
    }
  }, [formState, validateForm, onAdd, onClose]);

  const handleClose = useCallback(() => {
    Keyboard.dismiss();
    setFormState({
      title: '',
      subtitle: '',
      titleError: '',
      subtitleError: ''
    });
    onClose();
  }, [onClose]);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      onRequestClose={handleClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={modalStyles.modalOverlay}
        >
          <View style={modalStyles.modalBackground}>
            <Animated.View
              style={[
                modalStyles.modalContainer,
                {
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              <View style={modalStyles.headerBar} />
              
              <View style={modalStyles.modalHeader}>
                <Text style={modalStyles.modalTitle}>Tambah Tugas Baru</Text>
                <TouchableOpacity 
                  style={modalStyles.closeButton}
                  onPress={handleClose}
                >
                  <Text style={modalStyles.closeButtonText}>×</Text>
                </TouchableOpacity>
              </View>

              <View style={modalStyles.inputContainer}>
                <Text style={modalStyles.label}>Nama Tugas</Text>
                <TextInput
                  style={[
                    modalStyles.input,
                    formState.titleError && modalStyles.inputError
                  ]}
                  value={formState.title}
                  onChangeText={(text) => handleInputChange('title', text)}
                  placeholder="Masukkan nama tugas"
                  placeholderTextColor="#9CA3AF"
                  autoCapitalize="characters"
                  returnKeyType="next"
                />
                {formState.titleError ? (
                  <Text style={modalStyles.errorText}>{formState.titleError}</Text>
                ) : null}

                <Text style={modalStyles.label}>Materi</Text>
                <TextInput
                  style={[
                    modalStyles.input,
                    formState.subtitleError && modalStyles.inputError
                  ]}
                  value={formState.subtitle}
                  onChangeText={(text) => handleInputChange('subtitle', text)}
                  placeholder="Masukkan materi"
                  placeholderTextColor="#9CA3AF"
                  autoCapitalize="characters"
                  returnKeyType="done"
                  onSubmitEditing={handleAdd}
                />
                {formState.subtitleError ? (
                  <Text style={modalStyles.errorText}>{formState.subtitleError}</Text>
                ) : null}
              </View>

              <View style={modalStyles.buttonContainer}>
                <TouchableOpacity
                  style={modalStyles.cancelButton}
                  onPress={handleClose}
                >
                  <Text style={modalStyles.cancelButtonText}>Batal</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    modalStyles.addButton,
                    (!formState.title.trim() || !formState.subtitle.trim()) && 
                    modalStyles.addButtonDisabled
                  ]}
                  onPress={handleAdd}
                  disabled={!formState.title.trim() || !formState.subtitle.trim()}
                >
                  <Text style={modalStyles.addButtonText}>Tambah</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const modalStyles = {
  modalOverlay: {
    flex: 1,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 34 : 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  headerBar: {
    width: 40,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#6B7280',
    fontWeight: '600',
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#111827',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '600',
  },
  addButton: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    backgroundColor: '#161D6F',
    alignItems: 'center',
  },
  addButtonDisabled: {
    backgroundColor: '#A5A6BB',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
};

export default AddTaskModal;