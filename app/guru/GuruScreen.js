import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';



const GuruScreen = () => {
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (newTask) => {
    setTasks((currentTasks) => [...currentTasks, newTask]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daftar Tugas Guru</Text>
      
      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.taskItem}>{item}</Text>}
      />
    </View>
  );
};

export default GuruScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  taskItem: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});
