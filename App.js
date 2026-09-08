import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, Alert, SafeAreaView, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { EXERCISES, EXERCISE_CATEGORIES } from './data/exercises';
import {
  addWorkout,
  generateId,
  loadWorkouts,
  deleteWorkout,
  updateWorkout,
  loadCustomExercises,
  addCustomExercise,
  updateCustomExercise,
  deleteCustomExercise,
} from './utils/storage';
import {
  getExerciseName,
  formatDuration,
  getThisWeekWorkouts,
  getTotalTimeSeconds,
  getMostFrequentExercise,
} from './utils/helpers';

function ExercisePickerScreen({
  allExercises,
  customExerciseIds,
  onStart,
  onAddExercise,
  onUpdateExercise,
  onDeleteExercise,
}) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedIds, setSelectedIds] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingExerciseId, setEditingExerciseId] = useState(null);
  const [newExerciseName, setNewExerciseName] = useState('');
  const [newExerciseCategory, setNewExerciseCategory] = useState(EXERCISE_CATEGORIES[0]);

  const categories = ['All', ...EXERCISE_CATEGORIES];
  const filtered =
    activeCategory === 'All' ? allExercises : allExercises.filter((e) => e.category === activeCategory);

  const toggleExercise = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const closeForm = () => {
    setShowAddForm(false);
    setEditingExerciseId(null);
    setNewExerciseName('');
    setNewExerciseCategory(EXERCISE_CATEGORIES[0]);
  };

  const handleSaveExerciseForm = () => {
    const trimmed = newExerciseName.trim();
    if (!trimmed) {
      Alert.alert('Missing name', 'Enter a name for the exercise.');
      return;
    }
    if (editingExerciseId) {
      onUpdateExercise(editingExerciseId, { name: trimmed, category: newExerciseCategory });
    } else {
      onAddExercise({ id: generateId(), name: trimmed, category: newExerciseCategory });
    }
    closeForm();
  };

  const startEditExercise = (item) => {
    setEditingExerciseId(item.id);
    setNewExerciseName(item.name);
    setNewExerciseCategory(item.category);
    setShowAddForm(true);
  };

  const confirmDeleteExercise = (item) => {
    Alert.alert(
      'Delete exercise?',
      `"${item.name}" will be removed. Past workouts that used it will still show but with an "Unknown exercise" label.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            onDeleteExercise(item.id);
            setSelectedIds((prev) => prev.filter((id) => id !== item.id));
          },
        },
      ]
    );
  };

  const handleLongPressExercise = (item) => {
    if (!customExerciseIds.includes(item.id)) {
      return;
    }
    Alert.alert(item.name, 'What would you like to do with this exercise?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Edit', onPress: () => startEditExercise(item) },
      { text: 'Delete', style: 'destructive', onPress: () => confirmDeleteExercise(item) },
    ]);
  };

  return (
    <View style={{ flex: 1 }}>
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
              onLongPress={() => handleLongPressExercise(item)}
            >
              <Text style={styles.exerciseName}>{item.name}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                {customExerciseIds.includes(item.id) && (
                  <Text style={styles.customBadge}>Custom</Text>
                )}
                <Text style={styles.exerciseCategory}>{item.category}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />

      {showAddForm ? (
        <View style={styles.exerciseBlock}>
          <TextInput
            style={styles.nameInput}
            placeholder="Exercise name"
            placeholderTextColor="#9AA1AC"
            value={newExerciseName}
            onChangeText={setNewExerciseName}
          />
          <FlatList
            horizontal
            data={EXERCISE_CATEGORIES}
            keyExtractor={(c) => c}
            showsHorizontalScrollIndicator={false}
            style={styles.categoryRow}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.chip, newExerciseCategory === item && styles.chipActive]}
                onPress={() => setNewExerciseCategory(item)}
              >
                <Text style={newExerciseCategory === item ? styles.chipTextActive : styles.chipText}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <TouchableOpacity style={styles.cancelButton} onPress={closeForm}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.startButton, { flex: 1 }]} onPress={handleSaveExerciseForm}>
              <Text style={styles.startButtonText}>
                {editingExerciseId ? 'Save Changes' : 'Save Exercise'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity style={styles.cancelButton} onPress={() => setShowAddForm(true)}>
          <Text style={styles.cancelButtonText}>+ Add Exercise</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={[styles.startButton, selectedIds.length === 0 && styles.startButtonDisabled]}
        onPress={() => selectedIds.length > 0 && onStart(selectedIds)}
        disabled={selectedIds.length === 0}
      >
        <Text style={styles.startButtonText}>
          Start Workout {selectedIds.length > 0 ? `(${selectedIds.length})` : ''}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function Timer({ onTick }) {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => {
          const next = s + 1;
          onTick(next);
          return next;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);
  return (
    <View style={styles.timerBlock}>
      <Text style={styles.timerText}>{formatDuration(seconds)}</Text>
      <TouchableOpacity style={styles.timerButton} onPress={() => setRunning((r) => !r)}>
        <Text style={styles.timerButtonText}>{running ? 'Pause' : 'Resume'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const CATEGORY_DEMOS = {
  Chest: { type: 'pressOut', caption: 'Press out, then draw back in' },
  Back: { type: 'pullIn', caption: 'Pull in, then extend back out' },
  Legs: { type: 'squat', caption: 'Bend down, then stand back up' },
  Shoulders: { type: 'pressUp', caption: 'Press up overhead, then lower' },
  Arms: { type: 'curl', caption: 'Curl up, then lower back down' },
  Core: { type: 'contract', caption: 'Contract in, then release' },
};

function ExerciseDemo({ category }) {
  const animValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(animValue, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(animValue, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [animValue]);

  const config = CATEGORY_DEMOS[category] || CATEGORY_DEMOS.Legs;

  let animatedStyle;
  switch (config.type) {
    case 'pressUp':
      animatedStyle = {
        transform: [{ translateY: animValue.interpolate({ inputRange: [0, 1], outputRange: [0, -18] }) }],
      };
      break;
    case 'pressOut':
      animatedStyle = {
        transform: [{ translateX: animValue.interpolate({ inputRange: [0, 1], outputRange: [0, 16] }) }],
      };
      break;
    case 'pullIn':
      animatedStyle = {
        transform: [{ translateX: animValue.interpolate({ inputRange: [0, 1], outputRange: [0, -16] }) }],
      };
      break;
    case 'curl':
      animatedStyle = {
        transform: [{ rotate: animValue.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '-40deg'] }) }],
      };
      break;
    case 'contract':
      animatedStyle = {
        transform: [{ scale: animValue.interpolate({ inputRange: [0, 1], outputRange: [1, 0.7] }) }],
      };
      break;
    case 'squat':
    default:
      animatedStyle = {
        transform: [{ translateY: animValue.interpolate({ inputRange: [0, 1], outputRange: [0, 18] }) }],
      };
      break;
  }

  return (
    <View style={styles.demoContainer}>
      <View style={styles.demoTrack}>
        <Animated.View style={[styles.demoShape, animatedStyle]} />
      </View>
      <Text style={styles.demoCaption}>{config.caption}</Text>
    </View>
  );
}

function ActiveWorkoutScreen({ draft, allExercises, onFinish, onCancel }) {
  const [exercises, setExercises] = useState(
    draft.map((exerciseId) => ({ exerciseId, sets: [] }))
  );
  const [workoutName, setWorkoutName] = useState('');
  const [repsInput, setRepsInput] = useState({});
  const [weightInput, setWeightInput] = useState({});
  const [seconds, setSeconds] = useState(0);
  const [demoVisibleIds, setDemoVisibleIds] = useState([]);

 const addSet = (exerciseId) => {
    const reps = parseInt(repsInput[exerciseId], 10);
    const weight = parseFloat(weightInput[exerciseId]) || 0;
    if (!reps || reps <= 0 || reps > 500) {
      Alert.alert('Invalid reps', 'Enter a rep count between 1 and 500.');
      return;
    }
    if (weight < 0 || weight > 500) {
      Alert.alert('Invalid weight', 'Enter a weight between 0 and 500kg.');
      return;
    }
    setExercises((prev) =>
      prev.map((e) =>
        e.exerciseId === exerciseId ? { ...e, sets: [...e.sets, { reps, weight }] } : e
      )
    );
    setRepsInput((prev) => ({ ...prev, [exerciseId]: '' }));
    setWeightInput((prev) => ({ ...prev, [exerciseId]: '' }));
  };

  const toggleDemo = (exerciseId) => {
    setDemoVisibleIds((prev) =>
      prev.includes(exerciseId) ? prev.filter((id) => id !== exerciseId) : [...prev, exerciseId]
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Timer onTick={setSeconds} />
      <TextInput
        style={styles.nameInput}
        placeholder="Workout name (optional)"
        placeholderTextColor="#9AA1AC"
        value={workoutName}
        onChangeText={setWorkoutName}
      />

      <Text style={styles.subtitle}>Log your sets below</Text>
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.exerciseId}
        style={styles.list}
        renderItem={({ item }) => (
          <View style={styles.exerciseBlock}>
            <Text style={styles.exerciseBlockTitle}>{getExerciseName(item.exerciseId, allExercises)}</Text>

            <TouchableOpacity onPress={() => toggleDemo(item.exerciseId)}>
              <Text style={styles.demoToggleText}>
                {demoVisibleIds.includes(item.exerciseId) ? 'Hide Demo' : 'Show Demo'}
              </Text>
            </TouchableOpacity>

            {demoVisibleIds.includes(item.exerciseId) && (
              <ExerciseDemo
                category={(allExercises.find((e) => e.id === item.exerciseId) || {}).category}
              />
            )}

            {item.sets.map((set, idx) => (
              <Text key={idx} style={styles.setLine}>
                Set {idx + 1}: {set.reps} reps{set.weight ? ` @ ${set.weight}kg` : ''}
              </Text>
            ))}

            <View style={styles.setInputRow}>
              <TextInput
                style={styles.setInput}
                placeholder="Reps"
                placeholderTextColor="#9AA1AC"
                keyboardType="number-pad"
                value={repsInput[item.exerciseId] || ''}
                onChangeText={(v) => setRepsInput((prev) => ({ ...prev, [item.exerciseId]: v }))}
              />
              <TextInput
                style={styles.setInput}
                placeholder="Weight (kg)"
                placeholderTextColor="#9AA1AC"
                keyboardType="decimal-pad"
                value={weightInput[item.exerciseId] || ''}
                onChangeText={(v) => setWeightInput((prev) => ({ ...prev, [item.exerciseId]: v }))}
              />
              <TouchableOpacity style={styles.addSetButton} onPress={() => addSet(item.exerciseId)}>
                <Text style={styles.addSetButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

 <View style={{ flexDirection: 'row', gap: 8 }}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => {
            const totalSets = exercises.reduce((sum, e) => sum + e.sets.length, 0);
            if (totalSets === 0 && !workoutName.trim()) {
              onCancel();
              return;
            }
            Alert.alert('Discard this workout?', 'Any logged sets and the workout name will be lost. This cannot be undone.', [
              { text: 'Keep Going', style: 'cancel' },
              { text: 'Discard', style: 'destructive', onPress: onCancel },
            ]);
          }}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.startButton, { flex: 1 }]}
          onPress={() => {
            const totalSets = exercises.reduce((sum, e) => sum + e.sets.length, 0);
            if (totalSets === 0) {
              Alert.alert('No sets logged', 'Log at least one set before finishing the workout.');
              return;
            }
            onFinish(exercises, seconds, workoutName);
          }}
        >
          <Text style={styles.startButtonText}>Finish Workout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
function EditWorkoutScreen({ workout, allExercises, onSave, onCancel }) {
  const [exercises, setExercises] = useState(
    workout.exercises.map((e) => ({ exerciseId: e.exerciseId, sets: [...e.sets] }))
  );
  const [workoutName, setWorkoutName] = useState(workout.name || '');
  const [repsInput, setRepsInput] = useState({});
  const [weightInput, setWeightInput] = useState({});
  const initialSnapshot = useRef(
    JSON.stringify({
      exercises: workout.exercises.map((e) => ({ exerciseId: e.exerciseId, sets: [...e.sets] })),
      name: workout.name || '',
    })
  ).current;

  const addSet = (exerciseId) => {
    const reps = parseInt(repsInput[exerciseId], 10);
    const weight = parseFloat(weightInput[exerciseId]) || 0;
    if (!reps || reps <= 0 || reps > 500) {
      Alert.alert('Invalid reps', 'Enter a rep count between 1 and 500.');
      return;
    }
    if (weight < 0 || weight > 500) {
      Alert.alert('Invalid weight', 'Enter a weight between 0 and 500kg.');
      return;
    }
    setExercises((prev) =>
      prev.map((e) =>
        e.exerciseId === exerciseId ? { ...e, sets: [...e.sets, { reps, weight }] } : e
      )
    );
    setRepsInput((prev) => ({ ...prev, [exerciseId]: '' }));
    setWeightInput((prev) => ({ ...prev, [exerciseId]: '' }));
  };

  const removeSet = (exerciseId, setIdx) => {
    setExercises((prev) =>
      prev.map((e) =>
        e.exerciseId === exerciseId
          ? { ...e, sets: e.sets.filter((_, idx) => idx !== setIdx) }
          : e
      )
    );
  };

  const handleSave = () => {
    const totalSets = exercises.reduce((sum, e) => sum + e.sets.length, 0);
    if (totalSets === 0) {
      Alert.alert('No sets logged', 'A workout needs at least one set.');
      return;
    }
    onSave({
      exercises,
      name: workoutName && workoutName.trim() ? workoutName.trim() : null,
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.subtitle}>Editing workout</Text>

      <TextInput
        style={styles.nameInput}
        placeholder="Workout name (optional)"
        placeholderTextColor="#9AA1AC"
        value={workoutName}
        onChangeText={setWorkoutName}
      />

      <FlatList
        data={exercises}
        keyExtractor={(item) => item.exerciseId}
        style={styles.list}
        renderItem={({ item }) => (
          <View style={styles.exerciseBlock}>
            <Text style={styles.exerciseBlockTitle}>{getExerciseName(item.exerciseId, allExercises)}</Text>

            {item.sets.map((set, idx) => (
              <View key={idx} style={styles.editSetRow}>
                <Text style={styles.setLine}>
                  Set {idx + 1}: {set.reps} reps{set.weight ? ` @ ${set.weight}kg` : ''}
                </Text>
                <TouchableOpacity onPress={() => removeSet(item.exerciseId, idx)}>
                  <Text style={styles.deleteText}>Remove</Text>
                </TouchableOpacity>
              </View>
            ))}

            <View style={styles.setInputRow}>
              <TextInput
                style={styles.setInput}
                placeholder="Reps"
                placeholderTextColor="#9AA1AC"
                keyboardType="number-pad"
                value={repsInput[item.exerciseId] || ''}
                onChangeText={(v) => setRepsInput((prev) => ({ ...prev, [item.exerciseId]: v }))}
              />
              <TextInput
                style={styles.setInput}
                placeholder="Weight (kg)"
                placeholderTextColor="#9AA1AC"
                keyboardType="decimal-pad"
                value={weightInput[item.exerciseId] || ''}
                onChangeText={(v) => setWeightInput((prev) => ({ ...prev, [item.exerciseId]: v }))}
              />
              <TouchableOpacity style={styles.addSetButton} onPress={() => addSet(item.exerciseId)}>
                <Text style={styles.addSetButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

  <View style={{ flexDirection: 'row', gap: 8 }}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => {
            const currentSnapshot = JSON.stringify({ exercises, name: workoutName });
            if (currentSnapshot === initialSnapshot) {
              onCancel();
              return;
            }
            Alert.alert('Discard these changes?', 'Any edits you made will be lost.', [
              { text: 'Keep Editing', style: 'cancel' },
              { text: 'Discard', style: 'destructive', onPress: onCancel },
            ]);
          }}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.startButton, { flex: 1 }]} onPress={handleSave}>
          <Text style={styles.startButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function HistoryScreen({ workouts, allExercises, onDelete, onEdit, onDuplicate }) {
  if (workouts.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyText}>No workouts yet</Text>
        <Text style={styles.emptySubtext}>Finish a workout on Home to see it here</Text>
      </View>
    );
  }

  const confirmDelete = (id) => {
    Alert.alert('Delete workout?', 'This cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => onDelete(id) },
    ]);
  };

  return (
    <FlatList
      data={workouts}
      keyExtractor={(item) => item.id}
      style={styles.list}
      renderItem={({ item }) => {
        const date = new Date(item.date);
        const dateLabel = date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
        return (
          <View style={styles.workoutCard}>
        <View style={styles.workoutHeaderRow}>
              <View>
                <Text style={styles.workoutDate}>{item.name ? item.name : dateLabel}</Text>
                {item.name && <Text style={styles.workoutSubDate}>{dateLabel}</Text>}
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                {typeof item.durationSeconds === 'number' && (
                  <Text style={styles.workoutDuration}>{formatDuration(item.durationSeconds)}</Text>
                )}
              <TouchableOpacity onPress={() => onDuplicate(item)}>
                  <Text style={styles.duplicateText}>Use Again</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onEdit(item)}>
                  <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => confirmDelete(item.id)}>
                  <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
            {item.exercises.map((ex, idx) => (
              <View key={idx} style={{ marginTop: 4 }}>
                <Text style={styles.workoutExercise}>• {getExerciseName(ex.exerciseId, allExercises)}</Text>
                {ex.sets.map((set, sIdx) => (
                  <Text key={sIdx} style={styles.workoutSet}>
                    &nbsp;&nbsp;Set {sIdx + 1}: {set.reps} reps{set.weight ? ` @ ${set.weight}kg` : ''}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        );
      }}
    />
  );
}

function StatsScreen({ workouts, allExercises }) {
  if (workouts.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyText}>No stats yet</Text>
        <Text style={styles.emptySubtext}>Finish a workout to start tracking progress</Text>
      </View>
    );
  }

  const thisWeek = getThisWeekWorkouts(workouts);
  const totalSeconds = getTotalTimeSeconds(workouts);
  const topExercise = getMostFrequentExercise(workouts);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>This Week</Text>
          <Text style={styles.statValue}>{thisWeek.length}</Text>
          <Text style={styles.statSub}>workouts</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Total Time</Text>
          <Text style={styles.statValue}>{formatDuration(totalSeconds)}</Text>
          <Text style={styles.statSub}>all-time</Text>
        </View>
      </View>

      <View style={styles.statBlock}>
        <Text style={styles.statLabel}>Most Frequent Exercise</Text>
        <Text style={styles.statValueSmall}>
          {topExercise.exerciseId ? getExerciseName(topExercise.exerciseId, allExercises) : '—'}
        </Text>
        {topExercise.count > 0 && (
          <Text style={styles.statSub}>{topExercise.count} sessions</Text>
        )}
      </View>
    </View>
  );
}

export default function App() {
  const [tab, setTab] = useState('home');
  const [workouts, setWorkouts] = useState([]);
  const [activeDraft, setActiveDraft] = useState(null);
  const [customExercises, setCustomExercises] = useState([]);
  const [editingWorkout, setEditingWorkout] = useState(null);

  const allExercises = [...EXERCISES, ...customExercises];
  const customExerciseIds = customExercises.map((e) => e.id);

  const refreshWorkouts = useCallback(() => {
    loadWorkouts().then(setWorkouts);
  }, []);

  useEffect(() => {
    refreshWorkouts();
    loadCustomExercises().then(setCustomExercises);
  }, [refreshWorkouts]);

  const handleAddExercise = async (exercise) => {
    const updated = await addCustomExercise(exercise);
    setCustomExercises(updated);
  };

  const handleUpdateCustomExercise = async (id, updatedFields) => {
    const updated = await updateCustomExercise(id, updatedFields);
    setCustomExercises(updated);
  };

  const handleDeleteCustomExercise = async (id) => {
    const updated = await deleteCustomExercise(id);
    setCustomExercises(updated);
  };

  const handleFinish = async (exercises, durationSeconds, name) => {
    const workout = {
      id: generateId(),
      date: new Date().toISOString(),
      durationSeconds,
      name: name && name.trim() ? name.trim() : null,
      exercises,
    };
    await addWorkout(workout);
    setActiveDraft(null);
    Alert.alert('Workout saved', `Saved a ${formatDuration(durationSeconds)} workout with ${exercises.length} exercises.`);
    refreshWorkouts();
  };

  const handleSaveEdit = async (updatedFields) => {
    await updateWorkout(editingWorkout.id, updatedFields);
    setEditingWorkout(null);
    refreshWorkouts();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>Feelfit</Text>

      {!activeDraft && !editingWorkout && (
        <View style={styles.tabRow}>
          <TouchableOpacity
            style={[styles.tabButton, tab === 'home' && styles.tabButtonActive]}
            onPress={() => setTab('home')}
          >
            <Text style={tab === 'home' ? styles.tabTextActive : styles.tabText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, tab === 'history' && styles.tabButtonActive]}
            onPress={() => {
              setTab('history');
              refreshWorkouts();
            }}
          >
            <Text style={tab === 'history' ? styles.tabTextActive : styles.tabText}>History</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, tab === 'stats' && styles.tabButtonActive]}
            onPress={() => {
              setTab('stats');
              refreshWorkouts();
            }}
          >
            <Text style={tab === 'stats' ? styles.tabTextActive : styles.tabText}>Stats</Text>
          </TouchableOpacity>
        </View>
      )}

      {editingWorkout ? (
        <EditWorkoutScreen
          workout={editingWorkout}
          allExercises={allExercises}
          onSave={handleSaveEdit}
          onCancel={() => setEditingWorkout(null)}
        />
      ) : activeDraft ? (
        <ActiveWorkoutScreen
          draft={activeDraft}
          allExercises={allExercises}
          onFinish={handleFinish}
          onCancel={() => setActiveDraft(null)}
        />
      ) : tab === 'home' ? (
        <ExercisePickerScreen
          allExercises={allExercises}
          customExerciseIds={customExerciseIds}
          onStart={(ids) => setActiveDraft(ids)}
          onAddExercise={handleAddExercise}
          onUpdateExercise={handleUpdateCustomExercise}
          onDeleteExercise={handleDeleteCustomExercise}
        />
      ) : tab === 'history' ? (
        <HistoryScreen
          workouts={workouts}
          allExercises={allExercises}
          onDelete={async (id) => {
            const updated = await deleteWorkout(id);
            setWorkouts(updated);
          }}
          onEdit={(workout) => setEditingWorkout(workout)}
          onDuplicate={(workout) => setActiveDraft(workout.exercises.map((e) => e.exerciseId))}
        />
      ) : (
        <StatsScreen workouts={workouts} allExercises={allExercises} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F1115', paddingTop: 12, paddingHorizontal: 16, paddingBottom: 16 },
  title: { color: '#F5F6F7', fontSize: 28, fontWeight: '700' },
  subtitle: { color: '#9AA1AC', fontSize: 14, marginTop: 4, marginBottom: 12 },
  tabRow: { flexDirection: 'row', marginTop: 12, marginBottom: 12, gap: 8 },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#1B1E24',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A2E37',
  },
  tabButtonActive: { backgroundColor: '#4ADE80', borderColor: '#4ADE80' },
  tabText: { color: '#9AA1AC', fontWeight: '600' },
  tabTextActive: { color: '#0F1115', fontWeight: '700' },
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
  customBadge: { color: '#60A5FA', fontSize: 11, fontWeight: '700', textTransform: 'uppercase' },
  startButton: {
    backgroundColor: '#4ADE80',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  startButtonDisabled: { backgroundColor: '#232730' },
  startButtonText: { color: '#0F1115', fontWeight: '700', fontSize: 16 },
  cancelButton: {
    backgroundColor: '#232730',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    paddingHorizontal: 20,
  },
  cancelButtonText: { color: '#F5F6F7', fontWeight: '700', fontSize: 16 },
  timerBlock: {
    backgroundColor: '#1B1E24',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2A2E37',
  },
  timerText: { color: '#F5F6F7', fontSize: 36, fontWeight: '700', fontVariant: ['tabular-nums'] },
  timerButton: {
    marginTop: 8,
    backgroundColor: '#232730',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 999,
  },
  timerButtonText: { color: '#F5F6F7', fontWeight: '600' },
  exerciseBlock: {
    backgroundColor: '#1B1E24',
    borderRadius: 10,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#2A2E37',
  },
  exerciseBlockTitle: { color: '#F5F6F7', fontWeight: '700', fontSize: 15, marginBottom: 4 },
  demoToggleText: { color: '#60A5FA', fontSize: 12, fontWeight: '600', marginBottom: 6 },
  demoContainer: {
    backgroundColor: '#0F1115',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#2A2E37',
  },
  demoTrack: {
    width: 64,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  demoShape: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: '#4ADE80',
  },
  demoCaption: { color: '#9AA1AC', fontSize: 11, marginTop: 6, textAlign: 'center' },
  setLine: { color: '#9AA1AC', fontSize: 13, marginTop: 2 },
  editSetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  setInputRow: { flexDirection: 'row', gap: 6, marginTop: 8, alignItems: 'center' },
  setInput: {
    flex: 1,
    backgroundColor: '#232730',
    borderRadius: 8,
    padding: 8,
    color: '#F5F6F7',
    borderWidth: 1,
    borderColor: '#2A2E37',
  },
  addSetButton: {
    backgroundColor: '#4ADE80',
    width: 36,
    height: 36,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addSetButtonText: { color: '#0F1115', fontWeight: '700', fontSize: 18 },
  workoutCard: {
    backgroundColor: '#1B1E24',
    borderRadius: 10,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#2A2E37',
  },
  workoutHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  workoutDate: { color: '#F5F6F7', fontWeight: '700' },
  workoutDuration: { color: '#9AA1AC', fontSize: 13 },
  editText: { color: '#4ADE80', fontSize: 13, fontWeight: '600' },
  duplicateText: { color: '#60A5FA', fontSize: 13, fontWeight: '600' },
  deleteText: { color: '#F87171', fontSize: 13, fontWeight: '600' },
  workoutSubDate: { color: '#9AA1AC', fontSize: 12, marginTop: 2 },
  nameInput: {
    backgroundColor: '#1B1E24',
    borderRadius: 10,
    padding: 12,
    color: '#F5F6F7',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#2A2E37',
  },
  workoutExercise: { color: '#F5F6F7', fontSize: 14, fontWeight: '600' },
  workoutSet: { color: '#9AA1AC', fontSize: 13 },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { color: '#F5F6F7', fontSize: 16 },
  emptySubtext: { color: '#9AA1AC', fontSize: 13, marginTop: 4 },
  statsRow: { flexDirection: 'row', gap: 8, marginTop: 4 },
  statCard: {
    flex: 1,
    backgroundColor: '#1B1E24',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#2A2E37',
  },
  statBlock: {
    backgroundColor: '#1B1E24',
    borderRadius: 12,
    padding: 14,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#2A2E37',
  },
  statLabel: { color: '#9AA1AC', fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  statValue: { color: '#F5F6F7', fontSize: 26, fontWeight: '700', marginTop: 4 },
  statValueSmall: { color: '#F5F6F7', fontSize: 18, fontWeight: '700', marginTop: 4 },
  statSub: { color: '#9AA1AC', fontSize: 12, marginTop: 2 },
});