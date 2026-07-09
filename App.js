import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { EXERCISES, EXERCISE_CATEGORIES } from './data/exercises';

export default function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedIds, setSelectedIds] = useState([]);

  const categories = ['All', ...EXERCISE_CATEGORIES];
  const filtered =
    activeCategory === 'All' ? EXERCISES : EXERCISES.filter((e) => e.category === activeCategory);

  const toggleExercise = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>Feelfit</Text>
      <Text style={styles.subtitle}>
        {selectedIds.length > 0 ? `${selectedIds.length} selected` : 'Pick exercises for your workout'}
      </Text>

      <FlatList
        horizontal
        data={categories}
        keyExtractor={(c) => c}
        showsHorizontalScrollIndicator={false}
        style={styles.categoryRow}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.chip, activeCategory === item && styles.chipActive]}
            onPress={() => setActiveCategory(item)}
          >
            <Text style={activeCategory === item ? styles.chipTextActive : styles.chipText}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        style={styles.list}
        renderItem={({ item }) => {
          const selected = selectedIds.includes(item.id);
          return (
            <TouchableOpacity
              style={[styles.row, selected && styles.rowSelected]}
              onPress={() => toggleExercise(item.id)}
            >
              <Text style={styles.exerciseName}>{item.name}</Text>
              <Text style={styles.exerciseCategory}>{item.category}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F1115', paddingTop: 60, paddingHorizontal: 16 },
  title: { color: '#F5F6F7', fontSize: 28, fontWeight: '700' },
  subtitle: { color: '#9AA1AC', fontSize: 14, marginTop: 4, marginBottom: 12 },
  categoryRow: { flexGrow: 0, marginBottom: 12 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#1B1E24',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#2A2E37',
  },
  chipActive: { backgroundColor: '#4ADE80', borderColor: '#4ADE80' },
  chipText: { color: '#9AA1AC', fontSize: 13 },
  chipTextActive: { color: '#0F1115', fontSize: 13, fontWeight: '700' },
  list: { flex: 1 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1B1E24',
    padding: 14,
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#2A2E37',
  },
  rowSelected: { borderColor: '#4ADE80' },
  exerciseName: { color: '#F5F6F7', fontSize: 15 },
  exerciseCategory: { color: '#9AA1AC', fontSize: 13 },
});