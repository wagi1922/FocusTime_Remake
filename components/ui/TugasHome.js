import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const TugasComponent = () => {
  return (
    <View style={styles.tugas}>
      <Image style={styles.image} source={require('../../assets/images/Buku1.png')} />
      <View style={styles.textColumnLeft}>
        <Text style={styles.title}>Matematika</Text>
        <Text style={styles.author}>Wagi Artono</Text>
        <View style={styles.titleLayout}>
          <Text style={styles.subtitle}>Tugas 1</Text>
          <Text style={styles.subtitle}>| Trigonametri</Text>
        </View>
      </View>
      <View style={styles.textColumnRight}>
        <Text style={styles.label}>Tenggat</Text>
        <Text style={styles.date}>27 Oktober 2025</Text>
        <Text style={styles.time}>11.59 PM</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tugas: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#98DED9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    marginBottom:10,
    marginTop:10
  },
  image: {
    marginRight: 10,
    width: 67,
    height: 67,
  },
  textColumnLeft: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginHorizontal: 5,
  },
  textColumnRight: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginHorizontal: 5,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000000',
  },
  subtitle: {
    fontSize: 15,
    color: '#000000',
  },
  author: {
    fontSize: 10,
    fontWeight: '400',
    color: '#000000',
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FF5F5F',
  },
  date: {
    fontSize: 10,
    color: '#000000',
    fontStyle: 'italic',
    marginBottom: 10
  },
  time: {
    fontSize: 12,
    fontWeight: '700',
    color: '#000000',
    backgroundColor: '#FF5F5F', // Warna latar belakang yang menarik
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
  },
  titleLayout:{
    flexDirection: 'row'
  }
});

export default TugasComponent;
