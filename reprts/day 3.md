Day 3  Category Filters & Exercise Selection

Task: Let the user actually select exercises (not just view them), filtered by category.
Work completed:

Added a horizontal scrollable row of category filter chips (All, Chest, Back, Legs, Shoulders, Arms, Core) above the exercise list
Tapping a chip filters the exercise list to that category; "All" shows everything
Made each exercise row tappable  tapping toggles selection (highlighted with a green border)
Added a live counter in the subtitle showing how many exercises are currently selected
Verified on a physical device: category filtering and multi-select both work as expected

Decisions i made:

Used component state (useState) to track both the active category and the array of selected exercise IDs no persistence yet, since this is still the exercise picking step, not a saved workout
Kept selection as an array of IDs rather than full exercise objects simpler to check "is this selected" and keeps the data normalized

Issues encountered & resolved:

None significant this built cleanly on top of Day 2's exercise list.

Files touched: App.js (updated).