import React, { useState, useRef, useEffect } from 'react';
import API_URL from "@/config/config";
import { 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  Modal, 
  Text, 
  TextInput, 
  Alert, 
  FlatList, 
  Animated 
} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import CardKelasGuru from '@/components/guru/ComponenKelas';
import ModalComponentSukses from '@/components/guru/ModalSukses';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KelasGuru = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const [className, setClassName] = useState('');
  const [code, setCode] = useState('');
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetchClasses();
  }, []);

  // Fungsi untuk mengambil data kelas
  const fetchClasses = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('Token tidak ditemukan. Silakan login kembali.');
  
      const response = await fetch(`${API_URL}/api/classes/teacher`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (response.ok) {
        const result = await response.json();
        const { data } = result;
  
        if (Array.isArray(data)) {
          setClasses(
            data.map((item) => ({
              id: item.id,
              title: item.name,
              subtitle: item.teacherName || 'Guru Tidak Diketahui',
              totalSiswa: item.students || 0,
            }))
          );
        } else {
          console.error("Data dari API tidak berbentuk array:", result);
          setClasses([]);
        }
      } else {
        const errorText = await response.text();
        console.error("Error dari API:", errorText);
        Alert.alert('Error', 'Gagal mengambil data kelas');
      }
    } catch (error) {
      console.error('Kesalahan saat mengambil data kelas:', error);
      Alert.alert('Error', error.message || 'Terjadi kesalahan saat mengambil data kelas');
    }
  };

  // Fungsi untuk menambahkan kelas baru
  const addClass = async () => {
    if (!className.trim()) {
      Alert.alert('Error', 'Nama kelas tidak boleh kosong!');
      return;
    }
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('Token tidak ditemukan. Silakan login kembali.');

      const response = await fetch(`${API_URL}/api/classes/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: className }),
      });

      if (response.ok) {
        const result = await response.json();
        const {code} = result.data;
        await fetchClasses();
        setCode(code || 'Tidak ada kode');
        hideModal();
        handleOpenModal();
      } else {
        Alert.alert('Error', 'Gagal menambahkan kelas');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Terjadi kesalahan saat menambahkan kelas');
    }
  };

  const showModal = () => {
    setModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const hideModal = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
      setClassName(''); // Reset input saat modal ditutup
    });
  };


  const renderItem = ({ item }) => (
    <CardKelasGuru
      id={item.id}
      title={item.title}
      subtitle={item.subtitle}
      totalSiswa={item.totalSiswa}
    />
  );

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={classes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
      <TouchableOpacity style={styles.addButton} onPress={showModal}>
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>

      <Modal transparent={true} visible={modalVisible} onRequestClose={hideModal}>
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalBackground}
            onPress={hideModal}
            activeOpacity={1}
          />
          <Animated.View
            style={[ 
              styles.modalContent,
              {
                transform: [
                  {
                    translateY: slideAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [600, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <View style={styles.modalHeader}>
              <View style={styles.modalIndicator} />
            </View>
            <Text style={styles.modalTitle}>Buat Kelas</Text>
            <TextInput
              style={styles.input}
              placeholder="Nama Kelas (contoh: Matematika - XII A)"
              value={className}
              onChangeText={setClassName}
              autoFocus
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.button, styles.addClassButton]} onPress={addClass}>
                <Text style={styles.buttonText}>Tambahkan Kelas</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>

      <ModalComponentSukses isVisible={isModalVisible} onClose={handleCloseModal} code={code} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#161D6F',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    height: 50,
    justifyContent: "center",
    paddingBottom: 2,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  addClassButton: {
    backgroundColor: '#161D6F',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default KelasGuru;
