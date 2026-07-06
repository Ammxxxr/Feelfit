import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Day 1: just confirming the project boots and renders on a real device
// via Expo Go. No navigation, no storage yet — that comes next.
export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>Feelfit</Text>
      <Text style={styles.subtitle}>Project scaffolding is live 👋</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F1115',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { color: '#F5F6F7', fontSize: 32, fontWeight: '700' },
  subtitle: { color: '#9AA1AC', fontSize: 14, marginTop: 8 },
});
