import React from "react";
import { TouchableOpacity, Text, StyleSheet, View, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ModalChat from "./ButtonChat";

const dummyData = [
  { id: 1, title: "Asep", img: "https://via.placeholder.com/150" },
  { id: 2, title: "Rahmat Hidayat", img: "https://via.placeholder.com/150" },
  { id: 3, title: "Siti Fatimah", img: "https://via.placeholder.com/150" },
  { id: 4, title: "Dian Pratama", img: "https://via.placeholder.com/150" },
]; 

const UserItem = ({ title, img }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.userItem}>
      <View style={styles.leftContent}>
        <Image source={img ? { uri: img } : require('../../assets/images/kepiting.png')} style={styles.profileImage} />
        <Text style={styles.userName}>{title}</Text>
      </View>
      <TouchableOpacity>
        <ModalChat navigation={navigation} />
      </TouchableOpacity>
    </View>
  );
};

const SiswaNama = () => {
  const renderHeader = () => (
    <View>
      <Text style={styles.sectionTitle}>Guru</Text>
      <View style={styles.divider} />
      <UserItem title="Wagi Artono" img={null} />
      <Text style={styles.sectionTitle}>Siswa</Text>
      <View style={styles.divider} />
    </View>
  );

  return (
    <FlatList
      data={dummyData}
      renderItem={({ item }) => <UserItem title={item.title} img={item.img} />}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={renderHeader}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false} // Menyembunyikan scroll bar
    />
  );
};

export default SiswaNama;

const styles = StyleSheet.create({
  contentContainer: {
    padding: 10,
    paddingBottom: 80,
  },
  sectionTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    marginTop: 10,
  },
  divider: {
    borderBottomWidth: 1,
    marginVertical: 10,
    borderColor: '#E0E0E0',
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: '500',
  },
});
