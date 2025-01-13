import React from 'react';
import { FlatList, View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';

const image = [
  { id: '1', source: require('../../assets/images/kimia.png'), name: 'Kimia' },
  { id: '2', source: require('../../assets/images/matematika.png'), name: 'Matematika' },
  { id: '3', source: require('../../assets/images/kimia.png'), name: 'Kimia' },
];

const KelasComponent = () => {
  const router = useRouter();

  const handlePress = (name) => {
    router.push(`/kelas/DetailKelasScreen?name=${name}`);
  };

  return (
    <FlatList
      data={image}
      horizontal={true}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handlePress(item.name)}>
          <View style={styles.item}>
            <Image style={styles.image} source={item.source} />
            <Text style={styles.name}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      )}
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    width: 164,
    height: 168,
    backgroundColor: '#C7FFD8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
    marginTop: 10,
    marginBottom: 15,
    margin: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  image: {
    width: 129,
    height: 129,
  },
  name: {
    fontSize: 20,
    fontWeight: '400',
    marginBottom: 1,
  },
});

export default KelasComponent;
