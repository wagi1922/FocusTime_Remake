import API_URL from "@/config/config";
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  Button,
  Alert
} from 'react-native';
import HeaderGuru from './Header-guru';
import NamaMurid from './NamaSiswaGuru';
import CardTugasGuru from './tugas';
import CardMateriGuru from './materi';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailKelasScreen = ({ route }) => {
  const navigation = useNavigation(); // Pindahkan ke atas agar bisa digunakan di seluruh fungsi
  const { title: initialTitle, subtitle, totalSiswa } = route.params;
  const [activeTab, setActiveTab] = useState('Tugas');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [classTitle, setClassTitle] = useState(initialTitle);
  const [classCode, setClassCode] = useState([]);

  const renderContent = () => {
    switch (activeTab) {
      case 'Tugas':
        return <CardTugasGuru />;
      case 'Materi':
        return <CardMateriGuru/>;
      case 'Siswa':
        return <NamaMurid navigation={navigation} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  // Fungsi untuk mengambil data kelas
  const fetchClasses = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const classId = await AsyncStorage.getItem('classId');
      if (!token) throw new Error('Token tidak ditemukan. Silakan login kembali.');
      if (!classId) throw new Error('ID kelas tidak ditemukan. Silakan login kembali.');
  
      const response = await fetch(`${API_URL}/api/classes/${classId}/code`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (response.ok) {
        const result = await response.json();
        const { code } = result;
  
        if (code) {
          setClassCode(code);
        } else {
          console.error("Data dari API tidak berbentuk array:", result);
          setClassCode([]);
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

  const editClass = async () => {
    if (!classTitle.trim()) {
      Alert.alert('Error', 'Nama kelas tidak boleh kosong!');
      return;
    }
    try {
      const token = await AsyncStorage.getItem('token');
      const classId = await AsyncStorage.getItem('classId');
      if (!token) throw new Error('Token tidak ditemukan. Silakan login kembali.');
      if (!classId) throw new Error('ID kelas tidak ditemukan. Silakan login kembali.');

      const response = await fetch(`${API_URL}/api/classes/${classId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: classTitle }),
      });

      if (response.ok) {
        const result = await response.json();
        const {name} = result.data;
        setTitle(name);
        console.log('Updated Title:', name);
        setIsModalVisible(false)
      } else {
        Alert.alert('Error', 'Gagal menambahkan kelas');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Terjadi kesalahan saat menambahkan kelas');
    }
  };

  const deleteClass = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const classId = await AsyncStorage.getItem('classId');
      if (!token) throw new Error('Token tidak ditemukan. Silakan login kembali.');
      if (!classId) throw new Error('ID kelas tidak ditemukan. Silakan login kembali.');
  
      const response = await fetch(`${API_URL}/api/classes/${classId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (response.ok) {
        const result = await response.json();
        Alert.alert('Sukses', result.message || 'Kelas berhasil dihapus');
        navigation.navigate('Home');
      } else {
        const errorResult = await response.json();
        Alert.alert('Error', errorResult.message || 'Gagal menghapus kelas');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Terjadi kesalahan saat menghapus kelas');
    }
  };
  
  
  const kembali = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <HeaderGuru />
      <TouchableOpacity style={styles.backbuttonLayout} onPress={kembali}>
        <Image
          style={styles.backbuttonStyle}
          source={require('../../assets/images/back.png')}
        />
        <Text style={styles.backbuttonText}>Kelas</Text>
      </TouchableOpacity>
      <View style={styles.detailContainer}>
        <View style={styles.cardContainer}>
          <Image
            style={styles.icon}
            source={require('../../assets/images/matematika.png')}
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
            <Text style={styles.totalSiswa}>
              Total Siswa: <Text style={styles.dynamicText}>{totalSiswa}</Text>
            </Text>
          </View>
          <TouchableOpacity
            style={{ marginTop: 50 }}
            onPress={() => setIsModalVisible(true)}
          >
            <Image
              source={require('../../assets/images/edit.png')}
              style={{ marginTop: 10 }}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.tabContainer}>
          {['Tugas', 'Materi', 'Siswa'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tab,
                activeTab === tab && styles.activeTab,
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.contentContainer}>{renderContent()}</View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.buttnLayout} onPress={() => setIsModalVisible(false)}>
              <Image style={styles.buttonImage} source={require('../../assets/images/back.png')}/>
              <Text style={styles.modalTitle}>Edit Kelas</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              value={classTitle}
              onChangeText={setClassTitle}
              placeholder="Nama Kelas"
            />
            <Text style={styles.input}>{classCode}</Text>
            <View style={styles.modalButtonContainer}>
              <Button title="Simpan" onPress={editClass} />
              <Button title="Delet" onPress={deleteClass} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  detailContainer: {
    flex: 1,
    padding: 20,
  },
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: '#98DED9',
    borderRadius: 10,
    padding: 5,
    alignItems: 'center',
    margin: 1,
  },
  icon: {
    marginRight: 15,
    borderRadius: 25,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
  },
  totalSiswa: {
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
  },
  dynamicText: {
    fontWeight: 'bold',
    color: '#000',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    backgroundColor: '#151C68',
    borderRadius: 10,
    padding: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 5,
  },
  activeTab: {
    backgroundColor: '#C7FFD8',
    borderRadius: 5,
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F6F6F6',
  },
  activeTabText: {
    color: '#000000',
  },
  contentContainer: {
    flex: 1,
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backbuttonLayout:{
    flexDirection: 'row',
    marginTop: 10,
    top: 10,
    marginLeft: 20
  },
  backbuttonStyle:{
    width: 17,
    height: 17,
    marginTop: 2
  },
  backbuttonText: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: '700'
  },
  buttnLayout:{
    flexDirection: 'row',
    padding: 2
  },
  buttonImage:{
    marginRight: 5,
    top: 2
  }
});

export default DetailKelasScreen;
