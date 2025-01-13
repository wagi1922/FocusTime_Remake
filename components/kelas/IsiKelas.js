import React from 'react';
import { View, StyleSheet } from 'react-native';
import CardKelas from './CardKelas';


const IsiKelas = ({ navigation }) => {
  const handleCardPress = (title, subtitle, totalSiswa) => {
    navigation.navigate('DetailKelas', { title, subtitle, totalSiswa });
  };
  
  return (
    <View style={styles.container}>
      <CardKelas
        title="Matematika - XII A"
        subtitle="Wagi Artono"
        totalSiswa={32}
        onPress={() => handleCardPress('Matematika - XII A', 'Wagi Artono', 32)}
      />
      <CardKelas
        title="Fisika - XI B"
        subtitle="Dewi Rahayu"
        totalSiswa={28}
        onPress={() => handleCardPress('Fisika - XI B', 'Dewi Rahayu', 28)}
      />
      <CardKelas
        title="Kimia - XI C"
        subtitle="Anita Sari"
        totalSiswa={25}
        onPress={() => handleCardPress('Kimia - XI C', 'Anita Sari', 25)}
      />
    </View>
  );
};

export default IsiKelas;

const styles = StyleSheet.create({
  container: {
    
  },
});
