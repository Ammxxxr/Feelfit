## Day 24 — Polish / Bug-Hunt Pass
Date: ___________
Task: Continue hunting for the kind of quiet, non-crashing bugs that slip through — this time specifically looking for anywhere else the same silent-data-loss pattern from Day 21 might still exist.

Work completed:
Found that EditWorkoutScreen had the exact same problem ActiveWorkoutScreen had before Day 21's fix — its Cancel button just called onCancel directly with zero confirmation, so any edits made during a session (sets added or removed, name changed) would vanish instantly with one tap. The original saved workout in storage was never at risk, but the in-progress editing session was.

Fixed it by capturing a snapshot of the workout's original state (exercises and name) the moment the edit screen opens, using useRef so it's captured once and doesn't change on re-renders. Cancel now compares the live state against that snapshot — if nothing's changed, it exits immediately like before; if something has changed, it shows a "Discard these changes?" warning first, matching the wording style of the ActiveWorkoutScreen fix from a few days ago.

Decisions made:
Used a snapshot-comparison approach instead of manually tracking a "hasChanges" flag on every add/remove/rename action, since comparing full before/after state with JSON.stringify is simpler to get right and less likely to miss an edge case than threading a dirty flag through every individual state update.

Issues encountered & resolved: None this time — clean edit, verified working on first try.

Files touched: App.js.