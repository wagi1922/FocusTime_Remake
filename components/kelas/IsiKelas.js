import CardKelas from './CardKelas';
import API_URL from "@/config/config";
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, FlatList, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const IsiKelas = ({ navigation }) => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetchClasses();
  }, []);


  const fetchClasses = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('Token tidak ditemukan. Silakan login kembali.');
  
      const response = await fetch(`${API_URL}/api/classes/student`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (response.ok) {
        const result = await response.json();
  
        // Ambil data dari respons API
        const { data } = result;
  
        if (Array.isArray(data)) {
          setClasses(
            data.map((item) => ({
              id: item.id,
              title: item.name,
              subtitle: item.teacherName || 'Guru Tidak Diketahui',
              totalSiswa: item.students || 0,
            }))
          );
        } else {
          console.error("Data dari API tidak berbentuk array:", result);
          setClasses([]); // Jika data bukan array, set sebagai array kosong
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


  const renderItem = ({ item }) => (
    <CardKelas
      id={item.id}
      title={item.title}
      subtitle={item.subtitle}
      totalSiswa={item.totalSiswa}
    />
  );
  
  return (
    <View style={styles.container}>
      <FlatList
        data={classes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default IsiKelas;

const styles = StyleSheet.create({
  container: {
    
  },
});
