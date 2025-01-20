// src/components/CardTugasGuru/TaskCard.js
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { styles } from './styles';
import StatusSection from './StatusSection';
import StudentList from './Studenlist';

const TaskCard = ({ item, selectedClass, onToggleClass, onEditTask, onEditScore }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.upperSection}>
        <View style={styles.header}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.divider}>|</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
          <TouchableOpacity onPress={() => onEditTask(item)}>
            <Image
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/84/84380.png' }}
              style={styles.editIcon}
            />
          </TouchableOpacity>
        </View>

        <StatusSection status={item.status} />

        <TouchableOpacity
          style={styles.arrowButton}
          onPress={() => onToggleClass(item.id)}
        >
          <Image
            source={{
              uri: selectedClass === item.id
                ? 'https://cdn-icons-png.flaticon.com/512/271/271228.png'
                : 'https://cdn-icons-png.flaticon.com/512/271/271210.png',
            }}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
      </View>

      {selectedClass === item.id && (
        <StudentList 
          students={item.students}
          classId={item.id}
          onEditScore={onEditScore}
        />
      )}
    </View>
  );
};

export default TaskCard;