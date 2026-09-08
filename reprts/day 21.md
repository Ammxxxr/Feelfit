## Day 21 — Polish / Bug-Hunt Pass
Date: ___________
Task: Do a focused pass across the app looking for the kind of quiet bugs that don't crash anything but just silently misbehave, and finally confirm the custom exercise edit/delete flow that was left unverified after Day 20.

Work completed:
First confirmed Day 20's leftover test — added a custom exercise, long-pressed it, and both Edit and Delete worked correctly, including the "past workouts will show Unknown exercise" warning on delete.

Then found and fixed a real data-loss risk: the Cancel button on the active workout screen discarded all logged sets with zero confirmation, unlike Delete Workout in History which always asks first. Fixed it so Cancel now exits immediately if nothing's been logged yet (nothing to lose), but shows a "Discard this workout? All logged sets will be lost" confirmation once at least one set has been logged.

Decisions made:
Left EditWorkoutScreen's Cancel button alone, since that one just exits back to an unmodified saved workout rather than discarding anything — there's nothing genuinely at risk there, so a confirmation would just be friction for no reason.

Issues encountered & resolved:
This turned into a longer debugging session than expected. First, a leftover duplicate function declaration (EditWorkoutScreen defined twice, one nested inside the other) slipped into the file from an earlier edit, which didn't crash immediately but would have broken Edit Workout the next time it ran. After that got cleaned up, the app was still showing a red "import and export may only appear at the top level" error on the phone. Traced it by running the actual pasted file through a real parser rather than eyeballing it, which confirmed the code itself was correct — meaning the phone was just running a stale cached bundle. A full `npx expo start --clear` plus a fresh reopen of Expo Go cleared it.

Files touched: App.js.