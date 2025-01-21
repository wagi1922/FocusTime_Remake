import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Animated, Dimensions, TouchableWithoutFeedback, StyleSheet } from 'react-native';

const NamaSiswaGuru = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [siswa, setSiswa] = useState([
    { id: '1', name: 'Haikal Rahman', kelas: '#1_dikelas', img: 'https://via.placeholder.com/50' },
    { id: '2', name: 'Maulana Riski', kelas: '#1_dikelas', img: 'https://via.placeholder.com/50' },
    { id: '3', name: 'Haikal Rahman', kelas: '#1_dikelas', img: 'https://via.placeholder.com/50' },
    { id: '4', name: 'Maulana Riski', kelas: '#1_dikelas', img: 'https://via.placeholder.com/50' },
    { id: '5', name: 'Haikal Rahman', kelas: '#1_dikelas', img: 'https://via.placeholder.com/50' },
    { id: '6', name: 'Maulana Riski', kelas: '#1_dikelas', img: 'https://via.placeholder.com/50' },
  ]);

  const guru = { name: 'Wagi Artono', img: 'https://via.placeholder.com/50' };

  const screenHeight = Dimensions.get('window').height;
  const [translateY] = useState(new Animated.Value(screenHeight));

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
    setSiswa((prevSiswa) => prevSiswa.filter((item) => item.id !== selectedId));
    closeModal();
  };

  const renderGuru = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Guru</Text>
      <View style={{ borderBottomWidth: 1 }} />
      <View style={styles.guruContainer}>
        <Image source={{ uri: guru.img }} style={styles.profileImage} />
        <Text style={styles.guruName}>{guru.name}</Text>
      </View>
    </View>
  );

  const renderSiswa = ({ item }) => (
    <View style={styles.siswaContainer}>
      <View style={styles.leftContent}>
        <Image source={{ uri: item.img }} style={styles.profileImage} />
        <View>
          <Text style={styles.siswaName}>{item.name}</Text>
          <Text style={styles.siswaKelas}>{item.kelas}</Text>
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
          data={siswa}
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
                  <TouchableOpacity onPress={() => PergiChat(siswa.find(student => student.id === selectedId).name)} style={{ flexDirection: 'row' }}>
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
    padding: 1,
  },
  guruName: {
    fontSize: 12,
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
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    marginTop: 5,
  },
  siswaName: {
    fontSize: 12,
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