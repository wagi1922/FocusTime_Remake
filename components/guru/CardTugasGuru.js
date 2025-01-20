// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
//   Image,
//   TextInput,
//   Modal,
// } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';

// const CardTugasGuru = () => {
//   const [classes, setClasses] = useState([
//     {
//       id: '1',
//       title: 'TUGAS 1',
//       subtitle: 'EKSPONEN',
//       status: {
//         collected: 20,
//         graded: 5,
//         assigned: 5,
//       },
//       students: [
//         { name: 'Haikal Rahman', score: '100/100', profileImage: 'https://i.pravatar.cc/50?img=1', status: 'graded' },
//         { name: 'Maulana Riski', score: 'Nilai', profileImage: 'https://i.pravatar.cc/50?img=2', status: 'pending' },
//       ],
//     },
//     {
//       id: '2',
//       title: 'TUGAS 2',
//       subtitle: 'LOGARITMA',
//       status: {
//         collected: 15,
//         graded: 7,
//         assigned: 3,
//       },
//       students: [
//         { name: 'Rafi Hidayat', score: '90/100', profileImage: 'https://i.pravatar.cc/50?img=3', status: 'graded' },
//         { name: 'Andi Maulana', score: 'Nilai', profileImage: 'https://i.pravatar.cc/50?img=4', status: 'pending' },
//       ],
//     },
//   ]);

//   const [selectedClass, setSelectedClass] = useState(null);
//   const [editTaskModalVisible, setEditTaskModalVisible] = useState(false);
//   const [editScoreModalVisible, setEditScoreModalVisible] = useState(false);
//   const [editData, setEditData] = useState(null);
//   const [editingStudent, setEditingStudent] = useState(null);
//   const [newScore, setNewScore] = useState('');

//   const toggleClass = (classId) => {
//     setSelectedClass(selectedClass === classId ? null : classId);
//   };

//   const handleEditTask = (classData) => {
//     setEditData(classData);
//     setEditTaskModalVisible(true);
//   };

//   const handleSaveTask = (updatedClass) => {
//     setClasses((prevClasses) =>
//       prevClasses.map((cls) =>
//         cls.id === updatedClass.id ? updatedClass : cls
//       )
//     );
//     setEditTaskModalVisible(false);
//     setEditData(null);
//   };

//   const handleOpenEditScore = (student, classId) => {
//     setSelectedClass(classId);
//     setEditingStudent(student);
//     setNewScore(student.score === 'Nilai' ? '' : student.score);
//     setEditScoreModalVisible(true);
//   };

//   const handleSaveScore = () => {
//     setClasses((prevClasses) =>
//       prevClasses.map((cls) =>
//         cls.id === selectedClass
//           ? {
//               ...cls,
//               students: cls.students.map((student) =>
//                 student.name === editingStudent.name
//                   ? { ...student, score: newScore, status: /^[0-9]+(\/[0-9]+)?$/.test(newScore) ? 'graded' : 'pending' }
//                   : student
//               ),
//             }
//           : cls
//       )
//     );
//     setEditScoreModalVisible(false);
//     setEditingStudent(null);
//     setNewScore('');
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={selectedClass === null ? classes : classes.filter((cls) => cls.id === selectedClass)}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.cardContainer}>
//             <View style={styles.upperSection}>
//               <View style={styles.header}>
//                 <Text style={styles.title}>{item.title}</Text>
//                 <Text style={styles.divider}>|</Text>
//                 <Text style={styles.subtitle}>{item.subtitle}</Text>
//                 <TouchableOpacity onPress={() => handleEditTask(item)}>
//                   <Image
//                     source={{
//                       uri: 'https://cdn-icons-png.flaticon.com/512/84/84380.png',
//                     }}
//                     style={styles.editIcon}
//                   />
//                 </TouchableOpacity>
//               </View>

//               <View style={styles.statusContainer}>
//                 <View style={[styles.statusItem, styles.grayBackground]}>
//                   <Text style={styles.statusNumber}>{item.status.collected}</Text>
//                   <Text style={styles.statusLabel}>Dikumpulkan</Text>
//                 </View>
//                 <View style={[styles.statusItem, styles.greenBackground]}>
//                   <Text style={styles.statusNumber}>{item.status.graded}</Text>
//                   <Text style={styles.statusLabel}>Dinilai</Text>
//                 </View>
//                 <View style={[styles.statusItem, styles.redBackground]}>
//                   <Text style={styles.statusNumber}>{item.status.assigned}</Text>
//                   <Text style={styles.statusLabel}>Ditugaskan</Text>
//                 </View>
//               </View>

//               <TouchableOpacity
//                 style={styles.arrowButton}
//                 onPress={() => toggleClass(item.id)}
//               >
//                 <Image
//                   source={{
//                     uri:
//                       selectedClass === item.id
//                         ? 'https://cdn-icons-png.flaticon.com/512/271/271228.png'
//                         : 'https://cdn-icons-png.flaticon.com/512/271/271210.png',
//                   }}
//                   style={styles.arrowIcon}
//                 />
//               </TouchableOpacity>
//             </View>

