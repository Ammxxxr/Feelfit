## Day 17 — Edit Saved Workout

Task: Allow editing a workout's sets, exercises, and name after it's been saved, closing the gap where only create + delete existed before.
Work completed:
 Added `updateWorkout(id, updatedFields)` to `utils/storage.js`: loads all workouts, merges updated fields into the matching workout by id, saves the array back
 Built new `EditWorkoutScreen` component: shows each exercise's existing sets with a "Remove" action (instant, no confirmation), an "add set" input row reusing the existing reps/weight validation (1–500 reps, 0–500kg), and an editable workout name field
 Left duration untouched on edit — editing sets shouldn't retroactively change how long the original workout took
  Added an "Edit" button (green) next to "Delete" (red) on each History card
 Added `editingWorkout` state in `App()` plus a `handleSaveEdit` handler that calls `updateWorkout` and refreshes the list
 Blocked saving a workout down to zero sets, mirroring the same validation used when finishing a new workout
Decisions made:
  Set removal is instant with no confirmation dialog (lower friction than deleting an entire workout, and easy to re-add if removed by mistake)
 Reused existing validation logic and set input UI patterns from `ActiveWorkoutScreen` rather than writing new ones, for consistency
Issues encountered & resolved:
 After pasting updated App.js / storage.js , the new Edit button didn't initially appear turned out to be a stale Metro bundle; resolved by restarting with npx expo start --clear
Files touched: utils/storage.js, App.js.