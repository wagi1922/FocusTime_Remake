import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import {useRouter} from "expo-router";

const Header = () => {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <View style={{ top: 10, flexDirection: 'row' }}>
        <View style={styles.profileContainer}>
          <Image
            source={require('../../assets/images/avatar2.png')}
            style={styles.profileImage}
          />
          <View style={styles.profileText}>
            <Text style={styles.name}>Maulana Riski</Text>
            <Text style={styles.rank}>#1_dikelas</Text>
          </View>
        </View>
        <View style={styles.taskContainer}>
          <View style={styles.taskTitle}>
            <Text style={styles.taskTitleText}>Total Tugas</Text>
          </View>
          <View style={styles.taskStatus}>
            <View style={[styles.taskItem, styles.taskCompleted]}>
              <Text style={styles.taskNumberBlack}>10</Text>
              <Text style={styles.taskLabelBlack}>Selesai</Text>
            </View>
            <View style={[styles.taskItem, styles.taskIncomplete]}>
              <Text style={styles.taskNumberBlack}>5</Text>
              <Text style={styles.taskLabelBlack}>Belum</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => router.replace('/Notifikasi')}
        >
          <Image
            source={require('../../assets/images/bell.png')}
            style={styles.notificationIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 30,
    backgroundColor: '#B4ECE3',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 }, // Arah bayangan
    shadowOpacity: 0.2, // Opasitas bayangan
    shadowRadius: 10, // Radius bayangan
    elevation: 10, // Untuk perangkat Android
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 60,
    marginTop: 10,
  },
  profileImage: {
    width: 42,
    height: 42,
    borderWidth: 2,
    borderRadius: 20,
    backgroundColor: '#E0E0E0', // Placeholder untuk gambar
  },
  profileText: {
    marginLeft: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  rank: {
    fontSize: 12,
    fontWeight: '400',
    color: '#000000',
  },
  taskContainer: {
    alignItems: 'center',
  },
  taskTitle: {
    backgroundColor: '#161D6F',
    paddingHorizontal: 20,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 2,
  },
  taskTitleText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  taskStatus: {
    flexDirection: 'row',
    marginTop: 4,
  },
  taskItem: {
    alignItems: 'center',
    marginHorizontal: 3,
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  taskCompleted: {
    backgroundColor: '#B4FF9D',
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 10,
  },
  taskIncomplete: {
    backgroundColor: '#FF8D8D',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 10,
  },
  taskNumberBlack: {
    fontSize: 19,
    fontWeight: '700',
    color: '#000000',
  },
  taskLabelBlack: {
    fontSize: 8,
    fontWeight: '700',
    color: '#000000',
  },
  notificationIcon: {
    width: 40,
    height: 40,
    top: 10,
    margin: 10,
    marginLeft: 15,
  },
});

export default Header;
