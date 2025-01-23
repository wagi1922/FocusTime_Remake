import React,{ useEffect, useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

let globalColorIndex = 0;
const CardKelasGuru = ({ id, title, subtitle, totalSiswa }) => {
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
    <TouchableOpacity style={[styles.cardContainer, { backgroundColor: cardColor }]}  onPress={handlePress}>
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

export default CardKelasGuru;

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        backgroundColor: '#98DED9',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        margin: 10,
      },
      icon: {
        marginRight: 15,
        borderRadius: 25,
      },
      textContainer: {
        flex: 1,
      },
      title: {
        fontSize: 23,
        fontWeight: 'bold',
      },
      subtitle: {
        fontSize: 12,
        color: '#555',
      },
      totalSiswa: {
        fontSize: 17,
        color: '#333',
      },
      dynamicText: {
        fontWeight: 'bold',
        color: '#000',
      },
});
