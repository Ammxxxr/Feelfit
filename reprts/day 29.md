## Day 29 — Polish / Bug-Hunt Pass

Task: Catch an inconsistency between the two Cancel-confirmation fixes from Days 21 and 24 — EditWorkoutScreen checks for changes to both sets and the workout name before warning, but ActiveWorkoutScreen only checked sets, meaning a typed workout name with zero logged sets could be silently discarded with one tap.

Work completed:
Updated ActiveWorkoutScreen's Cancel button so it only skips the confirmation warning when there are both zero logged sets and no workout name typed. If either one has something in it, Cancel now shows the "Discard this workout?" warning, with updated wording that mentions the name being lost alongside the sets.

Decisions made:
Kept the same warning/confirmation UI pattern rather than introducing a separate message for "name only" vs "sets only" vs "both" — one consistent warning covers all three cases without adding complexity for a fairly minor edge case.

Issues encountered & resolved: None — clean, isolated fix, worked on first try.

Files touched: App.js.