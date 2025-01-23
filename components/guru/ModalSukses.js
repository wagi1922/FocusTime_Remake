import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

const ModalComponentSukses = ({ isVisible, onClose, code }) => {
  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>×</Text>
          </TouchableOpacity>
          <Image
            source={require('../../assets/images/sukses.png')}
            
          />
          <Text style={styles.title}>Berhasil Membuat Kelas!</Text>
          <View style={styles.codeBox}>
            <Text style={styles.codeText}>{code || 'Unknown Code'}</Text>
          </View>
          <TouchableOpacity
            style={styles.copyButton}
            onPress={() => {
              console.log(code || 'Unknown Code');
              onClose();
            }}
          >
            <Text style={styles.copyText}>Salin</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popup: {
    width: 300,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
  },
  closeText: {
    fontSize: 25,
    right: 10,
    fontWeight: 'bold',
    color: '#999',
  },
  icon: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  copyButton: {
    backgroundColor: '#00bfff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  copyText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  codeBox: {
    backgroundColor: '#f0f0f0', // Warna latar belakang
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
  },
  codeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'monospace', // Gaya huruf kode
  },
});

export default ModalComponentSukses;
