Day 11 Optional Workout Name

Task: Let the user name a workout (e.g. "Push Day," "Leg Day") instead of every entry just being identified by date.
Work completed:

Added an optional "Workout name" text input to the active workout screen
The name is passed through to handleFinish and saved with the workout record (null if left blank)
Updated HistoryScreen so a named workout shows its name as the main title, with the date displayed underneath in smaller text; unnamed workouts still show the date as the title, unchanged from before
Verified in a web browser preview (phone unavailable at the time) using Expo's web support (react dom, react native web) confirmed naming, saving, and History display all work correctly

Decisions made:

Kept the name strictly optional trimmed and stored as null rather than an empty string when left blank, so existing display logic (item.name ? .... dateLabel) stays simple
Used Expo's built-in web preview as a fallback testing method when the physical device wasn't available, rather than skipping verification for the day

Issues encountered & resolved:

Initial web preview attempt failed because react-dom and react native web weren't installed yet resolved by running npx expo install react dom react native web in a separate terminal tab, then pressing w in the terminal running Expo

Files touched: App.js (updated ActiveWorkoutScreen, handleFinish, HistoryScreen, and styles).