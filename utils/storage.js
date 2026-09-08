import AsyncStorage from '@react-native-async-storage/async-storage';

const WORKOUTS_KEY = '@feelfit/workouts';

export async function loadWorkouts() {
  try {
    const raw = await AsyncStorage.getItem(WORKOUTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn('Failed to load workouts', err);
    return [];
  }
}

export async function saveWorkouts(workouts) {
  try {
    await AsyncStorage.setItem(WORKOUTS_KEY, JSON.stringify(workouts));
  } catch (err) {
    console.warn('Failed to save workouts', err);
  }
}

export async function addWorkout(workout) {
  const workouts = await loadWorkouts();
  const updated = [workout, ...workouts];
  await saveWorkouts(updated);
  return updated;
}

export function generateId() {
  return 'workout_' + Date.now() + '_' + Math.floor(Math.random() * 10000);
}
export async function deleteWorkout(id) {
  const workouts = await loadWorkouts();
  const updated = workouts.filter((w) => w.id !== id);
  await saveWorkouts(updated);
  return updated;
}

export async function updateWorkout(id, updatedFields) {
  const workouts = await loadWorkouts();
  const updated = workouts.map((w) => (w.id === id ? { ...w, ...updatedFields } : w));
  await saveWorkouts(updated);
  return updated;
}

const CUSTOM_EXERCISES_KEY = '@feelfit/customExercises';

export async function loadCustomExercises() {
  try {
    const raw = await AsyncStorage.getItem(CUSTOM_EXERCISES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn('Failed to load custom exercises', err);
    return [];
  }
}

export async function saveCustomExercises(customExercises) {
  try {
    await AsyncStorage.setItem(CUSTOM_EXERCISES_KEY, JSON.stringify(customExercises));
  } catch (err) {
    console.warn('Failed to save custom exercises', err);
  }
}

export async function addCustomExercise(exercise) {
  const customExercises = await loadCustomExercises();
  const updated = [...customExercises, exercise];
  await saveCustomExercises(updated);
  return updated;
}

export async function updateCustomExercise(id, updatedFields) {
  const customExercises = await loadCustomExercises();
  const updated = customExercises.map((e) => (e.id === id ? { ...e, ...updatedFields } : e));
  await saveCustomExercises(updated);
  return updated;
}

export async function deleteCustomExercise(id) {
  const customExercises = await loadCustomExercises();
  const updated = customExercises.filter((e) => e.id !== id);
  await saveCustomExercises(updated);
  return updated;
}