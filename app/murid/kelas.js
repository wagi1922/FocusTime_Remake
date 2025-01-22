import React from 'react';
import { View, Text,StyleSheet, Image} from 'react-native';
import Header from '@/components/ui/Header';
import TambahComponent from '@/components/ui/tembahkelas';
import IsiKelas from '../../components/kelas/IsiKelas';


const KelasScreen = () => {

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.tulis}>
        <Image style={{ marginRight: 10 }} source={require('../../assets/images/bukukecil.png')} />
        <Text style={{ fontSize: 23, fontWeight: '700' }}>Kelas</Text>
      </View>
      <View style={styles.containerclass}>
        <IsiKelas/>
      </View>
      <TambahComponent/>
    </View>
  );
};

export default KelasScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerclass: {
    width: 390,
    left: 10,
    paddingVertical: 10,
    paddingBottom: 100,
    
  },
  bawa: {
    paddingHorizontal: 20,
  },
  tulis: {
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 20,
    marginLeft: 20
  },
  
});
