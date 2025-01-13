import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Header from '@/components/ui/Header';
import DiagramBox from '@/components/ui/Berlangsung';
import MendaliComponent from '@/components/ui/MedaliHome';

const Pencapaian: React.FC = () => {
  const [tasks, setTasks] = useState<string[]>([]); // Tipe eksplisit untuk daftar tugas

  useEffect(() => {
    // Simulasi pengisian data
    setTasks(['Tugas Matematika', 'Tugas Fisika']);
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          {/* Judul Pencapaian */}
          <View style={styles.titleContainer}>
            <Image
              style={styles.icon}
              source={require('../../assets/images/pencapain.png')}
            />
            <Text style={styles.titleText}>Pencapaian</Text>
          </View>

          {/* Garis Pembatas */}
          <View style={styles.separator} />

          {/* Sedang Berlangsung */}
          <Text style={styles.sectionTitle}>Sedang Berlangsung</Text>
          <DiagramBox />

          {/* Garis Pembatas */}
          <View style={styles.separator} />

          {/* Koleksi */}
          <Text style={styles.sectionTitle}>Koleksi</Text>
          <MendaliComponent />
        </View>
      </ScrollView>
    </View>
  );
};

export default Pencapaian;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF', // Tambahkan warna latar belakang untuk konsistensi
  },
  scrollContainer: {
    paddingVertical: 10,
    paddingBottom: 100, // Ruang tambahan di bagian bawah
  },
  content: {
    paddingHorizontal: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
    width: 30,
    height: 30, // Ukuran ikon
  },
  titleText: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#000', // Warna teks
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
});
