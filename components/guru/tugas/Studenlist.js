// src/components/CardTugasGuru/StudentList.js
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles';

const StudentList = ({ students, classId, onEditScore }) => {
  return (
    <View style={styles.lowerSection}>
      {students.map((student, index) => (
        <View key={index} style={styles.studentRow}>
          <Image
            source={{ uri: student.profileImage }}
            style={styles.profileImage}
          />
          <View style={styles.studentInfo}>
            <Text style={styles.studentName}>{student.name}</Text>
          </View>
          <TouchableOpacity
            style={[
              styles.scoreButton,
              student.status === 'graded' ? styles.gradedButton : styles.pendingButton,
            ]}
            onPress={() => onEditScore(student, classId)}
          >
            <Text
              style={[
                styles.scoreButtonText,
                student.status === 'graded' ? styles.gradedText : styles.pendingText,
              ]}
            >
              {student.score}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default StudentList;