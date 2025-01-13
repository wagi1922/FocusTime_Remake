import React from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import SingleBarChart from './diagram';

const MotivasiBox = () => {

  const fetchValues = async () => {
    return { left: 25, right: 50 };
  };


  return (
    <View style={styles.rowContainer}>
      <View style={styles.columntContainer}>
        <View style={styles.rowContainer}>
          <Image style={styles.imagOtak} source={require('../../assets/images/otak.png')} />
          <Text style={styles.title}>Selamat datang kembali!</Text>
        </View>
        <LinearGradient
            colors={['#C7FFD8', '#98DED9']} 
            style={styles.container1}
          >
            <Text style={styles.title1}>Ayo Belajar! {'\n'}Rebahan gak bikin kamu pintar dan kaya raya.</Text>
        </LinearGradient>
      
      </View>
      <View style={styles.container2}>
        <Image style={styles.image} source={require('../../assets/images/Award 2.png')} />
        <Text style={styles.title2}>Tak Terhentikan!</Text>
        
        <SingleBarChart fetchValues={fetchValues}/>

        <Text style={styles.subtitle1}>Kerjakan tugas sebanyak 50 kali</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5
  },
  columntContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    bottom: 5
  },
  container1: {
    width: 170,
    height: 100,
    backgroundColor: '#FFDDC1',
    borderRadius: 10,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  container2: {
    width: 155,
    height: 150,
    backgroundColor: '#98DED9',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    borderWidth:5,
    borderColor:'#161D6F'
  },
  title1: {
    width: 131,
    height: 75,
    fontSize: 15,
    fontWeight: '700',
    color: '#000000',
  },
  title2: {
    fontSize: 13,
    fontWeight: '700',
    color: '#000000',
  },
  subtitle1: {
    fontSize: 5,
    color: '#555',
    textAlign: 'center',
    margin: 3,
  },
  image: {
    left: 5
  },
  imagOtak:{
    width: 26,
    height: 42,
    marginRight: 10
  },
  title:{
    width: 165,
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'left',
  }
});

export default MotivasiBox;
