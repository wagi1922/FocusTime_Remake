import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  TextInput,
  Alert,
  Linking
} from "react-native";
import Modal from "react-native-modal";

const TugasCard = ({
  title,
  subtitle,
  matpel,
  author,
  topik,
  tanggal,
  waktu,
  deskripsi,
  fileName,
  fileIcon,
  buttonIcon,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const [inputText, setInputText] = useState('');
  const [savedText, setSavedText] = useState('');

    // Fungsi untuk membuka link
    const handleOpenLink = async (url) => {
      try {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
          await Linking.openURL(url);
        } else {
          Alert.alert("Link tidak valid", "Tidak dapat membuka link yang diberikan.");
        }
      } catch (error) {
        Alert.alert("Terjadi kesalahan", "Gagal membuka link.");
      }
    };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const hideModal = () => {
    setModalVisible(false);
  };


  const handleSave = () => {
    if (inputText.trim() === '') {
      Alert.alert('Error', 'Input tidak boleh kosong!'); // Menampilkan alert jika input kosong
      hideModal()
      return;
    }
    setSavedText(inputText); // Menyimpan teks ke state
    console.log('Teks yang disimpan:', inputText); // Menampilkan di console log
    setInputText(''); // Menghapus teks dari input
    hideModal()
  };

  const handleBackPress = () => {
    if (isModalVisible) {
      hideModal();
      return true; // Menahan tindakan default tombol kembali
    }
    return false; // Melanjutkan tindakan default tombol kembali
  };

  useEffect(() => {
    // Menambahkan listener BackHandler saat komponen aktif
    BackHandler.addEventListener("hardwareBackPress", handleBackPress);

    return () => {
      // Membersihkan listener BackHandler saat komponen tidak aktif
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, [isModalVisible]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        {/* Bagian Atas */}
        <View style={styles.header}>
          <Image
            source={require("../../assets/images/Buku1.png")}
            style={styles.icon}
          />
          <View style={styles.textColumnLeft}>
            <Text style={styles.title}>{matpel}</Text>
            <Text style={styles.author}>{author}</Text>
            <Text style={styles.subtitle}>{`${title} | ${topik}`}</Text>
          </View>
          <View style={styles.textColumnRight}>
            <Text style={styles.label}>Tenggat</Text>
            <Text style={styles.date}>{tanggal}</Text>
            <Text style={styles.time}>{waktu}</Text>
          </View>
        </View>


        <View style={styles.body}>
          <Text style={styles.description}>{deskripsi}</Text>
          <View style={styles.fileSection}>
            <TouchableOpacity 
            style={styles.fileInfo}
            onPress={() => handleOpenLink(fileName)}>
              <Image source={fileIcon} style={styles.fileIcon} />
              <Text style={styles.fileName}>Buka</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={toggleModal}>
              <Text style={styles.buttonText}>Kerjakan</Text>
              <Image source={buttonIcon} style={styles.buttonIcon} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Modal */}
        <Modal isVisible={isModalVisible} onBackdropPress={toggleModal} style={styles.modal}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.titleLyout} onPress={hideModal}>
              <Image
                style={styles.backbuttonStyle}
                source={require("../../assets/images/back.png")}
              />
              <Text style={styles.modalTitle}>Kumpulkan Tugas</Text>
            </TouchableOpacity>
            <Text style={styles.label}>Lampiran
            <Text style={styles.star}>*</Text>
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Masukkan teks"
              value={inputText}
              onChangeText={text => setInputText(text)}
            />

            <View style={styles.buttonlayout}>
            <TouchableOpacity style={styles.submitButton} onPress={handleSave}>
              <Text style={styles.submitText}>Kumpulkan</Text>
            </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const App = () => {
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      bounces={true}
      overScrollMode="always"
    >
      <TugasCard
        title="Tugas 1"
        subtitle="Trigonometri"
        matpel="Matematika"
        author="Wagi Artono"
        topik="Trigonometri"
        tanggal="27 Oktober 2025"
        waktu="11:59 PM"
        deskripsi="Jawablah soal berikut"
        fileName="http://example.com/trigonometry"
        fileIcon={require("../../assets/images/pdf.png")}
        buttonIcon={require("../../assets/images/edit.png")}
      />
      <TugasCard
        title="Tugas 2"
        subtitle="Integral"
        matpel="Fisika"
        author="Budi Santoso"
        topik="Integral Dasar"
        tanggal="28 Oktober 2025"
        waktu="10:00 AM"
        deskripsi="Kerjakan soal integral berikut"
        fileName="http://example.com/trigonometry"
        fileIcon={require("../../assets/images/pdf.png")}
        buttonIcon={require("../../assets/images/edit.png")}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 5,
    paddingBottom: 80,
  },
  card: {
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    backgroundColor: "#98DED9",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  icon: {
    width: 67,
    height: 67,
  },
  textColumnLeft: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000000",
  },
  author: {
    fontSize: 12,
    fontWeight: "400",
    color: "#000000",
  },
  subtitle: {
    fontSize: 15,
    color: "#000000",
  },
  textColumnRight: {
    alignItems: "flex-end",
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 10
  },
  date: {
    fontSize: 12,
    fontWeight: "400",
    color: "#000000",
  },
  time: {
    fontSize: 12,
    color: "#000000",
    fontWeight: "700",
    backgroundColor: "#FF5F5F",
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
  },
  body: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  description: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000000",
  },
  fileSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  fileInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  fileIcon: {
    width: 17,
    height: 17,
    marginRight: 5,
  },
  fileName: {
    fontSize: 14,
    color: "#000000",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#161D6F",
    padding: 5,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 14,
    color: "#FFFFFF",
    marginRight: 5,
  },
  buttonIcon: {
    width: 16,
    height: 16,
    tintColor: "#FFFFFF",
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "#FFF",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 23,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 15,
  },
  attachmentButton: {
    height: 36,
    backgroundColor: "#98DED9",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    alignItems: "center",
    justifyContent: 'center',
    marginBottom: 20,
  },
  attachmentText: {
    fontSize: 15,
    fontWeight: "400",
    color: "#000000",
  },
  submitButton: {
    width: 300,
    height: 50,
    backgroundColor: "#161D6F",
    justifyContent: 'center',
    borderRadius: 20,
    alignItems: "center",
  },
  submitText: {
    fontSize: 15,
    fontWeight: "400",
    color: "#FFF",
  },
  backbuttonStyle:{
    marginRight: 15,
    marginTop: 7
  },
  titleLyout:{
    flexDirection: 'row',
  },
  star:{
    fontSize: 16,
    fontWeight: '700',
    color:"#FF0A0A",
  },
  buttonlayout:{
    alignItems: 'center'
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    width: "100%",
  },
});

export default App;
