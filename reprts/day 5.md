Day 5 — Workout History Screen

Task: Build a way to view previously saved workouts.
Work completed:

Split App.js into two logical screens: HomeScreen (exercise picker, unchanged from Day 4) and a new HistoryScreen
Added a Home/History tab toggle at the top of the app to switch between the two
HistoryScreen loads all saved workouts from storage and displays each as a card showing the date and the list of exercises in that session
Added an empty state ("No workouts yet") for when History is opened with no saved workouts
Wired up automatic refresh saving a new workout on Home, or switching to the History tab, reloads the list from storage so it's always current
Verified on a physical device: saved workouts appear correctly in History with the right date and exercise names

Decisions made:

Used a simple in app tab toggle (component state) instead of adding React Navigation at this stage avoids extra complexity/dependencies until the app has enough screens to justify a real navigation library
Added a small getExerciseName helper to look up an exercise's display name from its stored ID, keeping the exercise library as the single source of truth for names

Issues encountered & resolved:

None significant — built cleanly on the existing storage layer from Day 4.

Files touched: App.js (restructured into HomeScreen + HistoryScreen).