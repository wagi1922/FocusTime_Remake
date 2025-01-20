import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, Text, TextInput, Alert, FlatList, Animated } from 'react-native';
import CardKelasGuru from '@/components/guru/ComponenKelas';
import { Ionicons } from "@expo/vector-icons";
import ModalComponentSukses from '@/components/guru/ModalSukses';

const KelasGuru = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const [className, setClassName] = useState('');

  const [code, setcode] = useState('yusn009');

  const [classes, setClasses] = useState([
    {
      id: '1',
      title: "Matematika - XII A",
      subtitle: "Wagi Artono",
      totalSiswa: 32
    },
    {
      id: '2',
      title: "Fisika - XI B",
      subtitle: "Dewi Rahayu",
      totalSiswa: 28
    },
    {
      id: '3',
      title: "Kimia - XI C",
      subtitle: "Anita Sari",
      totalSiswa: 25
    }
  ]);

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
      setClassName(''); // Reset input when modal closes
    });
  };

  const handleCardPress = (title, subtitle, totalSiswa) => {
    navigation.navigate('DetailKelas', { title, subtitle, totalSiswa });
  };

  const handleAddClass = () => {
    if (!className.trim()) {
      Alert.alert('Error', 'Please enter class name');
      return;
    }

    // Here you would typically make an API call to the backend
    // For now, we'll simulate adding with dummy teacher data
    const newClass = {
      id: Date.now().toString(),
      title: className,
      subtitle: "Teacher Name", // This would come from backend
      totalSiswa: 0 // This would come from backend
    };

    setClasses([...classes, newClass]);
    hideModal();
    handleOpenModal();

  };

  const renderItem = ({ item }) => (
    <CardKelasGuru
      title={item.title}
      subtitle={item.subtitle}
      totalSiswa={item.totalSiswa}
      onPress={() => handleCardPress(item.title, item.subtitle, item.totalSiswa)}
    />
  );


  // modal untuk menampilkan sukses
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
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={showModal}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={hideModal}
        animationType="none"
      >
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
                transform: [{
                  translateY: slideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [600, 0]
                  })
                }]
              }
            ]}
          >
            <View style={styles.modalHeader}>
              <View style={styles.modalIndicator} />
            </View>

            <Text style={styles.modalTitle} onPress={hideModal}>Buat Kelas</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Class Name (e.g., Matematika - XII A)"
              value={className}
              onChangeText={setClassName}
              autoFocus
            />

            <View style={styles.buttonContainer}>

              <TouchableOpacity
                style={[styles.button, styles.addClassButton]}
                onPress={handleAddClass}
              >
                <Text style={styles.buttonText}>Add Class</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
      <ModalComponentSukses isVisible={isModalVisible} onClose={handleCloseModal} code={code}/>
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
  addButtonText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
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
    paddingTop: 10,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 10,
  },
  modalIndicator: {
    width: 40,
    height: 4,
    backgroundColor: '#DDD',
    borderRadius: 2,
    marginVertical: 8,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#ff6b6b',
  },
  addClassButton: {
    backgroundColor: '#161D6F',
    borderRadius:20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default KelasGuru;