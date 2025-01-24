import API_URL from "@/config/config";
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, Image, Modal, TouchableOpacity, TextInput, Alert } from 'react-native';

const TambahComponent = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [kodeKelas, setKodeKelas] = useState('');

  const joinClass = async () => {
    if (!kodeKelas.trim()) {
      Alert.alert('Error', 'Kode tidak boleh kosong!');
      return;
    }
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('Token tidak ditemukan. Silakan login kembali.');

      const response = await fetch(`${API_URL}/api/classes/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ code: kodeKelas }),
      });

      if (response.ok) {
        console.log(`Kode kelas yang dimasukkan: ${kodeKelas}`);
        setModalVisible(false);
        Alert.alert('Success', 'Berhasil bergabung ke kelas!');
        navigation.navigate('IsiKelas');
      } else {
        const result = await response.json();
        Alert.alert('Error', result.message || 'Gagal bergabung');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.message || 'Terjadi kesalahan saat memasukkan kode');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image style={styles.image} source={require('../../assets/images/addkelas.png')} />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>x</Text>
            </TouchableOpacity>
            <Text style={styles.title}>GABUNG KELAS</Text>
            <Image style={{height:170,width:170}} source={require('../../assets/images/singup2.png')} />
            <Text style={styles.label}>Kode Kelas</Text>
            <TextInput 
              style={styles.input}
              placeholder="Masukkan kode kelas"
              value={kodeKelas}
              onChangeText={setKodeKelas}
            />
            <TouchableOpacity 
              style={styles.button} 
              onPress={joinClass}
            >
              <Text style={styles.buttonText}>Gabung</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 315,
    top: 700
  },
  image: {
    width: 63,
    height: 63,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    position: 'relative',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 36,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    width: 179,
    height: 34,
    backgroundColor: '#161D6F',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '400',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#ccc',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TambahComponent;
