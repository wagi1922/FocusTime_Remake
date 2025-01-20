// src/components/CardTugasGuru/index.js
import React, { useState } from 'react';
import { View, FlatList, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import { styles } from './styles';
import { initialClassesData } from './data';
import TaskCard from './TaskCard';
import EditTaskModal from './EditTaskModel';
import EditScoreModal from './EditScoreModal';
import AddTaskModal from './AddTaskModel'; // New import
import { Ionicons } from "@expo/vector-icons";

const CardTugasGuru = () => {
  const [classes, setClasses] = useState(initialClassesData);
  const [selectedClass, setSelectedClass] = useState(null);
  const [editTaskModalVisible, setEditTaskModalVisible] = useState(false);
  const [editScoreModalVisible, setEditScoreModalVisible] = useState(false);
  const [addTaskModalVisible, setAddTaskModalVisible] = useState(false); // New state
  const [editData, setEditData] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [newScore, setNewScore] = useState('');

  const toggleClass = (classId) => {
    setSelectedClass(selectedClass === classId ? null : classId);
  };

  const handleEditTask = (classData) => {
    setEditData(classData);
    setEditTaskModalVisible(true);
  };

  const handleSaveTask = (updatedClass) => {
    setClasses((prevClasses) =>
      prevClasses.map((cls) => (cls.id === updatedClass.id ? updatedClass : cls))
    );
    setEditTaskModalVisible(false);
    setEditData(null);
  };

  const handleOpenEditScore = (student, classId) => {
    setSelectedClass(classId);
    setEditingStudent(student);
    setNewScore(student.score === 'Nilai' ? '' : student.score);
    setEditScoreModalVisible(true);
  };

  const handleSaveScore = () => {
    setClasses((prevClasses) =>
      prevClasses.map((cls) =>
        cls.id === selectedClass
          ? {
              ...cls,
              students: cls.students.map((student) =>
                student.name === editingStudent.name
                  ? { ...student, score: newScore, status: /^[0-9]+(\/[0-9]+)?$/.test(newScore) ? 'graded' : 'pending' }
                  : student
              ),
            }
          : cls
      )
    );
    setEditScoreModalVisible(false);
    setEditingStudent(null);
    setNewScore('');
  };

  const handleAddTask = (newTask) => {
    const newId = (parseInt(classes[classes.length - 1]?.id || 0) + 1).toString();
    const newTaskData = {
      id: newId,
      ...newTask,
      status: {
        collected: 0,
        graded: 0,
        assigned: 0,
      },
      students: [],
    };
    setClasses([...classes, newTaskData]);
    setAddTaskModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>

      <FlatList
        data={selectedClass === null ? classes : classes.filter((cls) => cls.id === selectedClass)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskCard
            item={item}
            selectedClass={selectedClass}
            onToggleClass={toggleClass}
            onEditTask={handleEditTask}
            onEditScore={handleOpenEditScore}
          />
        )}
      />
     
        
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setAddTaskModalVisible(true)}
        >
          <Ionicons name="add" size={30} color="white" />
        </TouchableOpacity>

      {/* Existing modals */}
      {editData && (
        <EditTaskModal
          visible={editTaskModalVisible}
          classData={editData}
          onClose={() => setEditTaskModalVisible(false)}
          onSave={handleSaveTask}
        />
      )}

      <EditScoreModal
        visible={editScoreModalVisible}
        student={editingStudent}
        newScore={newScore}
        setNewScore={setNewScore}
        onSave={handleSaveScore}
        onClose={() => setEditScoreModalVisible(false)}
      />

      {/* New Add Task Modal */}
      <AddTaskModal
        visible={addTaskModalVisible}
        onClose={() => setAddTaskModalVisible(false)}
        onAdd={handleAddTask}
      />
    </SafeAreaView>
  );
};

export default CardTugasGuru;