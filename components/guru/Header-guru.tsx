import axios from "axios";
import React, {useState,useEffect} from 'react';
import { useRouter } from 'expo-router';
import API_URL from "@/config/config";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, Image, StyleSheet, TouchableOpacity,ActivityIndicator } from 'react-native';

interface UserProfile {
  username: string;
  email: string;
}

const HeaderGuru = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      router.replace('/auth/LoginScreen');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) throw new Error("Token tidak ditemukan. Silakan login kembali.");
      const response = await axios.get<{ data: UserProfile }>(`${API_URL}/api/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(response.data.data);
    } catch (error) {
      console.error("Gagal memuat profil:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
        <Text>Memuat data...</Text>
      </View>
    );
  }


  return (
    <View style={styles.headerContainer}>
      {/* Logout Icon */}
      <TouchableOpacity onPress={handleLogout}>
        <Image
          source={require('../../assets/images/log-out-guru.png')}
          style={styles.logoutIcon}
        />
      </TouchableOpacity>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={require('../../assets/images/avatar4.png')}
          style={styles.profileImage}
        />
        <View style={styles.profileLayout}>
        <Text style={styles.profileName}>{profile?.username || ""}</Text>
        <Text style={styles.email}>{profile?.email || ""}</Text>
        </View>
      </View>

      {/* Task Info */}
      <View style={styles.taskInfoContainer}>
        <View style={styles.taskInfoBox}>
          <Text style={styles.taskTitle}>Total yang belum kumpul tugas</Text>
        </View>
        <View style={styles.taskCountBox}>
          <Text style={styles.taskCount}>5</Text>
        </View>
      </View>

      {/* Notification Icon */}
      <TouchableOpacity onPress={() => router.replace('/NotifikasiGuru')}>
        <Image
          source={require('../../assets/images/bell.png')}
          style={styles.notificationIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingVertical: 30,
    backgroundColor: '#B4ECE3',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  logoutIcon: {
    width: 24,
    height: 24,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  taskInfoContainer: {
    alignItems: 'center',
    width: 139,
    flexDirection: 'row',
  },
  taskInfoBox: {
    alignItems: 'center',
    backgroundColor: '#161D6F',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
  },
  taskTitle: {
    fontSize: 12,
    color: '#FFFFFF',
  }, 
  email: {
    fontSize: 12,
    color: 'black',
  },
  taskCountBox: {
    backgroundColor: '#FFFFFF',
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    padding: 10,
  },
  taskCount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#161D6F',
  },
  notificationIcon: {
    width: 24,
    height: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileLayout:{
    flexDirection: 'column',
    top: 1
  }
});

export default HeaderGuru;
