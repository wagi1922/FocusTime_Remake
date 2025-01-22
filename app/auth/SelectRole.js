import React from 'react';
import { useRouter } from 'expo-router';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, ScrollView, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const SelectRole = () => {
  const router = useRouter();

  // Fungsi untuk menyimpan role dan navigasi ke SignUpScreen
  const handleRoleSelection = async (role) => {
    try {
      // Simpan role ke AsyncStorage
      await AsyncStorage.setItem('role', role);
      // Arahkan ke SignUpScreen
      router.replace('/auth/SignUpScreen');
    } catch (error) {
      console.error('Gagal menyimpan role:', error);
    }
  };

  const kembali = () => {
    router.replace('/auth/SignUpScreen3');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.textLayout}>
            <Text style={styles.title1}>Satu lagi...{'\n'}Pilih profesi anda</Text>
            <Text style={styles.title2}>Sebagai apakah kamu disini?</Text>
          </View>
          <View>
            {/* Tombol Guru */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleRoleSelection('teacher')}
            >
              <Image
                style={styles.gambar}
                source={require('../../assets/images/guru.png')}
              />
              <Text style={styles.buttonText}>Guru</Text>
            </TouchableOpacity>

            {/* Tombol Murid */}
            <TouchableOpacity
              style={styles.button2}
              onPress={() => handleRoleSelection('student')}
            >
              <Image
                style={styles.gambar2}
                source={require('../../assets/images/murid.png')}
              />
              <Text style={styles.buttonText}>Murid</Text>
            </TouchableOpacity>

            <Text style={styles.link} onPress={kembali}>
              kembali
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: height * 0.05,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: width * 0.05,
  },
  title1: {
    width: 293,
    height: 78,
    color: 'black',
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'left',
  },
  title2: {
    height: 17,
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
  },
  button: {
    width: 300,
    height: 260,
    backgroundColor: '#C7FFD8',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
  },
  button2: {
    width: 300,
    height: 260,
    backgroundColor: '#98DED9',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    height: 29,
    color: '#000000',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
    textAlign: 'center',
    fontSize: width * 0.04,
    marginTop: 20,
  },
  gambar: {
    width: 219,
    height: 219,
  },
  gambar2: {
    width: 158,
    height: 199,
  },
  textLayout: {
    alignItems: 'baseline',
    marginBottom: 40,
  },
});

export default SelectRole;
