import API_URL from "@/config/config";
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  Animated, 
  Dimensions, 
  TouchableWithoutFeedback, 
  StyleSheet, 
  Alert 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NamaSiswaGuru = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [teacher, setTeacher] = useState(null);
  const [student, setStudent] = useState([]);

  const screenHeight = Dimensions.get('window').height;
  const [translateY] = useState(new Animated.Value(screenHeight));

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const classId = await AsyncStorage.getItem('classId');
      if (!token) throw new Error('Token tidak ditemukan. Silakan login kembali.');
      if (!classId) throw new Error('ID kelas tidak ditemukan. Silakan login kembali.');

      const response = await fetch(`${API_URL}/api/classes/${classId}/members`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const result = await response.json();

        const { teacher, student } = result;

        if (teacher) {
          setTeacher({
            id: teacher._id,
            username: teacher.username,
          });
        } else {
          console.error("Teacher data tidak ditemukan.");
          setTeacher(null);
        }

        if (Array.isArray(student)) {
          setStudent(
            student.map((item) => ({
              id: item._id,
              username: item.username,
            }))
          );
        } else {
          console.error("Student data tidak berbentuk array:", student);
          setStudent([]);
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

  const PergiChat = (studentName) => {
    navigation.navigate('ChatGuru', { studentName });
  };

  const openModal = () => {
    setModalVisible(true);
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(translateY, {
      toValue: screenHeight,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  const handleDelete = () => {
    setStudent((prevStudent) => prevStudent.filter((item) => item.id !== selectedId));
    closeModal();
  };

  const renderGuru = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Guru</Text>
      <View style={{ borderBottomWidth: 1 }} />
      {teacher ? (
        <View style={styles.guruContainer}>
          <Image style={styles.profileImage} source={require('../../assets/images/avatar4.png')}/>
          <Text style={styles.guruName}>{teacher.username}</Text>
        </View>
      ) : (
        <Text>Data guru tidak tersedia</Text>
      )}
    </View>
  );

  const renderSiswa = ({ item }) => (
    <View style={styles.siswaContainer}>
      <View style={styles.leftContent}>
        <View style={styles.guruContainer}>
        <Image style={styles.profileImage} source={require('../../assets/images/avatar2.png')}/>
          <Text style={styles.siswaName}>{item.username}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          setSelectedId(item.id);
          openModal();
        }}
      >
        <Image source={require('../../assets/images/titiktiga.png')} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      {renderGuru()}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Siswa</Text>
        <View style={{ borderBottomWidth: 1 }} />
        <FlatList
          data={student}
          renderItem={renderSiswa}
          keyExtractor={(item) => item.id}
        />
      </View>

      {modalVisible && (
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalBackdrop}>
            <TouchableWithoutFeedback>
              <Animated.View
                style={[
                  styles.modalOverlay,
                  { transform: [{ translateY }] },
                ]}
              >
                <View style={styles.modalContent}>
                  <TouchableOpacity 
                    onPress={() => {
                      const selectedStudent = student.find((s) => s.id === selectedId);
                      if (selectedStudent) {
                        PergiChat(selectedStudent.username);
                      }
                    }} 
                    style={{ flexDirection: 'row' }}
                  >
                    <Image source={require('../../assets/images/chat.png')} style={{ marginRight: 5 }} />
                    <Text>Chat</Text>
                  </TouchableOpacity>
                  <View style={{ borderBottomWidth: 1 }} />
                  <TouchableOpacity onPress={handleDelete} style={{ flexDirection: 'row' }}>
                    <Image source={require('../../assets/images/chat.png')} style={{ marginRight: 5 }} />
                    <Text>Hapus</Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  guruContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    padding: 5,
  },
  guruName: {
    fontSize: 20,
    fontWeight: '400',
  },
  siswaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 1,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 42,
    height: 42,
    borderRadius: 25,
    marginRight: 15,
    marginTop: 5,
  },
  siswaName: {
    fontSize: 15,
    fontWeight: '400',
  },
  siswaKelas: {
    fontSize: 14,
    color: 'gray',
  },
  modalBackdrop: {
    position: 'absolute',
    top: 0,
    left: '-5%',
    right: '-5%',
    bottom: '-5%',
    justifyContent: 'flex-end',
  },
  modalOverlay: {
    backgroundColor: '#ECEBEB',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    elevation: 5,
  },
  modalContent: {
    marginHorizontal: 10,
  },
});

export default NamaSiswaGuru;