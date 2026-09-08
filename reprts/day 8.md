Day 8 Stats Screen

Task: Give a high-level view of progress across all saved workouts, not just a list of individual sessions.
Work completed:

Added a third tab, Stats, alongside Home and History
Built helper functions: getThisWeekWorkouts (filters workouts to the current calendar week), getTotalTimeSeconds (sums duration across all workouts), and getMostFrequentExercise (counts exercise occurrences across history and finds the top one)
Displayed these as three stat cards: workouts completed this week, total time trained all-time, and the most-frequently logged exercise with its session count
Added an empty state for when there's no workout history yet
Verified on a physical device with real saved workout data all three stats calculated and displayed correctly

Decisions which made:

Kept these as plain JS functions operating on the in memory workouts array rather than querying storage directly keeps the stats logic simple and testable independent of how data is persisted

Issues encountered & resolved:

None significant built cleanly on the existing workout data structure from Days 4-7.

Files touched: App.js (updated added StatsScreen and stat helper functions).