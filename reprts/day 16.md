 Day 16 Custom Exercise Creation

Task: Allow users to create their own exercises (name + category) that persist locally and integrate fully with the rest of the app.
Work completed:
Added loadCustomExercises(), saveCustomExercises(), addCustomExercise() to utils/storage.js, following the same AsyncStorage pattern as workouts (new key: @feelfit/customExercises)
Updated getExerciseName() to accept a merged exercise list as a parameter instead of reading the static EXERCISES. array directly, so custom exercise names resolve correctly
Updated all call sites (ActiveWorkoutScreen, HistoryScreen, StatsScreen) to pass the merged list through
Added an "+ Add Exercise" form to ExercisePickerScreen: name input + category chip picker, with validation blocking empty names
 In App(), added customExercises state loaded on mount, merged with static EXERCISES into a single allExercises array passed down to every screen
 Added handleAddExercise in App() to persist a new exercise and update state immediately (no reload needed)
Decisions made:
 Custom exercises use the same { id, name, category }shape as built-ins so no screen needs to distinguish between the two
 Reused .generateId(). from storage.js rather than writing a second ID generator
 New exercises are appended to the end of the list rather than prepended (order matters less for a picker than for workout history)
Issues encountered & resolved: None significant full file rewrite of App.js done carefully (per Day 10 lesson), verified last lines and Problems panel before testing
Files touched: utils/storage.js, App.js.