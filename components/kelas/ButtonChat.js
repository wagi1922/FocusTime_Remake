
import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native';

import Modal from "react-native-modal";

const ModalChat = ({navigation}) => {
  
  const [isModalVisible, setModalVisible] = useState(false);

 
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const signUp = () => {
    navigation.navigate('Chat');
  };
  

  return (
    <View>
               
      <TouchableOpacity onPress={toggleModal}>
        <Image source={require('../../assets/images/titiktiga.png')}/>
      </TouchableOpacity>

    <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        style={styles.modal}
      >
        <View style={styles.modalContent}>

          {/* Tombol Kumpulkan */}
          <TouchableOpacity style={styles.submitButton} onPress={signUp}>
            <Image source={require('../../assets/images/chat.png')}/>
            <Text style={styles.submitText}>Chat Guru/Siswa ini</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    
    </View>
  );
};

export default ModalChat;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
      },
      header: {
        backgroundColor: "#ADE5E4",
        padding: 20,
        paddingTop: 50,
        alignItems: "center",
      },
      headerText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
      },
      button: {
        backgroundColor: "#0056D2",
        padding: 15,
        margin: 20,
        borderRadius: 10,
        alignItems: "center",
      },
      buttonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
      },
      modal: {
        justifyContent: "flex-end",
        margin: 0,
      },
      modalContent: {
        backgroundColor: "#ECEBEB",
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      },
      modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
      },
      label: {
        fontSize: 16,
        marginBottom: 10,
      },
      attachmentButton: {
        backgroundColor: "#E0F7FA",
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
      },
      attachmentText: {
        color: "#00796B",
        fontWeight: "bold",
      },
      submitButton: {
        flexDirection:'row',
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
      },
      submitText: {
        color: "black",
        marginLeft:10
      },
});
