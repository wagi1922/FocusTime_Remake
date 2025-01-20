import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import KelasGuru from './Kelas';
import HeaderGuru from '@/components/guru/Header-guru';

const GuruScreen = () => {
  return (
    <View style={styles.container}>
      <HeaderGuru />
      <View style={styles.content}>
        <View style={styles.datang}>
          <Image style={{ marginRight: 10 }} source={require('../../assets/images/otak.png')} />
          <Text style={{ fontSize: 13, marginTop: 10 }}>Selamat datang kembali!</Text>
        </View>
        
        <View style={styles.tulis}>
          <Image style={{ marginRight: 10 }} source={require('../../assets/images/bukukecil.png')} />
          <Text style={{ fontSize: 23, fontWeight: 'bold' }}>Kelas</Text>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.kelasContainer}>
          <KelasGuru />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  datang: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  tulis: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  kelasContainer: {
    flex: 1, // This ensures KelasGuru can take remaining space
  }
});

export default GuruScreen;