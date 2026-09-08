Day 12 — Input Validation

Task: Prevent invalid data from entering a workout — specifically, finishing with zero logged sets, and unreasonable rep/weight values.
Work completed:

Added a check before "Finish Workout": if no sets have been logged across any exercise, the app blocks finishing and prompts the user to log at least one set
Added validation to addSet: rejects rep counts of 0, blank, or over 500, and weights outside 0 500kg, each with an explanatory alert
Verified the blocking behavior works correctly (tested with a browser preview since the phone was unavailable): entering 9999 reps was silently rejected, while a normal value like 3 reps / 85kg was accepted and logged correctly

Decisions made:

Chose fixed sanity-check ranges (1–500 reps, 0–500kg) rather than stricter sport specific limits generous enough not to block any realistic use case, while still catching obvious typos
Used Alert.alert() for all validation messages, consistent with the existing delete confirmation and workout saved alerts elsewhere in the app

Issues encountered & resolved:

Could not visually confirm the alert popups while testing, since Alert.alert() does not render reliably in Expo's web browser preview confirmed instead that the underlying validation logic works correctly by checking that invalid values were silently rejected and valid ones were accepted; visual confirmation of the popup text itself is still pending until testing resumes on the physical device

Files touched: App.js (updated ActiveWorkoutScreen).