## Day 25 — Polish / Bug-Hunt Pass
Date: ___________
Task: Fix a usability gap that had already caused real confusion a few days back — nothing in the UI showed which exercises were custom (and therefore long-press editable) versus built-in.

Work completed:
Added a small "Custom" badge next to the category label on any exercise added through the app, so it's now visually obvious at a glance which ones support long-press Edit/Delete. Built-in exercises show just their category as before, with no badge. Reused the same blue accent color already used for "Use Again" in History, so it reads as a consistent visual language rather than introducing a new color for no reason.

Decisions made:
Kept the badge minimal — just the word "Custom" in small uppercase text — rather than a full icon or more elaborate tag, since the goal was just to remove ambiguity, not add visual clutter to a list that's meant to be scanned quickly.

Issues encountered & resolved: None — clean, isolated change.

Files touched: App.js.