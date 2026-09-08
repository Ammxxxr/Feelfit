## Day 18 — Workout Templates / Duplicate Previous Workout

Task: Let users reuse a past workout's exercise selection to start a new session quickly, instead of picking every exercise again from scratch.

Work completed:
Today I added a "Use Again" button to the workout cards in History, sitting next to Edit and Delete. Tapping it grabs the exercises from that old workout and drops you straight into an active workout screen with them already loaded  no need to go back to Home and reselect everything one by one. Under the hood this was simpler than I expected: I just needed to pull the exercise IDs out of the saved workout and hand them off the same way the picker screen already does when you hit "Start Workout." Because of that, I didn't have to touch the active workout screen or storage.js at all  it just reused logic that was already there.

Decisions made:
I decided not to carry over the old reps, weights, or timer  those all start fresh, since the point is repeating the exercise selection, not literally cloning the old session. I also left the workout name blank on the new copy rather than pre-filling the old name, since someone might want to call today's session something different even if it's the same exercises.

Issues encountered & resolved: None significant this one went smoothly since it built on existing patterns.

Files touched: App.js.