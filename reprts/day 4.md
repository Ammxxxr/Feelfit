Day 4 — Storage Layer & "Start Workout"

Task: Turn exercise selection into an actual saved workout using local persistence.
Work completed:

Created utils/storage.js AsyncStorage-backed helper functions: loadWorkouts, saveWorkouts, addWorkout, and generateId
Added a "Start Workout" button to the main screen, enabled only when at least one exercise is selected
Tapping "Start Workout" builds a workout object (unique ID, timestamp, selected exercises) and saves it via addWorkout
Added a confirmation alert showing how many exercises were saved
Verified on a physical device: selecting exercises and tapping "Start Workout" successfully persists a workout

Decisions made:

Used a single AsyncStorage key holding a JSON array of all workouts, rather than one key per workout simpler to manage at this scale (dozens to hundreds of workouts, not more)
Generated workout IDs from a timestamp + random number rather than a UUID library avoids adding a dependency for something this simple

Issues encountered & resolved:

utils/storage.js initially failed to resolve (Unable to resolve module /utils/storage) traced back to the same root cause as a previous day: the file was created but not actually saved. Resolved by explicitly confirming the save (no unsaved change dot) before reloading
Tested first at a location with restrictive network isolation, which blocked phone-to-PC connection entirely not a code issue; confirmed working normally once back on home Wi-Fi

Files touched: utils/storage.js (new), App.js (updated).