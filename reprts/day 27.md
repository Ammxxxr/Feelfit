## Day 27 — Category-Specific Demo Animations
Date: ___________
Task: Expand Day 26's single generic rep-cycle animation into six distinct motions, one per exercise category, so the demo actually reflects the kind of movement being done rather than the same up-down cycle for everything.

Work completed:
Built a CATEGORY_DEMOS mapping with a distinct animation type and caption for each of the six categories: Legs squats down then up, Shoulders presses up then down (the mirror direction from Legs), Chest presses outward horizontally then draws back in, Back pulls inward horizontally then extends back out (the mirror direction from Chest), Arms rotates like a curling motion, and Core scales down then back up like a contraction. ExerciseDemo now takes a category prop and picks the right transform (translateY, translateX, rotate, or scale) and caption based on it, all still driven by the same single animated loop underneath. ActiveWorkoutScreen looks up each exercise's category from the merged exercise list — including custom exercises, since those carry a category too — and passes it down.

Decisions made:
Kept all six animations built on the same simple loop/interpolate pattern from Day 26 rather than introducing more complex animation logic per category, so the code stays easy to read and each category's "flavor" comes from picking a different transform type and range rather than a fundamentally different animation engine.

Issues encountered & resolved: None — validated the full file's syntax and confirmed the category lookup and prop wiring before handing it over, and it worked cleanly on the first try.

Files touched: App.js.