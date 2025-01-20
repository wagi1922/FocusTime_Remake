// src/components/CardTugasGuru/styles.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // Main Container Styles 
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  cardContainer: {
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: '#ECECEC',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  
  },

  // Section Styles
  upperSection: {
    backgroundColor: '#ECECEC',
    padding: 16,
  },
  lowerSection: {
    backgroundColor: '#E3E3E3',
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  // Text Styles
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  divider: {
    marginHorizontal: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6B7280',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6B7280',
  },

  // Icon Styles
  editIcon: {
    width: 16,
    height: 16,
  },
  arrowIcon: {
    width: 24,
    height: 24,
  },

  // Status Styles
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  grayBackground: {
    backgroundColor: '#E0E0E0',
  },
  greenBackground: {
    backgroundColor: '#DFF4DC',
  },
  redBackground: {
    backgroundColor: '#F9E1E1',
  },
  statusNumber: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statusLabel: {
    fontSize: 12,
    marginTop: 4,
    color: '#555',
  },

  // Button Styles
  arrowButton: {
    alignItems: 'center',
    marginTop: 8,
  },
  backButton: {
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: '#161D6F',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#555',
  },
  addAttachmentButton: {
    backgroundColor: '#E0F7FA',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  addAttachmentText: {
    color: '#007BFF',
    fontWeight: '600',
  },

  // Student Row Styles
  studentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  studentInfo: {
    flex: 1,
    marginLeft: 12,
  },
  studentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },

  // Score Button Styles
  scoreButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  gradedButton: {
    backgroundColor: '#DFF4DC',
  },
  pendingButton: {
    backgroundColor: '#F9E1E1',
  },
  scoreButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  gradedText: {
    color: '#047857',
  },
  pendingText: {
    color: '#B91C1C',
  },

  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  scoreModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  scoreModalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 8,
  },

  // Form Input Styles
  label: {
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  dateText: {
    fontSize: 14,
    color: '#333',
  },

  // Attachment Styles
  attachmentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  attachmentText: {
    fontSize: 14,
    color: '#333',
  },
  removeAttachment: {
    color: '#FF3D00',
    fontSize: 18,
  },


  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#000080",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
});