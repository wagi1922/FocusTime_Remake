import React from 'react';
import { useRouter } from 'expo-router';
import HeaderEdit from '@/components/ui/Headerseting';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert, ImageSourcePropType } from 'react-native';

interface SettingItem {
  id: number;
  title: string;
  description?: string;
  icon: ImageSourcePropType;
  color?: string;
}

const Pengaturan: React.FC = () => {
  const router = useRouter();

  const confirmLogout = async () => {
    Alert.alert(
      'Konfirmasi Keluar',
      'Apakah Anda yakin ingin keluar?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Keluar',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.removeItem('token');
            router.replace('/auth/LoginScreen');
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handlePress = (title: string) => {
    if (title === 'Keluar') {
      confirmLogout();
    } else {
      Alert.alert('Fitur belum tersedia', `Anda menekan ${title}`);
    }
  };

  const settings: SettingItem[] = [
    {
      id: 1,
      title: 'Akun',
      description: 'Privasi, sekuriti, dan ganti email atau password',
      icon: require('../../assets/images/user.png'),
    },
    {
      id: 2,
      title: 'Notifikasi',
      description: 'Notifikasi chat, tugas, dan materi',
      icon: require('../../assets/images/bellpengaturan.png'),
    },
    {
      id: 3,
      title: 'Bantuan',
      description: 'Kostumer servis, bantuan, dan lainnya',
      icon: require('../../assets/images/help.png'),
    },
    {
      id: 4,
      title: 'Keluar',
      description: '',
      icon: require('../../assets/images/log-out.png'),
      color: 'red',
    },
  ];

  return (
    <View style={styles.container}>
      <HeaderEdit />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.bawa}>
          <Text style={styles.headerText}>Pengaturan</Text>
          <View style={styles.separator} />

          {settings.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.settingRow}
              onPress={() => handlePress(item.title)}
            >
              <Image style={styles.icon} source={item.icon} />
              <View style={styles.textContainer}>
                <Text style={[styles.title, item.color && { color: item.color }]}>{item.title}</Text>
                {item.description ? (
                  <Text style={styles.description}>{item.description}</Text>
                ) : null}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Pengaturan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingVertical: 10,
    paddingBottom: 100,
  },
  bawa: {
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 23,
    fontWeight: '700',
    marginTop: 20,
    marginLeft: 10
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
    marginTop: 10,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingVertical: 10,
  },
  icon: {
    width: 23,
    height: 23,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
  },
  description: {
    fontSize: 12,
    fontWeight: '400',
    color: '#717171',
  },
});
