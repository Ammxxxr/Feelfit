jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  loadWorkouts,
  saveWorkouts,
  addWorkout,
  deleteWorkout,
  updateWorkout,
  generateId,
  loadCustomExercises,
  saveCustomExercises,
  addCustomExercise,
  updateCustomExercise,
  deleteCustomExercise,
} from './storage';

beforeEach(async () => {
  await AsyncStorage.clear();
});

describe('generateId', () => {
  test('generates a non-empty string', () => {
    expect(typeof generateId()).toBe('string');
    expect(generateId().length).toBeGreaterThan(0);
  });

  test('generates different ids on repeated calls', () => {
    const id1 = generateId();
    const id2 = generateId();
    expect(id1).not.toBe(id2);
  });
});

describe('workouts storage', () => {
  test('loadWorkouts returns an empty array when nothing is stored', async () => {
    const workouts = await loadWorkouts();
    expect(workouts).toEqual([]);
  });

  test('saveWorkouts followed by loadWorkouts round-trips the data', async () => {
    const sample = [{ id: 'w1', date: '2026-01-01T00:00:00.000Z', exercises: [] }];
    await saveWorkouts(sample);
    const loaded = await loadWorkouts();
    expect(loaded).toEqual(sample);
  });

  test('addWorkout puts the new workout at the front of the list', async () => {
    await saveWorkouts([{ id: 'old', date: '2026-01-01T00:00:00.000Z', exercises: [] }]);
    const updated = await addWorkout({ id: 'new', date: '2026-01-02T00:00:00.000Z', exercises: [] });
    expect(updated[0].id).toBe('new');
    expect(updated).toHaveLength(2);
  });

  test('deleteWorkout removes only the matching workout', async () => {
    await saveWorkouts([
      { id: 'keep', date: '2026-01-01T00:00:00.000Z', exercises: [] },
      { id: 'remove', date: '2026-01-02T00:00:00.000Z', exercises: [] },
    ]);
    const updated = await deleteWorkout('remove');
    expect(updated).toHaveLength(1);
    expect(updated[0].id).toBe('keep');
  });

  test('updateWorkout merges fields into the matching workout without touching others', async () => {
    await saveWorkouts([
      { id: 'w1', date: '2026-01-01T00:00:00.000Z', name: null, exercises: [] },
      { id: 'w2', date: '2026-01-02T00:00:00.000Z', name: null, exercises: [] },
    ]);
    const updated = await updateWorkout('w1', { name: 'Push Day' });
    const w1 = updated.find((w) => w.id === 'w1');
    const w2 = updated.find((w) => w.id === 'w2');
    expect(w1.name).toBe('Push Day');
    expect(w2.name).toBeNull();
  });
});

describe('custom exercises storage', () => {
  test('loadCustomExercises returns an empty array when nothing is stored', async () => {
    const exercises = await loadCustomExercises();
    expect(exercises).toEqual([]);
  });

  test('addCustomExercise appends to the end of the list', async () => {
    await saveCustomExercises([{ id: 'e1', name: 'First', category: 'Arms' }]);
    const updated = await addCustomExercise({ id: 'e2', name: 'Second', category: 'Legs' });
    expect(updated).toHaveLength(2);
    expect(updated[1].id).toBe('e2');
  });

  test('updateCustomExercise merges fields into the matching exercise', async () => {
    await saveCustomExercises([{ id: 'e1', name: 'Old Name', category: 'Arms' }]);
    const updated = await updateCustomExercise('e1', { name: 'New Name' });
    expect(updated[0].name).toBe('New Name');
    expect(updated[0].category).toBe('Arms');
  });

  test('deleteCustomExercise removes only the matching exercise', async () => {
    await saveCustomExercises([
      { id: 'e1', name: 'Keep', category: 'Arms' },
      { id: 'e2', name: 'Remove', category: 'Legs' },
    ]);
    const updated = await deleteCustomExercise('e2');
    expect(updated).toHaveLength(1);
    expect(updated[0].id).toBe('e1');
  });
});