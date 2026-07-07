import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { EXERCISES } from './data/exercises';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>Feelfit</Text>
      <Text style={styles.subtitle}>Pick exercises for your workout</Text>

      <FlatList
        data={EXERCISES}
        keyExtractor={(item) => item.id}
        style={styles.list}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.exerciseName}>{item.name}</Text>
            <Text style={styles.exerciseCategory}>{item.category}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F1115', paddingTop: 60, paddingHorizontal: 16 },
  title: { color: '#F5F6F7', fontSize: 28, fontWeight: '700' },
  subtitle: { color: '#9AA1AC', fontSize: 14, marginTop: 4, marginBottom: 16 },
  list: { flex: 1 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1B1E24',
    padding: 14,
    borderRadius: 10,
    marginBottom: 8,
  },
  exerciseName: { color: '#F5F6F7', fontSize: 15 },
  exerciseCategory: { color: '#9AA1AC', fontSize: 13 },
});