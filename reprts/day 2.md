Day 2 — Exercise Library & First Screen
Date: ___________
Task: Build the exercise data model and display it as the app's first real screen.
Work completed:

Created a data/ folder to hold the app's static data
Built data/exercises.js — a starter exercise library (10 exercises across 6 categories: Chest, Back, Legs, Shoulders, Arms, Core), each with a stable id and category
Replaced the Day 1 placeholder screen in App.js with a real FlatList that renders the exercise library, showing each exercise's name and category
Verified the update live on a physical device via Expo Go, using auto-reload

Decisions made:

Used a stable id per exercise (e.g. ex_bench_press) rather than the display name as the reference key — keeps future features (like logged sets) from breaking if an exercise is renamed
Kept the exercise list as a plain hardcoded JS array for now rather than a database — appropriate at this stage since the library doesn't need to be user-editable yet

Issues encountered & resolved:

First edit attempts to App.js didn't persist — the file wasn't actually saved before checking the device, causing confusion that the code wasn't working. Resolved by explicitly confirming saves (no unsaved-change dot on the file tab) before each reload
Initial import error (Unable to resolve ./data/exercises) traced back to the same root cause — data/exercises.js existed but hadn't been saved. Resolved once saved correctly.
Also pushed to GitHub for the first time: hit a rejected-push conflict from GitHub's auto-created files, resolved with git pull --allow-unrelated-histories, then pushed successfully

Files touched: data/exercises.js (new), App.js (updated)
Next steps: Add category filtering and multi-select so the user can actually choose exercises to build a workout, rather than just viewing the full list.