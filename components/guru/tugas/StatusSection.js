// src/components/CardTugasGuru/StatusSection.js
import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

const StatusSection = ({ status }) => {
  return (
    <View style={styles.statusContainer}>
      <View style={[styles.statusItem, styles.grayBackground]}>
        <Text style={styles.statusNumber}>{status.collected}</Text>
        <Text style={styles.statusLabel}>Dikumpulkan</Text>
      </View>
      <View style={[styles.statusItem, styles.greenBackground]}>
        <Text style={styles.statusNumber}>{status.graded}</Text>
        <Text style={styles.statusLabel}>Dinilai</Text>
      </View>
      <View style={[styles.statusItem, styles.redBackground]}>
        <Text style={styles.statusNumber}>{status.assigned}</Text>
        <Text style={styles.statusLabel}>Ditugaskan</Text>
      </View>
    </View>
  );
};

export default StatusSection;
