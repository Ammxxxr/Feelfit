## Day 26 — Animated Exercise Demo
Date: ___________
Task: Build the animated exercise demonstration that had been parked as a stretch goal, scoped down to something realistic for a beginner project — a generic animated "rep cycle" rather than exercise-specific illustrations.

Work completed:
Added a "Show Demo" toggle under each exercise's title on the active workout screen (chosen as the trigger location since long-press was already taken by the custom exercise Edit/Delete menu). Tapping it expands a small panel showing a shape smoothly animating up and down in a loop using React Native's built-in Animated API, with a caption describing the rep rhythm. Tapping again collapses it. Built as a standalone ExerciseDemo component so the animation loop only runs while its panel is actually visible, rather than animating in the background for every exercise all the time.

Decisions made:
Kept the animation generic across every exercise rather than trying to build unique movements per exercise, since that would be a much bigger effort than fits in a single day and the honest, useful version of this feature for now is showing rep tempo, not anatomical accuracy. Used React Native's own Animated API rather than any external image, video, or GIF, since those aren't practical to source or embed reliably in Expo Go.

Issues encountered & resolved: None — validated the full file's syntax before handing it over, given a few rounds of partial-edit issues on past days, and it worked cleanly on the first try.

Files touched: App.js.