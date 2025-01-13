import React from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';
import SingleBarChart from './diagram';

const DiagramBox = () => {

  const fetchValues = async () => {
    return { left: 25, right: 50 };
  };


  return (
    <View style={styles.rowContainer}>
       
      
      <View style={styles.container2}>
        <Image style={styles.image} source={require('../../assets/images/Award 2.png')} />
        <Text style={styles.title}>Tak Terhentikan!</Text>
        
        <SingleBarChart fetchValues={fetchValues}/>

        <Text style={styles.subtitle1}>Kerjakan tugas sebanyak 50 kali</Text>
      </View>

      <View style={styles.container2}>
        <Image style={styles.image} source={require('../../assets/images/Award 2.png')} />
        <Text style={styles.title}>Tak Terhentikan!</Text>
        
        <SingleBarChart fetchValues={fetchValues}/>

        <Text style={styles.subtitle1}>Kerjakan tugas sebanyak 50 kali</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    
    margin: 10,
    gap:5
  },
  container2: {
    flex: 1,
    padding: 5,
    backgroundColor: '#98DED9',
    borderRadius: 10,
    margin: 1,
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
  subtitle1: {
    fontSize: 10,
    color: '#555',
    textAlign: 'center',
  },
});

export default DiagramBox;