//             {selectedClass === item.id && (
//               <View style={styles.lowerSection}>
//                 {item.students.map((student, index) => (
//                   <View key={index} style={styles.studentRow}>
//                     <Image
//                       source={{ uri: student.profileImage }}
//                       style={styles.profileImage}
//                     />
//                     <View style={styles.studentInfo}>
//                       <Text style={styles.studentName}>{student.name}</Text>
//                     </View>
//                     <TouchableOpacity
//                       style={[
//                         styles.scoreButton,
//                         student.status === 'graded'
//                           ? styles.gradedButton
//                           : styles.pendingButton,
//                       ]}
//                       onPress={() => handleOpenEditScore(student, item.id)}
//                     >
//                       <Text
//                         style={[
//                           styles.scoreButtonText,
//                           student.status === 'graded'
//                             ? styles.gradedText
//                             : styles.pendingText,
//                         ]}
//                       >
//                         {student.score}
//                       </Text>
//                     </TouchableOpacity>
//                   </View>
//                 ))}
//               </View>
//             )}
//           </View>
//         )}
//       />

//       {/* Modal for Editing Task */}
//       {editData && (
//         <ModalEditTask
//           visible={editTaskModalVisible}
//           classData={editData}
//           onClose={() => setEditTaskModalVisible(false)}
//           onSave={handleSaveTask}
//         />
//       )}

//       {/* Modal for Editing Score */}
//       <Modal
//         visible={editScoreModalVisible}
//         transparent={true}
//         animationType="slide"
//         onRequestClose={() => setEditScoreModalVisible(false)}
//       >
//         <View style={styles.scoreModalContainer}>
//           <View style={styles.scoreModalContent}>
//             <Text style={styles.modalTitle}>Edit Skor</Text>
//             <Text style={styles.label}>Nama: {editingStudent?.name}</Text>
//             <TextInput
//               style={styles.input}
//               value={newScore}
//               onChangeText={setNewScore}
//               placeholder="Masukkan skor baru"
//               keyboardType="numeric"
//             />
//             <View style={styles.modalActions}>
//               <TouchableOpacity
//                 style={[styles.saveButton, styles.modalButton]}
//                 onPress={handleSaveScore}
//               >
//                 <Text style={styles.saveButtonText}>Simpan</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[styles.cancelButton, styles.modalButton]}
//                 onPress={() => setEditScoreModalVisible(false)}
//               >
//                 <Text style={styles.cancelButtonText}>Batal</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const ModalEditTask = ({ visible, classData, onClose, onSave }) => {
//   const [taskTitle, setTaskTitle] = useState(classData.title);
//   const [taskSubtitle, setTaskSubtitle] = useState(classData.subtitle);
//   const [date, setDate] = useState(new Date());
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [attachments, setAttachments] = useState([]);

//   const resetInputs = () => {
//     setTaskTitle(classData.title);
//     setTaskSubtitle(classData.subtitle);
//     setDate(new Date());
//     setAttachments([]);
//   };

//   const handleClose = () => {
//     resetInputs();
//     onClose();
//   };

//   const onChangeDate = (event, selectedDate) => {
//     const currentDate = selectedDate || date;
//     setShowDatePicker(false);
//     setDate(currentDate);
//   };

//   const handleSave = () => {
//     onSave({
//       ...classData,
//       title: taskTitle,
//       subtitle: taskSubtitle,
//     });
//   };

//   return (
//     <Modal
//       visible={visible}
//       transparent={true}
//       animationType="slide"
//       onRequestClose={handleClose}
//     >
//       <View style={styles.modalContainer}>
//         <View style={styles.modalContent}>
//           <TouchableOpacity style={styles.backButton} onPress={handleClose}>
//             <Text style={styles.modalTitle}>Edit Tugas</Text>
//           </TouchableOpacity>

//           <Text style={styles.label}>Nama Tugas</Text>
//           <TextInput
//             style={styles.input}
//             value={taskTitle}
//             onChangeText={setTaskTitle}
//             placeholder="Nama Tugas"
//           />

//           <Text style={styles.label}>Instruksi</Text>
//           <TextInput
//             style={[styles.input, styles.textArea]}
//             value={taskSubtitle}
//             onChangeText={setTaskSubtitle}
//             placeholder="Instruksi"
//             multiline
//           />

//           <Text style={styles.label}>Tenggat</Text>
//           <TouchableOpacity
//             style={styles.dateInput}
//             onPress={() => setShowDatePicker(true)}
//           >
//             <Text style={styles.dateText}>
//               {date.toISOString().split('T')[0]}
//             </Text>
//           </TouchableOpacity>
//           {showDatePicker && (
//             <DateTimePicker
//               value={date}
//               mode="date"
//               display="default"
//               onChange={onChangeDate}
//             />
//           )}

