import React,{ useEffect, useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

let globalColorIndex = 0;

const CardKelas = ({id, title, subtitle, totalSiswa }) => {
  const navigation = useNavigation();

  const [cardColor, setCardColor] = useState('#98DED9');

  useEffect(() => {
    const colors = ['#98DED9', '#C7FFD8'];
    setCardColor(colors[globalColorIndex % colors.length]);
    globalColorIndex += 1;
  }, []);

  const handlePress = async () => {
    await AsyncStorage.setItem('classId', id);
    navigation.navigate('DetailKelas', { title, subtitle, totalSiswa });
  };

  return (
    <TouchableOpacity 
      style={[styles.cardContainer, { backgroundColor: cardColor }]} 
      onPress={handlePress}>
      <View> 
      </View>
      <Image
        style={styles.icon}
        source={require('../../assets/images/matematika.png')}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <Text style={styles.totalSiswa}>
          Total Siswa: <Text style={styles.dynamicText}>{totalSiswa}</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CardKelas;

const styles = StyleSheet.create({
  cardContainer: {
    height: 109,
    flexDirection: 'row',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  icon: {
    marginRight: 15,
    borderRadius: 25,
    width: 85,
    height: 85,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 23,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '400',
    color: '#000000',
  },
  totalSiswa: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000000',
  },
  dynamicText: {
    fontWeight: 'bold',
    color: '#000',
  },
});
