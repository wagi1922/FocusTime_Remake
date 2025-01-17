import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import Header from '../ui/Header';

const Notifikasi = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.bawa}>
          <TouchableOpacity
            style={styles.tulis}
            onPress={() => navigation.goBack()} // Navigasi kembali ke layar sebelumnya
          >
            <Image
              style={{ marginRight: 10, marginTop: 5, width: 20, height: 20 }}
              source={require('../../assets/corner.png')}
            />
            <Text style={{ fontSize: 23, fontWeight: 'bold' }}>Notifikasi</Text>
          </TouchableOpacity>

          <View style={{ borderBottomWidth: 1, marginBottom: 10, marginTop: 10 }} />
        </View>
      </ScrollView>
    </View>
  );
};

export default Notifikasi;

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
    alignItems: 'center',
  },
});
