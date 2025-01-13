import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const MateriCard = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        {/* Bagian Atas */}
        <View style={styles.header}>
          <Image
            source={require('../../assets/images/Buku1.png')} // Ganti dengan icon yang sesuai
            style={styles.icon}
          />

          <View style={styles.textColumnLeft}>
            <Text style={styles.title}>Matematika</Text>
            <Text style={styles.author}>Wagi Artono</Text>
            <Text style={styles.subtitle}>Tugas 1 | Trigonometri</Text>
          </View>

          {/* Kata "suda" */}
          <View style={styles.textColumnRight}>
            <Text style={styles.sudaText}>sudah</Text>
          </View>
        </View>

        {/* Bagian Bawah */}
        <View style={styles.body}>
          <Text style={styles.description}>
          Berikut materi pertemuan 1 Trigonometry
          </Text>

          <View style={styles.fileSection}>
            <View style={styles.fileInfo}>
              <Image
                source={require('../../assets/images/pdf.png')} // Ganti dengan ikon PDF
                style={styles.fileIcon}
              />
              <Text style={styles.fileName}>Materi_1.pdf</Text>
            </View>

            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Buka</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    bottom: 5,
    padding: 5,
  },
  card: {
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 6 }, 
    shadowRadius: 8,
    elevation: 10,
  },
  header: {
    backgroundColor: '#98DED9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
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
    fontWeight: '700',
    color: '#000000',
  },
  author: {
    fontSize: 12,
    fontWeight: '400',
    color: '#000000',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000000',
  },
  sudaText: {
    fontSize: 14,
    fontWeight: '700',
  },
  body: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  description: {
    width: 325,
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
  },
  fileSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  fileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileIcon: {
    width: 17,
    height: 17,
    marginRight: 5,
  },
  fileName: {
    fontSize: 14,
    color: '#000000',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#161D6F',
    padding: 5,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 14,
    color: '#FFFFFF',
    margin: 2
  },
  buttonIcon: {
    width: 16,
    height: 16,
    tintColor: '#FFFFFF',
  },
  textColumnRight: {
    width: 55,
    height: 23,
    alignItems: 'center',
    backgroundColor: '#B4FF9D',
    padding: 2,
    borderRadius: 5,
    bottom: 15
  },
});

export default MateriCard;
