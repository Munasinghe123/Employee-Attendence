import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function AttendanceCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Attendance</Text>

      <View style={styles.statusRow}>
        <View style={styles.dot} />
        <Text style={styles.statusText}>Not Checked In</Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Check In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    marginTop: 20,
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 12,
  },

  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#9ca3af',
    marginRight: 8,
  },

  statusText: {
    fontSize: 13,
    color: '#6b7280',
    fontWeight: '500',
  },

  button: {
    backgroundColor: '#047417',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
});