//           <Text style={styles.label}>Lampiran</Text>
//           <TouchableOpacity
//             style={styles.addAttachmentButton}
//             onPress={() =>
//               setAttachments((prev) => [
//                 ...prev,
//                 `Lampiran_${prev.length + 1}.pdf`,
//               ])
//             }
//           >
//             <Text style={styles.addAttachmentText}>+ Tambahkan Lampiran</Text>
//           </TouchableOpacity>
//           {attachments.map((attachment, index) => (
//             <View key={index} style={styles.attachmentRow}>
//               <Text style={styles.attachmentText}>{attachment}</Text>
//               <TouchableOpacity
//                 onPress={() =>
//                   setAttachments((prev) =>
//                     prev.filter((_, i) => i !== index)
//                   )
//                 }
//               >
//                 <Text style={styles.removeAttachment}>❌</Text>
//               </TouchableOpacity>
//             </View>
//           ))}

//           <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
//             <Text style={styles.saveButtonText}>Simpan</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   // Main Container Styles 
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#F5F5F5',
//   },
//   cardContainer: {
//     marginVertical: 8,
//     borderRadius: 8,
//     backgroundColor: '#ECECEC',
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//   },

//   // Section Styles
//   upperSection: {
//     backgroundColor: '#ECECEC',
//     padding: 16,
//   },
//   lowerSection: {
//     backgroundColor: '#E3E3E3',
//     padding: 8,
//     borderTopWidth: 1,
//     borderTopColor: '#E5E7EB',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 16,
//   },

//   // Text Styles
//   title: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#111827',
//   },
//   divider: {
//     marginHorizontal: 8,
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#6B7280',
//   },
//   subtitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#6B7280',
//   },

//   // Icon Styles
//   editIcon: {
//     width: 16,
//     height: 16,
//   },
//   arrowIcon: {
//     width: 24,
//     height: 24,
//   },

//   // Status Styles
//   statusContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   statusItem: {
//     flex: 1,
//     alignItems: 'center',
//     paddingVertical: 8,
//     borderRadius: 8,
//     marginHorizontal: 4,
//   },
//   grayBackground: {
//     backgroundColor: '#E0E0E0',
//   },
//   greenBackground: {
//     backgroundColor: '#DFF4DC',
//   },
//   redBackground: {
//     backgroundColor: '#F9E1E1',
//   },
//   statusNumber: {
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   statusLabel: {
//     fontSize: 12,
//     marginTop: 4,
//     color: '#555',
//   },

//   // Button Styles
//   arrowButton: {
//     alignItems: 'center',
//     marginTop: 8,
//   },
//   backButton: {
//     marginBottom: 16,
//   },
//   saveButton: {
//     backgroundColor: '#161D6F',
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 16,
//   },
//   saveButtonText: {
//     color: '#fff',
//     fontWeight: '600',
//   },
//   cancelButton: {
//     backgroundColor: '#F5F5F5',
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   cancelButtonText: {
//     color: '#555',
//   },
//   addAttachmentButton: {
//     backgroundColor: '#E0F7FA',
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   addAttachmentText: {
//     color: '#007BFF',
//     fontWeight: '600',
//   },

//   // Student Row Styles
//   studentRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 12,
//     paddingHorizontal: 8,
//   },
//   profileImage: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//   },
//   studentInfo: {
//     flex: 1,
//     marginLeft: 12,
//   },
//   studentName: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#111827',
//   },

//   // Score Button Styles
//   scoreButton: {
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     borderRadius: 8,
//   },
//   gradedButton: {
//     backgroundColor: '#DFF4DC',
//   },
//   pendingButton: {
//     backgroundColor: '#F9E1E1',
//   },
//   scoreButtonText: {
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
//   gradedText: {
//     color: '#047857',
//   },
//   pendingText: {
//     color: '#B91C1C',
//   },

//   // Modal Styles
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     backgroundColor: '#fff',
//     padding: 16,
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//   },
//   scoreModalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   scoreModalContent: {
//     width: '90%',
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     padding: 16,
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 16,
//   },
//   modalActions: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   modalButton: {
//     flex: 1,
//     marginHorizontal: 8,
//   },

//   // Form Input Styles
//   label: {
//     fontSize: 14,
//     marginBottom: 8,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 16,
//   },
//   textArea: {
//     height: 80,
//     textAlignVertical: 'top',
//   },
//   dateInput: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 16,
//   },
//   dateText: {
//     fontSize: 14,
//     color: '#333',
//   },

//   // Attachment Styles
//   attachmentRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   attachmentText: {
//     fontSize: 14,
//     color: '#333',
//   },
//   removeAttachment: {
//     color: '#FF3D00',
//     fontSize: 18,
//   },
// });

// export default CardTugasGuru;