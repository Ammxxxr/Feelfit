Day 6 — Set Logging (Reps & Weight)

Task: Let the user log actual sets (reps and weight) per exercise during a workout, instead of just recording which exercises were picked.
Work completed:

Restructured the app flow: selecting exercises and tapping "Start Workout" now enters a new active workout session screen, rather than saving immediately
Built ActiveWorkoutScreen shows each selected exercise with reps/weight input fields and a button to log a set
Logged sets display live under each exercise (e.g. "Set 1: 10 reps @ 20kg") as they're added
Added a "Finish Workout" button that saves the full session (all exercises + their logged sets) to storage, and a "Cancel" button to discard the in-progress session
Updated HistoryScreen to display the actual logged sets per exercise, not just the exercise names
Verified on a physical device: logging multiple sets across different exercises and finishing a workout correctly saves and displays in History

Decisions made:

Kept the active workout as local component state until "Finish" is tapped, rather than saving to storage on every set  avoids partial/incomplete workout data cluttering History if the user backs out midsession
Basic validation: a set only gets logged if reps is a positive number; weight defaults to 0 if left blank rather than blocking the entry

Issues encountered & resolved:

A large code paste into App.js got cut off partway through, leaving a syntax error (Unexpected token) that prevented the app from compiling at all. Resolved by clearing the file and re-pasting the complete code, then verifying the file's ending matched what was expected before testing again.

Files touched: App.js (major update added ActiveWorkoutScreen, updated HistoryScreen).