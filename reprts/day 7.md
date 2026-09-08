Day 7 — Workout Timer & Duration Tracking

Task: Track how long each workout session takes.
Work completed:

Added a live stopwatch to the active workout screen using useEffect + setInterval, counting up in MM:SS format
Added Pause/Resume control so the timer can be stopped mid-session without losing progress
Passed the final elapsed time through to "Finish Workout," saving it alongside the workout's exercises and sets
Updated HistoryScreen to display each workout's duration next to its date
Verified on a physical device: timer counts up correctly, pause/resume works, and the saved duration appears correctly in History

Decisions i made:

Kept the timer as local state within ActiveWorkoutScreen rather than a separate reusable component the app only has one place that needs a timer right now, so a dedicated component would be premature
Timer starts automatically when the workout begins (no manual "start" step) since a workout is already in progress the moment exercises are selected

Issues encountered & resolved:

App failed to load after the code update because the Expo server wasn't running in the terminal (had been stopped from a previous session) resolved by restarting it with npx expo start --lan

Files touched: App.js (updated)
Next steps: Add basic stats total workouts this week, total time trained, and most-frequent exercise to give a sense of overall progress rather than just a list of individual sessions.