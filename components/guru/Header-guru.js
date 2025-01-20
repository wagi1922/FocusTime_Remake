import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HeaderGuru = () => {
  const navigation = useNavigation();

  const handleNotificationClick = () => {
    navigation.navigate('Notif');
  };

  return (
    <View style={styles.headerContainer}>
      {/* Logout Icon */}
      <Image
        source={require('../../assets/images/log-out-guru.png')}
        
      />

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={require('../../assets/images/avatar4.png')}
          
        />
        <Text style={styles.profileName}>Wagi Artono</Text>
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
      <TouchableOpacity onPress={handleNotificationClick}>
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
    borderBottomLeftRadius:8,
    borderTopLeftRadius:8,
  },
  taskTitle: {
    fontSize: 12,
    color: '#FFFFFF',
    
  },
  taskCountBox: {
    backgroundColor: '#FFFFFF',
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    padding:10
  },
  taskCount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#161D6F',
  },
  
});

export default HeaderGuru;
