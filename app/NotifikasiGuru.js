import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity,FlatList } from 'react-native';
import HeaderGuru from '@/components/guru/Header-guru';
import { useRouter } from 'expo-router';


// Data Dummy Notifikasi
const notifications = [
  {
    id: 1,
    title: 'Wagi Artono',
    message: 'Telah mengunggah Tugas 1 | Eksponen',
    date: 'Des 21',
  },
  {
    id: 2,
    title: 'Wagi Artono',
    message: 'Telah mengunggah Tugas 2 | Logaritma',
    date: 'Des 21',
  },
  {
    id: 3,
    title: 'Wagi Artono',
    message: 'Telah mengunggah Tugas 3 | Matriks',
    date: 'Des 21',
  },
  {
    id: 4,
    title: 'Wagi Artono',
    message: 'Telah mengunggah Tugas 4 | Aljabar',
    date: 'Des 21',
  },
];

const Notifikasi = () => {
  const router = useRouter(); // Gunakan useRouter untuk navigasi
  return (
    <View style={styles.container}>
      <HeaderGuru />
      <View contentContainerStyle={styles.scrollContainer}>
      <View style={styles.bawa}>
          <TouchableOpacity
            style={styles.tulis}
            onPress={() => router.push('/guru/GuruNavigator')}
          >
            <Image
              style={{ marginRight: 10, marginTop: 5, width: 20, height: 20 }}
              source={require('../assets/images/corner.png')}
            />
            <Text style={{ fontSize: 23, fontWeight: 'bold' }}>Notifikasi</Text>
          </TouchableOpacity>

          <View style={{ borderBottomWidth: 1, marginBottom: 10, marginTop: 10 }} />
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.notificationItem}>
            <Image
              style={styles.notificationImage}
              source={require('../assets/images/avatar5.png')} // Ganti dengan path gambar Anda
            />
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>{item.title}</Text>
              <Text style={styles.notificationMessage}>{item.message}</Text>
            </View>
            <Text style={styles.notificationDate}>{item.date}</Text>
          </View>
        )}
      /></View>
      </View>
    </View>
  );
};

export default Notifikasi;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  notificationItem: {
    flexDirection: 'row', // Membuat gambar dan teks berada dalam satu baris
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#f9f9f9'
  },
  notificationImage: {
    width: 40, // Ukuran gambar
    height: 40,
    borderRadius: 20, // Membuat gambar bulat
    marginRight: 15, // Memberi jarak antara gambar dan teks
  },
  notificationContent: {
    flex: 1, // Agar teks memenuhi ruang yang tersisa
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
  notificationDate: {
    fontSize: 14,
    color: '#aaa',
  },
  scrollContainer: {
    paddingVertical: 10,
    paddingBottom: 100, // Tambahkan ruang di bawah agar tidak terhalang footer
  },
  bawa: {
    paddingHorizontal: 20,
    marginTop:10,
  },
  tulis: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});