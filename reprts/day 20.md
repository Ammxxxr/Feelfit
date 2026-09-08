## Day 20 — Custom Exercise Editing/Deleting
Date: ___________
Task: Let people edit or delete the custom exercises they've created, since built-in exercises are fixed in code but custom ones live in storage and should be manageable the same way workouts already are.

Work completed:
I added updateCustomExercise and deleteCustomExercise to storage.js, following the same pattern as the workout equivalents. On the Home tab, long-pressing an exercise row now opens a popup with Edit and Delete options — but only for custom exercises, since built-in ones have nothing backing them in storage to change. Editing reuses the existing "+ Add Exercise" form, just pre-filled with the exercise's current name and category, and the save button switches to say "Save Changes" instead of "Save Exercise." Deleting shows a confirmation that explicitly warns any past workouts using that exercise will still show up in History, just with an "Unknown exercise" label instead of the real name, rather than the workout itself disappearing.

Decisions made:
I kept long-press as a no-op on built-in exercises rather than showing an error or disabled state, since a silent no-op felt less confusing than popping up a message explaining why you can't edit something you'd expect to just work like any other list item.

Issues encountered & resolved:
None on the code side — syntax-checked both files before handing them over this time, given a few rounds recently where partial edits caused issues. Didn't get a chance to fully verify the edit/delete flow against a real custom exercise on device before moving on, so that's worth a quick sanity check next time I'm in the app.

Files touched: utils/storage.js, App.js.