import React, { useState, useEffect } from 'react';
import { View, Text,StyleSheet, Image, ScrollView } from 'react-native';
import Header from '@/components/ui/Header';
import TambahComponent from '@/components/ui/tembahkelas';
import IsiKelas from '../../components/kelas/IsiKelas';


const KelasScreen = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Simulasi sinkronisasi data tugas dari server
    setTasks(['Tugas Matematika', 'Tugas Fisika']);
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.bawa}>
          <View style={styles.tulis}>
              <Image style={{ marginRight: 10 }} source={require('../../assets/images/bukukecil.png')} />
              <Text style={{ fontSize: 23, fontWeight: '700' }}>Kelas</Text>
          </View>
          <IsiKelas/>
          <TambahComponent/>
        </View>
      </ScrollView>
    </View>
  );
};

export default KelasScreen;

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
  tulis: {
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 10
  },
  
});
