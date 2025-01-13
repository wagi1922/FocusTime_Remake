import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Header from '@/components/ui/Header';
import TugasComponent from '@/components/ui/TugasHome';
import KelasComponent from '@/components/ui/KelasHome';
import DatangComponent from '@/components/ui/datang';
import MedaliComponent from '@/components/ui/MedaliHome';

const MuridScreen: React.FC = () => {
  const [tasks, setTasks] = useState<string[]>([]); // Tipe eksplisit untuk array tugas

  useEffect(() => {
    // Simulasi sinkronisasi data tugas dari server
    setTasks(['Tugas Matematika', 'Tugas Fisika']);
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.bawa}>
          <DatangComponent />
          <View style={styles.tulis}>
            <Image
              style={styles.image1}
              source={require('../../assets/images/waktu.png')}
            />
            <Text style={styles.title}>Tugas kamu</Text>
          </View>
          <Text style={styles.text}>Ada tugas yang menantimu!</Text>
          <TugasComponent />
          <View style={styles.tulis}>
            <Image
              style={styles.image1}
              source={require('../../assets/images/bukukecil.png')}
            />
            <Text style={styles.title}>Kelas</Text>
          </View>
          <Text style={styles.text}>Pilih kelas yang ingin kamu pelajari</Text>
          <KelasComponent />
          <View style={styles.tulis}>
            <Image
              style={styles.image1}
              source={require('../../assets/images/pencapain.png')}
            />
            <Text style={styles.title}>Pencapaian</Text>
          </View>
          <Text style={styles.text}>
            Bagus! Tingkatkan terus pencapaianmu!
          </Text>
          <MedaliComponent />
        </View>
      </ScrollView>
    </View>
  );
};

export default MuridScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingVertical: 10,
    paddingBottom: 100, // Tambahkan ruang di bawah agar tidak terhalang footer
  },
  bawa: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 23,
    fontWeight: '700',
  },
  taskItem: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  tulis: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  image1: {
    width: 28,
    height: 28,
    marginRight: 10,
  },
  text: {
    fontSize: 13,
    fontWeight: '400',
    color: '#000000',
    marginTop: 3,
  },
});
